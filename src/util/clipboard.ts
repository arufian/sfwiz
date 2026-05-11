/** Write text to the system clipboard. */
export async function copyToClipboard(text: string): Promise<void> {
  const platform = process.platform;

  if (platform === 'darwin') {
    const proc = Bun.spawn(['pbcopy'], { stdin: 'pipe' });
    proc.stdin.write(text);
    proc.stdin.end();
    await proc.exited;
    return;
  }

  if (platform === 'linux') {
    for (const cmd of [['xclip', '-selection', 'clipboard'], ['xsel', '--clipboard', '--input']]) {
      try {
        const proc = Bun.spawn(cmd, { stdin: 'pipe' });
        proc.stdin.write(text);
        proc.stdin.end();
        await proc.exited;
        return;
      } catch {
        // try next
      }
    }
  }

  // OSC 52 fallback — works in most modern terminals (kitty, iTerm2, tmux with set-clipboard)
  const b64 = Buffer.from(text).toString('base64');
  process.stdout.write(`\x1b]52;c;${b64}\x07`);
}
