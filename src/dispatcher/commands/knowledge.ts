import type { ToolContext } from '~/tools/types';
import { detectQmd, requireQmd } from '~/knowledge/detect';
import { bootstrapCollections, listRegisteredCollections, collectionHasContent } from '~/knowledge/collections';
import { installQmd } from '~/knowledge/qmd-install';
import { runEmbed } from '~/knowledge/embed';
import { fetchCollectionDocs } from '~/learn/docs-fetcher';
import { fetchSfCliRef } from '~/learn/sf-cli-fetcher';

export type KnowledgeSubcommand = 'status' | 'install' | 'embed' | 'update' | 'fetch';

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

    case 'fetch': {
      const cols = ['apex-ref', 'lwc-guide', 'sf-releases'] as const;
      let totalFetched = 0;
      let totalErrors = 0;
      for (const col of cols) {
        const r = await fetchCollectionDocs(col, { force: true });
        totalFetched += r.fetched;
        totalErrors += r.errors;
      }
      await fetchSfCliRef(true);
      return {
        ok: true,
        message: `Fetched ${totalFetched} doc pages (${totalErrors} errors). Run Embed to index them.`,
      };
    }

    case 'embed': {
      const info = requireQmd();
      bootstrapCollections(info.binPath);
      // Fetch docs first if dirs are empty.
      const docCols = ['apex-ref', 'lwc-guide', 'sf-releases'] as const;
      for (const col of docCols) {
        if (!collectionHasContent(col)) {
          await fetchCollectionDocs(col, { force: false });
        }
      }
      await fetchSfCliRef(false);
      for (const col of [...docCols, 'sf-cli-ref'] as const) {
        await runEmbed(col, { qmdBin: info.binPath });
      }
      return { ok: true, message: 'All collections fetched and embedded.' };
    }

    case 'update': {
      const info = requireQmd();
      // Force re-fetch + re-embed all collections.
      const docCols = ['apex-ref', 'lwc-guide', 'sf-releases'] as const;
      for (const col of docCols) {
        await fetchCollectionDocs(col, { force: true });
      }
      await fetchSfCliRef(true);
      for (const col of [...docCols, 'sf-cli-ref'] as const) {
        await runEmbed(col, { qmdBin: info.binPath, force: true });
      }
      return { ok: true, message: 'Knowledge re-fetched and updated.' };
    }
  }
}
