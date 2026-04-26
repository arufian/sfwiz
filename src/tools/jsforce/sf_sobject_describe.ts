import { z } from 'zod';
import type { Tool, ToolContext } from '~/tools/types';
import { getJsforceConnection } from '~/sf/connection';
import { resolveDefaultOrg } from '~/sf/project';

const Params = z.object({
  sobjectType: z.string().min(1).describe('SObject API name, e.g. Account or MyCustomObj__c'),
  targetOrg: z.string().optional(),
});

export const sfSobjectDescribe: Tool<typeof Params> = {
  name: 'sf_sobject_describe',
  description: 'Describe a Salesforce SObject (fields, relationships, picklists) using jsforce.',
  parameters: Params,
  async execute(args, ctx: ToolContext) {
    const username = args.targetOrg ?? ctx.org?.username ?? resolveDefaultOrg(process.cwd());
    if (!username) throw new Error('No active org. Run /connect or set a default org with `sf config set target-org <alias>`.');

    const conn = await getJsforceConnection(username);
    const meta = await conn.describe(args.sobjectType);
    return {
      name: meta.name,
      label: meta.label,
      labelPlural: meta.labelPlural,
      fields: meta.fields.map((f) => ({
        name: f.name,
        label: f.label,
        type: f.type,
        length: f.length,
        nillable: f.nillable,
        referenceTo: f.referenceTo,
        picklistValues: f.picklistValues?.map((p) => ({ value: p.value, label: p.label, active: p.active })),
      })),
      recordTypeInfos: meta.recordTypeInfos?.map((r) => ({ name: r.name, recordTypeId: r.recordTypeId })),
    };
  },
};
