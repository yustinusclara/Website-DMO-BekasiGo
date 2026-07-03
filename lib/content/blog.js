// Blog — CMS-ready content model.
// Distinct from Stories: practical, update-oriented, SEO-focused.

import { IMG } from './homepage'

/* ------------------------------------------------------------------ */
/* Taxonomies                                                          */
/* ------------------------------------------------------------------ */

export const BLOG_CATEGORIES = [
  { id: 'all',       label: 'All posts',   color: '#0B3D3A' },
  { id: 'guides',    label: 'Guides',      color: '#1E7A72' },
  { id: 'news',      label: 'City News',   color: '#A34E2B' },
  { id: 'tips',      label: 'Tips',        color: '#B48A2D' },
  { id: 'openings',  label: 'New Openings', color: '#E27D5A' },
  { id: 'updates',   label: 'Updates',     color: '#155F58' },
  { id: 'reviews',   label: 'Reviews',     color: '#8C6A20' },
]

export const BLOG_SORTS = [
  { id: 'newest',   label: 'Newest first' },
  { id: 'featured', label: 'Featured first' },
  { id: 'name',     label: 'A → Z' },
]

/* ------------------------------------------------------------------ */
/* Blog posts                                                          */
/* ------------------------------------------------------------------ */

export const BLOG_POSTS = [
  {
    id: 'weekend-in-bekasi-48-hours',
    slug: 'the-perfect-weekend-in-bekasi-48-hour-guide',
    title: 'The perfect weekend in Bekasi: a 48-hour guide',
    subtitle: 'A tested, family-friendly itinerary that hits heritage, food, and modern icons—no rushing.',
    category: 'guides',
    featured: true,
    tags: ['weekend', 'itinerary', 'family'],
    cover: IMG.floatingCity,
    excerpt: 'A tested 48-hour itinerary balancing heritage sites, food institutions, and modern icons. Downloadable schedule at the bottom.',
    publishedAt: '2026-06-16',
    updatedAt:   '2026-06-20',
    readTime: '9 min read',
    author: { name: 'BekasiGo Editorial', role: 'Guides team' },
    relatedDestinationSlug: 'floating-smart-city',
    body: [
      { type: 'paragraph', text: 'Two days is enough to fall for Bekasi—as long as you plan the sequence right. This guide is the exact route the BekasiGo editors recommend to first-time visitors, tested across four different long weekends.' },
      { type: 'heading', text: 'Day 1 — Morning' },
      { type: 'ordered_list', items: [
        'Start with breakfast at a Pondok Gede warung around 06:30.',
        'Walk it off through the heritage corridor near Gedung Juang 45.',
        'Coffee at a modern spot in Jatiasih by 10:00.',
      ] },
      { type: 'heading', text: 'Day 1 — Afternoon' },
      { type: 'paragraph', text: 'Head south to Summarecon Bekasi. Skip the crowded main atrium and go straight to the digital-lounge food fair before 13:00.' },
      { type: 'note', text: 'Grab a table before 12:30 on weekends. Peak seating fills up by 13:15.' },
      { type: 'heading', text: 'Day 2 — Cultural morning' },
      { type: 'ordered_list', items: [
        'Klenteng Hok Lay Kiong opens at 08:00—sunrise light is worth it.',
        'Follow with Kampung Adat Kranggan if you can spare 90 minutes of driving.',
        'Late lunch back near Summarecon.',
      ] },
      { type: 'quote', text: 'Sequence beats speed. Bekasi rewards visitors who let the neighborhoods breathe between stops.' },
    ],
  },

  {
    id: 'lrt-jabodebek-latest-schedule',
    slug: 'lrt-jabodebek-latest-schedule-and-tips',
    title: 'LRT Jabodebek: latest schedule and tips (updated)',
    subtitle: 'Current headway, peak hours, and how to skip the queue at Stasiun Bekasi.',
    category: 'updates',
    featured: true,
    tags: ['transit', 'lrt', 'commute'],
    cover: IMG.stasiunBekasi,
    excerpt: 'The most current LRT Jabodebek schedule for Bekasi commuters, including peak-hour timings and station tips.',
    publishedAt: '2026-06-18',
    updatedAt:   '2026-06-25',
    readTime: '4 min read',
    author: { name: 'Rizki Andiansyah', role: 'Urbanism writer' },
    relatedDestinationSlug: 'stasiun-bekasi',
    body: [
      { type: 'paragraph', text: 'LRT Jabodebek has significantly changed how Bekasi commutes. Here’s the current operating window, plus a few practical station tips.' },
      { type: 'heading', text: 'Current schedule' },
      { type: 'list', items: [
        'Peak: every 6–8 minutes',
        'Off-peak: every 12 minutes',
        'Weekend late service: extended by ~1 hour since May 2025',
      ] },
      { type: 'heading', text: 'Station tips' },
      { type: 'ordered_list', items: [
        'Enter through the eastern gate before 07:30 to avoid the main queue.',
        'Top-up your card at the tenant kiosk—the machines are slower.',
        'Return trips are quieter after 20:15.',
      ] },
      { type: 'note', text: 'Schedule may vary during public holidays. Always check the official operator channel the day before.' },
    ],
  },

  {
    id: 'new-cafe-openings-june',
    slug: 'new-cafe-openings-in-bekasi-june-2026',
    title: 'New cafe openings in Bekasi: June 2026 edition',
    subtitle: 'Six recent debuts across Bekasi Selatan, Barat, and Jatiasih worth adding to your list.',
    category: 'openings',
    featured: false,
    tags: ['cafe', 'openings', 'food'],
    cover: IMG.pakuwonMall,
    excerpt: 'Six new cafes opened this month across Bekasi. We visited each—here’s what stood out.',
    publishedAt: '2026-06-10',
    readTime: '5 min read',
    author: { name: 'Salma Prawira', role: 'Food editor' },
    body: [
      { type: 'paragraph', text: 'June brought a small wave of new coffee spots across Bekasi. We visited each, timed the wait, and rated the wifi.' },
      { type: 'heading', text: 'Bekasi Selatan' },
      { type: 'subheading', text: 'Studio Kopi 42' },
      { type: 'paragraph', text: 'A tight 24-seat space with a strong single-origin lineup. Best matcha we’ve had this year.' },
      { type: 'subheading', text: 'Kopi Selatan' },
      { type: 'paragraph', text: 'Bright, minimalist, family-friendly. Cold brew is the pick.' },
      { type: 'heading', text: 'Bekasi Barat' },
      { type: 'subheading', text: 'Warung Kopi Jl. 18' },
      { type: 'paragraph', text: 'Kampung-style, unpretentious, cheapest option on the list.' },
    ],
  },

  {
    id: 'ramadan-timings-and-events',
    slug: 'ramadan-in-bekasi-timings-and-events-2026',
    title: 'Ramadan in Bekasi: timings, iftar spots, and events',
    subtitle: 'Where to break fast, what to expect at markets, and a running list of Ramadan programming.',
    category: 'guides',
    featured: false,
    tags: ['ramadan', 'iftar', 'food'],
    cover: IMG.kampungBali,
    excerpt: 'The essential BekasiGo guide to Ramadan—iftar spots, tarawih tips, and event listings across the city.',
    publishedAt: '2026-05-30',
    readTime: '7 min read',
    author: { name: 'BekasiGo Editorial', role: 'Guides team' },
    body: [
      { type: 'paragraph', text: 'Ramadan changes the rhythm of the city. Here is the practical guide.' },
      { type: 'heading', text: 'Best iftar spots' },
      { type: 'list', items: [
        'Kampung Bali Harapan Jaya — traditional Betawi-Balinese menu',
        'Summarecon Skywalk night market — modern casual',
        'Metropolitan Mall food court — crowd-safe, air-conditioned',
      ] },
      { type: 'note', text: 'Book iftar tables at popular restaurants by 15:00 during the first week of Ramadan.' },
    ],
  },

  {
    id: 'first-time-visitor-tips',
    slug: 'first-time-visitor-tips-for-bekasi',
    title: 'First-time visitor tips for Kota Bekasi',
    subtitle: 'A short list of practical things a first-time visitor to Bekasi will thank us for.',
    category: 'tips',
    featured: false,
    tags: ['first-timer', 'tips', 'practical'],
    cover: IMG.summareconMall,
    excerpt: 'The small, unglamorous tips that make your first Bekasi trip a lot easier.',
    publishedAt: '2026-05-22',
    readTime: '3 min read',
    author: { name: 'BekasiGo Editorial', role: 'Guides team' },
    body: [
      { type: 'list', items: [
        'Grab / Gojek is the fastest and cheapest way around.',
        'Carry small cash (Rp 20k – 100k notes) for warungs.',
        'Rain is often 15–25 minutes, then it clears. Wait it out.',
        'Mall parking fills fast on Sunday after 15:00.',
      ] },
      { type: 'note', text: 'Locals appreciate a polite “permisi” before asking a stranger for directions.' },
    ],
  },

  {
    id: 'gedung-juang-45-review',
    slug: 'gedung-juang-45-museum-review',
    title: 'Review: Gedung Juang 45 as a first Bekasi museum visit',
    subtitle: 'Is it worth the 45-minute detour? Short answer: yes—here is what to expect.',
    category: 'reviews',
    featured: false,
    tags: ['museum', 'heritage', 'review'],
    cover: IMG.gedungJuang45,
    excerpt: 'A quick, honest review of Gedung Juang 45 as an entry point into Bekasi’s heritage story.',
    publishedAt: '2026-05-14',
    readTime: '4 min read',
    author: { name: 'Aris Prasetyo', role: 'Contributing Editor' },
    relatedDestinationSlug: 'gedung-juang-45',
    body: [
      { type: 'paragraph', text: 'Gedung Juang 45 is compact, honest, and free of the museum-fatigue you can get in bigger institutions. Perfect first stop into the heritage layer of Bekasi.' },
      { type: 'heading', text: 'What we liked' },
      { type: 'list', items: [
        'Concise displays—won’t take more than 90 minutes',
        'Some artefacts have printed English translations',
        'Small café next door for a debrief',
      ] },
      { type: 'heading', text: 'What could be better' },
      { type: 'list', items: [
        'Interactive displays are limited',
        'Weekend crowds can bunch at the entrance',
      ] },
    ],
  },

  {
    id: 'summarecon-events-june',
    slug: 'summarecon-bekasi-events-this-june',
    title: 'Summarecon Bekasi: what’s on this June',
    subtitle: 'Rooftop cinema returns, digital art exhibitions open, and a food fair takes over the atrium.',
    category: 'news',
    featured: false,
    tags: ['summarecon', 'events', 'city'],
    cover: IMG.summareconMall,
    excerpt: 'The June programming lineup at Summarecon Bekasi, from rooftop cinema to a new digital art show.',
    publishedAt: '2026-05-30',
    readTime: '3 min read',
    author: { name: 'BekasiGo Editorial', role: 'City desk' },
    body: [
      { type: 'paragraph', text: 'Summarecon Bekasi is running a fuller-than-usual programming calendar this June. Highlights below.' },
      { type: 'list', items: [
        'Rooftop cinema every Saturday, 20:00',
        'Neon Kampung exhibition opens 01 August (advance tickets available)',
        'Food fair Vol. 8 takes over the atrium on 28 June',
      ] },
    ],
  },

  {
    id: 'family-day-trip-guide',
    slug: 'family-day-trip-guide-in-bekasi',
    title: 'A family day trip in Bekasi that actually works',
    subtitle: 'A parent-tested six-hour itinerary with proper breaks, food, and toddler-friendly stops.',
    category: 'guides',
    featured: false,
    tags: ['family', 'kids', 'itinerary'],
    cover: IMG.transParkMall,
    excerpt: 'A parent-tested six-hour Bekasi itinerary that keeps the whole family happy.',
    publishedAt: '2026-05-08',
    readTime: '6 min read',
    author: { name: 'BekasiGo Editorial', role: 'Guides team' },
    relatedDestinationSlug: 'trans-park-mall-juanda',
    body: [
      { type: 'paragraph', text: 'Family day trips work in Bekasi because most spots are close together. But you still need a plan.' },
      { type: 'heading', text: 'The route' },
      { type: 'ordered_list', items: [
        'Trans Park Mall Juanda — 09:30 (Trans Studio Mini opens 10:00)',
        'Lunch nearby by 12:30',
        'Grand Metropolitan Mall — nap-cover in stroller between 14:00–15:00',
        'Playground at Summarecon Downtown Walk — 15:30 onward',
      ] },
      { type: 'note', text: 'Bring a change of clothes for kids under 6. Splash zones are unpredictable.' },
    ],
  },

  {
    id: 'ojek-vs-taxi-costs',
    slug: 'ojek-vs-taxi-cost-guide-bekasi',
    title: 'Ojek vs taxi in Bekasi: a rough cost guide',
    subtitle: 'Which is cheaper for typical routes across the city—and when a taxi is actually worth it.',
    category: 'tips',
    featured: false,
    tags: ['transit', 'cost', 'guide'],
    cover: IMG.stasiunBekasi,
    excerpt: 'A rough cost breakdown of typical Bekasi trips by ojek vs taxi, with weather-adjusted advice.',
    publishedAt: '2026-04-28',
    readTime: '4 min read',
    author: { name: 'Rizki Andiansyah', role: 'Urbanism writer' },
    body: [
      { type: 'paragraph', text: 'For most short-to-mid trips inside Bekasi, ojek wins. But rain, luggage, and traffic can flip the math fast.' },
      { type: 'heading', text: 'Sample routes' },
      { type: 'list', items: [
        'Summarecon → Metropolitan Mall (~4 km): ojek ≈ Rp 15k, taxi ≈ Rp 35k',
        'Bekasi Timur → Jatiasih (~10 km): ojek ≈ Rp 25k, taxi ≈ Rp 60k',
        'Stasiun Bekasi → Summarecon: ojek ≈ Rp 12k, taxi ≈ Rp 25k',
      ] },
    ],
  },

  {
    id: 'road-closures-june',
    slug: 'road-closures-in-bekasi-this-week',
    title: 'Bekasi road closures and detours this week',
    subtitle: 'The BekasiGo weekly commute brief: closures, detours, and event traffic.',
    category: 'updates',
    featured: false,
    tags: ['traffic', 'updates', 'commute'],
    cover: IMG.monumenKaliBekasi,
    excerpt: 'This week’s road closures across Bekasi, plus suggested detours during the Cultural Festival weekend.',
    publishedAt: '2026-06-24',
    updatedAt:   '2026-06-25',
    readTime: '2 min read',
    author: { name: 'BekasiGo Editorial', role: 'City desk' },
    body: [
      { type: 'paragraph', text: 'Short weekly commute brief—updated Wednesday mornings.' },
      { type: 'list', items: [
        'Jl. Cut Mutia (Jatiasih) — partial closure Sat 08:00–16:00',
        'Alun-Alun perimeter roads — closed for Cultural Festival Fri–Sun',
        'Summarecon inner ring — event traffic expected Sat 17:00 onward',
      ] },
    ],
  },

  {
    id: 'best-time-visit-bekasi',
    slug: 'best-time-to-visit-bekasi',
    title: 'When is the best time to visit Bekasi?',
    subtitle: 'A month-by-month breakdown of weather, events, and the neighborhoods that shine each season.',
    category: 'guides',
    featured: false,
    tags: ['when-to-go', 'weather', 'guide'],
    cover: IMG.floatingCity,
    excerpt: 'A month-by-month guide to Bekasi’s weather and events—when to come, when to reconsider.',
    publishedAt: '2026-04-14',
    readTime: '6 min read',
    author: { name: 'BekasiGo Editorial', role: 'Guides team' },
    body: [
      { type: 'paragraph', text: 'Bekasi is a year-round city. But the weather and event calendar make some months noticeably better than others.' },
      { type: 'heading', text: 'Sweet spots' },
      { type: 'list', items: [
        'May – June: dry weather, Cultural Festival buildup',
        'August: Sedekah Bumi at Kranggan, art season kicks off',
        'October: cooler evenings, food festivals',
      ] },
      { type: 'heading', text: 'Skip if you can' },
      { type: 'list', items: [
        'January – mid February: heaviest rain window',
      ] },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Meta                                                                */
/* ------------------------------------------------------------------ */

export const BLOG_META = {
  totalCount: BLOG_POSTS.length,
  hero: {
    eyebrow: 'BekasiGo Blog',
    kicker: 'Practical writing from the city desk',
    title: 'Guides, updates, and news for exploring Bekasi.',
    subtitle: 'Short, useful, updated often. If Stories is our journal, this is our notebook.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Blog' },
    ],
  },
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function getPostBySlug(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null
}

export function getRelatedPosts(post, limit = 3) {
  if (!post) return []
  const sameCat = BLOG_POSTS.filter((p) => p.id !== post.id && p.category === post.category)
  const sameTag = BLOG_POSTS.filter((p) => p.id !== post.id && p.tags?.some((t) => post.tags?.includes(t)) && p.category !== post.category)
  const pool = [...sameCat, ...sameTag]
  const uniq = pool.filter((p, i, a) => a.findIndex((x) => x.id === p.id) === i)
  return uniq.slice(0, limit)
}

export function formatPostDate(iso, opts = {}) {
  const { short = false } = opts
  const d = new Date(iso)
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric', month: short ? 'short' : 'long', year: 'numeric',
  }).format(d)
}

// Extract headings from a post body for the Table of Contents.
export function extractToc(post) {
  return post.body
    .map((b, i) => ({ block: b, index: i }))
    .filter(({ block }) => block.type === 'heading' || block.type === 'subheading')
    .map(({ block, index }) => ({
      id: `h-${index}`,
      text: block.text,
      level: block.type === 'heading' ? 2 : 3,
    }))
}
