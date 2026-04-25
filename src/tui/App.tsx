import { homedir } from 'os';
import { join } from 'path';
import type { TextareaRenderable } from '@opentui/core';
import { useTerminalDimensions } from '@opentui/react';
/** @jsxImportSource @opentui/react */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { AgentLoop } from '~/agent/loop';
import { loadConfig } from '~/config/load';
import { defaultConfig } from '~/config/load';
import { saveConfig } from '~/config/save';
import { TrustStore } from '~/config/trust';
import { learnBus } from '~/learn/bus';
import { initAnthropicClient, resolveApiKey } from '~/llm/client';
import type { AskUserPayload, AskUserResult } from '~/tools/types';

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
import { PermissionPrompt } from '~/tui/overlays/PermissionPrompt';
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
const SIDE_VIEWS: SideView[] = ['persona', 'tests', 'soql', 'knowledge', 'deploy'];

const SYSTEM_PROMPT = `You are sfwiz, a Salesforce development assistant.
You help with Apex, LWC, SOQL, metadata, deployments, and org administration.
Be concise and precise. Use tools to read files before editing them.
Always confirm destructive operations (deploys, permset assignments) with ask_user.`;

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

  // --- First-run wizard ---
  const [wizardOpen, setWizardOpen] = useState(() => {
    if (forceFirstRun) return true;
    return loadConfig() === null;
  });
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
  const [isRunning, setIsRunning] = useState(false);

  // --- ask_user bridge ---
  const askUser = useCallback((payload: AskUserPayload): Promise<AskUserResult> => {
    return new Promise((resolve) => {
      setAskPayload(payload);
      setAskSel(0);
      askResolveRef.current = resolve;
    });
  }, []);

  // --- permission prompt bridge ---
  const promptPermission = useCallback(
    (toolName: string, args: Record<string, unknown>): Promise<boolean> =>
      new Promise((resolve) => {
        setPermRequest({ toolName, args });
        setPermSel(0);
        permResolveRef.current = resolve;
      }),
    [],
  );

  // Latest permission mode in a ref so AgentLoop sees up-to-date value across renders.
  const modeRef = useRef<PermissionMode>('ask');

  // --- Create AgentLoop when API key is ready or permission mode changes ---
  useEffect(() => {
    if (!apiKeyReady) return;

    modeRef.current = mode;
    const loop = new AgentLoop({
      systemPrompt: SYSTEM_PROMPT,
      tools: ALL_TOOLS,
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
      setBlocks((bs) => [...bs, { id: crypto.randomUUID(), kind: 'thinking', elapsedS: 0 }]);
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
      const summary = typeof result === 'string' ? result.slice(0, 80).replace(/\n/g, ' ') : 'done';
      setBlocks((bs) =>
        bs.map((b) =>
          b.id === callId && b.kind === 'tool' ? { ...b, status: 'done' as const, summary } : b,
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
    return () => {
      loopRef.current = null;
    };
  }, [apiKeyReady, cwd, askUser, mode, promptPermission]);

  // --- learnBus ---
  useEffect(() => {
    const onDone = () => setToast('knowledge embed complete');
    const onPersonaSpawn = (e: { name: string }) => {
      setBlocks((bs) => [
        ...bs,
        { id: crypto.randomUUID(), kind: 'divider', persona: e.name },
      ]);
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

    loopRef.current?.run([{ role: 'user', content: text }]).catch((err: unknown) => {
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
    permResolveRef.current?.(permSel === 0);
    permResolveRef.current = null;
    setPermRequest(null);
  }, [permRequest, permSel]);

  const denyPerm = useCallback(() => {
    if (!permRequest) return;
    permResolveRef.current?.(false);
    permResolveRef.current = null;
    setPermRequest(null);
  }, [permRequest]);

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
      if (cmd.handler === 'sessions' || cmd.handler === 'model' || cmd.handler === 'knowledge') {
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
          const lines = result.orgs.length
            ? `Authenticated orgs (${result.orgs.length}):\n${result.orgs.map((o) => `  ${o.alias ?? '(no alias)'} — ${o.username}${o.isDefault ? ' [default]' : ''}${o.isDefaultDevHub ? ' [devhub]' : ''}`).join('\n')}`
            : result.kicked
              ? 'Login finished. Run /orgs again to refresh the list.'
              : 'No orgs authenticated. Run /login to add one.';
          setBlocks((bs) => [...bs, { id: crypto.randomUUID(), kind: 'assistant', text: lines }]);
        } else if (cmd.handler === 'login') {
          const result = await loginCommand(ctx);
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
    [renderer, askUser, cwd, cyclePermissionMode],
  );

  // --- First-run wizard handlers ---
  const finishWizard = useCallback(() => {
    const cfg =
      loadConfig() ?? defaultConfig(MODEL_CHOICES[wizardModelSel]?.id ?? 'claude-sonnet-4-6');
    cfg.llm.model = MODEL_CHOICES[wizardModelSel]?.id ?? cfg.llm.model;
    cfg.permissionMode = PERMISSION_CHOICES[wizardPermSel]?.id ?? cfg.permissionMode;
    saveConfig(cfg);
    setMode(cfg.permissionMode);
    setWizardOpen(false);
    setToast(`first-run setup saved · model: ${cfg.llm.model} · mode: ${cfg.permissionMode}`);
  }, [wizardModelSel, wizardPermSel]);

  // --- Overlay precedence ---
  // 'apikey' is rendered separately (always blocks input via overlay !== null fallthrough);
  // useGlobalKeys only sees the overlays it actually handles.
  // Trust > wizard > ask_user > perm > palette > help.
  const overlay: 'trust' | 'palette' | 'help' | 'modal' | 'perm' | 'wizard' | null = trustOpen
    ? 'trust'
    : apiKeyReady && wizardOpen
      ? 'wizard'
      : askPayload
        ? 'modal'
        : permRequest
          ? 'perm'
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
      onDown: () => setPermSel((s) => Math.min(1, s + 1)),
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
