export interface DispatcherCommand {
  name: string;
  description: string;
  aliases?: string[];
  handler: string;
}

export const COMMAND_REGISTRY: DispatcherCommand[] = [
  { name: '/orgs', description: 'List authenticated Salesforce orgs', handler: 'orgs' },
  { name: '/connect', description: 'Connect to a Salesforce org (list, select, or add new)', handler: 'connect', aliases: ['/login'] },
  { name: '/knowledge', description: 'Manage knowledge base (qmd)', aliases: ['/kb'], handler: 'knowledge' },
  { name: '/learn', description: 'Control continuous learning worker', handler: 'learn' },
  { name: '/permissions', description: 'View or change permission mode (ask/auto-edit/auto)', handler: 'permissions' },
  { name: '/history', description: 'Browse all sessions and resume one', handler: 'history' },
  { name: '/sessions', description: 'List all saved sessions', handler: 'sessions' },
  { name: '/open-org', description: 'Open the active Salesforce org in the browser', handler: 'open-org' },
  { name: '/provider', description: 'Switch LLM provider / re-enter API key', aliases: ['/api-key'], handler: 'provider' },
  { name: '/model', description: 'Switch active LLM model', handler: 'model' },
  { name: '/help', description: 'Show keybindings and commands', handler: 'help' },
  { name: '/quit', description: 'Exit sfwiz', aliases: ['/exit'], handler: 'quit' },
];

export const PALETTE_STATIC_TOGGLES = [
  { label: 'Thinking Mode', description: 'Toggle extended thinking budget', value: 'thinking' },
  { label: 'Auto Mode', description: 'Enable auto permission mode (auto-approve all non-destructive)', value: 'yolo' },
  { label: 'Init Project', description: 'Initialize sfdx-project.json in current directory', value: 'init-project' },
  { label: 'Background Color', description: 'Cycle TUI background color', value: 'bg-color' },
  { label: 'Reduced Motion', description: 'Toggle reduced motion mode', value: 'reduced-motion' },
];

/** Get all palette entries (commands + static toggles) as a flat label list. */
export function getAllPaletteLabels(): string[] {
  const commands = COMMAND_REGISTRY.map((c) => c.name);
  const toggles = PALETTE_STATIC_TOGGLES.map((t) => t.label);
  return [...commands, ...toggles];
}
