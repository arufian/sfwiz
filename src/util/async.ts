/** Async utilities: retry with exponential backoff, sleep, rate-limit. */

export interface RetryOptions {
  maxAttempts?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
  factor?: number;
  /** Return true if the error is retryable */
  isRetryable?: (err: unknown) => boolean;
}

function isRateLimitError(err: unknown): boolean {
  if (!err || typeof err !== 'object') return false;
  const e = err as { status?: number; message?: string };
  return e.status === 429 || (e.message ?? '').includes('rate_limit');
}

/** Retry fn with exponential backoff. Default: 3 attempts, initial 1s, max 30s. */
export async function withRetry<T>(fn: () => Promise<T>, opts: RetryOptions = {}): Promise<T> {
  const {
    maxAttempts = 3,
    initialDelayMs = 1000,
    maxDelayMs = 30_000,
    factor = 2,
    isRetryable = isRateLimitError,
  } = opts;

  let delay = initialDelayMs;
  let lastErr: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (attempt === maxAttempts || !isRetryable(err)) throw err;
      await sleep(Math.min(delay, maxDelayMs));
      delay = delay * factor;
    }
  }

  throw lastErr;
}

/** Sleep for ms milliseconds. */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Throttle: ensure fn is called at most once per intervalMs. */
export function throttle<T extends (...args: unknown[]) => void>(fn: T, intervalMs: number): T {
  let last = 0;
  return ((...args) => {
    const now = Date.now();
    if (now - last >= intervalMs) {
      last = now;
      fn(...args);
    }
  }) as T;
}
