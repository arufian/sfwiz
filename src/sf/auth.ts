import { AuthInfo } from '@salesforce/core';

export interface OrgEntry {
  alias: string | undefined;
  username: string;
  orgId: string;
  instanceUrl: string;
  isDefaultDevHub: boolean;
  isDefault: boolean;
  connectedStatus: string;
}

/** List all locally authenticated orgs via @salesforce/core AuthInfo. */
export async function listOrgs(): Promise<OrgEntry[]> {
  const authInfos = await AuthInfo.listAllAuthorizations();
  return authInfos.map((info) => ({
    alias: info.aliases?.[0] ?? undefined,
    username: info.username,
    orgId: info.orgId ?? '',
    instanceUrl: info.instanceUrl ?? '',
    isDefaultDevHub: info.isDevHub ?? false,
    isDefault: info.configs?.includes('defaultusername') ?? false,
    connectedStatus: info.isExpired === true ? 'expired' : 'active',
  }));
}

/** Get connection fields (instanceUrl + accessToken) for a username/alias. */
export async function getConnection(usernameOrAlias: string): Promise<{ instanceUrl: string; accessToken: string }> {
  const authInfo = await AuthInfo.create({ username: usernameOrAlias });
  const fields = authInfo.getFields(true);
  return {
    instanceUrl: fields.instanceUrl ?? '',
    accessToken: fields.accessToken ?? '',
  };
}
