/** @jsxImportSource @opentui/react */
import type { OrgHandle } from '~/tools/types';

export interface MetadataItem {
  type: string;
  name: string;
  lastModified?: string;
}

export function MetadataView({ org, items }: { org: OrgHandle | null; items?: MetadataItem[] }) {
  if (!org) return <box width="100%" height="100%"><text fg="#777"> No org selected</text></box>;

  return (
    <box width="100%" height="100%">
      <text fg="#aaa"> Metadata — {org.alias ?? org.username}</text>
      {!items || items.length === 0 ? (
        <text fg="#777"> No metadata loaded. Use sf_retrieve to fetch components.</text>
      ) : (
        items.slice(0, 20).map((item) => (
          <text key={`${item.type}:${item.name}`} fg="#e0e0e0">
            {item.type.padEnd(30)} {item.name}
          </text>
        ))
      )}
    </box>
  );
}
