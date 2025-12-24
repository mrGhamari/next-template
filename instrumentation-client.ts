import * as Sentry from '@sentry/nextjs';
import { sentryRateLimiter } from '@/lib/sentry/rateLimiter';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  integrations: [
    Sentry.replayIntegration(),
    Sentry.browserTracingIntegration(),
  ],

  // Sample rate for performance monitoring (10% in production)
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1,

  enableLogs: true,

  // Replay configuration for session recordings
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Client-side rate limiting to prevent 429 errors
  beforeSend: sentryRateLimiter.beforeSend,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
