import type { TextareaRenderable } from '@opentui/core';
import { useTerminalDimensions } from '@opentui/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { EMBED_ITEMS } from '~/fixtures/embed';
import { INITIAL_CHAT } from '~/fixtures/chat';
import { PALETTE_ENTRIES, fuzzyMatch } from '~/fixtures/palette';
import { PERMISSION_MODES, type ChatBlock, type PermissionMode, type SideView } from '~/types/ui';
import { AskUserModal } from '~/ui/overlays/AskUserModal';
import { CommandPalette } from '~/ui/overlays/CommandPalette';
import { HelpOverlay } from '~/ui/overlays/HelpOverlay';
import { TrustWorkspacePrompt } from '~/ui/overlays/TrustWorkspacePrompt';
import { ChatPanel, SplashView, pickSplashTip } from '~/ui/panels/ChatPanel';
import { EmbedProgressBar } from '~/ui/panels/EmbedProgressBar';
import { InputLine } from '~/ui/panels/InputLine';
import { SidePanel } from '~/ui/panels/SidePanel';
import { StatusBar } from '~/ui/panels/StatusBar';
import { ToastBar } from '~/ui/panels/ToastBar';
import { TreePanel } from '~/ui/panels/TreePanel';
import { useGlobalKeys } from '~/ui/hooks/useGlobalKeys';
const SIDE_VIEWS: SideView[] = ['persona', 'tests', 'soql', 'knowledge', 'deploy'];

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
  const [treeOpen, setTreeOpen] = useState(false);
  const [sideView, setSideView] = useState<SideView>('persona');
  const [blocks, setBlocks] = useState<ChatBlock[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSel, setModalSel] = useState(0);
  const [helpOpen, setHelpOpen] = useState(false);
  const [trustOpen, setTrustOpen] = useState(!trustBypass);
  const [trustSel, setTrustSel] = useState(0);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteFilter, setPaletteFilter] = useState('');
  const [paletteSel, setPaletteSel] = useState(0);
  const [mode, setMode] = useState<PermissionMode>('ask');
  const [embedProgress, setEmbedProgress] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(
    'trust workspace to continue · Enter to confirm',
  );
  const inputRef = useRef<TextareaRenderable | null>(null);
  const splashTip = useMemo(() => pickSplashTip(), []);
  const isSplash = blocks.length === 0;
  const cwd = useMemo(() => process.cwd(), []);

  const paletteMatches = useMemo(
    () => PALETTE_ENTRIES.filter((e) => fuzzyMatch(e, paletteFilter)),
    [paletteFilter],
  );

  // Embed-progress animation: tick 0 → 100 over ~10 s.
  useEffect(() => {
    if (embedProgress === null) return;
    if (embedProgress >= 100) {
      const done = setTimeout(() => {
        setEmbedProgress(null);
        setToast('knowledge embed complete · 243 chunks indexed');
      }, 1500);
      return () => clearTimeout(done);
    }
    const id = setTimeout(() => {
      setEmbedProgress((p) => (p === null ? null : Math.min(100, p + 3)));
    }, 260);
    return () => clearTimeout(id);
  }, [embedProgress]);

  const embedCurrent = (() => {
    if (embedProgress === null) return null;
    const total = EMBED_ITEMS.length * 25;
    const done = Math.floor((embedProgress / 100) * total);
    const item = EMBED_ITEMS[done % EMBED_ITEMS.length] ?? EMBED_ITEMS[0]!;
    return { collection: 'apex-ref', item, done, total };
  })();

  const handleSubmit = () => {
    const t = inputRef.current?.plainText ?? '';
    if (t.trim().length === 0) {
      if (isSplash) setToast('type something first · splash stays until you ask');
      return;
    }
    setBlocks((bs) => [...bs, { id: crypto.randomUUID(), kind: 'user', text: t.trim() }]);
    inputRef.current?.setText('');
  };

  const cyclePermissionMode = () => {
    setMode((m) => {
      const i = PERMISSION_MODES.indexOf(m);
      const next = PERMISSION_MODES[(i + 1) % PERMISSION_MODES.length] ?? 'ask';
      setToast(
        next === 'yolo'
          ? 'permission mode: YOLO · auto-approve all non-destructive ops'
          : next === 'auto-edit'
            ? 'permission mode: AUTO · auto-approve edits inside cwd'
            : 'permission mode: ASK · prompt per file-op',
      );
      return next;
    });
  };

  const toggleThinking = () => {
    setBlocks((bs) => {
      const last = bs[bs.length - 1];
      if (last && last.kind === 'thinking') return bs.slice(0, -1);
      return [
        ...bs,
        { id: crypto.randomUUID(), kind: 'thinking', elapsedS: Math.floor(Math.random() * 4) + 1 },
      ];
    });
  };

  // Task 2: toggle tool block expanded state by id (not array index)
  const handleToggleTool = (id: string) => {
    setBlocks((bs) =>
      bs.map((b) => (b.id === id && b.kind === 'tool' ? { ...b, expanded: !b.expanded } : b)),
    );
  };

  // Determine which overlay is active (priority: trust > palette > help > modal)
  const overlay = trustOpen
    ? 'trust'
    : paletteOpen
      ? 'palette'
      : helpOpen
        ? 'help'
        : modalOpen
          ? 'modal'
          : null;

  useGlobalKeys(
    overlay,
    // trust handlers
    {
      onUp: () => setTrustSel((s) => Math.max(0, s - 1)),
      onDown: () => setTrustSel((s) => Math.min(1, s + 1)),
      onConfirm: (sel) => {
        if (sel === 0) {
          setTrustOpen(false);
          setToast('workspace trusted · added to ~/.sfwiz/trusted-workspaces.json');
        } else {
          setToast('would exit · demo stays running (Ctrl+Q to really quit)');
        }
      },
      onEscape: () => setToast('would exit · demo stays running'),
      onSelectIndex: (i) => setTrustSel(i),
      trustSel,
    },
    // palette handlers
    {
      onClose: () => setPaletteOpen(false),
      onUp: () => setPaletteSel((s) => Math.max(0, s - 1)),
      // Task 3a: clamp uses Math.max(0, ...) to avoid -1 when matchCount is 0
      onDown: (matchCount) =>
        setPaletteSel((s) => Math.max(0, Math.min(Math.min(matchCount, 9) - 1, s + 1))),
      onConfirm: (pick) => {
        if (!pick) return;
        if (pick.id === 'yolo') {
          setMode('yolo');
          setToast('permission mode: YOLO · auto-approve all non-destructive ops');
        } else if (pick.id === 'permissions') {
          cyclePermissionMode();
        } else if (pick.id === 'quit') {
          setToast('would quit · Ctrl+Q to really quit');
        } else {
          setToast(`would run: ${pick.label}`);
        }
      },
      onBackspace: () => {
        setPaletteFilter((f) => f.slice(0, -1));
        setPaletteSel(0);
      },
      onChar: (ch) => {
        setPaletteFilter((f) => f + ch);
        setPaletteSel(0);
      },
      paletteSel,
      paletteMatches,
    },
    // help handlers
    {
      onClose: () => setHelpOpen(false),
    },
    // modal handlers
    {
      onUp: () => setModalSel((s) => Math.max(0, s - 1)),
      onDown: () => setModalSel((s) => Math.min(3, s + 1)),
      onClose: () => setModalOpen(false),
    },
    // global handlers
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
        setPaletteFilter('');
        setPaletteSel(0);
      },
      onToggleEmbed: () => setEmbedProgress((p) => (p === null ? 0 : null)),
      onToggleThinking: toggleThinking,
      onToggleDeploy: () => {
        setBlocks((bs) => {
          const last = bs[bs.length - 1];
          // Task 2: find the running deploy block by kind+name+status (stable)
          if (
            last &&
            last.kind === 'tool' &&
            last.name === 'sf_deploy_start' &&
            last.status === 'running'
          ) {
            const doneBlock: ChatBlock = {
              id: last.id,
              kind: 'tool',
              name: 'sf_deploy_start',
              status: 'done',
              elapsedMs: 6_800,
              summary: 'deployed 4 components · acme-scratch · 6.8s',
            };
            return [...bs.slice(0, -1), doneBlock];
          }
          const runningBlock: ChatBlock = {
            id: crypto.randomUUID(),
            kind: 'tool',
            name: 'sf_deploy_start',
            status: 'running',
            summary: 'deploying to acme-scratch… 4 components',
          };
          return [...bs, runningBlock];
        });
      },
      onCyclePermMode: cyclePermissionMode,
      onCycleSidePrev: () => {
        setSideView((v) => {
          const i = SIDE_VIEWS.indexOf(v);
          return SIDE_VIEWS[(i - 1 + SIDE_VIEWS.length) % SIDE_VIEWS.length] ?? 'persona';
        });
      },
      onCycleSideNext: () => {
        setSideView((v) => {
          const i = SIDE_VIEWS.indexOf(v);
          return SIDE_VIEWS[(i + 1) % SIDE_VIEWS.length] ?? 'persona';
        });
      },
      onToggleDemo: () => {
        setBlocks((bs) => {
          const next = bs.length === 0 ? INITIAL_CHAT : [];
          setToast(next.length === 0 ? 'cleared chat' : `loaded demo · ${next.length} blocks`);
          return next;
        });
      },
      onToggleToast: () =>
        setToast((v) =>
          v ? null : 'deployed 2 components to acme-scratch · 3.4s · 14 tests pass',
        ),
      onOpenModal: () => {
        setModalOpen(true);
        setModalSel(0);
      },
      inputRef,
      renderer,
    },
  );

  return (
    <box style={{ flexDirection: 'column', width, height }}>
      <StatusBar mode={mode} />
      {embedCurrent ? (
        <EmbedProgressBar
          progress={embedProgress ?? 0}
          collection={embedCurrent.collection}
          item={embedCurrent.item}
          done={embedCurrent.done}
          total={embedCurrent.total}
        />
      ) : null}
      {isSplash ? (
        <box style={{ flexDirection: 'row', flexGrow: 1 }}>
          <SplashView tip={splashTip} />
          <SidePanel view={sideView} />
        </box>
      ) : (
        <box style={{ flexDirection: 'row', flexGrow: 1 }}>
          {treeOpen ? <TreePanel /> : null}
          <ChatPanel blocks={blocks} onToggleTool={handleToggleTool} />
          <SidePanel view={sideView} />
        </box>
      )}
      {toast ? <ToastBar msg={toast} /> : null}
      <InputLine
        inputRef={inputRef}
        focused={!modalOpen && !helpOpen && !trustOpen && !paletteOpen}
        onSubmit={handleSubmit}
      />
      {modalOpen ? (
        <box
          style={{
            position: 'absolute',
            top: Math.floor(height / 3),
            left: Math.floor((width - 62) / 2),
          }}
        >
          <AskUserModal selected={modalSel} />
        </box>
      ) : null}
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
      {paletteOpen ? (
        <box
          style={{
            position: 'absolute',
            top: Math.floor(height / 5),
            left: Math.floor((width - 68) / 2),
          }}
        >
          <CommandPalette
            filter={paletteFilter}
            selected={paletteSel}
            entries={paletteMatches}
          />
        </box>
      ) : null}
      {trustOpen ? (
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
    </box>
  );
}
