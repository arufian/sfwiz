import { describe, expect, test } from 'bun:test';
import { sfQuery } from '~/tools/jsforce/sf_query';
import { sfSobjectDescribe } from '~/tools/jsforce/sf_sobject_describe';

describe('jsforce tool schemas', () => {
  test('sf_query: requires non-empty soql', () => {
    expect(() => sfQuery.parameters.parse({ soql: '' })).toThrow();
    expect(() => sfQuery.parameters.parse({ soql: 'SELECT Id FROM Account' })).not.toThrow();
  });

  test('sf_query: defaults to REST (not tooling)', () => {
    const parsed = sfQuery.parameters.parse({ soql: 'SELECT Id FROM Account' });
    expect(parsed.tooling).toBe(false);
  });

  test('sf_query: maxRecords defaults to 2000', () => {
    const parsed = sfQuery.parameters.parse({ soql: 'SELECT Id FROM Account' });
    expect(parsed.maxRecords).toBe(2000);
  });

  test('sf_sobject_describe: requires sobjectType', () => {
    expect(() => sfSobjectDescribe.parameters.parse({})).toThrow();
    expect(() => sfSobjectDescribe.parameters.parse({ sobjectType: 'Account' })).not.toThrow();
  });
});
