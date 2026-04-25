/** @jsxImportSource @opentui/react */
import type { OrgHandle } from '~/tools/types';
import type { QaOutput } from '~/agent/router';

export function TestsView({ org, results }: { org: OrgHandle | null; results?: QaOutput }) {
  if (!org) return <box width="100%" height="100%"><text fg="#777"> No org selected</text></box>;

  const coverageColor = results
    ? results.coverage >= 85 ? '#4caf50' : results.coverage >= 75 ? '#f8c200' : '#ef5350'
    : '#777';

  return (
    <box width="100%" height="100%">
      <text fg="#aaa"> Tests — {org.alias ?? org.username}</text>
      {results ? (
        <>
          <text fg="#4caf50"> Passed: {results.passed}</text>
          <text fg={results.failed > 0 ? '#ef5350' : '#4caf50'}> Failed: {results.failed}</text>
          <text fg={coverageColor}> Coverage: {results.coverage.toFixed(1)}%</text>
        </>
      ) : (
        <text fg="#777"> No test results. Run /qa to execute tests.</text>
      )}
    </box>
  );
}
