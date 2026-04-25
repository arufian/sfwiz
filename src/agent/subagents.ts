import { query } from '@anthropic-ai/claude-agent-sdk';
import type {
  AgentDefinition,
  SDKMessage,
  SDKResultSuccess,
  SDKSystemMessage,
} from '@anthropic-ai/claude-agent-sdk';
import type { z } from 'zod';
import type { PersonaName } from '~/agent/router';
import { learnBus } from '~/learn/bus';
import { pickDefaultModel } from '~/llm/models-catalog';
import { checkPersonaGate } from '~/personas/gate';

const SONNET = pickDefaultModel('sonnet');
const OPUS = pickDefaultModel('opus');

/** Query function type for dependency injection (test stubs override `query`). */
type QueryFn = typeof query;
let _queryImpl: QueryFn = query;

/** Test-only: swap the SDK query() with a stub. Returns the previous impl. */
export function __setQueryImpl(impl: QueryFn): QueryFn {
  const prev = _queryImpl;
  _queryImpl = impl;
  return prev;
}

export interface SubagentRunOptions<TOut> {
  /** Agent name (must match a key in agentDefinitions) */
  name: string;
  /** Prompt sent as the user turn */
  prompt: string;
  /** Inputs merged into the prompt as JSON context */
  inputs?: Record<string, unknown>;
  /** Zod schema to parse the final result message */
  outputSchema?: z.ZodType<TOut>;
  /** Working directory for the Claude Code subprocess */
  cwd?: string;
  /** Signal to abort */
  abortController?: AbortController;
}

export interface SubagentResult<TOut> {
  output: TOut;
  sessionId: string | null;
  numTurns: number;
  totalCostUsd: number;
}

/** Reviewer subagent: read-only, uses Opus 4.7 for voice-rich critique. */
export const REVIEWER_AGENT: AgentDefinition = {
  description:
    'Reviews Salesforce Apex/LWC code for quality and SF platform best practices. Read-only.',
  prompt: `You are a senior Salesforce architect reviewing code changes.
Your output MUST be valid JSON matching: { "issues": [{ "severity": "error"|"warning"|"info", "file": string, "line"?: number, "message": string }], "summary": string, "approved": boolean }
Be thorough but concise. Focus on: governor limits, SOQL in loops, test coverage, security (CRUD/FLS), LWC anti-patterns.`,
  model: OPUS,
  tools: ['Read', 'Glob', 'Grep'],
};

/** Org Admin subagent: manages org settings, users, permissions. Uses Sonnet 4.6. */
export const ORG_ADMIN_AGENT: AgentDefinition = {
  description: 'Manages Salesforce org settings, users, profiles, permissions, and sharing rules.',
  prompt: `You are a Salesforce org administrator.
Your output MUST be valid JSON: { "operation": string, "before": string, "after": string, "warnings": string[] }
Always confirm via ask_user before making changes. Prefer sf_query to read current state first.`,
  model: SONNET,
  tools: ['Read', 'Glob', 'Grep', 'Bash'],
};

/** QA subagent: can run tests via Bash, uses Sonnet 4.6. */
export const QA_AGENT: AgentDefinition = {
  description: 'Runs Salesforce Apex test suite and reports coverage results.',
  prompt: `You are a QA engineer running Apex tests in a Salesforce org.
Run: sf apex run test --target-org <org> --test-level RunLocalTests --code-coverage --json
Output MUST be valid JSON: { "passed": number, "failed": number, "coverage": number, "failures": [{ "class": string, "method": string, "message": string }] }`,
  model: SONNET,
  tools: ['Read', 'Bash'],
};

/** Designer subagent: drafts design from sObject layout. Read-only. Opus 4.7 voice-rich. */
export const DESIGNER_AGENT: AgentDefinition = {
  description:
    'Drafts Salesforce solution designs from sObject layout, business requirements, and existing metadata. Read-only.',
  prompt: `You are a Salesforce solution architect drafting design proposals.
Output a structured plan as plain text: problem statement, proposed sObject changes, page-layout / record-type implications, automation choices (Flow vs Apex), permission/sharing impact, open risks.
You may read files but never edit. Hand off to developer for implementation.`,
  model: OPUS,
  tools: ['Read', 'Glob', 'Grep'],
};

/** Developer subagent: writes Apex/LWC code. Sonnet 4.6 for throughput. */
export const DEVELOPER_AGENT: AgentDefinition = {
  description:
    'Writes and edits Apex classes, LWC components, tests, and metadata. Re-dispatches to reviewer when issues land.',
  prompt: `You are a Salesforce developer.
Implement the requested change with minimal scope. Match existing project style. Run/build via Bash only when explicitly required.
Return a short summary: files touched, key decisions, and a one-line handoff for reviewer/qa.`,
  model: SONNET,
  tools: ['Read', 'Edit', 'Write', 'Glob', 'Grep', 'Bash'],
};

/** Deploy Manager subagent: dispatches sf project deploy after ask_user confirmation. Sonnet 4.6. */
export const DEPLOY_MANAGER_AGENT: AgentDefinition = {
  description:
    'Plans and executes Salesforce deployments via the sf CLI after ask_user confirmation.',
  prompt: `You are a Salesforce deployment manager.
Always confirm the destructive operation with the user before invoking sf project deploy start.
Return a short summary: target org, package paths, dry-run preview vs final outcome.`,
  model: SONNET,
  tools: ['Read', 'Bash'],
};

const AGENT_DEFINITIONS: Record<string, AgentDefinition> = {
  'org-admin': ORG_ADMIN_AGENT,
  designer: DESIGNER_AGENT,
  developer: DEVELOPER_AGENT,
  'deploy-manager': DEPLOY_MANAGER_AGENT,
  reviewer: REVIEWER_AGENT,
  qa: QA_AGENT,
};

/** Audit log for PostToolUse hook: each Edit/Write emits one line. */
const auditLines: string[] = [];
export function getAuditLines(): readonly string[] {
  return auditLines;
}

/** Run a named subagent via claude-agent-sdk query(). Returns structured output. */
export async function runSubagent<TOut = unknown>(
  opts: SubagentRunOptions<TOut>,
): Promise<SubagentResult<TOut>> {
  const agentDef = AGENT_DEFINITIONS[opts.name];
  if (!agentDef) throw new Error(`Unknown subagent: "${opts.name}"`);

  const userPrompt = opts.inputs
    ? `${opts.prompt}\n\n<context>\n${JSON.stringify(opts.inputs, null, 2)}\n</context>`
    : opts.prompt;

  const q = _queryImpl({
    prompt: userPrompt,
    options: {
      agent: opts.name,
      agents: AGENT_DEFINITIONS,
      cwd: opts.cwd ?? process.cwd(),
      abortController: opts.abortController,
      persistSession: false,
      // PreToolUse: persona gate — deny tools blocked for the persona.
      // PostToolUse: audit each Edit/Write call.
      hooks: {
        PreToolUse: [
          {
            hooks: [
              async (input) => {
                const toolName = (input as { tool_name?: string }).tool_name ?? '';
                const gate = checkPersonaGate(opts.name as PersonaName, toolName);
                if (!gate.allowed) {
                  return {
                    continue: false,
                    decision: 'block',
                    stopReason: gate.reason ?? 'persona gate denied tool',
                  };
                }
                return { continue: true };
              },
            ],
          },
        ],
        PostToolUse: [
          {
            hooks: [
              async (input) => {
                const toolName = (input as { tool_name?: string }).tool_name ?? '';
                if (/^(Edit|Write)$/.test(toolName)) {
                  auditLines.push(`[${new Date().toISOString()}] ${opts.name} used ${toolName}`);
                }
                return { continue: true };
              },
            ],
          },
        ],
      },
    },
  });

  let sessionId: string | null = null;
  let numTurns = 0;
  let totalCostUsd = 0;
  let rawResult: string | null = null;

  learnBus.emit('subagent:spawn', { kind: 'subagent:spawn', name: opts.name });

  for await (const msg of q) {
    const m = msg as SDKMessage;

    if (m.type === 'system' && (m as SDKSystemMessage).subtype === 'init') {
      sessionId = (m as SDKSystemMessage).session_id;
    }

    if (m.type === 'result') {
      const r = m as SDKResultSuccess;
      numTurns = r.num_turns;
      totalCostUsd = r.total_cost_usd;
      if (!r.is_error) rawResult = r.result;
    }
  }

  learnBus.emit('subagent:done', {
    kind: 'subagent:done',
    name: opts.name,
    numTurns,
    totalCostUsd,
  });

  if (rawResult === null) throw new Error(`Subagent "${opts.name}" returned no result`);

  let parsed: TOut;
  if (opts.outputSchema) {
    try {
      const jsonObj = JSON.parse(rawResult);
      parsed = opts.outputSchema.parse(jsonObj);
    } catch {
      throw new Error(
        `Subagent "${opts.name}" result did not match schema: ${rawResult.slice(0, 200)}`,
      );
    }
  } else {
    parsed = rawResult as TOut;
  }

  return { output: parsed, sessionId, numTurns, totalCostUsd };
}
