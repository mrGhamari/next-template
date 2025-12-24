import * as Sentry from '@sentry/nextjs';
import type { ErrorEvent } from '@sentry/nextjs';

interface RateLimiterConfig {
  maxEvents: number;
  windowMs: number;
  storageKey?: string;
}

interface StoredData {
  timestamps: number[];
}

const DEFAULT_CONFIG: RateLimiterConfig = {
  maxEvents: Number(process.env.NEXT_PUBLIC_SENTRY_MAX_EVENTS) || 20,
  windowMs: Number(process.env.NEXT_PUBLIC_SENTRY_WINDOW_MS) || 60 * 60 * 1000,
  storageKey: 'sentry_rate_limiter',
};

class SentryRateLimiter {
  private config: RateLimiterConfig;
  private timestamps: number[] = [];
  private isClient: boolean;

  constructor(config: Partial<RateLimiterConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.isClient = typeof window !== 'undefined';
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    if (!this.isClient) return;

    try {
      const stored = localStorage.getItem(this.config.storageKey!);
      if (stored) {
        const data: StoredData = JSON.parse(stored);
        this.timestamps = data.timestamps || [];
      }
    } catch {
      this.timestamps = [];
    }
  }

  private saveToStorage(): void {
    if (!this.isClient) return;

    try {
      const data: StoredData = { timestamps: this.timestamps };
      localStorage.setItem(this.config.storageKey!, JSON.stringify(data));
    } catch {}
  }

  private prune(): void {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(
      (ts) => now - ts < this.config.windowMs
    );
    this.saveToStorage();
  }

  public hasCapacity(): boolean {
    this.prune();
    return this.timestamps.length < this.config.maxEvents;
  }

  public recordEvent(): boolean {
    if (!this.hasCapacity()) return false;
    this.timestamps.push(Date.now());
    this.saveToStorage();
    return true;
  }

  public getRemainingCapacity(): number {
    this.prune();
    return Math.max(0, this.config.maxEvents - this.timestamps.length);
  }

  public getTimeUntilReset(): number {
    if (this.timestamps.length === 0) return 0;
    const oldestTimestamp = Math.min(...this.timestamps);
    const resetTime = oldestTimestamp + this.config.windowMs;
    return Math.max(0, resetTime - Date.now());
  }

  public reset(): void {
    this.timestamps = [];
    this.saveToStorage();
  }

  public beforeSend = (event: ErrorEvent): ErrorEvent | null => {
    if (!this.recordEvent()) {
      if (process.env.NODE_ENV === 'development') {
        const resetInMinutes = Math.ceil(this.getTimeUntilReset() / 60000);
        // eslint-disable-next-line no-console
        console.warn(
          `[Sentry Rate Limiter] Event dropped. Quota exhausted. ` +
            `Resets in ~${resetInMinutes} minutes.`
        );
      }
      return null;
    }
    return event;
  };

  public captureException(
    ...args: Parameters<typeof Sentry.captureException>
  ): string | undefined {
    if (!this.recordEvent()) return undefined;
    try {
      return Sentry.captureException(...args);
    } catch {
      return undefined;
    }
  }

  public captureMessage(
    ...args: Parameters<typeof Sentry.captureMessage>
  ): string | undefined {
    if (!this.recordEvent()) return undefined;
    try {
      return Sentry.captureMessage(...args);
    } catch {
      return undefined;
    }
  }
}

export const sentryRateLimiter = new SentryRateLimiter();

export const createRateLimiter = (config?: Partial<RateLimiterConfig>) =>
  new SentryRateLimiter(config);

export const safeCaptureException =
  sentryRateLimiter.captureException.bind(sentryRateLimiter);

export const safeCaptureMessage =
  sentryRateLimiter.captureMessage.bind(sentryRateLimiter);

export const hasSentryCapacity =
  sentryRateLimiter.hasCapacity.bind(sentryRateLimiter);
