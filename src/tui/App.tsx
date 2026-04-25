import { homedir } from 'os';
import { join } from 'path';
import type { TextareaRenderable } from '@opentui/core';
import { useKeyboard, useTerminalDimensions } from '@opentui/react';
/** @jsxImportSource @opentui/react */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { AgentLoop } from '~/agent/loop';
import { loadConfig } from '~/config/load';
import { defaultConfig } from '~/config/load';
import { saveConfig } from '~/config/save';
import { TrustStore } from '~/config/trust';
import { bootstrapCollections, COLLECTIONS } from '~/knowledge/collections';
import { detectQmd } from '~/knowledge/detect';
import { runEmbed } from '~/knowledge/embed';
import { installQmd } from '~/knowledge/qmd-install';
import { learnBus } from '~/learn/bus';
import type {
  EmbedDoneEvent,
  EmbedErrorEvent,
  EmbedProgressEvent,
  InstallProgressEvent,
} from '~/learn/bus';
import type { MessageParam } from '@anthropic-ai/sdk/resources/messages';
import { initAnthropicClient, resetAnthropicClient, resolveApiKey } from '~/llm/client';
import { listAvailableModels, type ModelChoice } from '~/llm/list-models';
import { ANTHROPIC_MODELS, pickDefaultModel } from '~/llm/models-catalog';
import type { AskUserPayload, AskUserResult } from '~/tools/types';
import { listOrgs } from '~/sf/auth';
import type { OrgSummary } from '~/ui/panels/SidePanel';

import { loginCommand } from '~/dispatcher/commands/login';
import { orgsCommand } from '~/dispatcher/commands/orgs';
import { COMMAND_REGISTRY, getAllPaletteLabels } from '~/dispatcher/registry';
import { DirTree } from '~/tui/layout/DirTree';
import { StatusBar as LiveStatusBar } from '~/tui/layout/StatusBar';
import { ApiKeySetup } from '~/tui/overlays/ApiKeySetup';
import { AskUserModal } from '~/tui/overlays/AskUserModal';
// Real TUI components
import { CommandPalette } from '~/tui/overlays/CommandPalette';
import { FirstRunWizard, MODEL_CHOICES, PERMISSION_CHOICES } from '~/tui/overlays/FirstRunWizard';
import { ModelPicker } from '~/tui/overlays/ModelPicker';
import {
  PERMISSION_DECISIONS,
  type PermissionDecision,
  PermissionPrompt,
} from '~/tui/overlays/PermissionPrompt';
import { PermissionStore } from '~/config/permissions';
import { PROVIDERS, ProviderPicker } from '~/tui/overlays/ProviderPicker';
import { type EmbedRow, EmbedScreen } from '~/tui/setup/EmbedScreen';
import { QmdScreen, type QmdSubPhase } from '~/tui/setup/QmdScreen';
import { SetupChrome } from '~/tui/setup/SetupChrome';
import { fuzzyFilter } from '~/util/fuzzy';

import type { ChatBlock, PermissionMode, SideView } from '~/types/ui';
import { PERMISSION_MODES } from '~/types/ui';
import { useGlobalKeys } from '~/ui/hooks/useGlobalKeys';
import { HelpOverlay } from '~/ui/overlays/HelpOverlay';
import { TrustWorkspacePrompt } from '~/ui/overlays/TrustWorkspacePrompt';
// PoC UI components (kept for rendering fidelity)
import { ChatPanel, SplashView, pickSplashTip } from '~/ui/panels/ChatPanel';
import { InputLine } from '~/ui/panels/InputLine';
import { SidePanel } from '~/ui/panels/SidePanel';
import { ToastBar } from '~/ui/panels/ToastBar';

import { editFileTool } from '~/tools/fs/edit_file';
import { grepTool } from '~/tools/fs/grep';
import { listFilesTool } from '~/tools/fs/list_files';
import { readFileTool } from '~/tools/fs/read_file';
import { writeFileTool } from '~/tools/fs/write_file';
// Tools
import { askUserTool } from '~/tools/interaction/ask_user';
import { routePersonaTool } from '~/tools/interaction/route_persona';
import { sfQuery } from '~/tools/jsforce/sf_query';
import { sfSobjectDescribe } from '~/tools/jsforce/sf_sobject_describe';
import { sfApexRunAnonymous } from '~/tools/sf-cli/sf_apex_run_anonymous';
import { sfAssignPermset } from '~/tools/sf-cli/sf_assign_permset';
import { sfDeployStart } from '~/tools/sf-cli/sf_deploy_start';
import { sfRetrieve } from '~/tools/sf-cli/sf_retrieve';
import { sfRunTests } from '~/tools/sf-cli/sf_run_tests';
import { sfScratchCreate } from '~/tools/sf-cli/sf_scratch_create';
import { runCommandTool } from '~/tools/shell/run_command';

const TRUST_PATH = join(homedir(), '.sfwiz', 'trusted-workspaces.json');
const PERMISSIONS_PATH = join(homedir(), '.sfwiz', 'permissions.json');
const SIDE_VIEWS: SideView[] = ['persona', 'tests', 'soql', 'knowledge', 'deploy'];

function isValidAnthropicKey(key: string): boolean {
  return key.startsWith('sk-ant-') || key.startsWith('sk-proj-');
}

function permissionKey(toolName: string, args: Record<string, unknown>): string {
  if (toolName === 'run_command' && typeof args.command === 'string') {
    return `run_command:${args.command}`;
  }
  return toolName;
}

function friendlyToolSummary(toolName: string, input: unknown): string {
  let args: Record<string, unknown> = {};
  if (typeof input === 'string') {
    try {
      args = JSON.parse(input || '{}') as Record<string, unknown>;
    } catch {}
  } else if (input && typeof input === 'object') {
    args = input as Record<string, unknown>;
  }
  if (toolName === 'run_command') {
    const cmd = typeof args.command === 'string' ? args.command : '';
    return cmd ? `running ${cmd}…` : 'running command…';
  }
  if (toolName === 'read_file' && typeof args.path === 'string') return `reading ${args.path}`;
  if (toolName === 'write_file' && typeof args.path === 'string') return `writing ${args.path}`;
  if (toolName === 'edit_file' && typeof args.path === 'string') return `editing ${args.path}`;
  if (toolName === 'list_files' && typeof args.dir === 'string') return `listing ${args.dir}`;
  if (toolName === 'grep' && typeof args.pattern === 'string') return `searching "${args.pattern}"`;
  if (toolName === 'sf_query' && typeof args.soql === 'string') {
    return `query: ${String(args.soql).slice(0, 60)}`;
  }
  if (toolName === 'ask_user') return 'awaiting your input…';
  return `${toolName}…`;
}

function shortDoneSummary(toolName: string, result: unknown): string {
  if (toolName === 'run_command') return 'done';
  if (typeof result === 'string') {
    const oneLine = result.replace(/\s+/g, ' ').trim();
    return oneLine.length > 80 ? `${oneLine.slice(0, 77)}…` : oneLine || 'done';
  }
  return 'done';
}

function modelSummaryFromId(
  id: string | null | undefined,
): { provider: string; name: string } | null {
  if (!id) return null;
  const entry = ANTHROPIC_MODELS.find((m) => m.id === id);
  // Strip the "Claude " prefix so the side panel reads as "Sonnet 4.6", not
  // "Claude Sonnet 4.6". Fall back to the raw id if we don't recognise it.
  const name = entry?.displayName.replace(/^Claude\s+/, '') ?? id;
  return { provider: 'anthropic', name };
}

const SYSTEM_PROMPT = `You are sfwiz, a Salesforce development assistant.
You help with Apex, LWC, SOQL, metadata, deployments, and org administration.
Be concise and precise. Use tools to read files before editing them.
Always confirm destructive operations (deploys, permset assignments) with ask_user.

## Behavior rules
- **Act, don't ask.** When the user says "run it", "do it", "go ahead", or similar, use the conversation history to determine what to run and execute it immediately. Never ask for clarification when context is already established in the conversation.
- **Infer from context.** If the previous turn described a command or plan, "run it for me" means execute exactly that. Do not re-ask what to run.
- **Short replies.** Respond in 1–2 sentences max unless showing code or command output.
- **No bullet lists of options.** Pick the best action and do it. Only offer alternatives if the user explicitly asks.

Salesforce CLI tips (run via run_command, command="sf"):
- List authenticated orgs: args=["org","list","--json"]  (subcommand is "org", not "orgs")
- Display org info: args=["org","display","--target-org","<alias>","--json"]
- Run anonymous Apex: prefer the sf_apex_run_anonymous tool over run_command.
- Always pass --json when you need structured output.
- The sf CLI prompts interactively for unknown subcommands; sfwiz auto-declines those, so a typo will surface as a non-zero exit, not a hang.`;

const ALL_TOOLS = [
  askUserTool,
  routePersonaTool,
  readFileTool,
  listFilesTool,
  editFileTool,
  writeFileTool,
  grepTool,
  runCommandTool,
  sfDeployStart,
  sfApexRunAnonymous,
  sfAssignPermset,
  sfRetrieve,
  sfRunTests,
  sfScratchCreate,
  sfQuery,
  sfSobjectDescribe,
];

export function App({
  renderer,
  trustBypass = false,
  forceFirstRun = false,
}: {
  renderer: { destroy: () => void };
  trustBypass?: boolean;
  forceFirstRun?: boolean;
}) {
  const { width, height } = useTerminalDimensions();
  const cwd = useMemo(() => process.cwd(), []);
  const splashTip = useMemo(() => pickSplashTip(), []);

  // --- API key setup ---
  const [apiKeyReady, setApiKeyReady] = useState(() => !!resolveApiKey());
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);

  const handleApiKey = useCallback((key: string) => {
    if (!isValidAnthropicKey(key)) {
      setApiKeyError('Invalid key format. Expect sk-ant-… or sk-proj-…');
      return;
    }
    try {
      initAnthropicClient(key);
      const cfg = loadConfig() ?? defaultConfig(pickDefaultModel('sonnet'));
      cfg.llm.apiKey = key;
      saveConfig(cfg);
      setApiKeyReady(true);
      setApiKeyError(null);
    } catch (err) {
      setApiKeyError(err instanceof Error ? err.message : String(err));
    }
  }, []);

  // Restore persisted API key from config on mount.
  // Reject malformed keys so a poisoned config (chat text saved as apiKey) does
  // not silently boot the agent loop with garbage credentials.
  useEffect(() => {
    if (apiKeyReady) return;
    const cfg = loadConfig();
    if (cfg?.llm.apiKey && isValidAnthropicKey(cfg.llm.apiKey)) {
      initAnthropicClient(cfg.llm.apiKey);
      setApiKeyReady(true);
    } else if (cfg?.llm.apiKey) {
      cfg.llm.apiKey = '';
      saveConfig(cfg);
    }
  }, [apiKeyReady]);

  // --- Trust ---
  const trustStore = useMemo(() => new TrustStore(TRUST_PATH), []);
  const [trustOpen, setTrustOpen] = useState(() => !trustBypass && !trustStore.isTrusted(cwd));
  const [trustSel, setTrustSel] = useState(0);

  // --- Setup phase machine (qmd → api-key → trust → ready) ---
  type SetupPhase = 'qmd' | 'api-key' | 'trust' | 'ready';
  const [setupPhase, setSetupPhase] = useState<SetupPhase>('qmd');
  const [qmdSub, setQmdSub] = useState<QmdSubPhase>('checking');
  const [qmdPromptSel, setQmdPromptSel] = useState(0);
  const [installProgress, setInstallProgress] = useState({ step: 0, total: 5, message: '' });
  const [installError, setInstallError] = useState<string | null>(null);
  const [embedRows, setEmbedRows] = useState<EmbedRow[]>(() =>
    COLLECTIONS.map((c) => ({
      collection: c.name,
      status: 'pending' as const,
      done: 0,
      total: 0,
      currentItem: '',
    })),
  );
  const overallEmbedPct = useMemo(() => {
    const total = embedRows.length;
    if (total === 0) return 0;
    const sum = embedRows.reduce((acc, r) => {
      if (r.status === 'done') return acc + 100;
      if (r.total > 0) return acc + Math.round((r.done / r.total) * 100);
      return acc;
    }, 0);
    return Math.round(sum / total);
  }, [embedRows]);

  const finishQmdPhase = useCallback(() => {
    setSetupPhase((prev) => (prev === 'qmd' ? 'api-key' : prev));
  }, []);

  const runQmdBootstrapAndEmbed = useCallback(
    async (qmdBin: string) => {
      try {
        bootstrapCollections(qmdBin);
      } catch {
        finishQmdPhase();
        return;
      }
      // Embed each collection sequentially. Empty collections are skipped —
      // they stay 'pending' until the /learn worker seeds them. We do not stall
      // setup on something that has no source files yet.
      for (const col of COLLECTIONS) {
        try {
          await runEmbed(col.name, { qmdBin });
        } catch {
          // runEmbed already emits embed:error which our subscriber records.
        }
      }
      finishQmdPhase();
    },
    [finishQmdPhase],
  );

  // Step 1: qmd check on mount. If qmd is present we register collections and
  // try to embed any seeded collections; if not, we ask the user before
  // shelling out to npm.
  useEffect(() => {
    if (setupPhase !== 'qmd' || qmdSub !== 'checking') return;
    const info = detectQmd();
    if (info) {
      void runQmdBootstrapAndEmbed(info.binPath);
    } else {
      setQmdSub('install-prompt');
    }
  }, [setupPhase, qmdSub, runQmdBootstrapAndEmbed]);

  // Subscribe to qmd events for live progress UI.
  useEffect(() => {
    const onInstall = (e: InstallProgressEvent) =>
      setInstallProgress({ step: e.step, total: e.total, message: e.message });
    const onProgress = (e: EmbedProgressEvent) =>
      setEmbedRows((rows) =>
        rows.map((r) =>
          r.collection === e.collection
            ? { ...r, status: 'running', done: e.done, total: e.total, currentItem: e.currentItem }
            : r,
        ),
      );
    const onCollectionDone = (e: EmbedDoneEvent) =>
      setEmbedRows((rows) =>
        rows.map((r) =>
          r.collection === e.collection
            ? { ...r, status: 'done', done: r.total || r.done, currentItem: '' }
            : r,
        ),
      );
    const onCollectionErr = (e: EmbedErrorEvent) =>
      setEmbedRows((rows) =>
        rows.map((r) =>
          r.collection === e.collection ? { ...r, status: 'error', error: e.message } : r,
        ),
      );
    learnBus.on('install:progress', onInstall);
    learnBus.on('embed:progress', onProgress);
    learnBus.on('embed:done', onCollectionDone);
    learnBus.on('embed:error', onCollectionErr);
    return () => {
      learnBus.off('install:progress', onInstall);
      learnBus.off('embed:progress', onProgress);
      learnBus.off('embed:done', onCollectionDone);
      learnBus.off('embed:error', onCollectionErr);
    };
  }, []);

  // Step 2/3 transitions: api-key done → trust check (or ready if pre-trusted),
  // then trust granted → ready.
  useEffect(() => {
    if (setupPhase === 'api-key' && apiKeyReady) {
      setSetupPhase(trustOpen ? 'trust' : 'ready');
    } else if (setupPhase === 'trust' && !trustOpen) {
      setSetupPhase('ready');
    }
  }, [setupPhase, apiKeyReady, trustOpen]);

  // --- First-run wizard (only via --first-run flag now; key/trust are owned by setup) ---
  const [wizardOpen, setWizardOpen] = useState(() => forceFirstRun);
  const [wizardStep, setWizardStep] = useState<'model' | 'permission'>('model');
  const [wizardModelSel, setWizardModelSel] = useState(0);
  const [wizardPermSel, setWizardPermSel] = useState(0);

  // --- Overlays ---
  const [helpOpen, setHelpOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteSel, setPaletteSel] = useState(0);
  const [paletteQuery, setPaletteQuery] = useState('');
  const paletteLabels = useMemo(() => getAllPaletteLabels(), []);
  const paletteMatches = useMemo(
    () => fuzzyFilter(paletteLabels, paletteQuery),
    [paletteLabels, paletteQuery],
  );

  // --- provider picker ---
  const [providerOpen, setProviderOpen] = useState(false);
  const [providerSel, setProviderSel] = useState(0);

  // --- model picker ---
  const [modelOpen, setModelOpen] = useState(false);
  const [modelSel, setModelSel] = useState(0);
  const [modelChoices, setModelChoices] = useState<ModelChoice[]>([]);
  const [modelLoading, setModelLoading] = useState(false);

  // --- ask_user modal ---
  const [askPayload, setAskPayload] = useState<AskUserPayload | null>(null);
  const [askSel, setAskSel] = useState(0);
  const askResolveRef = useRef<((result: AskUserResult) => void) | null>(null);

  // --- permission prompt ---
  const [permRequest, setPermRequest] = useState<{
    toolName: string;
    args: Record<string, unknown>;
  } | null>(null);
  const [permSel, setPermSel] = useState(0);
  const permResolveRef = useRef<((allow: boolean) => void) | null>(null);
  const permStore = useMemo(() => new PermissionStore(PERMISSIONS_PATH), []);

  // --- Permission mode / UI ---
  const [mode, setMode] = useState<PermissionMode>('ask');
  const [sideView, setSideView] = useState<SideView>('persona');
  const [treeOpen, setTreeOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(
    'type a message to start · Ctrl+P for commands',
  );
  const [blocks, setBlocks] = useState<ChatBlock[]>([]);
  const isSplash = blocks.length === 0;

  const inputRef = useRef<TextareaRenderable | null>(null);
  const loopRef = useRef<AgentLoop | null>(null);
  const conversationHistoryRef = useRef<MessageParam[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // Live side-panel state (replaces static fixture).
  const [currentModelId, setCurrentModelId] = useState<string | null>(
    () => loadConfig()?.llm.model ?? null,
  );
  const [tokens, setTokens] = useState<{ used: number; estimatedCostUsd: number }>({
    used: 0,
    estimatedCostUsd: 0,
  });
  const [currentOrg, setCurrentOrg] = useState<OrgSummary | null>(null);

  const refreshOrg = useCallback(async () => {
    try {
      const orgs = await listOrgs();
      const defaultOrg = orgs.find((o) => o.isDefault) ?? orgs[0];
      if (defaultOrg) {
        setCurrentOrg({
          alias: defaultOrg.alias ?? defaultOrg.username,
          status: defaultOrg.connectedStatus === 'active' ? 'connected' : 'disconnected',
        });
      }
    } catch {}
  }, []);

  // --- ask_user bridge ---
  const askUser = useCallback((payload: AskUserPayload): Promise<AskUserResult> => {
    return new Promise((resolve) => {
      setAskPayload(payload);
      setAskSel(0);
      askResolveRef.current = resolve;
    });
  }, []);

  // --- permission prompt bridge ---
  // Checks yolo mode and persisted allowlist first; both resolve without a prompt.
  const promptPermission = useCallback(
    (toolName: string, args: Record<string, unknown>): Promise<boolean> => {
      if (modeRef.current === 'yolo') return Promise.resolve(true);
      const key = permissionKey(toolName, args);
      if (permStore.isAllowed(cwd, key)) return Promise.resolve(true);
      return new Promise((resolve) => {
        setPermRequest({ toolName, args });
        setPermSel(0);
        permResolveRef.current = resolve;
      });
    },
    [cwd, permStore],
  );

  // Latest permission mode in a ref so AgentLoop sees up-to-date value across renders.
  const modeRef = useRef<PermissionMode>('ask');

  // --- Create AgentLoop when API key is ready or permission mode changes ---
  useEffect(() => {
    if (!apiKeyReady) return;

    modeRef.current = mode;
    const cfgForLoop = loadConfig();
    const loop = new AgentLoop({
      systemPrompt: SYSTEM_PROMPT,
      tools: ALL_TOOLS,
      model: cfgForLoop?.llm.model ?? pickDefaultModel('sonnet'),
      maxToolRoundsPerTurn: cfgForLoop?.agent?.maxToolRoundsPerTurn,
      permissionMode: mode,
      cwd,
      onPermissionPrompt: promptPermission,
      ctx: {
        org: null,
        session: { id: crypto.randomUUID(), projectRoot: cwd },
        askUser,
        emit: () => {},
      },
    });

    loop.on('turn:thinking', () => {
      // Multi-round turns can fire turn:thinking many times. Avoid stacking
      // thinking blocks — if the last block is already thinking, leave it.
      setBlocks((bs) => {
        const last = bs[bs.length - 1];
        if (last?.kind === 'thinking') return bs;
        return [...bs, { id: crypto.randomUUID(), kind: 'thinking', elapsedS: 0 }];
      });
    });

    // Note: turn:stream fires once on the first text delta, but the SDK does
    // not emit progressive deltas afterwards — full text only arrives at
    // turn:done. Replacing thinking→assistant here would leave a blank gap
    // with no animation. Keep the thinking equalizer animated until turn:done
    // hands us the final text.
    loop.on('turn:stream', () => {});

    loop.on('turn:done', (finalText) => {
      setIsRunning(false);
      if (finalText) {
        conversationHistoryRef.current.push({ role: 'assistant', content: finalText });
      }
      const t = loop.tokenTracker.get();
      setTokens({
        used: t.inputTokens + t.outputTokens + t.cacheCreationTokens + t.cacheReadTokens,
        estimatedCostUsd: loop.tokenTracker.estimatedCostUsd(),
      });
      setBlocks((bs) => {
        const last = bs[bs.length - 1];
        if (last?.kind === 'assistant' || last?.kind === 'thinking') {
          if (!finalText) return bs.slice(0, -1);
          return [...bs.slice(0, -1), { id: last.id, kind: 'assistant' as const, text: finalText }];
        }
        if (finalText) {
          return [...bs, { id: crypto.randomUUID(), kind: 'assistant', text: finalText }];
        }
        return bs;
      });
    });

    loop.on('tool:pending', (callId, toolName, input) => {
      const summary = friendlyToolSummary(toolName, input);
      // Drop any trailing thinking residue — the model has committed to a tool
      // call, so the "thinking…" indicator has served its purpose.
      setBlocks((bs) => {
        const trimmed = bs[bs.length - 1]?.kind === 'thinking' ? bs.slice(0, -1) : bs;
        return [
          ...trimmed,
          { id: callId, kind: 'tool', name: toolName, status: 'running', summary },
        ];
      });
    });

    loop.on('tool:done', (callId, toolName, result) => {
      const summary = shortDoneSummary(toolName, result);
      setBlocks((bs) =>
        bs.map((b) =>
          b.id === callId && b.kind === 'tool' ? { ...b, status: 'done' as const, summary } : b,
        ),
      );
    });

    loop.on('tool:error', (callId, toolName, err) => {
      // Keep the user-facing summary terse; stash full error in `detail` so
      // power users can still expand it (Ctrl+click). Blobs of zod-validation
      // JSON shouldn't leak into the chat list.
      const firstLine = err.split('\n')[0]?.trim() ?? err;
      const summary = `${toolName} failed`;
      const detail = err.length > firstLine.length ? err : undefined;
      setBlocks((bs) =>
        bs.map((b) =>
          b.id === callId && b.kind === 'tool'
            ? {
                ...b,
                status: 'error' as const,
                summary,
                detail: detail ?? firstLine,
              }
            : b,
        ),
      );
    });

    loopRef.current = loop;
    return () => {
      loopRef.current = null;
    };
  }, [apiKeyReady, cwd, askUser, mode, promptPermission, currentModelId]);

  // --- learnBus ---
  useEffect(() => {
    const onDone = () => setToast('knowledge embed complete');
    const onPersonaSpawn = (e: { name: string }) => {
      setBlocks((bs) => [...bs, { id: crypto.randomUUID(), kind: 'divider', persona: e.name }]);
    };
    learnBus.on('embed:done', onDone);
    learnBus.on('subagent:spawn', onPersonaSpawn);
    return () => {
      learnBus.off('embed:done', onDone);
      learnBus.off('subagent:spawn', onPersonaSpawn);
    };
  }, []);

  // --- Submit ---
  const handleSubmit = useCallback(() => {
    const text = inputRef.current?.plainText?.trim() ?? '';
    if (!text) return;
    inputRef.current?.setText('');

    // API key setup mode — first input is treated as the key.
    // Strict prefix match (sk-ant- or sk-proj-) avoids accidentally swallowing
    // a regular chat message before setup.
    if (!apiKeyReady) {
      if (text.startsWith('sk-ant-') || text.startsWith('sk-proj-')) {
        handleApiKey(text);
      } else {
        setToast('paste your Anthropic API key (starts with sk-ant- or sk-proj-) and press Enter');
      }
      return;
    }

    if (isRunning) return;
    setBlocks((bs) => [...bs, { id: crypto.randomUUID(), kind: 'user', text }]);
    setIsRunning(true);

    const userMsg: MessageParam = { role: 'user', content: text };
    conversationHistoryRef.current.push(userMsg);
    const messagesForRun = [...conversationHistoryRef.current];

    loopRef.current?.run(messagesForRun).catch((err: unknown) => {
      setIsRunning(false);
      setToast(`error: ${err instanceof Error ? err.message : String(err)}`);
    });
  }, [isRunning, apiKeyReady, handleApiKey]);

  // --- ask_user confirm/cancel ---
  const confirmAsk = useCallback(() => {
    if (!askPayload) return;
    const selected = askPayload.options[askSel]?.label ?? '';
    askResolveRef.current?.({ selected, notes: null, cancelled: false });
    askResolveRef.current = null;
    setAskPayload(null);
  }, [askPayload, askSel]);

  const cancelAsk = useCallback(() => {
    if (!askPayload) return;
    askResolveRef.current?.({ selected: '', notes: null, cancelled: true });
    askResolveRef.current = null;
    setAskPayload(null);
  }, [askPayload]);

  // --- permission prompt confirm/deny ---
  const confirmPerm = useCallback(() => {
    if (!permRequest) return;
    const decision: PermissionDecision = PERMISSION_DECISIONS[permSel] ?? 'deny';
    const key = permissionKey(permRequest.toolName, permRequest.args);
    let allow = false;
    switch (decision) {
      case 'allow_project':
        permStore.allow(cwd, key);
        allow = true;
        break;
      case 'allow_once':
        allow = true;
        break;
      case 'auto_mode':
        modeRef.current = 'yolo'; // sync so promptPermission sees it before re-render
        setMode('yolo');
        setToast('permission mode: YOLO · auto-approve all non-destructive ops');
        allow = true;
        break;
      case 'deny':
        allow = false;
        break;
    }
    permResolveRef.current?.(allow);
    permResolveRef.current = null;
    setPermRequest(null);
  }, [permRequest, permSel, permStore, cwd]);

  const denyPerm = useCallback(() => {
    if (!permRequest) return;
    permResolveRef.current?.(false);
    permResolveRef.current = null;
    setPermRequest(null);
  }, [permRequest]);

  // --- provider picker confirm/cancel ---
  const confirmProvider = useCallback(() => {
    const p = PROVIDERS[providerSel];
    setProviderOpen(false);
    if (!p) return;
    if (p.status !== 'available') {
      setToast(`${p.name}: coming in v2`);
      return;
    }
    // Reset key so ApiKeySetup overlay surfaces
    const cfg = loadConfig() ?? defaultConfig(pickDefaultModel('sonnet'));
    cfg.llm.apiKey = '';
    cfg.llm.provider = 'anthropic';
    saveConfig(cfg);
    resetAnthropicClient();
    setApiKeyError(null);
    setApiKeyReady(false);
    setToast(`Provider: ${p.name}. Paste API key below and press Enter.`);
  }, [providerSel]);

  const cancelProvider = useCallback(() => {
    setProviderOpen(false);
  }, []);

  // --- model picker open/confirm/cancel ---
  const openModelPicker = useCallback(() => {
    setModelOpen(true);
    setModelLoading(true);
    setModelSel(0);
    listAvailableModels()
      .then((list) => {
        setModelChoices(list);
        const idx = list.findIndex((m) => m.id === currentModelId);
        setModelSel(idx >= 0 ? idx : 0);
        setModelLoading(false);
      })
      .catch(() => {
        // listAvailableModels already returns the static catalog on failure,
        // so this catch covers truly unexpected errors.
        setModelChoices(
          ANTHROPIC_MODELS.map((m) => ({
            id: m.id,
            displayName: m.displayName,
            recommended: m.recommended,
          })),
        );
        setModelLoading(false);
      });
  }, [currentModelId]);

  const confirmModel = useCallback(() => {
    const pick = modelChoices[modelSel];
    setModelOpen(false);
    if (!pick) return;
    const cfg = loadConfig() ?? defaultConfig(pick.id);
    cfg.llm.model = pick.id;
    saveConfig(cfg);
    setCurrentModelId(pick.id);
    setToast(`model: ${pick.displayName}`);
  }, [modelChoices, modelSel]);

  const cancelModel = useCallback(() => {
    setModelOpen(false);
  }, []);

  // Setup-mode keys: qmd install prompt + retry-after-failure.
  useKeyboard((key) => {
    if (setupPhase !== 'qmd') return;
    if (qmdSub === 'install-prompt') {
      if (key.name === 'up') {
        setQmdPromptSel((s) => Math.max(0, s - 1));
        key.preventDefault();
      } else if (key.name === 'down') {
        setQmdPromptSel((s) => Math.min(1, s + 1));
        key.preventDefault();
      } else if (key.name === 'return') {
        if (qmdPromptSel === 0) {
          setQmdSub('installing');
          setInstallError(null);
          installQmd()
            .then(async () => {
              const info = detectQmd();
              if (info) await runQmdBootstrapAndEmbed(info.binPath);
              else finishQmdPhase();
            })
            .catch((err: unknown) => {
              setInstallError(err instanceof Error ? err.message : String(err));
              setQmdSub('failed');
            });
        } else {
          finishQmdPhase();
        }
        key.preventDefault();
      } else if (key.name === 'escape') {
        finishQmdPhase();
        key.preventDefault();
      }
    } else if (qmdSub === 'failed') {
      if (key.name === 'return' || key.name === 'escape') {
        finishQmdPhase();
        key.preventDefault();
      }
    } else if (qmdSub === 'checking' || qmdSub === 'installing') {
      // Allow Esc to bail out of a long-running embed.
      if (key.name === 'escape') {
        finishQmdPhase();
        key.preventDefault();
      }
    }
  });

  // Provider picker keys (only active when overlay open)
  useKeyboard((key) => {
    if (!providerOpen) return;
    if (key.name === 'up') {
      setProviderSel((s) => Math.max(0, s - 1));
      key.preventDefault();
    } else if (key.name === 'down') {
      setProviderSel((s) => Math.min(PROVIDERS.length - 1, s + 1));
      key.preventDefault();
    } else if (key.name === 'return') {
      confirmProvider();
      key.preventDefault();
    } else if (key.name === 'escape') {
      cancelProvider();
      key.preventDefault();
    }
  });

  // Model picker keys (only active when overlay open)
  useKeyboard((key) => {
    if (!modelOpen) return;
    const max = Math.max(0, modelChoices.length - 1);
    if (key.name === 'up') {
      setModelSel((s) => Math.max(0, s - 1));
      key.preventDefault();
    } else if (key.name === 'down') {
      setModelSel((s) => Math.min(max, s + 1));
      key.preventDefault();
    } else if (key.name === 'return') {
      confirmModel();
      key.preventDefault();
    } else if (key.name === 'escape') {
      cancelModel();
      key.preventDefault();
    }
  });

  const cyclePermissionMode = useCallback(() => {
    setMode((m) => {
      const i = PERMISSION_MODES.indexOf(m);
      const next = PERMISSION_MODES[(i + 1) % PERMISSION_MODES.length] ?? 'ask';
      setToast(
        next === 'yolo'
          ? 'permission mode: YOLO'
          : next === 'auto-edit'
            ? 'permission mode: AUTO'
            : 'permission mode: ASK',
      );
      return next;
    });
  }, []);

  // --- Palette select ---
  const handlePaletteSelect = useCallback(
    async (label: string) => {
      setPaletteOpen(false);
      setPaletteQuery('');
      setPaletteSel(0);
      inputRef.current?.setText('');

      // Static toggles
      if (label === 'Yolo Mode') {
        setMode('yolo');
        setToast('permission mode: YOLO · auto-approve all non-destructive ops');
        return;
      }
      if (
        label === 'Thinking Mode' ||
        label === 'Init Project' ||
        label === 'Background Color' ||
        label === 'Reduced Motion'
      ) {
        setToast(`${label}: not yet implemented`);
        return;
      }

      // Slash commands
      const cmd = COMMAND_REGISTRY.find((c) => c.name === label || c.aliases?.includes(label));
      if (!cmd) {
        setToast(`unknown command: ${label}`);
        return;
      }

      if (cmd.handler === 'quit') {
        renderer.destroy();
        process.nextTick(() => process.exit(0));
        return;
      }
      if (cmd.handler === 'help') {
        setHelpOpen(true);
        return;
      }
      if (cmd.handler === 'permissions') {
        cyclePermissionMode();
        return;
      }
      if (cmd.handler === 'provider') {
        setProviderOpen(true);
        setProviderSel(0);
        return;
      }
      if (cmd.handler === 'model') {
        openModelPicker();
        return;
      }
      if (cmd.handler === 'sessions' || cmd.handler === 'knowledge') {
        setToast(`${label}: not yet wired in TUI`);
        return;
      }

      // Commands that need ToolContext (askUser)
      const ctx = {
        org: null,
        session: { id: crypto.randomUUID(), projectRoot: cwd },
        askUser,
        emit: () => {},
      };

      setBlocks((bs) => [...bs, { id: crypto.randomUUID(), kind: 'user', text: label }]);
      try {
        if (cmd.handler === 'orgs') {
          const result = await orgsCommand(ctx);
          if (result.orgs.length > 0) void refreshOrg();
          const lines = result.orgs.length
            ? `Authenticated orgs (${result.orgs.length}):\n${result.orgs.map((o) => `  ${o.alias ?? '(no alias)'} — ${o.username}${o.isDefault ? ' [default]' : ''}${o.isDefaultDevHub ? ' [devhub]' : ''}`).join('\n')}`
            : result.kicked
              ? 'Login finished. Run /orgs again to refresh the list.'
              : 'No orgs authenticated. Run /login to add one.';
          setBlocks((bs) => [...bs, { id: crypto.randomUUID(), kind: 'assistant', text: lines }]);
        } else if (cmd.handler === 'login') {
          const result = await loginCommand(ctx);
          if (result.kicked) void refreshOrg();
          setBlocks((bs) => [
            ...bs,
            {
              id: crypto.randomUUID(),
              kind: 'assistant',
              text: result.kicked ? 'Login completed.' : 'Login skipped.',
            },
          ]);
        } else if (cmd.handler === 'learn') {
          setBlocks((bs) => [
            ...bs,
            {
              id: crypto.randomUUID(),
              kind: 'assistant',
              text: 'Learn worker is not running in this build (TODO: start scheduler in launch path).',
            },
          ]);
        } else {
          setToast(`${label}: handler '${cmd.handler}' not wired`);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        setBlocks((bs) => [
          ...bs,
          { id: crypto.randomUUID(), kind: 'assistant', text: `Error: ${msg}` },
        ]);
      }
    },
    [renderer, askUser, cwd, cyclePermissionMode, openModelPicker, refreshOrg],
  );

  // --- First-run wizard handlers ---
  const finishWizard = useCallback(() => {
    const cfg =
      loadConfig() ??
      defaultConfig(MODEL_CHOICES[wizardModelSel]?.id ?? pickDefaultModel('sonnet'));
    cfg.llm.model = MODEL_CHOICES[wizardModelSel]?.id ?? cfg.llm.model;
    if (!cfg.llm.model) cfg.llm.model = pickDefaultModel('sonnet');
    cfg.permissionMode = PERMISSION_CHOICES[wizardPermSel]?.id ?? cfg.permissionMode;
    saveConfig(cfg);
    setMode(cfg.permissionMode);
    setCurrentModelId(cfg.llm.model);
    setWizardOpen(false);
    setToast(`first-run setup saved · model: ${cfg.llm.model} · mode: ${cfg.permissionMode}`);
  }, [wizardModelSel, wizardPermSel]);

  // --- Overlay precedence ---
  // 'apikey' is rendered separately (always blocks input via overlay !== null fallthrough);
  // useGlobalKeys only sees the overlays it actually handles.
  // Trust > wizard > ask_user > perm > palette > help.
  // While in setup we want global keybindings disabled, except during the
  // 'trust' phase which already has a dedicated overlay handler.
  const inSetup = setupPhase !== 'ready';
  const overlay:
    | 'trust'
    | 'palette'
    | 'help'
    | 'modal'
    | 'perm'
    | 'wizard'
    | 'provider'
    | 'model'
    | 'setup'
    | null =
    setupPhase === 'trust'
      ? 'trust'
      : inSetup
        ? 'setup'
        : trustOpen
          ? 'trust'
          : apiKeyReady && wizardOpen
            ? 'wizard'
            : askPayload
              ? 'modal'
              : permRequest
                ? 'perm'
                : providerOpen
                  ? 'provider'
                  : modelOpen
                    ? 'model'
                    : paletteOpen
                      ? 'palette'
                      : helpOpen
                        ? 'help'
                        : null;
  // Allow typing when API key is missing (so user can paste it). Otherwise disable while overlays/running.
  const inputDisabled = (apiKeyReady && overlay !== null) || isRunning;

  useGlobalKeys(
    overlay,
    {
      onUp: () => setTrustSel((s) => Math.max(0, s - 1)),
      onDown: () => setTrustSel((s) => Math.min(1, s + 1)),
      onConfirm: (sel) => {
        if (sel === 0) {
          trustStore.trust(cwd);
          setTrustOpen(false);
          setToast('workspace trusted');
        } else {
          renderer.destroy();
          process.nextTick(() => process.exit(0));
        }
      },
      onEscape: () => {
        renderer.destroy();
        process.nextTick(() => process.exit(0));
      },
      onSelectIndex: (i) => setTrustSel(i),
      trustSel,
    },
    {
      onClose: () => {
        setPaletteOpen(false);
        setPaletteQuery('');
        setPaletteSel(0);
      },
      onUp: () => setPaletteSel((s) => Math.max(0, s - 1)),
      onDown: (matchCount) => setPaletteSel((s) => Math.max(0, Math.min(matchCount - 1, s + 1))),
      onConfirm: (pick) => {
        if (pick?.label) {
          void handlePaletteSelect(pick.label);
        }
      },
      onBackspace: () => {
        setPaletteQuery((q) => q.slice(0, -1));
        setPaletteSel(0);
      },
      onChar: (ch) => {
        setPaletteQuery((q) => q + ch);
        setPaletteSel(0);
      },
      paletteSel,
      paletteMatches: paletteMatches.map((m) => ({ id: m.item, label: m.item, desc: '' })),
    },
    { onClose: () => setHelpOpen(false) },
    {
      onUp: () => setAskSel((s) => Math.max(0, s - 1)),
      onDown: () => setAskSel((s) => Math.min((askPayload?.options.length ?? 1) - 1, s + 1)),
      onConfirm: () => confirmAsk(),
      onClose: () => cancelAsk(),
    },
    {
      onUp: () => setPermSel((s) => Math.max(0, s - 1)),
      onDown: () => setPermSel((s) => Math.min(PERMISSION_DECISIONS.length - 1, s + 1)),
      onConfirm: () => confirmPerm(),
      onClose: () => denyPerm(),
    },
    {
      onUp: () => {
        if (wizardStep === 'model') setWizardModelSel((s) => Math.max(0, s - 1));
        else setWizardPermSel((s) => Math.max(0, s - 1));
      },
      onDown: () => {
        if (wizardStep === 'model')
          setWizardModelSel((s) => Math.min(MODEL_CHOICES.length - 1, s + 1));
        else setWizardPermSel((s) => Math.min(PERMISSION_CHOICES.length - 1, s + 1));
      },
      onConfirm: () => {
        if (wizardStep === 'model') setWizardStep('permission');
        else finishWizard();
      },
      onClose: () => setWizardOpen(false),
    },
    {
      onToggleHelp: () => setHelpOpen(true),
      onQuit: (r) => {
        r.destroy();
        process.nextTick(() => process.exit(0));
      },
      onToggleTree: () => setTreeOpen((v) => !v),
      onShowTrust: () => {
        setTrustOpen(true);
        setTrustSel(0);
      },
      onOpenPalette: () => {
        setPaletteOpen(true);
        setPaletteSel(0);
      },
      onToggleEmbed: () => {},
      onToggleThinking: () => {},
      onToggleDeploy: () => {},
      onCyclePermMode: cyclePermissionMode,
      onCycleSidePrev: () =>
        setSideView(
          (v) =>
            SIDE_VIEWS[(SIDE_VIEWS.indexOf(v) - 1 + SIDE_VIEWS.length) % SIDE_VIEWS.length] ??
            'persona',
        ),
      onCycleSideNext: () =>
        setSideView(
          (v) => SIDE_VIEWS[(SIDE_VIEWS.indexOf(v) + 1) % SIDE_VIEWS.length] ?? 'persona',
        ),
      onToggleDemo: () => {},
      onToggleToast: () => {},
      onOpenModal: () => {},
      inputRef,
      renderer,
    },
  );

  // ── First-run setup tree (no splash, no sidebar, no main input) ──────────
  if (inSetup) {
    return (
      <box style={{ flexDirection: 'column', width, height }}>
        {setupPhase === 'qmd' ? (
          <SetupChrome width={width} height={height} step={1} totalSteps={4} title="knowledge base">
            <QmdScreen
              sub={qmdSub}
              installStep={installProgress.step}
              installTotal={installProgress.total}
              installMessage={installProgress.message}
              installError={installError}
              promptSelected={qmdPromptSel}
            />
          </SetupChrome>
        ) : null}

        {setupPhase === 'qmd' && qmdSub === 'checking' ? (
          // Render embed screen alongside qmd checking — once detect succeeds
          // and bootstrap kicks off, the embed rows update live below.
          <box style={{ position: 'absolute', bottom: 1, left: 0, width, alignItems: 'center' }}>
            <EmbedScreen rows={embedRows} overallPct={overallEmbedPct} />
          </box>
        ) : null}

        {setupPhase === 'api-key' ? (
          <SetupChrome
            width={width}
            height={height}
            step={2}
            totalSteps={4}
            title="Anthropic API key"
          >
            <box style={{ flexDirection: 'column', alignItems: 'center' }}>
              <ApiKeySetup error={apiKeyError} />
              <box style={{ marginTop: 1, width: 68, flexDirection: 'column' }}>
                <box
                  style={{
                    border: true,
                    borderColor: '#4fc3f7',
                    paddingLeft: 1,
                    paddingRight: 1,
                    flexDirection: 'row',
                  }}
                >
                  <text content="❯ " style={{ fg: '#4fc3f7' }} />
                  <textarea
                    ref={inputRef}
                    focused={!isRunning}
                    keyBindings={[{ name: 'return', action: 'submit' }]}
                    onSubmit={handleSubmit}
                    placeholder="paste sk-ant-… or sk-proj-…"
                    placeholderColor="#555"
                    style={{ flexGrow: 1, minHeight: 1 }}
                  />
                </box>
              </box>
            </box>
          </SetupChrome>
        ) : null}

        {setupPhase === 'trust' ? (
          <SetupChrome
            width={width}
            height={height}
            step={3}
            totalSteps={4}
            title="trust workspace"
          >
            <TrustWorkspacePrompt cwd={cwd} selected={trustSel} />
          </SetupChrome>
        ) : null}
      </box>
    );
  }

  return (
    <box style={{ flexDirection: 'column', width, height }}>
      <LiveStatusBar />
      {isSplash ? (
        <box style={{ flexDirection: 'row', flexGrow: 1 }}>
          <SplashView tip={splashTip} />
          <SidePanel
            view={sideView}
            org={currentOrg}
            model={modelSummaryFromId(currentModelId)}
            tokens={tokens.used > 0 ? tokens : null}
          />
        </box>
      ) : (
        <box style={{ flexDirection: 'row', flexGrow: 1 }}>
          {treeOpen ? <DirTree projectRoot={cwd} org={currentOrg} /> : null}
          <ChatPanel blocks={blocks} onToggleTool={() => {}} />
          <SidePanel
            view={sideView}
            org={currentOrg}
            model={modelSummaryFromId(currentModelId)}
            tokens={tokens.used > 0 ? tokens : null}
          />
        </box>
      )}
      {toast ? <ToastBar msg={toast} /> : null}
      <InputLine inputRef={inputRef} focused={!inputDisabled} onSubmit={handleSubmit} />

      {/* API key setup — shown before anything else if key is missing */}
      {!apiKeyReady ? (
        <box
          style={{
            position: 'absolute',
            top: Math.floor(height / 4),
            left: Math.floor((width - 64) / 2),
          }}
        >
          <ApiKeySetup error={apiKeyError} />
        </box>
      ) : null}

      {/* First-run wizard (after API key set, before chat) */}
      {apiKeyReady && wizardOpen && !trustOpen ? (
        <box
          style={{
            position: 'absolute',
            top: Math.floor(height / 5),
            left: Math.floor((width - 70) / 2),
          }}
        >
          <FirstRunWizard
            step={wizardStep}
            selectedModel={wizardModelSel}
            selectedPerm={wizardPermSel}
          />
        </box>
      ) : null}

      {/* Trust prompt */}
      {apiKeyReady && trustOpen ? (
        <box
          style={{
            position: 'absolute',
            top: Math.floor(height / 5),
            left: Math.floor((width - 72) / 2),
          }}
        >
          <TrustWorkspacePrompt cwd={cwd} selected={trustSel} />
        </box>
      ) : null}

      {/* ask_user modal */}
      {askPayload ? (
        <box
          style={{
            position: 'absolute',
            top: Math.floor(height / 3),
            left: Math.floor((width - 60) / 2),
          }}
        >
          <AskUserModal payload={askPayload} selected={askSel} />
        </box>
      ) : null}

      {/* Permission prompt */}
      {permRequest ? (
        <box
          style={{
            position: 'absolute',
            top: Math.floor(height / 3),
            left: Math.floor((width - 68) / 2),
          }}
        >
          <PermissionPrompt
            toolName={permRequest.toolName}
            args={permRequest.args}
            selected={permSel}
          />
        </box>
      ) : null}

      {/* Provider picker */}
      {providerOpen ? (
        <box
          style={{
            position: 'absolute',
            top: Math.floor(height / 4),
            left: Math.floor((width - 68) / 2),
          }}
        >
          <ProviderPicker selected={providerSel} />
        </box>
      ) : null}

      {/* Model picker */}
      {modelOpen ? (
        <box
          style={{
            position: 'absolute',
            top: Math.floor(height / 4),
            left: Math.floor((width - 68) / 2),
          }}
        >
          <ModelPicker
            models={modelChoices}
            selected={modelSel}
            loading={modelLoading}
            currentId={currentModelId}
          />
        </box>
      ) : null}

      {/* Command palette */}
      {paletteOpen ? (
        <box
          style={{
            position: 'absolute',
            top: Math.floor(height / 5),
            left: Math.floor((width - 68) / 2),
          }}
        >
          <CommandPalette
            visible={true}
            query={paletteQuery}
            selectedIndex={paletteSel}
            matches={paletteMatches}
          />
        </box>
      ) : null}

      {/* Help overlay */}
      {helpOpen ? (
        <box
          style={{
            position: 'absolute',
            top: Math.floor(height / 4),
            left: Math.floor((width - 54) / 2),
          }}
        >
          <HelpOverlay />
        </box>
      ) : null}
    </box>
  );
}
