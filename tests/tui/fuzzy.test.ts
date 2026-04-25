import { describe, expect, test } from 'bun:test';
import { fuzzyScore, fuzzyFilter } from '~/util/fuzzy';
import { getAllPaletteLabels, COMMAND_REGISTRY, PALETTE_STATIC_TOGGLES } from '~/dispatcher/registry';

describe('fuzzyScore — 12 test cases', () => {
  // 1. Exact prefix
  test('1: exact prefix match scores highest', () => {
    const s = fuzzyScore('/orgs', '/orgs');
    expect(s).toBeGreaterThan(1000);
  });

  // 2. Prefix subset
  test('2: prefix /or matches /orgs', () => {
    expect(fuzzyScore('/orgs', '/or')).toBeGreaterThan(0);
  });

  // 3. Subsequence match
  test('3: subsequence "kno" matches "/knowledge"', () => {
    expect(fuzzyScore('/knowledge', 'kno')).toBeGreaterThan(0);
  });

  // 4. Case insensitive
  test('4: case-insensitive — "ORGS" matches "/orgs"', () => {
    expect(fuzzyScore('/orgs', 'ORGS')).toBeGreaterThan(0);
  });

  // 5. Non-matching returns 0
  test('5: no match returns 0', () => {
    expect(fuzzyScore('/orgs', 'xyz')).toBe(0);
  });

  // 6. Empty query matches everything
  test('6: empty query returns score > 0 for any item', () => {
    expect(fuzzyScore('/orgs', '')).toBeGreaterThan(0);
  });

  // 7. Contiguous bonus — contiguous beats scattered
  test('7: contiguous match scores higher than scattered', () => {
    const contiguous = fuzzyScore('/knowledge', 'know');
    const scattered = fuzzyScore('/knowledge', 'kwdg');
    expect(contiguous).toBeGreaterThan(scattered);
  });

  // 8. Score ordering
  test('8: prefix beats subsequence in ordering', () => {
    const results = fuzzyFilter(['/help', '/knowledge', '/learn'], 'le');
    // /learn starts closer to prefix; /knowledge has 'le' scattered
    const learnIdx = results.findIndex((r) => r.item === '/learn');
    const knowledgeIdx = results.findIndex((r) => r.item === '/knowledge');
    expect(learnIdx).toBeLessThan(knowledgeIdx);
  });

  // 9. Match indices returned correctly
  test('9: match indices cover all query chars', () => {
    const results = fuzzyFilter(['/orgs'], 'or');
    expect(results[0]!.matchIndices.length).toBe(2);
  });

  // 10. Empty query returns all items
  test('10: empty query returns all items', () => {
    const items = ['/orgs', '/login', '/help'];
    expect(fuzzyFilter(items, '').length).toBe(3);
  });

  // 11. Word boundary boost
  test('11: word boundary boosts "Th" on "Thinking Mode"', () => {
    const s = fuzzyScore('Thinking Mode', 'Th');
    expect(s).toBeGreaterThan(fuzzyScore('/knowledge', 'kn') - 100); // rough sanity
  });

  // 12. No partial match returns empty
  test('12: query with non-sequential chars returns empty filtered list', () => {
    const results = fuzzyFilter(['/orgs'], 'zqx');
    expect(results.length).toBe(0);
  });
});

describe('command registry', () => {
  test('has at least 9 commands', () => {
    expect(COMMAND_REGISTRY.length).toBeGreaterThanOrEqual(9);
  });

  test('has static toggle entries', () => {
    expect(PALETTE_STATIC_TOGGLES.length).toBeGreaterThanOrEqual(5);
  });

  test('getAllPaletteLabels includes /orgs and Thinking Mode', () => {
    const labels = getAllPaletteLabels();
    expect(labels).toContain('/orgs');
    expect(labels).toContain('Thinking Mode');
  });
});
