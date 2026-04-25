import type { PersonaStep } from '~/types/ui';

export const SPLASH_TIPS: string[] = [
  'try "build a forecast LWC" to kick off the designer → developer flow',
  'use /orgs to switch between scratch + sandbox targets',
  'Ctrl+K opens the deploy-target picker · Enter in picker confirms',
  'Shift+Enter adds a newline · paste multi-line prompts freely',
  'Ctrl+D loads the demo conversation · Ctrl+D again to clear',
  '/tests run OppHandler_Test · /settings Account · /users inactive',
];

export const CAPABILITY_HINTS: { icon: string; text: string }[] = [
  { icon: '⚡', text: '"show me open opps > $100k this quarter"' },
  { icon: '🧪', text: '/tests run OppHandler_Test' },
  { icon: '👥', text: '/users list inactive' },
  { icon: '⚙', text: '/settings Account · 42 types' },
  { icon: '🚀', text: '/deploy → picks scratch or existing org' },
  { icon: '❓', text: '/help · Ctrl+H for keybindings' },
];

export const PERSONA_PIPELINE: PersonaStep[] = [
  { name: 'designer', state: 'done' },
  { name: 'developer', state: 'active' },
  { name: 'reviewer', state: 'pending' },
  { name: 'qa', state: 'pending' },
  { name: 'deploy-manager', state: 'pending' },
];
