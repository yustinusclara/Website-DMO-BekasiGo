/**
 * lib/api/blogs.js
 *
 * Data access layer for Blog posts.
 * Currently serves from static content files.
 * TODO (A-03): Replace with Supabase queries when DB is wired.
 *
 * IMPORTANT: Blog = SEO content, travel tips, city updates, practical guides.
 * Keep this module SEPARATE from lib/api/stories.js at all times.
 */

import {
  BLOG_POSTS,
  getPostBySlug,
  getRelatedPosts,
} from '@/lib/content/blog'

/**
 * Fetch all published blog posts.
 * @returns {Promise<Array>}
 */
export async function fetchBlogPosts() {
  // TODO: replace with supabase.from('blogs').select('*').eq('publish_status', 'published').order('publish_date', { ascending: false })
  return BLOG_POSTS
}

/**
 * Fetch a single blog post by slug.
 * @param {string} slug
 * @returns {Promise<Object|null>}
 */
export async function fetchBlogPostBySlug(slug) {
  // TODO: replace with supabase.from('blogs').select('*').eq('slug', slug).single()
  return getPostBySlug(slug) ?? null
}

/**
 * Fetch blog posts related to a given post.
 * @param {Object} post
 * @param {number} limit
 * @returns {Promise<Array>}
 */
export async function fetchRelatedPosts(post, limit = 3) {
  return getRelatedPosts(post, limit)
}

/**
 * Fetch featured blog posts for homepage.
 * @param {number} limit
 * @returns {Promise<Array>}
 */
export async function fetchFeaturedPosts(limit = 3) {
  // TODO: supabase.from('blogs').select('*').eq('featured_post', true).eq('publish_status', 'published').limit(limit)
  return BLOG_POSTS.filter(p => p.featured).slice(0, limit)
}
