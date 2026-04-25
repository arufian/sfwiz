/** @jsxImportSource @opentui/react */
import type { OrgHandle } from '~/tools/types';

export function SettingsView({ org }: { org: OrgHandle | null }) {
  if (!org) return <box width="100%" height="100%"><text fg="#777"> No org selected</text></box>;
  return (
    <box width="100%" height="100%">
      <text fg="#e0e0e0"> Settings — {org.alias ?? org.username}</text>
      <text fg="#777"> Use /knowledge status to check qmd</text>
      <text fg="#777"> Use /permissions to change permission mode</text>
      <text fg="#777"> Use /model to switch LLM model</text>
    </box>
  );
}
