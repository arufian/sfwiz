/** @jsxImportSource @opentui/react */
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import type { TextareaRenderable } from '@opentui/core';
import { useTerminalDimensions } from '@opentui/react';
import { join } from 'path';
import { homedir } from 'os';

import { AgentLoop } from '~/agent/loop';
import { TrustStore } from '~/config/trust';
import { loadConfig } from '~/config/load';
import { saveConfig } from '~/config/save';
import { defaultConfig } from '~/config/load';
import { initAnthropicClient, resolveApiKey } from '~/llm/client';
import { learnBus } from '~/learn/bus';
import type { AskUserPayload, AskUserResult } from '~/tools/types';

// Real TUI components
import { CommandPalette } from '~/tui/overlays/CommandPalette';
import { AskUserModal } from '~/tui/overlays/AskUserModal';
import { ApiKeySetup } from '~/tui/overlays/ApiKeySetup';
import { StatusBar as LiveStatusBar } from '~/tui/layout/StatusBar';
import { DirTree } from '~/tui/layout/DirTree';

// PoC UI components (kept for rendering fidelity)
import { ChatPanel, pickSplashTip, SplashView } from '~/ui/panels/ChatPanel';
import { InputLine } from '~/ui/panels/InputLine';
import { ToastBar } from '~/ui/panels/ToastBar';
import { HelpOverlay } from '~/ui/overlays/HelpOverlay';
import { TrustWorkspacePrompt } from '~/ui/overlays/TrustWorkspacePrompt';
import { SidePanel } from '~/ui/panels/SidePanel';
import { useGlobalKeys } from '~/ui/hooks/useGlobalKeys';
import type { ChatBlock, PermissionMode, SideView } from '~/types/ui';
import { PERMISSION_MODES } from '~/types/ui';

// Tools
import { askUserTool } from '~/tools/interaction/ask_user';
import { readFileTool } from '~/tools/fs/read_file';
import { listFilesTool } from '~/tools/fs/list_files';
import { editFileTool } from '~/tools/fs/edit_file';
import { writeFileTool } from '~/tools/fs/write_file';
import { grepTool } from '~/tools/fs/grep';
import { runCommandTool } from '~/tools/shell/run_command';
import { sfDeployStart } from '~/tools/sf-cli/sf_deploy_start';
import { sfApexRunAnonymous } from '~/tools/sf-cli/sf_apex_run_anonymous';
import { sfAssignPermset } from '~/tools/sf-cli/sf_assign_permset';
import { sfRetrieve } from '~/tools/sf-cli/sf_retrieve';
import { sfRunTests } from '~/tools/sf-cli/sf_run_tests';
import { sfScratchCreate } from '~/tools/sf-cli/sf_scratch_create';
import { sfQuery } from '~/tools/jsforce/sf_query';
import { sfSobjectDescribe } from '~/tools/jsforce/sf_sobject_describe';

const TRUST_PATH = join(homedir(), '.sfwiz', 'trusted-workspaces.json');
const SIDE_VIEWS: SideView[] = ['persona', 'tests', 'soql', 'knowledge', 'deploy'];

const SYSTEM_PROMPT = `You are sfwiz, a Salesforce development assistant.
You help with Apex, LWC, SOQL, metadata, deployments, and org administration.
Be concise and precise. Use tools to read files before editing them.
Always confirm destructive operations (deploys, permset assignments) with ask_user.`;

const ALL_TOOLS = [
  askUserTool,
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
  forceFirstRun: _forceFirstRun = false,
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
    try {
      initAnthropicClient(key);
      // Persist to config
      const cfg = loadConfig() ?? defaultConfig('claude-sonnet-4-6');
      cfg.llm.apiKey = key;
      saveConfig(cfg);
      setApiKeyReady(true);
      setApiKeyError(null);
    } catch (err) {
      setApiKeyError(err instanceof Error ? err.message : String(err));
    }
  }, []);

  // Restore persisted API key from config on mount
  useEffect(() => {
    if (apiKeyReady) return;
    const cfg = loadConfig();
    if (cfg?.llm.apiKey) {
      initAnthropicClient(cfg.llm.apiKey);
      setApiKeyReady(true);
    }
  }, [apiKeyReady]);

  // --- Trust ---
  const trustStore = useMemo(() => new TrustStore(TRUST_PATH), []);
  const [trustOpen, setTrustOpen] = useState(() => !trustBypass && !trustStore.isTrusted(cwd));
  const [trustSel, setTrustSel] = useState(0);

  // --- Overlays ---
  const [helpOpen, setHelpOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteSel, setPaletteSel] = useState(0);

  // --- ask_user modal ---
  const [askPayload, setAskPayload] = useState<AskUserPayload | null>(null);
  const [askSel, setAskSel] = useState(0);
  const askResolveRef = useRef<((result: AskUserResult) => void) | null>(null);

  // --- Permission mode / UI ---
  const [mode, setMode] = useState<PermissionMode>('ask');
  const [sideView, setSideView] = useState<SideView>('persona');
  const [treeOpen, setTreeOpen] = useState(false);
  const [toast, setToast] = useState<string | null>('type a message to start · Ctrl+P for commands');
  const [blocks, setBlocks] = useState<ChatBlock[]>([]);
  const isSplash = blocks.length === 0;

  const inputRef = useRef<TextareaRenderable | null>(null);
  const loopRef = useRef<AgentLoop | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  // --- ask_user bridge ---
  const askUser = useCallback((payload: AskUserPayload): Promise<AskUserResult> => {
    return new Promise((resolve) => {
      setAskPayload(payload);
      setAskSel(0);
      askResolveRef.current = resolve;
    });
  }, []);

  // --- Create AgentLoop when API key is ready ---
  useEffect(() => {
    if (!apiKeyReady) return;

    const loop = new AgentLoop({
      systemPrompt: SYSTEM_PROMPT,
      tools: ALL_TOOLS,
      ctx: {
        org: null,
        session: { id: crypto.randomUUID(), projectRoot: cwd },
        askUser,
        emit: () => {},
      },
    });

    loop.on('turn:thinking', () => {
      setBlocks((bs) => [
        ...bs,
        { id: crypto.randomUUID(), kind: 'thinking', elapsedS: 0 },
      ]);
    });

    loop.on('turn:stream', () => {
      setBlocks((bs) => {
        const last = bs[bs.length - 1];
        if (last?.kind === 'thinking') {
          return [...bs.slice(0, -1), { id: last.id, kind: 'assistant' as const, text: '' }];
        }
        return bs;
      });
    });

    loop.on('turn:done', (finalText) => {
      setIsRunning(false);
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

    loop.on('tool:pending', (callId, toolName) => {
      setBlocks((bs) => [
        ...bs,
        { id: callId, kind: 'tool', name: toolName, status: 'running', summary: `${toolName}…` },
      ]);
    });

    loop.on('tool:done', (callId, _toolName, result) => {
      const summary = typeof result === 'string'
        ? result.slice(0, 80).replace(/\n/g, ' ')
        : 'done';
      setBlocks((bs) =>
        bs.map((b) =>
          b.id === callId && b.kind === 'tool'
            ? { ...b, status: 'done' as const, summary }
            : b,
        ),
      );
    });

    loop.on('tool:error', (callId, toolName, err) => {
      setBlocks((bs) =>
        bs.map((b) =>
          b.id === callId && b.kind === 'tool'
            ? { ...b, status: 'error' as const, summary: `${toolName}: ${err}` }
            : b,
        ),
      );
    });

    loopRef.current = loop;
    return () => { loopRef.current = null; };
  }, [apiKeyReady, cwd, askUser]);

  // --- learnBus ---
  useEffect(() => {
    const onDone = () => setToast('knowledge embed complete');
    learnBus.on('embed:done', onDone);
    return () => { learnBus.off('embed:done', onDone); };
  }, []);

  // --- Submit ---
  const handleSubmit = useCallback(() => {
    const text = inputRef.current?.plainText?.trim() ?? '';
    if (!text) return;
    inputRef.current?.setText('');

    // API key setup mode — first input is treated as the key
    if (!apiKeyReady) {
      if (text.startsWith('sk-ant-') || text.startsWith('sk-proj-') || text.length > 20) {
        handleApiKey(text);
      } else {
        setToast('paste your Anthropic API key (starts with sk-ant-) and press Enter');
      }
      return;
    }

    if (isRunning) return;
    setBlocks((bs) => [...bs, { id: crypto.randomUUID(), kind: 'user', text }]);
    setIsRunning(true);

    loopRef.current?.run([{ role: 'user', content: text }]).catch((err: unknown) => {
      setIsRunning(false);
      setToast(`error: ${err instanceof Error ? err.message : String(err)}`);
    });
  }, [isRunning, apiKeyReady, handleApiKey]);

  // --- ask_user confirm/cancel ---
  const confirmAsk = useCallback(() => {
    if (!askPayload) return;
    const selected = askPayload.options[askSel]?.label ?? '';
    askResolveRef.current?.({ selected, notes: null });
    askResolveRef.current = null;
    setAskPayload(null);
  }, [askPayload, askSel]);

  const cancelAsk = useCallback(() => {
    if (!askPayload) return;
    askResolveRef.current?.({ selected: askPayload.options[0]?.label ?? 'Cancel', notes: null });
    askResolveRef.current = null;
    setAskPayload(null);
  }, [askPayload]);

  // --- Palette select ---
  const handlePaletteSelect = useCallback((label: string) => {
    setPaletteOpen(false);
    if (label === '/quit' || label === '/exit') {
      renderer.destroy();
      process.nextTick(() => process.exit(0));
    } else if (label === 'Yolo Mode') {
      setMode('yolo');
      setToast('permission mode: YOLO · auto-approve all non-destructive ops');
    } else if (label === '/help') {
      setHelpOpen(true);
    } else {
      setBlocks((bs) => [...bs, { id: crypto.randomUUID(), kind: 'user', text: label }]);
    }
  }, [renderer]);

  // --- Overlay precedence ---
  const overlay = !apiKeyReady ? 'apikey'
    : trustOpen ? 'trust'
    : askPayload ? 'modal'
    : paletteOpen ? 'palette'
    : helpOpen ? 'help'
    : null;

  const cyclePermissionMode = useCallback(() => {
    setMode((m) => {
      const i = PERMISSION_MODES.indexOf(m);
      const next = PERMISSION_MODES[(i + 1) % PERMISSION_MODES.length] ?? 'ask';
      setToast(
        next === 'yolo' ? 'permission mode: YOLO'
        : next === 'auto-edit' ? 'permission mode: AUTO'
        : 'permission mode: ASK',
      );
      return next;
    });
  }, []);

  useGlobalKeys(
    overlay as 'trust' | 'palette' | 'help' | 'modal' | null,
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
      onEscape: () => { renderer.destroy(); process.nextTick(() => process.exit(0)); },
      onSelectIndex: (i) => setTrustSel(i),
      trustSel,
    },
    {
      onClose: () => setPaletteOpen(false),
      onUp: () => setPaletteSel((s) => Math.max(0, s - 1)),
      onDown: (matchCount) => setPaletteSel((s) => Math.max(0, Math.min(Math.min(matchCount, 9) - 1, s + 1))),
      onConfirm: () => {},
      onBackspace: () => {},
      onChar: () => {},
      paletteSel,
      paletteMatches: [],
    },
    { onClose: () => setHelpOpen(false) },
    {
      onUp: () => setAskSel((s) => Math.max(0, s - 1)),
      onDown: () => setAskSel((s) => Math.min((askPayload?.options.length ?? 1) - 1, s + 1)),
      onClose: () => cancelAsk(),
    },
    {
      onToggleHelp: () => setHelpOpen(true),
      onQuit: (r) => { r.destroy(); process.nextTick(() => process.exit(0)); },
      onToggleTree: () => setTreeOpen((v) => !v),
      onShowTrust: () => { setTrustOpen(true); setTrustSel(0); },
      onOpenPalette: () => { setPaletteOpen(true); setPaletteSel(0); },
      onToggleEmbed: () => {},
      onToggleThinking: () => {},
      onToggleDeploy: () => {},
      onCyclePermMode: cyclePermissionMode,
      onCycleSidePrev: () => setSideView((v) => SIDE_VIEWS[(SIDE_VIEWS.indexOf(v) - 1 + SIDE_VIEWS.length) % SIDE_VIEWS.length] ?? 'persona'),
      onCycleSideNext: () => setSideView((v) => SIDE_VIEWS[(SIDE_VIEWS.indexOf(v) + 1) % SIDE_VIEWS.length] ?? 'persona'),
      onToggleDemo: () => {},
      onToggleToast: () => {},
      onOpenModal: () => {},
      inputRef,
      renderer,
    },
  );


  return (
    <box style={{ flexDirection: 'column', width, height }}>
      <LiveStatusBar />
      {isSplash ? (
        <box style={{ flexDirection: 'row', flexGrow: 1 }}>
          <SplashView tip={splashTip} />
          <SidePanel view={sideView} />
        </box>
      ) : (
        <box style={{ flexDirection: 'row', flexGrow: 1 }}>
          {treeOpen ? <DirTree projectRoot={cwd} org={null} /> : null}
          <ChatPanel blocks={blocks} onToggleTool={() => {}} />
          <SidePanel view={sideView} />
        </box>
      )}
      {toast ? <ToastBar msg={toast} /> : null}
      <InputLine
        inputRef={inputRef}
        focused={!overlay && !isRunning}
        onSubmit={handleSubmit}
      />

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
            onSelect={handlePaletteSelect}
            onClose={() => setPaletteOpen(false)}
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
