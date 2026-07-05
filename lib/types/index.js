/**
 * lib/types/index.js
 *
 * Shared type definitions for BekasiGo via JSDoc @typedef.
 * These serve as the canonical shape for all content entities.
 * When migrating to TypeScript (A-10), convert these to .ts interfaces.
 */

/**
 * @typedef {Object} Destination
 * @property {string} id
 * @property {string} title
 * @property {string} slug
 * @property {string} excerpt
 * @property {string} [description]
 * @property {string} category      - e.g. 'heritage', 'urban', 'nature', 'family', 'shopping'
 * @property {string[]} [tags]
 * @property {string} district      - e.g. 'Bekasi Barat', 'Bekasi Timur'
 * @property {number} [lat]
 * @property {number} [lng]
 * @property {string} image         - Cloudinary URL
 * @property {string[]} [gallery]
 * @property {boolean} [featured]
 * @property {'published'|'draft'} publish_status
 * @property {string} [opening_hours]
 * @property {boolean} [family_friendly]
 * @property {number} [planner_priority_score]
 */

/**
 * @typedef {Object} Event
 * @property {string} id
 * @property {string} title
 * @property {string} slug
 * @property {string} excerpt
 * @property {string} [content]
 * @property {string} venue
 * @property {string} event_start   - ISO date string
 * @property {string} [event_end]   - ISO date string
 * @property {string} category
 * @property {string[]} [tags]
 * @property {string} image         - Cloudinary URL
 * @property {boolean} [featured]
 * @property {'published'|'draft'} publish_status
 */

/**
 * @typedef {Object} Story
 * @property {string} id
 * @property {string} title
 * @property {string} slug
 * @property {string} excerpt
 * @property {Object} cover
 * @property {string} cover.image   - Cloudinary URL
 * @property {string} [cover.credit]
 * @property {string} category      - DMO editorial category
 * @property {string[]} [tags]
 * @property {string} publish_date  - ISO date string
 * @property {boolean} [featured]
 * @property {'published'|'draft'} publish_status
 * @property {Object[]} [body]      - Rich content blocks
 */

/**
 * @typedef {Object} BlogPost
 * @property {string} id
 * @property {string} title
 * @property {string} slug
 * @property {string} excerpt
 * @property {string} cover         - Cloudinary URL
 * @property {string} category      - e.g. 'Travel Tips', 'Culinary Guide'
 * @property {string[]} [tags]
 * @property {string} author
 * @property {string} publishedAt   - ISO date string
 * @property {boolean} [featured]
 * @property {string} [relatedDestinationSlug]
 * @property {string} [seoTitle]
 * @property {string} [seoDescription]
 * @property {'published'|'draft'} publish_status
 */

/**
 * @typedef {Object} Restaurant
 * @property {string} id
 * @property {string} name
 * @property {string} slug
 * @property {string} summary
 * @property {string} cuisine_type
 * @property {string} address
 * @property {string} district
 * @property {number} [lat]
 * @property {number} [lng]
 * @property {string} [opening_hours]
 * @property {'$'|'$$'|'$$$'} price_tier
 * @property {string} image         - Cloudinary URL
 * @property {boolean} [featured]
 * @property {'published'|'draft'} publish_status
 */

/**
 * @typedef {Object} Hotel
 * @property {string} id
 * @property {string} name
 * @property {string} slug
 * @property {string} summary
 * @property {string} hotel_type
 * @property {string} address
 * @property {string} district
 * @property {number} [lat]
 * @property {number} [lng]
 * @property {string[]} [facilities]
 * @property {'$'|'$$'|'$$$'} price_tier
 * @property {string} image         - Cloudinary URL
 * @property {boolean} [featured]
 * @property {'published'|'draft'} publish_status
 */

/**
 * @typedef {Object} TransportNode
 * @property {string} id
 * @property {string} name
 * @property {string} slug
 * @property {'LRT'|'KRL'|'Transjakarta'|'Bus'|'Other'} transport_type
 * @property {string} address
 * @property {string} district
 * @property {number} [lat]
 * @property {number} [lng]
 * @property {string} [access_notes]
 * @property {string} [image]
 * @property {'published'|'draft'} publish_status
 */

/**
 * @typedef {Object} MapMarker
 * @property {string} id
 * @property {string} name
 * @property {'destination'|'restaurant'|'hotel'|'transport'} type
 * @property {string} [category]
 * @property {number} lat
 * @property {number} lng
 * @property {string} [short_description]
 * @property {string} [image]
 * @property {string} [slug]
 */

/**
 * @typedef {Object} PlannerInput
 * @property {number} duration       - number of days
 * @property {string[]} interests    - array of interest keys
 * @property {'budget'|'mid'|'premium'} budget
 * @property {string} starting_point - free text or district name
 * @property {'relaxed'|'packed'|'balanced'} travel_style
 * @property {boolean} [family_mode]
 */

/**
 * @typedef {Object} PlannerResult
 * @property {string} title
 * @property {Object[]} days
 * @property {Object[]} days[].stops
 * @property {string} days[].stops[].name
 * @property {string} days[].stops[].time
 * @property {string} [days[].stops[].type]
 * @property {number} [days[].stops[].lat]
 * @property {number} [days[].stops[].lng]
 * @property {string[]} [transport_notes]
 * @property {string} [summary]
 */
