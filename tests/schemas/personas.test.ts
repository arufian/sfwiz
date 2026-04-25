import { describe, expect, test } from 'bun:test';
import { PersonaName, Persona } from '~/personas/types';

describe('PersonaName', () => {
  test('accepts all valid persona names', () => {
    const names = ['org-admin', 'designer', 'developer', 'reviewer', 'qa', 'deploy-manager'];
    for (const n of names) {
      expect(PersonaName.safeParse(n).success).toBe(true);
    }
  });

  test('rejects unknown persona', () => {
    expect(PersonaName.safeParse('hacker').success).toBe(false);
  });
});

describe('Persona', () => {
  test('valid reviewer persona', () => {
    const result = Persona.safeParse({
      name: 'reviewer',
      promptPath: 'resources/personas/reviewer.md',
      model: 'opus',
      allowedTools: ['read_file', 'list_files', 'grep'],
      loopMode: 'isolated',
    });
    expect(result.success).toBe(true);
  });

  test('defaults askUserLimitPerTurn to 1', () => {
    const result = Persona.parse({
      name: 'developer',
      promptPath: 'resources/personas/developer.md',
      model: 'sonnet',
      allowedTools: [],
      loopMode: 'shared',
    });
    expect(result.askUserLimitPerTurn).toBe(1);
  });

  test('rejects unknown loop mode', () => {
    const result = Persona.safeParse({
      name: 'qa',
      promptPath: '',
      model: 'haiku',
      allowedTools: [],
      loopMode: 'parallel',
    });
    expect(result.success).toBe(false);
  });
});
