/** @jsxImportSource @opentui/react */

export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  totalCostUsd: number;
  cacheHitRate: number;
}

function formatNum(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function TokensView({ usage }: { usage?: TokenUsage }) {
  if (!usage) {
    return (
      <box width="100%" height="100%">
        <text fg="#777"> No token usage yet. Start a conversation to see stats.</text>
      </box>
    );
  }

  const hitColor = usage.cacheHitRate >= 0.7 ? '#4caf50' : usage.cacheHitRate >= 0.4 ? '#f8c200' : '#ef5350';

  return (
    <box width="100%" height="100%">
      <text fg="#aaa"> Token Usage</text>
      <text fg="#e0e0e0"> Input:         {formatNum(usage.inputTokens)}</text>
      <text fg="#e0e0e0"> Output:        {formatNum(usage.outputTokens)}</text>
      <text fg="#4caf50"> Cache read:    {formatNum(usage.cacheReadTokens)}</text>
      <text fg="#f8c200"> Cache write:   {formatNum(usage.cacheWriteTokens)}</text>
      <text fg={hitColor}> Cache hit rate:{Math.round(usage.cacheHitRate * 100)}%</text>
      <text fg="#aaa"> Cost:          ${usage.totalCostUsd.toFixed(4)}</text>
    </box>
  );
}
