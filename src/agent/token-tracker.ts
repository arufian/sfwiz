import type { TokenUsageTurn } from '~/agent/types';

export interface SessionTokens {
  inputTokens: number;
  outputTokens: number;
  cacheCreationTokens: number;
  cacheReadTokens: number;
  turnsCount: number;
}

export class TokenTracker {
  private totals: SessionTokens = {
    inputTokens: 0,
    outputTokens: 0,
    cacheCreationTokens: 0,
    cacheReadTokens: 0,
    turnsCount: 0,
  };

  record(turn: TokenUsageTurn) {
    this.totals.inputTokens += turn.inputTokens;
    this.totals.outputTokens += turn.outputTokens;
    this.totals.cacheCreationTokens += turn.cacheCreationTokens;
    this.totals.cacheReadTokens += turn.cacheReadTokens;
    this.totals.turnsCount++;
  }

  get(): Readonly<SessionTokens> {
    return { ...this.totals };
  }

  /** Estimated cost in USD (rough Sonnet 4.6 pricing). */
  estimatedCostUsd(): number {
    const inputCost = (this.totals.inputTokens / 1_000_000) * 3.0;
    const outputCost = (this.totals.outputTokens / 1_000_000) * 15.0;
    const cacheCost = (this.totals.cacheCreationTokens / 1_000_000) * 3.75;
    return inputCost + outputCost + cacheCost;
  }
}
