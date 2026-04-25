/** @jsxImportSource @opentui/react */
import { useState } from 'react';
import type { OrgHandle } from '~/tools/types';

export function SOQLView({ org }: { org: OrgHandle | null }) {
  const [query, setQuery] = useState('SELECT Id, Name FROM Account LIMIT 10');
  const [results, setResults] = useState<string>('');

  void setQuery; void setResults;

  if (!org) return <box width="100%" height="100%"><text fg="#777"> No org selected</text></box>;

  return (
    <box width="100%" height="100%">
      <text fg="#aaa"> SOQL Editor — {org.alias ?? org.username}</text>
      <text fg="#e0e0e0"> {query}</text>
      {results && <text fg="#4caf50"> {results}</text>}
      <text fg="#555"> Enter: execute, Ctrl+A: select all</text>
    </box>
  );
}
