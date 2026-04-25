import type { PersonaName } from '~/agent/router';
import type { AgentDefinition } from '@anthropic-ai/claude-agent-sdk';

export interface PersonaConfig {
  name: PersonaName;
  displayName: string;
  model: string;
  executionMode: 'main-loop' | 'subagent';
  agentDefinition?: AgentDefinition;
  systemPromptFile?: string;
  maxToolRoundsPerTurn?: number;
}

export const PERSONA_REGISTRY: Record<PersonaName, PersonaConfig> = {
  designer: {
    name: 'designer',
    displayName: 'Designer',
    model: 'claude-opus-4-7',
    executionMode: 'main-loop',
    systemPromptFile: 'resources/personas/designer.md',
    maxToolRoundsPerTurn: 15,
  },
  developer: {
    name: 'developer',
    displayName: 'Developer',
    model: 'claude-sonnet-4-6',
    executionMode: 'main-loop',
    systemPromptFile: 'resources/personas/developer.md',
    maxToolRoundsPerTurn: 30,
  },
  'deploy-manager': {
    name: 'deploy-manager',
    displayName: 'Deploy Manager',
    model: 'claude-sonnet-4-6',
    executionMode: 'main-loop',
    systemPromptFile: 'resources/personas/deploy-manager.md',
    maxToolRoundsPerTurn: 20,
  },
  reviewer: {
    name: 'reviewer',
    displayName: 'Reviewer',
    model: 'claude-opus-4-7',
    executionMode: 'subagent',
    systemPromptFile: 'resources/personas/reviewer.md',
    agentDefinition: {
      description: 'Reviews Salesforce code for quality, best practices, and security.',
      prompt: 'You are a senior Salesforce architect reviewing code. Output structured JSON critique.',
      model: 'claude-opus-4-7',
      tools: ['Read', 'Glob', 'Grep'],
    },
  },
  qa: {
    name: 'qa',
    displayName: 'QA Engineer',
    model: 'claude-sonnet-4-6',
    executionMode: 'subagent',
    systemPromptFile: 'resources/personas/qa.md',
    agentDefinition: {
      description: 'Runs Salesforce Apex tests and verifies code coverage.',
      prompt: 'You are a QA engineer. Run tests via sf CLI and report structured JSON results.',
      model: 'claude-sonnet-4-6',
      tools: ['Read', 'Bash'],
    },
  },
};

export function getPersona(name: PersonaName): PersonaConfig {
  const config = PERSONA_REGISTRY[name];
  if (!config) throw new Error(`Unknown persona: "${name}"`);
  return config;
}
