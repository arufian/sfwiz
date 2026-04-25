/** @jsxImportSource @opentui/react */
import { useState } from 'react';
import type { OrgHandle } from '~/tools/types';

export interface OrgUser {
  id: string;
  username: string;
  name: string;
  isActive: boolean;
  profileName?: string;
}

export function UsersView({ org, users }: { org: OrgHandle | null; users?: OrgUser[] }) {
  const [filter, setFilter] = useState('');
  void setFilter;

  if (!org) return <box width="100%" height="100%"><text fg="#777"> No org selected</text></box>;

  const filtered = (users ?? []).filter((u) =>
    !filter || u.username.includes(filter) || u.name.includes(filter),
  );

  return (
    <box width="100%" height="100%">
      <text fg="#aaa"> Users — {org.alias ?? org.username}</text>
      <text fg="#555"> Filter: {filter || '(all)'}</text>
      {filtered.length === 0 ? (
        <text fg="#777"> No users loaded. Use sf_query to fetch User records.</text>
      ) : (
        filtered.slice(0, 20).map((u) => (
          <text key={u.id} fg={u.isActive ? '#e0e0e0' : '#555'}>
            {u.isActive ? '●' : '○'} {u.name.padEnd(30)} {u.username}
          </text>
        ))
      )}
    </box>
  );
}
