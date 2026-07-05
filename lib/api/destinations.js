/**
 * lib/api/destinations.js
 *
 * Data access layer for Destinations.
 * Currently serves from static content files.
 * TODO (A-03): Replace with Supabase queries when DB is wired.
 */

import {
  DESTINATIONS,
  getDestinationBySlug,
  getRelatedDestinations,
  getFeaturedDestinations,
} from '@/lib/content/destinations'

/**
 * Fetch all published destinations.
 * @returns {Promise<Array>}
 */
export async function fetchDestinations() {
  // TODO: replace with supabase.from('destinations').select('*').eq('publish_status', 'published')
  return DESTINATIONS
}

/**
 * Fetch a single destination by slug.
 * @param {string} slug
 * @returns {Promise<Object|null>}
 */
export async function fetchDestinationBySlug(slug) {
  // TODO: replace with supabase.from('destinations').select('*').eq('slug', slug).single()
  return getDestinationBySlug(slug) ?? null
}

/**
 * Fetch destinations related to the given one.
 * @param {Object} destination
 * @param {number} limit
 * @returns {Promise<Array>}
 */
export async function fetchRelatedDestinations(destination, limit = 4) {
  return getRelatedDestinations(destination, limit)
}

/**
 * Fetch featured destinations for homepage/listing highlights.
 * @param {number} limit
 * @returns {Promise<Array>}
 */
export async function fetchFeaturedDestinations(limit = 6) {
  return getFeaturedDestinations ? getFeaturedDestinations(limit) : DESTINATIONS.slice(0, limit)
}
