import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://5eccb2a13970f2e449f0ec8ae675ee80@sentry.hamravesh.com/9540',

  integrations: [Sentry.replayIntegration()],

  tracesSampleRate: 1,
  enableLogs: true,

  replaysSessionSampleRate: 0.1,

  replaysOnErrorSampleRate: 1.0,
  sendDefaultPii: true,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
