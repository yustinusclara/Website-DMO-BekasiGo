/**
 * lib/api/index.js
 *
 * Barrel export for all BekasiGo API/data-access layer modules.
 * Import from here when you need multiple domains in one page.
 *
 * Usage:
 *   import { fetchDestinations, fetchEvents } from '@/lib/api'
 */

export * from './destinations'
export * from './events'
export * from './stories'
export * from './blogs'
