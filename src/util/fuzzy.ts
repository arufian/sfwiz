export interface FuzzyMatch {
  item: string;
  score: number;
  /** Indices of matched characters in the original string */
  matchIndices: number[];
}

/**
 * Fuzzy score: returns a positive score if query characters appear in order,
 * higher if they're contiguous or at word boundaries. Returns 0 if no match.
 *
 * Algorithm:
 * - Sequential: each query char must appear in order in item
 * - Contiguous bonus: consecutive matched chars get extra points
 * - Prefix bonus: match at start of string or after word boundary (_ -/ )
 * - Penalty: each gap between matched chars reduces score
 */
export function fuzzyScore(item: string, query: string): number {
  if (query.length === 0) return 1;
  const lItem = item.toLowerCase();
  const lQuery = query.toLowerCase();

  // Exact prefix match — highest priority
  if (lItem.startsWith(lQuery)) return 1000 + (1000 / item.length);

  let score = 0;
  let qi = 0;
  let prevMatchIdx = -1;
  let consecutiveBonus = 0;

  for (let i = 0; i < lItem.length && qi < lQuery.length; i++) {
    if (lItem[i] === lQuery[qi]) {
      const gap = i - prevMatchIdx - 1;
      consecutiveBonus = gap === 0 ? consecutiveBonus + 5 : 0;

      score += 10 + consecutiveBonus;

      // Word boundary bonus
      if (i === 0 || /[\s_\-/.]/.test(lItem[i - 1] ?? '')) score += 8;

      prevMatchIdx = i;
      qi++;
    }
  }

  if (qi < lQuery.length) return 0; // not all query chars matched
  return score - prevMatchIdx * 0.1; // small penalty for late matches
}

/** Match query indices for highlighting */
function getMatchIndices(item: string, query: string): number[] {
  const lItem = item.toLowerCase();
  const lQuery = query.toLowerCase();
  const indices: number[] = [];
  let qi = 0;

  for (let i = 0; i < lItem.length && qi < lQuery.length; i++) {
    if (lItem[i] === lQuery[qi]) {
      indices.push(i);
      qi++;
    }
  }

  return qi === lQuery.length ? indices : [];
}

/** Fuzzy-filter and rank a list of strings by query. */
export function fuzzyFilter(items: string[], query: string): FuzzyMatch[] {
  if (!query) {
    return items.map((item) => ({ item, score: 0, matchIndices: [] }));
  }

  const results: FuzzyMatch[] = [];
  for (const item of items) {
    const score = fuzzyScore(item, query);
    if (score > 0) {
      results.push({ item, score, matchIndices: getMatchIndices(item, query) });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}
