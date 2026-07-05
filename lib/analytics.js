/**
 * BekasiGo Performance-safe Monitoring & Analytics Hub.
 *
 * Designed to capture critical business events (itinerary generation, search triggers, CRUD operations)
 * and error conditions silently. Utilizes requestIdleCallback where available to ensure zero-block on
 * interactive UI thread.
 */

const IS_DEV = process.env.NODE_ENV !== 'production'

export function logEvent(eventName, params = {}) {
  const payload = {
    event: eventName,
    params,
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : 'ssr'
  }

  // Non-blocking processing
  const executeLogging = () => {
    if (IS_DEV) {
      console.info(`[Analytics] Event: ${eventName}`, payload)
    }
    
    // Future expansion: Send to a serverless logging API endpoint
    // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(payload) }).catch(() => {})
  }

  if (typeof window !== 'undefined' && window.requestIdleCallback) {
    window.requestIdleCallback(executeLogging)
  } else {
    setTimeout(executeLogging, 0)
  }
}

export function logError(error, context = {}) {
  const payload = {
    message: error?.message || String(error),
    stack: error?.stack,
    context,
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : 'ssr'
  }

  const executeErrorLogging = () => {
    console.error(`[Monitor] Captured Error: ${payload.message}`, payload)
    
    // Future expansion: Send to crash reporting backend (Sentry/Logflare/Supabase log table)
  }

  if (typeof window !== 'undefined' && window.requestIdleCallback) {
    window.requestIdleCallback(executeErrorLogging)
  } else {
    setTimeout(executeErrorLogging, 0)
  }
}
