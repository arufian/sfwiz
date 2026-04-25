import { AskUserPayload, type AskUserResult } from '~/tools/types';
import type { Tool, ToolContext } from '~/tools/types';

export const askUserTool: Tool<typeof AskUserPayload, AskUserResult> = {
  name: 'ask_user',
  description:
    'Prompt the user with a structured question and a set of options. ' +
    'Use before any destructive Salesforce operation (deploy, scratch create, permset assign).',
  parameters: AskUserPayload,
  async execute(args, ctx: ToolContext) {
    return ctx.askUser(args);
  },
};

export { AskUserPayload, AskUserResult };
