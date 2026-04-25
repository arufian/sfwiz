/** @jsxImportSource @opentui/react */
import type { OrgHandle } from '~/tools/types';

export type DeployStatus = 'idle' | 'validating' | 'deploying' | 'success' | 'error';

export function DeployView({ org, status }: { org: OrgHandle | null; status?: DeployStatus }) {
  if (!org) return <box width="100%" height="100%"><text fg="#777"> No org selected</text></box>;

  const s = status ?? 'idle';
  const statusColor = s === 'success' ? '#4caf50' : s === 'error' ? '#ef5350' : s === 'idle' ? '#777' : '#f8c200';
  const statusText = { idle: 'Ready', validating: 'Validating…', deploying: 'Deploying…', success: 'Success', error: 'Error' }[s];

  return (
    <box width="100%" height="100%">
      <text fg="#aaa"> Deploy — {org.alias ?? org.username}</text>
      <text fg={statusColor}> Status: {statusText}</text>
      <text fg="#555"> v: validate  d: deploy  Esc: cancel</text>
    </box>
  );
}
