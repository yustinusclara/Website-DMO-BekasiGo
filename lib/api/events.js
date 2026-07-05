/**
 * lib/api/events.js
 *
 * Data access layer for Events.
 * Currently serves from static content files.
 * TODO (A-03): Replace with Supabase queries when DB is wired.
 */

import {
  EVENTS,
  getEventBySlug,
  getRelatedEvents,
  eventStatus,
} from '@/lib/content/events'

/**
 * Fetch all published events.
 * @returns {Promise<Array>}
 */
export async function fetchEvents() {
  // TODO: replace with supabase.from('events').select('*').eq('publish_status', 'published').order('event_start', { ascending: true })
  return EVENTS
}

/**
 * Fetch a single event by slug.
 * @param {string} slug
 * @returns {Promise<Object|null>}
 */
export async function fetchEventBySlug(slug) {
  // TODO: replace with supabase.from('events').select('*').eq('slug', slug).single()
  return getEventBySlug(slug) ?? null
}

/**
 * Fetch events related to a given event.
 * @param {Object} event
 * @param {number} limit
 * @returns {Promise<Array>}
 */
export async function fetchRelatedEvents(event, limit = 3) {
  return getRelatedEvents(event, limit)
}

/**
 * Get the computed status label for an event.
 * @param {Object} event
 * @returns {string}
 */
export { eventStatus }
