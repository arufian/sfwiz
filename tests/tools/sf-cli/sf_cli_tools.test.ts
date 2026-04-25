import { describe, expect, test } from 'bun:test';
import { sfRetrieve } from '~/tools/sf-cli/sf_retrieve';
import { sfDeployValidate } from '~/tools/sf-cli/sf_deploy_validate';
import { sfDeployStart } from '~/tools/sf-cli/sf_deploy_start';
import { sfRunTests } from '~/tools/sf-cli/sf_run_tests';
import { sfScratchCreate } from '~/tools/sf-cli/sf_scratch_create';
import { sfAssignPermset } from '~/tools/sf-cli/sf_assign_permset';
import { sfApexRunAnonymous } from '~/tools/sf-cli/sf_apex_run_anonymous';

describe('SF CLI tool schemas', () => {
  test('sf_retrieve: validates metadata array', () => {
    expect(() => sfRetrieve.parameters.parse({ metadata: [] })).toThrow();
    expect(() => sfRetrieve.parameters.parse({ metadata: ['ApexClass:Foo'] })).not.toThrow();
  });

  test('sf_deploy_validate: defaults testLevel to RunLocalTests', () => {
    const parsed = sfDeployValidate.parameters.parse({});
    expect(parsed.testLevel).toBe('RunLocalTests');
  });

  test('sf_deploy_validate: rejects invalid testLevel', () => {
    expect(() => sfDeployValidate.parameters.parse({ testLevel: 'RunNothing' })).toThrow();
  });

  test('sf_deploy_start: requires user confirmation', () => {
    expect(sfDeployStart.requiresUserConfirmation).toBeDefined();
    expect(sfDeployStart.requiresUserConfirmation?.ref).toBe('sf_deploy_start');
    expect(sfDeployStart.requiresUserConfirmation?.within).toBe(3);
  });

  test('sf_run_tests: defaults codeCoverage to true', () => {
    const parsed = sfRunTests.parameters.parse({});
    expect(parsed.codeCoverage).toBe(true);
  });

  test('sf_scratch_create: requires user confirmation', () => {
    expect(sfScratchCreate.requiresUserConfirmation).toBeDefined();
    expect(sfScratchCreate.requiresUserConfirmation?.ref).toBe('sf_scratch_create');
  });

  test('sf_scratch_create: duration days clamped 1-30', () => {
    expect(() => sfScratchCreate.parameters.parse({ durationDays: 0 })).toThrow();
    expect(() => sfScratchCreate.parameters.parse({ durationDays: 31 })).toThrow();
    expect(() => sfScratchCreate.parameters.parse({ durationDays: 7 })).not.toThrow();
  });

  test('sf_assign_permset: requires user confirmation', () => {
    expect(sfAssignPermset.requiresUserConfirmation).toBeDefined();
    expect(sfAssignPermset.requiresUserConfirmation?.ref).toBe('sf_assign_permset');
  });

  test('sf_assign_permset: requires name', () => {
    expect(() => sfAssignPermset.parameters.parse({})).toThrow();
    expect(() => sfAssignPermset.parameters.parse({ name: 'MyPermset' })).not.toThrow();
  });

  test('sf_apex_run_anonymous: requires non-empty apexCode', () => {
    expect(() => sfApexRunAnonymous.parameters.parse({ apexCode: '' })).toThrow();
    expect(() => sfApexRunAnonymous.parameters.parse({ apexCode: 'System.debug(1);' })).not.toThrow();
  });
});

describe('SF project helpers', () => {
  test('findSfProject returns null for non-sf dir', async () => {
    const { findSfProject } = await import('~/sf/project');
    expect(findSfProject('/tmp')).toBeNull();
  });
});
