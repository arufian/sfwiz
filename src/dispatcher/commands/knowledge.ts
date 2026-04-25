import type { ToolContext } from '~/tools/types';
import { detectQmd, requireQmd } from '~/knowledge/detect';
import { bootstrapCollections, listRegisteredCollections } from '~/knowledge/collections';
import { installQmd } from '~/knowledge/qmd-install';
import { runEmbed } from '~/knowledge/embed';

export type KnowledgeSubcommand = 'status' | 'install' | 'embed' | 'update';

export interface KnowledgeCommandResult {
  ok: boolean;
  message: string;
}

export async function knowledgeCommand(
  sub: KnowledgeSubcommand,
  ctx: ToolContext,
): Promise<KnowledgeCommandResult> {
  switch (sub) {
    case 'status': {
      const info = detectQmd();
      const cols = listRegisteredCollections();
      return {
        ok: true,
        message: info
          ? `qmd ${info.version} — ${cols.length} collection(s): ${cols.join(', ') || 'none'}`
          : 'qmd not found. Run /knowledge install to set it up.',
      };
    }

    case 'install': {
      const existing = detectQmd();
      if (existing) return { ok: true, message: `qmd ${existing.version} already installed.` };

      const answer = await ctx.askUser({
        question: 'Install @tobilu/qmd globally via npm?',
        header: 'Knowledge',
        options: [
          { label: 'Yes', description: 'Install now (npm install -g @tobilu/qmd)' },
          { label: 'No', description: 'Skip' },
        ],
        multiSelect: false,
      });
      if (answer.selected !== 'Yes') return { ok: false, message: 'Install cancelled.' };

      await installQmd();
      const info = requireQmd();
      bootstrapCollections(info.binPath);
      return { ok: true, message: `qmd ${info.version} installed.` };
    }

    case 'embed': {
      const info = requireQmd();
      bootstrapCollections(info.binPath);
      await runEmbed('apex-ref', { qmdBin: info.binPath });
      return { ok: true, message: 'apex-ref embed complete.' };
    }

    case 'update': {
      const info = requireQmd();
      await runEmbed('apex-ref', { qmdBin: info.binPath, force: true });
      return { ok: true, message: 'Knowledge updated.' };
    }
  }
}
