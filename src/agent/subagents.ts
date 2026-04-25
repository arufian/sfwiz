import { query } from '@anthropic-ai/claude-agent-sdk';
import type { AgentDefinition, SDKMessage, SDKSystemMessage, SDKResultSuccess } from '@anthropic-ai/claude-agent-sdk';
import { z } from 'zod';
import { learnBus } from '~/learn/bus';

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
  description: 'Reviews Salesforce Apex/LWC code for quality and SF platform best practices. Read-only.',
  prompt: `You are a senior Salesforce architect reviewing code changes.
Your output MUST be valid JSON matching: { "issues": [{ "severity": "error"|"warning"|"info", "file": string, "line"?: number, "message": string }], "summary": string, "approved": boolean }
Be thorough but concise. Focus on: governor limits, SOQL in loops, test coverage, security (CRUD/FLS), LWC anti-patterns.`,
  model: 'claude-opus-4-7',
  tools: ['Read', 'Glob', 'Grep'],
};

/** QA subagent: can run tests via Bash, uses Sonnet 4.6. */
export const QA_AGENT: AgentDefinition = {
  description: 'Runs Salesforce Apex test suite and reports coverage results.',
  prompt: `You are a QA engineer running Apex tests in a Salesforce org.
Run: sf apex run test --target-org <org> --test-level RunLocalTests --code-coverage --json
Output MUST be valid JSON: { "passed": number, "failed": number, "coverage": number, "failures": [{ "class": string, "method": string, "message": string }] }`,
  model: 'claude-sonnet-4-6',
  tools: ['Read', 'Bash'],
};

const AGENT_DEFINITIONS: Record<string, AgentDefinition> = {
  reviewer: REVIEWER_AGENT,
  qa: QA_AGENT,
};

/** Audit log for PostToolUse hook: each Edit/Write emits one line. */
const auditLines: string[] = [];
export function getAuditLines(): readonly string[] { return auditLines; }

/** Run a named subagent via claude-agent-sdk query(). Returns structured output. */
export async function runSubagent<TOut = unknown>(
  opts: SubagentRunOptions<TOut>,
): Promise<SubagentResult<TOut>> {
  const agentDef = AGENT_DEFINITIONS[opts.name];
  if (!agentDef) throw new Error(`Unknown subagent: "${opts.name}"`);

  const userPrompt = opts.inputs
    ? `${opts.prompt}\n\n<context>\n${JSON.stringify(opts.inputs, null, 2)}\n</context>`
    : opts.prompt;

  const q = query({
    prompt: userPrompt,
    options: {
      agent: opts.name,
      agents: AGENT_DEFINITIONS,
      cwd: opts.cwd ?? process.cwd(),
      abortController: opts.abortController,
      persistSession: false,
      // PostToolUse hook: write audit entry per Edit/Write call
      hooks: {
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

  // Emit subagent:spawn event for TUI observability (Best Managed Agents prize)
  learnBus.emit('install:progress', {
    kind: 'install:progress',
    step: 0,
    total: 1,
    message: `[subagent] ${opts.name} spawned`,
  });

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

  if (rawResult === null) throw new Error(`Subagent "${opts.name}" returned no result`);

  let parsed: TOut;
  if (opts.outputSchema) {
    try {
      const jsonObj = JSON.parse(rawResult);
      parsed = opts.outputSchema.parse(jsonObj);
    } catch {
      throw new Error(`Subagent "${opts.name}" result did not match schema: ${rawResult.slice(0, 200)}`);
    }
  } else {
    parsed = rawResult as TOut;
  }

  return { output: parsed, sessionId, numTurns, totalCostUsd };
}
