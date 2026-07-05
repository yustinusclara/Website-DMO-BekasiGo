/**
 * lib/api/stories.js
 *
 * Data access layer for City Stories.
 * Currently serves from static content files.
 * TODO (A-03): Replace with Supabase queries when DB is wired.
 *
 * IMPORTANT: Stories = premium editorial DMO content (long-form, immersive).
 * Keep this module SEPARATE from lib/api/blogs.js at all times.
 */

import {
  STORIES,
  getStoryBySlug,
  getRelatedStories,
  formatStoryDate,
  STORY_COLUMNS,
  STORY_META,
} from '@/lib/content/stories'

/**
 * Fetch all published stories.
 * @returns {Promise<Array>}
 */
export async function fetchStories() {
  // TODO: replace with supabase.from('stories').select('*').eq('publish_status', 'published').order('publish_date', { ascending: false })
  return STORIES
}

/**
 * Fetch a single story by slug.
 * @param {string} slug
 * @returns {Promise<Object|null>}
 */
export async function fetchStoryBySlug(slug) {
  // TODO: replace with supabase.from('stories').select('*').eq('slug', slug).single()
  return getStoryBySlug(slug) ?? null
}

/**
 * Fetch stories related to a given story.
 * @param {Object} story
 * @param {number} limit
 * @returns {Promise<Array>}
 */
export async function fetchRelatedStories(story, limit = 3) {
  return getRelatedStories(story, limit)
}

export { formatStoryDate, STORY_COLUMNS, STORY_META }
