// Events — CMS-ready content model.
// Dates use ISO strings so the UI can compute
// “days until” and status categorization at render time.

import { IMG } from './homepage'

/* ------------------------------------------------------------------ */
/* Taxonomies                                                          */
/* ------------------------------------------------------------------ */

// Event categories — each maps to a token color for consistent theming.
export const EVENT_CATEGORIES = [
  { id: 'all',      label: 'All events',          color: '#0B3D3A' },
  { id: 'festival', label: 'Festivals',            color: '#E27D5A' },
  { id: 'music',    label: 'Music & Concert',      color: '#1E7A72' },
  { id: 'market',   label: 'Markets & Bazaars',    color: '#D4A94C' },
  { id: 'art',      label: 'Art & Exhibition',     color: '#B48A2D' },
  { id: 'sport',    label: 'Sport',                color: '#124F4A' },
  { id: 'food',     label: 'Food & Culinary',      color: '#A34E2B' },
  { id: 'culture',  label: 'Culture & Community',  color: '#8C6A20' },
  { id: 'family',   label: 'Family & Kids',        color: '#3F9186' },
]

// “When” chips — lightweight semantic date filters.
export const EVENT_WHEN = [
  { id: 'all',      label: 'Anytime' },
  { id: 'week',     label: 'This week' },
  { id: 'month',    label: 'This month' },
  { id: 'nextmonth',label: 'Next month' },
  { id: 'later',    label: 'Later this year' },
]

export const EVENT_SORTS = [
  { id: 'soonest',  label: 'Soonest first' },
  { id: 'featured', label: 'Featured first' },
  { id: 'name',     label: 'A → Z' },
]

/* ------------------------------------------------------------------ */
/* Events                                                              */
/* ------------------------------------------------------------------ */

export const EVENTS = [
  {
    id: 'bekasi-cultural-festival',
    slug: 'bekasi-cultural-festival-2026',
    title: 'Bekasi Cultural Festival 2026',
    category: 'festival',
    featured: true,
    startDate: '2026-07-12',
    endDate:   '2026-07-14',
    time: '10:00 – 22:00 WIB',
    price: 'Free entry',
    venue: {
      name: 'Alun-Alun Kota Bekasi',
      address: 'Jl. Ir. H. Juanda, Bekasi Timur',
      district: 'Bekasi Timur',
      coords: { lat: -6.2465, lng: 106.9982 },
    },
    image: IMG.kampungAdatKranggan,
    excerpt: 'A three-day city-wide celebration of Betawi, Sundanese, and Peranakan heritage — music, food, dance, and craft.',
    tags: ['heritage', 'family', 'outdoor'],
    organizer: 'Dinas Pariwisata Kota Bekasi',
    capacity: '20,000+ attendees expected',
  },
  {
    id: 'skyline-sunset-rooftop',
    slug: 'skyline-sunset-rooftop-series',
    title: 'Skyline Sunset Rooftop Series',
    category: 'music',
    featured: true,
    startDate: '2026-06-27',
    endDate:   null,
    time: '17:00 – 22:00 WIB',
    price: 'Rp 150k',
    venue: {
      name: 'Rooftop 42 · Summarecon Tower',
      address: 'Summarecon Bekasi, Bekasi Selatan',
      district: 'Bekasi Selatan',
      coords: { lat: -6.2358, lng: 106.9899 },
    },
    image: IMG.floatingCity,
    excerpt: 'Curated indie sets, golden hour views, and rooftop bar service — the city’s most-loved summer weekend series.',
    tags: ['music', 'rooftop', 'sunset'],
    organizer: 'BekasiGo x Rooftop 42',
    capacity: '400 pax',
  },
  {
    id: 'kranggan-adat-ceremony',
    slug: 'kranggan-adat-ceremony',
    title: 'Kampung Adat Kranggan — Sedekah Bumi',
    category: 'culture',
    featured: true,
    startDate: '2026-08-08',
    endDate:   '2026-08-10',
    time: 'Full day · traditional schedule',
    price: 'By donation',
    venue: {
      name: 'Kampung Adat Kranggan',
      address: 'Kranggan, Jatisampurna',
      district: 'Jatisampurna',
      coords: { lat: -6.3212, lng: 106.9302 },
    },
    image: IMG.kampungAdatKranggan,
    excerpt: 'A living, three-day Sundanese-Betawi harvest ritual open to respectful visitors.',
    tags: ['ritual', 'community', 'sundanese'],
    organizer: 'Adat Kranggan community council',
    capacity: 'Community-hosted',
  },
  {
    id: 'bekasi-food-fair-8',
    slug: 'bekasi-food-fair-vol-8',
    title: 'Bekasi Food Fair Vol. 8',
    category: 'food',
    featured: false,
    startDate: '2026-06-28',
    endDate:   null,
    time: '11:00 – 22:00 WIB',
    price: 'Free entry',
    venue: {
      name: 'Summarecon Mall Bekasi — Digital Lounge',
      address: 'Summarecon Bekasi, Bekasi Selatan',
      district: 'Bekasi Selatan',
      coords: { lat: -6.2369, lng: 106.9895 },
    },
    image: IMG.summareconMall,
    excerpt: '80+ homegrown F&B tenants, chef demos, and a Betawi tasting corner — come hungry.',
    tags: ['food', 'family', 'weekend'],
    organizer: 'Bekasi Culinary Association',
    capacity: 'Open access',
  },
  {
    id: 'indie-music-night',
    slug: 'indie-music-night-july',
    title: 'Indie Music Night — July Edition',
    category: 'music',
    featured: false,
    startDate: '2026-07-05',
    endDate: null,
    time: '19:30 – 23:30 WIB',
    price: 'Rp 90k presale · Rp 120k door',
    venue: {
      name: 'The Space — Pakuwon Bekasi',
      address: 'Pakuwon Mall, Bekasi Barat',
      district: 'Bekasi Barat',
      coords: { lat: -6.2481, lng: 106.9612 },
    },
    image: IMG.pakuwonMall,
    excerpt: 'Six local indie bands, one intimate room. Curated by BekasiGo Sounds.',
    tags: ['music', 'indie', 'nightlife'],
    organizer: 'BekasiGo Sounds',
    capacity: '300 pax',
  },
  {
    id: 'kids-discovery-fair',
    slug: 'kids-discovery-fair',
    title: 'Kids Discovery Fair',
    category: 'family',
    featured: false,
    startDate: '2026-07-19',
    endDate: null,
    time: '09:00 – 18:00 WIB',
    price: 'Rp 50k · kids free',
    venue: {
      name: 'Trans Park Mall Juanda',
      address: 'Jl. Juanda, Bekasi Timur',
      district: 'Bekasi Timur',
      coords: { lat: -6.2402, lng: 107.0011 },
    },
    image: IMG.transParkMall,
    excerpt: 'Science booths, hands-on crafts, and a mini stage — curated for kids under 12.',
    tags: ['kids', 'family', 'workshop'],
    organizer: 'Bekasi Family Network',
    capacity: '5,000 attendees',
  },
  {
    id: 'bekasi-marathon-2026',
    slug: 'bekasi-marathon-2026',
    title: 'Bekasi Marathon 2026',
    category: 'sport',
    featured: false,
    startDate: '2026-09-13',
    endDate: null,
    time: '05:00 gun time WIB',
    price: 'Rp 250k – Rp 550k by distance',
    venue: {
      name: 'Stadion Patriot Candrabhaga',
      address: 'Jl. Guntur, Bekasi Selatan',
      district: 'Bekasi Selatan',
      coords: { lat: -6.2489, lng: 106.9807 },
    },
    image: IMG.stadionPatriot,
    excerpt: 'Full · Half · 10K · 5K routes weaving through Bekasi’s neighborhoods and city landmarks.',
    tags: ['run', 'sport', 'community'],
    organizer: 'Pemkot Bekasi · KOI',
    capacity: '12,000 runners',
  },
  {
    id: 'weekend-book-bazaar',
    slug: 'weekend-book-bazaar',
    title: 'Weekend Book Bazaar',
    category: 'market',
    featured: false,
    startDate: '2026-06-21',
    endDate: null,
    time: '10:00 – 20:00 WIB',
    price: 'Free entry',
    venue: {
      name: 'Grand Metropolitan Mall',
      address: 'Jl. KH. Noer Ali, Bekasi Selatan',
      district: 'Bekasi Selatan',
      coords: { lat: -6.2411, lng: 106.9808 },
    },
    image: IMG.grandMetropolitanMall,
    excerpt: '35 indie publishers, second-hand finds, and reading circles across two floors.',
    tags: ['books', 'weekend', 'culture'],
    organizer: 'Bekasi Reading Society',
    capacity: 'Open access',
  },
  {
    id: 'heritage-walking-tour',
    slug: 'heritage-walking-tour-series',
    title: 'Heritage Walking Tour Series',
    category: 'culture',
    featured: false,
    startDate: '2026-06-22',
    endDate: '2026-12-27',
    time: 'Every Sunday · 07:00 – 10:00 WIB',
    price: 'Rp 75k · with guide',
    venue: {
      name: 'Meeting point — Gedung Juang 45',
      address: 'Jl. Sudirman, Bekasi Timur',
      district: 'Bekasi Timur',
      coords: { lat: -6.2489, lng: 107.0012 },
    },
    image: IMG.gedungJuang45,
    excerpt: 'A guided Sunday walk through Bekasi’s heritage corridor — monuments, kampungs, and stories.',
    tags: ['walk', 'heritage', 'weekend'],
    organizer: 'BekasiGo Guides',
    capacity: '20 walkers per session',
  },
  {
    id: 'neon-kampung-exhibition',
    slug: 'neon-kampung-exhibition',
    title: 'Digital Art Exhibition — Neon Kampung',
    category: 'art',
    featured: false,
    startDate: '2026-08-01',
    endDate:   '2026-08-30',
    time: '11:00 – 21:00 WIB (Closed Mon)',
    price: 'Rp 60k',
    venue: {
      name: 'Piramida Terbalik — Basement Gallery',
      address: 'Summarecon Bekasi, Bekasi Selatan',
      district: 'Bekasi Selatan',
      coords: { lat: -6.2352, lng: 106.9905 },
    },
    image: IMG.piramidaSummarecon,
    excerpt: 'An immersive digital exhibition reimagining Bekasi’s kampung streetscapes in neon-lit projection.',
    tags: ['art', 'digital', 'exhibition'],
    organizer: 'Bekasi Creative Hub',
    capacity: '250 per slot',
  },
  {
    id: 'bekasi-coffee-fest',
    slug: 'bekasi-coffee-fest',
    title: 'Bekasi Coffee Fest',
    category: 'food',
    featured: false,
    startDate: '2026-10-04',
    endDate:   '2026-10-05',
    time: '10:00 – 22:00 WIB',
    price: 'Rp 40k weekend pass',
    venue: {
      name: 'Metropolitan Mall Bekasi — Atrium',
      address: 'Jl. K.H. Noer Ali, Bekasi Selatan',
      district: 'Bekasi Selatan',
      coords: { lat: -6.2410, lng: 106.9791 },
    },
    image: IMG.metropolitanMall,
    excerpt: '60+ local roasters, barista showdowns, and single-origin tastings across two full days.',
    tags: ['coffee', 'weekend', 'food'],
    organizer: 'Bekasi Coffee Community',
    capacity: '8,000 attendees expected',
  },
  {
    id: 'wayang-modern-night',
    slug: 'wayang-modern-night',
    title: 'Wayang Modern Night',
    category: 'culture',
    featured: false,
    startDate: '2026-11-15',
    endDate: null,
    time: '19:30 – 22:00 WIB',
    price: 'Free · register in advance',
    venue: {
      name: 'Klenteng Hok Lay Kiong — Courtyard',
      address: 'Margahayu, Bekasi Timur',
      district: 'Bekasi Timur',
      coords: { lat: -6.2439, lng: 107.0060 },
    },
    image: IMG.hokLayKiong,
    excerpt: 'Modern wayang performance blending traditional stories with contemporary sound and light design.',
    tags: ['wayang', 'culture', 'performance'],
    organizer: 'Bekasi Heritage Council',
    capacity: '500 seats',
  },
  {
    id: 'nye-countdown-summarecon',
    slug: 'nye-countdown-summarecon',
    title: 'NYE Countdown — Summarecon Bekasi',
    category: 'festival',
    featured: false,
    startDate: '2026-12-31',
    endDate: null,
    time: '19:00 – 01:00 WIB',
    price: 'Free',
    venue: {
      name: 'Summarecon Downtown Walk',
      address: 'Summarecon Bekasi, Bekasi Selatan',
      district: 'Bekasi Selatan',
      coords: { lat: -6.2360, lng: 106.9902 },
    },
    image: IMG.summareconMall,
    excerpt: 'Concerts, food stalls, and midnight fireworks — the city’s biggest NYE gathering.',
    tags: ['nye', 'concert', 'fireworks'],
    organizer: 'Summarecon Bekasi',
    capacity: '35,000 attendees',
  },
]

/* ------------------------------------------------------------------ */
/* Meta                                                                */
/* ------------------------------------------------------------------ */

export const EVENT_META = {
  totalCount: EVENTS.length,
  hero: {
    eyebrow: 'Events',
    kicker: 'What’s happening now',
    title: 'The pulse of Bekasi—every festival, concert, and market.',
    subtitle:
      'From citywide cultural festivals to intimate rooftop sets, browse everything that makes a week in Kota Bekasi worth showing up for.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Events' },
    ],
  },
}

/* ------------------------------------------------------------------ */
/* Detail helpers                                                      */
/* ------------------------------------------------------------------ */

const CATEGORY_HIGHLIGHTS = {
  festival: ['Multi-day program', 'Family-friendly zones', 'Food & merch stalls'],
  music:    ['Curated line-up', 'Bar service', 'Photo-ready staging'],
  market:   ['Local vendors', 'Cash & QR pay', 'Weekend crowds'],
  art:      ['Timed entry slots', 'Guided tour available', 'Merch shop'],
  sport:    ['Warm-up zone', 'Medic support', 'Timing chips provided'],
  food:     ['Local tenants', 'Vegan options', 'Kid-friendly seating'],
  culture:  ['Traditional program', 'Interpreter available', 'Ritual protocols posted'],
  family:   ['Kids play zone', 'Nursing room', 'Stroller access'],
}

const CATEGORY_TIPS = {
  festival: ['Arrive by 17:00 for the best food-stall picks.', 'Bring cash for smaller tenants.', 'Wear layers — open-air, tropical weather.'],
  music:    ['Doors open 30 min before show.', 'Ticket = one drink voucher.', 'Photo-ok during opening acts.'],
  market:   ['Best browsing before 12:00.', 'Cash-preferred at some stalls.', 'Loyalty stamps redeemable next event.'],
  art:      ['Book a time slot to skip queue.', 'Bags stored at entry.', 'Photo-ok, no flash.'],
  sport:    ['Race pack pickup 2 days before.', 'Bring your ID card.', 'Post-event parking closes 12:00.'],
  food:     ['Bring an appetite AND cash.', 'Weekday visits are quieter.', 'Try the chef-collab menu.'],
  culture:  ['Dress respectfully.', 'Photography with permission.', 'Bring a small donation — optional but welcome.'],
  family:   ['Ticket bundles for 4+.', 'Family bathrooms clearly signed.', 'Stroller rental available.'],
}

export function eventStatus(event) {
  const today = new Date()
  const start = new Date(event.startDate)
  const end   = event.endDate ? new Date(event.endDate) : start
  if (end   < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return 'past'
  if (start > today) return 'upcoming'
  return 'ongoing'
}

export function daysUntil(event) {
  const today = new Date(); today.setHours(0,0,0,0)
  const start = new Date(event.startDate); start.setHours(0,0,0,0)
  return Math.round((start - today) / 86400000)
}

export function inWindow(event, window) {
  const today = new Date(); today.setHours(0,0,0,0)
  const start = new Date(event.startDate); start.setHours(0,0,0,0)

  switch (window) {
    case 'week': {
      const wkEnd = new Date(today); wkEnd.setDate(today.getDate() + 7)
      return start >= today && start <= wkEnd
    }
    case 'month': {
      return start.getFullYear() === today.getFullYear() && start.getMonth() === today.getMonth() && start >= today
    }
    case 'nextmonth': {
      const nm = new Date(today.getFullYear(), today.getMonth() + 1, 1)
      const nmEnd = new Date(today.getFullYear(), today.getMonth() + 2, 0)
      return start >= nm && start <= nmEnd
    }
    case 'later': {
      const nm = new Date(today.getFullYear(), today.getMonth() + 2, 1)
      return start >= nm
    }
    case 'all':
    default:
      return true
  }
}

export function buildEventDetail(evt) {
  if (!evt) return null
  const cat = evt.category
  return {
    ...evt,
    highlights: evt.highlights ?? CATEGORY_HIGHLIGHTS[cat] ?? CATEGORY_HIGHLIGHTS.festival,
    tips:       evt.tips       ?? CATEGORY_TIPS[cat]       ?? CATEGORY_TIPS.festival,
    description: evt.description ?? [
      `${evt.title} is one of the most anticipated ${cat === 'sport' ? 'sports events' : cat === 'music' ? 'music nights' : cat === 'festival' ? 'city-wide festivals' : cat === 'family' ? 'family programs' : cat === 'art' ? 'exhibitions' : cat === 'culture' ? 'cultural gatherings' : cat === 'food' ? 'culinary events' : 'weekend markets'} on the Bekasi calendar. Expect it to fill up early and stay lively through the evening.`,
      `Held at ${evt.venue.name} in ${evt.venue.district}, this edition is designed to be accessible, family-safe, and locally hosted. The BekasiGo guide recommends arriving early to get the fullest experience.`,
      `Registration and updates are managed by ${evt.organizer}. Follow official channels for last-minute schedule changes.`,
    ],
    schedule: evt.schedule ?? [
      { time: 'Doors open',   item: 'Welcome, check-in, kick-off setup' },
      { time: 'Main program', item: 'Featured segment for this edition' },
      { time: 'Community',     item: 'Food, mingling, and photo moments' },
      { time: 'Wrap',          item: 'Closing act and safe dispatch' },
    ],
  }
}

export function getEventBySlug(slug) {
  const base = EVENTS.find((e) => e.slug === slug)
  return base ? buildEventDetail(base) : null
}

export function getRelatedEvents(evt, limit = 3) {
  if (!evt) return []
  const sameCat = EVENTS.filter((e) => e.id !== evt.id && e.category === evt.category)
  const sameDist = EVENTS.filter((e) => e.id !== evt.id && e.venue.district === evt.venue.district && e.category !== evt.category)
  const pool = [...sameCat, ...sameDist]
  const uniq = pool.filter((e, i, a) => a.findIndex((x) => x.id === e.id) === i)
  return uniq.slice(0, limit)
}

/**
 * Formatting helpers used across cards and detail pages.
 */
export function formatEventDate(evt, opts = {}) {
  const { short = false } = opts
  const start = new Date(evt.startDate)
  const end   = evt.endDate ? new Date(evt.endDate) : null
  const fmt = new Intl.DateTimeFormat('en-GB', {
    day:  'numeric',
    month: short ? 'short' : 'long',
    year: 'numeric',
  })
  if (!end || evt.startDate === evt.endDate) return fmt.format(start)
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()
  if (sameMonth) {
    const shortFmt = new Intl.DateTimeFormat('en-GB', { month: short ? 'short' : 'long', year: 'numeric' })
    return `${start.getDate()} – ${end.getDate()} ${shortFmt.format(end)}`
  }
  return `${fmt.format(start)} – ${fmt.format(end)}`
}

export function eventDayParts(evt) {
  const start = new Date(evt.startDate)
  return {
    day:   start.getDate(),
    month: new Intl.DateTimeFormat('en-GB', { month: 'short' }).format(start).toUpperCase(),
    year:  start.getFullYear(),
    weekday: new Intl.DateTimeFormat('en-GB', { weekday: 'short' }).format(start),
  }
}
