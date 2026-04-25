import { z } from 'zod';
import type { Tool, ToolContext } from '~/tools/types';
import { getJsforceConnection } from '~/sf/connection';

const Params = z.object({
  soql: z.string().min(1).describe('SOQL query string'),
  targetOrg: z.string().optional(),
  tooling: z.boolean().default(false).describe('Use Tooling API instead of REST'),
  maxRecords: z.number().int().positive().default(2000),
});

export const sfQuery: Tool<typeof Params> = {
  name: 'sf_query',
  description: 'Execute a SOQL query against a Salesforce org using jsforce.',
  parameters: Params,
  async execute(args, ctx: ToolContext) {
    const username = args.targetOrg ?? ctx.org?.username;
    if (!username) throw new Error('No active org.');

    const conn = await getJsforceConnection(username);
    const api = args.tooling ? conn.tooling : conn;
    const result = await (api as typeof conn).query(args.soql, { autoFetch: true, maxFetch: args.maxRecords });
    return { totalSize: result.totalSize, records: result.records, done: result.done };
  },
};
