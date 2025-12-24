import * as Sentry from '@sentry/nextjs';

const MAX_EVENTS_PER_WINDOW = 30;
const WINDOW_MS = 60 * 60 * 1000;

let eventTimestamps: number[] = [];

const pruneAndCount = () => {
  const now = Date.now();
  eventTimestamps = eventTimestamps.filter((ts) => now - ts < WINDOW_MS);
  return eventTimestamps.length;
};

export const hasSentryCapacity = () => pruneAndCount() < MAX_EVENTS_PER_WINDOW;

export const reserveSentrySlot = () => {
  if (!hasSentryCapacity()) return false;
  eventTimestamps.push(Date.now());
  return true;
};

const safelySend = <T>(send: () => T): T | undefined => {
  if (!hasSentryCapacity()) return;
  try {
    return send();
  } catch {
    return;
  }
};

type CaptureExceptionArgs = Parameters<typeof Sentry.captureException>;
type CaptureMessageArgs = Parameters<typeof Sentry.captureMessage>;

export const safeCaptureException = (...args: CaptureExceptionArgs) =>
  safelySend(() => Sentry.captureException(...args));

export const safeCaptureMessage = (...args: CaptureMessageArgs) =>
  safelySend(() => Sentry.captureMessage(...args));
