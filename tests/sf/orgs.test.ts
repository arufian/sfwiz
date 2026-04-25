import { describe, expect, test } from 'bun:test';
import { parseSfOrgList } from '~/sf/orgs';

const FIXTURE_ONE_ORG = JSON.stringify({
  status: 0,
  result: {
    nonScratchOrgs: [
      {
        alias: 'prod',
        username: 'admin@example.com',
        orgId: '00D000000000001',
        instanceUrl: 'https://example.my.salesforce.com',
        isDefaultUsername: true,
        isDefaultDevHubUsername: false,
        connectedStatus: 'Connected',
      },
    ],
    scratchOrgs: [],
  },
});

const FIXTURE_SCRATCH = JSON.stringify({
  status: 0,
  result: {
    nonScratchOrgs: [],
    scratchOrgs: [
      {
        alias: 'scratch-dev',
        username: 'dev@scratch.example.com',
        orgId: '00D000000000002',
        instanceUrl: 'https://scratch.my.salesforce.com',
        isDefaultUsername: false,
        isDefaultDevHubUsername: false,
        connectedStatus: 'Active',
      },
    ],
  },
});

const FIXTURE_EMPTY = JSON.stringify({ status: 0, result: { nonScratchOrgs: [], scratchOrgs: [] } });

describe('parseSfOrgList', () => {
  test('parses single non-scratch org', () => {
    const orgs = parseSfOrgList(FIXTURE_ONE_ORG);
    expect(orgs).toHaveLength(1);
    expect(orgs[0]).toMatchObject({
      alias: 'prod',
      username: 'admin@example.com',
      isDefault: true,
      connectedStatus: 'Connected',
    });
  });

  test('parses scratch orgs', () => {
    const orgs = parseSfOrgList(FIXTURE_SCRATCH);
    expect(orgs).toHaveLength(1);
    const first = orgs[0]!;
    expect(first.alias).toBe('scratch-dev');
    expect(first.isDefault).toBe(false);
  });

  test('returns empty array for empty result', () => {
    expect(parseSfOrgList(FIXTURE_EMPTY)).toHaveLength(0);
  });

  test('returns empty array on malformed JSON', () => {
    expect(parseSfOrgList('NOT JSON')).toHaveLength(0);
  });

  test('merges non-scratch and scratch orgs', () => {
    const both = JSON.stringify({
      status: 0,
      result: {
        nonScratchOrgs: [{ username: 'a@x.com', orgId: '1' }],
        scratchOrgs: [{ username: 'b@x.com', orgId: '2' }],
      },
    });
    expect(parseSfOrgList(both)).toHaveLength(2);
  });

  test('handles missing alias gracefully', () => {
    const noAlias = JSON.stringify({
      status: 0,
      result: {
        nonScratchOrgs: [{ username: 'nk@x.com', orgId: '3', instanceUrl: 'https://x.com' }],
      },
    });
    const orgs = parseSfOrgList(noAlias);
    expect(orgs[0]!.alias).toBeUndefined();
  });
});
