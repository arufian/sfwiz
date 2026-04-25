import { describe, expect, test } from 'bun:test';
import { PermissionModeGuard } from '~/tools/permission-mode';

const CWD = '/tmp/project';

describe('PermissionModeGuard — ask mode', () => {
  test('read_file inside cwd: auto-allow', () => {
    const guard = new PermissionModeGuard('ask', CWD);
    expect(guard.shouldAutoAllow('read_file', { path: `${CWD}/src/foo.ts` })).toBe(true);
  });

  test('read_file outside cwd: prompt', () => {
    const guard = new PermissionModeGuard('ask', CWD);
    expect(guard.shouldAutoAllow('read_file', { path: '/etc/passwd' })).toBe(false);
  });

  test('edit_file inside cwd: prompt in ask mode', () => {
    const guard = new PermissionModeGuard('ask', CWD);
    expect(guard.shouldAutoAllow('edit_file', { path: `${CWD}/src/foo.ts` })).toBe(false);
  });

  test('run_command: always prompt in ask mode', () => {
    const guard = new PermissionModeGuard('ask', CWD);
    expect(guard.shouldAutoAllow('run_command', {})).toBe(false);
  });
});

describe('PermissionModeGuard — auto-edit mode', () => {
  test('edit_file inside cwd: auto-allow', () => {
    const guard = new PermissionModeGuard('auto-edit', CWD);
    expect(guard.shouldAutoAllow('edit_file', { path: `${CWD}/src/foo.ts` })).toBe(true);
  });

  test('edit_file outside cwd: prompt', () => {
    const guard = new PermissionModeGuard('auto-edit', CWD);
    expect(guard.shouldAutoAllow('edit_file', { path: '/etc/foo' })).toBe(false);
  });

  test('run_command: still prompt in auto-edit mode', () => {
    const guard = new PermissionModeGuard('auto-edit', CWD);
    expect(guard.shouldAutoAllow('run_command', {})).toBe(false);
  });
});

describe('PermissionModeGuard — yolo mode', () => {
  test('edit_file anywhere: auto-allow', () => {
    const guard = new PermissionModeGuard('yolo', CWD);
    expect(guard.shouldAutoAllow('edit_file', { path: '/tmp/anywhere.ts' })).toBe(true);
  });

  test('run_command: auto-allow in yolo', () => {
    const guard = new PermissionModeGuard('yolo', CWD);
    expect(guard.shouldAutoAllow('run_command', {})).toBe(true);
  });

  test('sf_deploy_start: ALWAYS prompt regardless of yolo', () => {
    const guard = new PermissionModeGuard('yolo', CWD);
    expect(guard.shouldAutoAllow('sf_deploy_start', {})).toBe(false);
  });

  test('sf_scratch_create: ALWAYS prompt regardless of yolo', () => {
    const guard = new PermissionModeGuard('yolo', CWD);
    expect(guard.shouldAutoAllow('sf_scratch_create', {})).toBe(false);
  });
});
