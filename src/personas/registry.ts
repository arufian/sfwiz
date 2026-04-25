import type { AgentDefinition } from '@anthropic-ai/claude-agent-sdk';
import type { PersonaName } from '~/agent/router';
import {
  DEPLOY_MANAGER_AGENT,
  DESIGNER_AGENT,
  DEVELOPER_AGENT,
  ORG_ADMIN_AGENT,
  QA_AGENT,
  REVIEWER_AGENT,
} from '~/agent/subagents';

export interface PersonaConfig {
  name: PersonaName;
  displayName: string;
  model: string;
  /**
   * All 6 personas now run as isolated claude-agent-sdk subagents
   * (SDK-level tool isolation, locked decision phase-4 M13).
   */
  executionMode: 'subagent';
  agentDefinition: AgentDefinition;
  systemPromptFile?: string;
  maxToolRoundsPerTurn?: number;
}

export const PERSONA_REGISTRY: Record<PersonaName, PersonaConfig> = {
  'org-admin': {
    name: 'org-admin',
    displayName: 'Org Admin',
    model: 'claude-sonnet-4-6',
    executionMode: 'subagent',
    systemPromptFile: 'resources/personas/org-admin.md',
    agentDefinition: ORG_ADMIN_AGENT,
  },
  designer: {
    name: 'designer',
    displayName: 'Designer',
    model: 'claude-opus-4-7',
    executionMode: 'subagent',
    systemPromptFile: 'resources/personas/designer.md',
    maxToolRoundsPerTurn: 15,
    agentDefinition: DESIGNER_AGENT,
  },
  developer: {
    name: 'developer',
    displayName: 'Developer',
    model: 'claude-sonnet-4-6',
    executionMode: 'subagent',
    systemPromptFile: 'resources/personas/developer.md',
    maxToolRoundsPerTurn: 30,
    agentDefinition: DEVELOPER_AGENT,
  },
  'deploy-manager': {
    name: 'deploy-manager',
    displayName: 'Deploy Manager',
    model: 'claude-sonnet-4-6',
    executionMode: 'subagent',
    systemPromptFile: 'resources/personas/deploy-manager.md',
    maxToolRoundsPerTurn: 20,
    agentDefinition: DEPLOY_MANAGER_AGENT,
  },
  reviewer: {
    name: 'reviewer',
    displayName: 'Reviewer',
    model: 'claude-opus-4-7',
    executionMode: 'subagent',
    systemPromptFile: 'resources/personas/reviewer.md',
    agentDefinition: REVIEWER_AGENT,
  },
  qa: {
    name: 'qa',
    displayName: 'QA Engineer',
    model: 'claude-sonnet-4-6',
    executionMode: 'subagent',
    systemPromptFile: 'resources/personas/qa.md',
    agentDefinition: QA_AGENT,
  },
};

export function getPersona(name: PersonaName): PersonaConfig {
  const config = PERSONA_REGISTRY[name];
  if (!config) throw new Error(`Unknown persona: "${name}"`);
  return config;
}
