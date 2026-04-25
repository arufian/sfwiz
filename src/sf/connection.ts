import { Connection } from 'jsforce';
import { getConnection } from '~/sf/auth';

/** Build a jsforce Connection from @salesforce/core auth credentials. */
export async function getJsforceConnection(username: string): Promise<Connection> {
  const { instanceUrl, accessToken } = await getConnection(username);
  return new Connection({ instanceUrl, accessToken });
}
