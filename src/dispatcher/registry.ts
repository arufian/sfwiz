export interface DispatcherCommand {
  name: string;
  description: string;
  aliases?: string[];
  handler: string;
}

export const COMMAND_REGISTRY: DispatcherCommand[] = [
  { name: '/orgs', description: 'List authenticated Salesforce orgs', handler: 'orgs' },
  { name: '/login', description: 'Authenticate a new Salesforce org', handler: 'login' },
  { name: '/knowledge', description: 'Manage knowledge base (qmd)', aliases: ['/kb'], handler: 'knowledge' },
  { name: '/learn', description: 'Control continuous learning worker', handler: 'learn' },
  { name: '/permissions', description: 'View or change permission mode (ask/auto-edit/yolo)', handler: 'permissions' },
  { name: '/sessions', description: 'Browse and resume prior sessions', handler: 'sessions' },
  { name: '/model', description: 'Switch active LLM model', handler: 'model' },
  { name: '/help', description: 'Show keybindings and commands', handler: 'help' },
  { name: '/quit', description: 'Exit sfwiz', aliases: ['/exit'], handler: 'quit' },
];

export const PALETTE_STATIC_TOGGLES = [
  { label: 'Thinking Mode', description: 'Toggle extended thinking budget', value: 'thinking' },
  { label: 'Yolo Mode', description: 'Enable yolo permission mode (auto-approve all)', value: 'yolo' },
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
