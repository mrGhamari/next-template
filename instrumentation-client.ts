import * as Sentry from '@sentry/nextjs';
import { sentryRateLimiter } from '@/lib/sentry/rateLimiter';

const isProduction = process.env.NODE_ENV === 'production';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  integrations: [
    Sentry.replayIntegration(),
    Sentry.browserTracingIntegration(),
  ],
  tracesSampleRate: isProduction ? 0.1 : 0,
  enableLogs: isProduction,
  replaysSessionSampleRate: isProduction ? 0.1 : 0,
  replaysOnErrorSampleRate: isProduction ? 1.0 : 0,
  beforeSend: sentryRateLimiter.beforeSend,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
