import type { TextareaRenderable } from '@opentui/core';
import { useKeyboard } from '@opentui/react';
import type React from 'react';
import type { PaletteEntry } from '~/types/ui';

// ─── Types ────────────────────────────────────────────────────────────────────

// Key type as provided by opentui's useKeyboard callback
interface Key {
  name: string;
  sequence: string;
  ctrl: boolean;
  meta: boolean;
  shift: boolean;
  preventDefault: () => void;
}

export type OverlayName =
  | 'trust'
  | 'palette'
  | 'help'
  | 'modal'
  | 'perm'
  | 'wizard'
  | 'provider'
  | 'model'
  | 'setup'
  | null;

export interface TrustHandlers {
  onUp: () => void;
  onDown: () => void;
  onConfirm: (sel: number) => void;
  onEscape: () => void;
  onSelectIndex: (i: number) => void;
  trustSel: number;
}

export interface PaletteHandlers {
  onClose: () => void;
  onUp: () => void;
  onDown: (matchCount: number) => void;
  onConfirm: (pick: PaletteEntry | undefined) => void;
  onBackspace: () => void;
  onChar: (ch: string) => void;
  paletteSel: number;
  paletteMatches: PaletteEntry[];
}

export interface HelpHandlers {
  onClose: () => void;
}

export interface ModalHandlers {
  onUp: () => void;
  onDown: () => void;
  onConfirm: () => void;
  onClose: () => void;
}

export interface PermHandlers {
  onUp: () => void;
  onDown: () => void;
  onConfirm: () => void;
  onClose: () => void;
}

export interface WizardHandlers {
  onUp: () => void;
  onDown: () => void;
  onConfirm: () => void;
  onClose: () => void;
}

export interface GlobalHandlers {
  onToggleHelp: () => void;
  onQuit: (renderer: { destroy: () => void }) => void;
  onToggleTree: () => void;
  onShowTrust: () => void;
  onOpenPalette: () => void;
  onToggleEmbed: () => void;
  onToggleThinking: () => void;
  onToggleDeploy: () => void;
  onCyclePermMode: () => void;
  onCycleSidePrev: () => void;
  onCycleSideNext: () => void;
  onToggleDemo: () => void;
  onToggleToast: () => void;
  onOpenModal: () => void;
  inputRef: React.RefObject<TextareaRenderable | null>;
  renderer: { destroy: () => void };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useGlobalKeys(
  overlay: OverlayName,
  trust: TrustHandlers,
  palette: PaletteHandlers,
  help: HelpHandlers,
  modal: ModalHandlers,
  perm: PermHandlers,
  wizard: WizardHandlers,
  global: GlobalHandlers,
): void {
  useKeyboard((key: Key) => {
    // ── Trust overlay ──────────────────────────────────────────────────────
    if (overlay === 'trust') {
      if (key.name === 'up') {
        trust.onUp();
        key.preventDefault();
      } else if (key.name === 'down') {
        trust.onDown();
        key.preventDefault();
      } else if (key.name === 'return') {
        trust.onConfirm(trust.trustSel);
        key.preventDefault();
      } else if (key.name === 'escape') {
        trust.onEscape();
        key.preventDefault();
      } else if (key.sequence === '1') {
        trust.onSelectIndex(0);
        key.preventDefault();
      } else if (key.sequence === '2') {
        trust.onSelectIndex(1);
        key.preventDefault();
      }
      return;
    }

    // ── Palette overlay ────────────────────────────────────────────────────
    if (overlay === 'palette') {
      if (key.name === 'escape' || (key.ctrl && key.name === 'p')) {
        palette.onClose();
        key.preventDefault();
      } else if (key.name === 'up') {
        palette.onUp();
        key.preventDefault();
      } else if (key.name === 'down') {
        // Task 3a: fixed clamp — was missing Math.max(0, ...) guard
        palette.onDown(palette.paletteMatches.length);
        key.preventDefault();
      } else if (key.name === 'return') {
        palette.onConfirm(palette.paletteMatches[palette.paletteSel]);
        palette.onClose();
        key.preventDefault();
      } else if (key.name === 'backspace') {
        palette.onBackspace();
        key.preventDefault();
      } else if (key.sequence && key.sequence.length === 1 && !key.ctrl && !key.meta) {
        const code = key.sequence.charCodeAt(0);
        if (code >= 32 && code < 127) {
          palette.onChar(key.sequence);
          key.preventDefault();
        }
      }
      return;
    }

    // ── Provider / model picker overlays ──────────────────────────────────
    // Keys handled by a standalone useKeyboard in App.tsx; just block globals.
    if (overlay === 'provider' || overlay === 'model') {
      return;
    }

    // ── First-run setup (qmd / api-key) ────────────────────────────────────
    // Keys handled by App.tsx (standalone useKeyboard + textarea). Block all
    // global shortcuts so Ctrl+P etc. cannot fire during setup.
    if (overlay === 'setup') {
      return;
    }

    // ── Help overlay ───────────────────────────────────────────────────────
    if (overlay === 'help') {
      if (key.name === 'escape' || (key.ctrl && key.name === 'h') || key.name === 'f1') {
        help.onClose();
        key.preventDefault();
      }
      return;
    }

    // ── Modal overlay ──────────────────────────────────────────────────────
    if (overlay === 'modal') {
      if (key.name === 'up') {
        modal.onUp();
        key.preventDefault();
      } else if (key.name === 'down') {
        modal.onDown();
        key.preventDefault();
      } else if (key.name === 'return') {
        modal.onConfirm();
        key.preventDefault();
      } else if (key.name === 'escape' || (key.ctrl && key.name === 'k')) {
        modal.onClose();
        key.preventDefault();
      }
      return;
    }

    // ── First-run wizard overlay ───────────────────────────────────────────
    if (overlay === 'wizard') {
      if (key.name === 'up') {
        wizard.onUp();
        key.preventDefault();
      } else if (key.name === 'down') {
        wizard.onDown();
        key.preventDefault();
      } else if (key.name === 'return') {
        wizard.onConfirm();
        key.preventDefault();
      } else if (key.name === 'escape') {
        wizard.onClose();
        key.preventDefault();
      }
      return;
    }

    // ── Permission prompt overlay ──────────────────────────────────────────
    if (overlay === 'perm') {
      if (key.name === 'up') {
        perm.onUp();
        key.preventDefault();
      } else if (key.name === 'down') {
        perm.onDown();
        key.preventDefault();
      } else if (key.name === 'return') {
        perm.onConfirm();
        key.preventDefault();
      } else if (key.name === 'escape') {
        perm.onClose();
        key.preventDefault();
      }
      return;
    }

    // ── Global shortcuts ───────────────────────────────────────────────────
    if ((key.ctrl && key.name === 'h') || key.name === 'f1') {
      global.onToggleHelp();
      key.preventDefault();
      return;
    }
    if (key.ctrl && key.name === 'q') {
      key.preventDefault();
      global.renderer.destroy();
      process.nextTick(() => process.exit(0));
      return;
    }
    if (key.ctrl && key.name === 'b') {
      global.onToggleTree();
      key.preventDefault();
      return;
    }
    if (key.ctrl && key.name === 'w') {
      global.onShowTrust();
      key.preventDefault();
      return;
    }
    if (key.ctrl && key.name === 'p') {
      global.onOpenPalette();
      key.preventDefault();
      return;
    }
    // Bare "/" at start of empty input → open palette
    if (key.sequence === '/' && !key.ctrl && !key.meta && !key.shift) {
      const cur = global.inputRef.current?.plainText ?? '';
      if (cur.length === 0) {
        global.onOpenPalette();
        key.preventDefault();
        return;
      }
    }
    if (key.ctrl && key.name === 'g') {
      global.onToggleEmbed();
      key.preventDefault();
      return;
    }
    if (key.ctrl && key.name === 'y') {
      global.onToggleThinking();
      key.preventDefault();
      return;
    }
    if (key.ctrl && key.name === 'r') {
      global.onToggleDeploy();
      key.preventDefault();
      return;
    }
    if (key.shift && key.name === 'tab') {
      global.onCyclePermMode();
      key.preventDefault();
      return;
    }
    if (key.meta && key.name === '[') {
      global.onCycleSidePrev();
      key.preventDefault();
      return;
    }
    if (key.meta && key.name === ']') {
      global.onCycleSideNext();
      key.preventDefault();
      return;
    }
    if (key.ctrl && key.name === 'd') {
      global.onToggleDemo();
      key.preventDefault();
      return;
    }
    if (key.ctrl && key.name === 't') {
      global.onToggleToast();
      key.preventDefault();
      return;
    }
    if (key.ctrl && key.name === 'k') {
      global.onOpenModal();
      key.preventDefault();
      return;
    }
  });
}
