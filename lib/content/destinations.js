// Destinations — CMS-ready content model.
// Ready to be swapped with a real API (MongoDB / Supabase) later
// by keeping the same shape.

import { IMG } from './homepage'

/* ------------------------------------------------------------------ */
/* Taxonomies                                                          */
/* ------------------------------------------------------------------ */

// Category slugs align with tokens.categories for consistent theming.
export const DEST_CATEGORIES = [
  { id: 'all',       label: 'All',              count: 24 },
  { id: 'heritage',  label: 'Heritage & Culture', count: 5 },
  { id: 'urban',     label: 'Urban Lifestyle',   count: 5 },
  { id: 'culinary',  label: 'Food & Drink',      count: 3 },
  { id: 'nature',    label: 'Nature & Waterfront', count: 2 },
  { id: 'family',    label: 'Family',            count: 3 },
  { id: 'shopping',  label: 'Shopping',          count: 3 },
  { id: 'transit',   label: 'Transit',           count: 1 },
  { id: 'sport',     label: 'Sport',             count: 2 },
]

export const DEST_DISTRICTS = [
  { id: 'all',              label: 'All districts' },
  { id: 'bekasi-selatan',   label: 'Bekasi Selatan' },
  { id: 'bekasi-timur',     label: 'Bekasi Timur' },
  { id: 'bekasi-barat',     label: 'Bekasi Barat' },
  { id: 'bekasi-utara',     label: 'Bekasi Utara' },
  { id: 'medan-satria',     label: 'Medan Satria' },
  { id: 'pondok-gede',      label: 'Pondok Gede' },
  { id: 'jatiasih',          label: 'Jatiasih' },
  { id: 'jatisampurna',      label: 'Jatisampurna' },
  { id: 'rawalumbu',         label: 'Rawalumbu' },
  { id: 'mustika-jaya',      label: 'Mustika Jaya' },
]

export const DEST_SORTS = [
  { id: 'featured',  label: 'Featured first' },
  { id: 'popular',   label: 'Most popular' },
  { id: 'rating',    label: 'Highest rated' },
  { id: 'az',        label: 'A → Z' },
]

/* ------------------------------------------------------------------ */
/* Destinations                                                        */
/* ------------------------------------------------------------------ */

export const DESTINATIONS = [
  {
    id: 'floating-smart-city',
    slug: 'floating-smart-city',
    title: 'Kota Bekasi Floating Smart City',
    category: 'urban',
    district: 'bekasi-selatan',
    image: IMG.floatingCity,
    excerpt: 'The signature aerial view of Kota Bekasi—where the modern skyline redefines what a satellite city can look like.',
    tags: ['landmark', 'skyline', 'smart-city'],
    rating: 4.9, reviews: 3210, duration: '1–2 hrs', fee: 'Free viewpoint',
    featured: true, popular: true,
  },
  {
    id: 'hok-lay-kiong',
    slug: 'hok-lay-kiong',
    title: 'Klenteng Hok Lay Kiong',
    category: 'heritage',
    district: 'bekasi-timur',
    image: IMG.hokLayKiong,
    excerpt: 'Bekasi’s oldest Chinese temple—still a living center of ritual since the 18th century.',
    tags: ['temple', 'peranakan', 'historic'],
    rating: 4.8, reviews: 1240, duration: '30–60 min', fee: 'Free',
    featured: true, popular: true,
  },
  {
    id: 'gedung-juang-45',
    slug: 'gedung-juang-45',
    title: 'Gedung Juang 45',
    category: 'heritage',
    district: 'bekasi-timur',
    image: IMG.gedungJuang45,
    excerpt: 'A colonial-era building turned museum, honoring Bekasi’s role in Indonesia’s independence movement.',
    tags: ['museum', 'colonial', 'history'],
    rating: 4.6, reviews: 640, duration: '45–90 min', fee: 'Rp 10,000',
    featured: true, popular: false,
  },
  {
    id: 'kampung-adat-kranggan',
    slug: 'kampung-adat-kranggan',
    title: 'Kampung Adat Kranggan',
    category: 'heritage',
    district: 'jatisampurna',
    image: IMG.kampungAdatKranggan,
    excerpt: 'A Sundanese-Betawi cultural village keeping traditional ceremonies alive at the city’s green edge.',
    tags: ['kampung', 'ritual', 'community'],
    rating: 4.7, reviews: 512, duration: '2–3 hrs', fee: 'By donation',
    featured: true, popular: false,
  },
  {
    id: 'monumen-perjuangan',
    slug: 'monumen-perjuangan',
    title: 'Monumen Perjuangan Rakyat Bekasi',
    category: 'heritage',
    district: 'bekasi-selatan',
    image: IMG.monumenPerjuangan,
    excerpt: 'A striking monument commemorating the struggle of the people of Bekasi during the revolution.',
    tags: ['monument', 'history', 'public'],
    rating: 4.5, reviews: 380, duration: '15–30 min', fee: 'Free',
    featured: false, popular: false,
  },
  {
    id: 'monumen-kali-bekasi',
    slug: 'monumen-kali-bekasi',
    title: 'Monumen Kali Bekasi',
    category: 'heritage',
    district: 'bekasi-timur',
    image: IMG.monumenKaliBekasi,
    excerpt: 'Standing beside the river the city is named after—a tribute to a battle that defined a generation.',
    tags: ['monument', 'river', 'landmark'],
    rating: 4.4, reviews: 290, duration: '20–30 min', fee: 'Free',
    featured: false, popular: false,
  },
  {
    id: 'piramida-summarecon',
    slug: 'piramida-terbalik-summarecon',
    title: 'Piramida Terbalik Summarecon',
    category: 'urban',
    district: 'bekasi-selatan',
    image: IMG.piramidaSummarecon,
    excerpt: 'The inverted-pyramid architectural landmark that has become one of Bekasi’s most photographed spots.',
    tags: ['landmark', 'architecture', 'photo-spot'],
    rating: 4.7, reviews: 1820, duration: '30–60 min', fee: 'Free',
    featured: true, popular: true,
  },
  {
    id: 'summarecon-mall',
    slug: 'summarecon-mall-bekasi',
    title: 'Summarecon Mall Bekasi',
    category: 'urban',
    district: 'bekasi-selatan',
    image: IMG.summareconMall,
    excerpt: 'A modern retail and lifestyle hub with rooftop dining, art fairs, and weekend markets.',
    tags: ['mall', 'lifestyle', 'rooftop'],
    rating: 4.6, reviews: 4210, duration: '2–4 hrs', fee: 'Free entry',
    featured: true, popular: true,
  },
  {
    id: 'grand-metropolitan-mall',
    slug: 'grand-metropolitan-mall',
    title: 'Grand Metropolitan Mall',
    category: 'shopping',
    district: 'bekasi-selatan',
    image: IMG.grandMetropolitanMall,
    excerpt: 'One of Bekasi’s largest malls—mid-range fashion, cinema, and family entertainment under one roof.',
    tags: ['mall', 'family', 'cinema'],
    rating: 4.5, reviews: 3120, duration: '2–4 hrs', fee: 'Free entry',
    featured: false, popular: true,
  },
  {
    id: 'metropolitan-mall',
    slug: 'metropolitan-mall-bekasi',
    title: 'Metropolitan Mall Bekasi',
    category: 'shopping',
    district: 'bekasi-selatan',
    image: IMG.metropolitanMall,
    excerpt: 'The classic Bekasi shopping destination, anchored by department stores and long-loved food courts.',
    tags: ['mall', 'shopping', 'foodcourt'],
    rating: 4.4, reviews: 2810, duration: '2–3 hrs', fee: 'Free entry',
    featured: false, popular: false,
  },
  {
    id: 'pakuwon-mall',
    slug: 'pakuwon-mall-bekasi',
    title: 'Pakuwon Mall Bekasi',
    category: 'shopping',
    district: 'bekasi-barat',
    image: IMG.pakuwonMall,
    excerpt: 'A newer premium retail destination with international brands and a rich casual-dining lineup.',
    tags: ['mall', 'premium', 'dining'],
    rating: 4.7, reviews: 1650, duration: '2–3 hrs', fee: 'Free entry',
    featured: false, popular: true,
  },
  {
    id: 'trans-park-mall',
    slug: 'trans-park-mall-juanda',
    title: 'Trans Park Mall Juanda',
    category: 'family',
    district: 'bekasi-timur',
    image: IMG.transParkMall,
    excerpt: 'A family-friendly mall with Trans Studio Mini, indoor play, and a Transmart under the same roof.',
    tags: ['mall', 'family', 'kids'],
    rating: 4.5, reviews: 2110, duration: '3–5 hrs', fee: 'Free entry',
    featured: false, popular: false,
  },
  {
    id: 'kampung-bali',
    slug: 'kampung-bali-harapan-jaya',
    title: 'Kampung Bali Harapan Jaya',
    category: 'culinary',
    district: 'bekasi-utara',
    image: IMG.kampungBali,
    excerpt: 'A Balinese-inspired kampung area with authentic warungs, ceremonial temples, and cultural events.',
    tags: ['kampung', 'balinese', 'warung'],
    rating: 4.6, reviews: 840, duration: '1–2 hrs', fee: 'Free',
    featured: false, popular: false,
  },
  {
    id: 'stasiun-bekasi',
    slug: 'stasiun-bekasi',
    title: 'Stasiun Bekasi',
    category: 'transit',
    district: 'bekasi-timur',
    image: IMG.stasiunBekasi,
    excerpt: 'The main rail hub—KRL, intercity, and now LRT connections make this the fastest way in and out.',
    tags: ['transit', 'krl', 'lrt'],
    rating: 4.3, reviews: 1220, duration: 'Pass-through', fee: 'Ticket only',
    featured: false, popular: false,
  },
  {
    id: 'stadion-patriot',
    slug: 'stadion-patriot-candrabhaga',
    title: 'Stadion Patriot Candrabhaga',
    category: 'sport',
    district: 'bekasi-selatan',
    image: IMG.stadionPatriot,
    excerpt: 'The city’s multi-purpose stadium—home ground to Persipasi and host to major events.',
    tags: ['stadium', 'football', 'events'],
    rating: 4.5, reviews: 940, duration: 'Event-based', fee: 'Varies',
    featured: false, popular: true,
  },
  {
    id: 'situ-rawa-gede',
    slug: 'situ-rawa-gede',
    title: 'Situ Rawa Gede',
    category: 'nature',
    district: 'mustika-jaya',
    image: IMG.situRawaGede,
    excerpt: 'A green-fringed lake area with jogging paths and small warungs—a rare quiet corner of the city.',
    tags: ['lake', 'nature', 'jog'],
    rating: 4.4, reviews: 610, duration: '1–2 hrs', fee: 'Free',
    featured: false, popular: false,
  },
  {
    id: 'warung-soto-mie',
    slug: 'warung-soto-mie-legendaris',
    title: 'Warung Soto Mie Legendaris',
    category: 'culinary',
    district: 'pondok-gede',
    image: IMG.kampungBali,
    excerpt: 'A decades-old warung serving Bekasi-style soto mie that regulars swear by—best before 11 AM.',
    tags: ['warung', 'soto', 'breakfast'],
    rating: 4.8, reviews: 480, duration: '30–60 min', fee: 'Rp 20k–35k',
    featured: false, popular: true,
  },
  {
    id: 'kopi-kampung',
    slug: 'kopi-kampung-jatiasih',
    title: 'Kopi Kampung Jatiasih',
    category: 'culinary',
    district: 'jatiasih',
    image: IMG.pakuwonMall,
    excerpt: 'Modern coffee culture in a kampung setting—slow bars, local beans, and long conversations.',
    tags: ['coffee', 'cafe', 'wifi'],
    rating: 4.6, reviews: 320, duration: '1–2 hrs', fee: 'Rp 25k–50k',
    featured: false, popular: false,
  },
  {
    id: 'taman-tegal-danas',
    slug: 'taman-tegal-danas',
    title: 'Taman Tegal Danas',
    category: 'nature',
    district: 'rawalumbu',
    image: IMG.situRawaGede,
    excerpt: 'A neighborhood park loved by joggers and families for its shaded paths and open-air fitness zones.',
    tags: ['park', 'family', 'jog'],
    rating: 4.3, reviews: 260, duration: '30–60 min', fee: 'Free',
    featured: false, popular: false,
  },
  {
    id: 'playdate-kids-arena',
    slug: 'playdate-kids-arena',
    title: 'Playdate Kids Arena',
    category: 'family',
    district: 'bekasi-barat',
    image: IMG.transParkMall,
    excerpt: 'Indoor play arena for kids under 12—soft blocks, climbing walls, and creative rooms.',
    tags: ['kids', 'indoor', 'birthday'],
    rating: 4.5, reviews: 410, duration: '2–3 hrs', fee: 'Rp 80k / kid',
    featured: false, popular: false,
  },
  {
    id: 'aquatic-arena',
    slug: 'bekasi-aquatic-arena',
    title: 'Bekasi Aquatic Arena',
    category: 'sport',
    district: 'medan-satria',
    image: IMG.stadionPatriot,
    excerpt: 'Public swimming pools including an olympic-length lane pool and a family shallow area.',
    tags: ['pool', 'swim', 'family'],
    rating: 4.4, reviews: 380, duration: '1–3 hrs', fee: 'Rp 30k–50k',
    featured: false, popular: false,
  },
  {
    id: 'skywalk-summarecon',
    slug: 'skywalk-summarecon',
    title: 'Skywalk Summarecon',
    category: 'urban',
    district: 'bekasi-selatan',
    image: IMG.piramidaSummarecon,
    excerpt: 'A pedestrian skywalk connecting shopping, dining, and living—one of the best sunset walks in town.',
    tags: ['skywalk', 'sunset', 'urban'],
    rating: 4.6, reviews: 720, duration: '30–60 min', fee: 'Free',
    featured: false, popular: false,
  },
  {
    id: 'rooftop-cinema',
    slug: 'rooftop-cinema-bekasi',
    title: 'Rooftop Cinema Bekasi',
    category: 'urban',
    district: 'bekasi-selatan',
    image: IMG.summareconMall,
    excerpt: 'Weekend rooftop screenings above the Summarecon towers—bring a jacket after 8 PM.',
    tags: ['cinema', 'rooftop', 'weekend'],
    rating: 4.7, reviews: 210, duration: '2–3 hrs', fee: 'Rp 75k',
    featured: false, popular: true,
  },
  {
    id: 'family-splash-park',
    slug: 'family-splash-park',
    title: 'Family Splash Park',
    category: 'family',
    district: 'jatiasih',
    image: IMG.transParkMall,
    excerpt: 'Outdoor water park with slides, wave pools, and a rentable pavilion area for birthdays.',
    tags: ['waterpark', 'kids', 'weekend'],
    rating: 4.5, reviews: 630, duration: '3–5 hrs', fee: 'Rp 120k',
    featured: false, popular: false,
  },
]

export const DEST_META = {
  totalCount: DESTINATIONS.length,
  hero: {
    eyebrow: 'Destinations',
    kicker: 'The Full City Index',
    title: 'Every place worth a visit—on one page.',
    subtitle:
      'Browse the official BekasiGo destination index: heritage sites, urban icons, family spots, food institutions, and everything in between.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Destinations' },
    ],
  },
}

/* ------------------------------------------------------------------ */
/* Detail helpers                                                      */
/* ------------------------------------------------------------------ */

// Category-based default hours & tips so every destination gets a full
// detail page, even without hand-written CMS content yet.
const DEFAULT_HOURS = {
  heritage: [
    { day: 'Mon–Fri', time: '08:00 – 17:00' },
    { day: 'Sat–Sun', time: '08:00 – 19:00' },
    { day: 'Public holidays', time: 'Adjusted schedule' },
  ],
  culinary: [
    { day: 'Mon–Sun', time: '07:00 – 22:00' },
  ],
  urban: [
    { day: 'Mon–Thu', time: '10:00 – 22:00' },
    { day: 'Fri–Sun', time: '10:00 – 23:00' },
  ],
  shopping: [
    { day: 'Mon–Sun', time: '10:00 – 22:00' },
  ],
  family: [
    { day: 'Mon–Fri', time: '10:00 – 21:00' },
    { day: 'Sat–Sun', time: '09:00 – 22:00' },
  ],
  nature: [
    { day: 'Daily', time: '06:00 – 18:00' },
  ],
  transit: [
    { day: 'Daily', time: '04:30 – 24:00' },
  ],
  sport: [
    { day: 'Mon–Sun', time: 'Event-based schedule' },
  ],
}

const CATEGORY_TIPS = {
  heritage: [
    'Dress modestly if visiting active places of worship.',
    'Guides in Bahasa and English are usually available on weekends.',
    'Photography is often allowed—ask before shooting rituals.',
  ],
  culinary: [
    'Come hungry, come cash. Small warungs sometimes cash-only.',
    'Peak lunch hours are 12:00–13:30 on weekdays.',
    'Try the house specialty—regulars know best.',
  ],
  urban: [
    'Weekends bring pop-up markets and street music.',
    'Golden hour on rooftops is between 17:30–18:15.',
    'Grab / Gojek dropoffs are simple; parking varies.',
  ],
  shopping: [
    'Weekday afternoons are calm; weekends get busy after 15:00.',
    'Most food-courts stay open past mall closing time.',
    'Discount season lines up with mid-year and end-year sales.',
  ],
  family: [
    'Strollers and family lockers available at main entrances.',
    'Family bathrooms and nursing rooms clearly signposted.',
    'Ticket bundles often cheaper on weekday mornings.',
  ],
  nature: [
    'Bring water, wear comfortable shoes, avoid post-rain paths.',
    'Best light before 09:00 and after 16:00.',
    'Weekdays are noticeably quieter than weekends.',
  ],
  transit: [
    'Peak commute hours are 06:30–09:00 and 17:00–20:00.',
    'Tap-in cards / QR are the fastest way to enter.',
    'Late-night services taper off after 22:30.',
  ],
  sport: [
    'Buy tickets in advance for big matches or events.',
    'Bring an ID card—entry security may check.',
    'Post-event traffic can add 30 minutes to your ride home.',
  ],
}

const CATEGORY_HIGHLIGHTS = {
  heritage:  ['Historic architecture', 'Cultural rituals', 'Guided tours'],
  culinary:  ['Local specialties', 'Casual seating', 'Family friendly'],
  urban:     ['Skyline views', 'Weekend events', 'Instagrammable spots'],
  shopping:  ['International brands', 'Food court', 'Cinema'],
  family:    ['Play zones', 'Kid-friendly menu', 'Weekend workshops'],
  nature:    ['Jogging paths', 'Open green space', 'Photo spots'],
  transit:   ['Multi-mode transfer', 'ATMs & mini-marts', '24/7 security'],
  sport:     ['Multi-purpose arena', 'Public access days', 'Event calendar'],
}

// Slight coordinate spread around Kota Bekasi center.
const CENTER = { lat: -6.2383, lng: 106.9756 }
function coordFor(id) {
  // Deterministic pseudo-jitter per id so pins are stable across renders.
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  const dx = ((h % 200) - 100) / 5000   // ~±0.02 deg
  const dy = (((h >> 8) % 200) - 100) / 5000
  return { lat: +(CENTER.lat + dy).toFixed(5), lng: +(CENTER.lng + dx).toFixed(5) }
}

// Build the enriched detail object from a base destination.
export function buildDetail(dest) {
  if (!dest) return null
  const cat = dest.category
  return {
    ...dest,
    coords: dest.coords ?? coordFor(dest.id),
    address: dest.address ?? `${dest.title}, Kota Bekasi 171XX, Jawa Barat, Indonesia`,
    contact: dest.contact ?? { phone: '+62 21 8800-0000', website: 'https://bekasigo.id' },
    bestTime: dest.bestTime ?? (cat === 'culinary'
      ? 'Weekday lunchtime for the quietest experience.'
      : cat === 'nature'
        ? 'Early morning golden light before 09:00.'
        : cat === 'urban' || cat === 'shopping'
          ? 'Weekday afternoons or Sunday evenings.'
          : 'Weekend mornings for the best atmosphere.'),
    hours:   dest.hours     ?? DEFAULT_HOURS[cat] ?? DEFAULT_HOURS.urban,
    tips:    dest.tips      ?? CATEGORY_TIPS[cat] ?? CATEGORY_TIPS.urban,
    highlights: dest.highlights ?? CATEGORY_HIGHLIGHTS[cat] ?? CATEGORY_HIGHLIGHTS.urban,
    overview: dest.overview ?? [
      `${dest.title} is one of the ${cat === 'heritage' ? 'living heritage sites' : cat === 'culinary' ? 'must-try food stops' : cat === 'urban' ? 'signature urban icons' : cat === 'nature' ? 'quiet natural corners' : 'well-loved spots'} of Kota Bekasi. It has become a familiar name in the neighborhood's story—part of how locals experience the city on any given weekend.`,
      `Whether you arrive for the atmosphere, the details, or the small daily rituals happening around you, ${dest.title.split(' ').slice(0, 2).join(' ')} rewards visitors who slow down. Take your time, ask a local, and let the place unfold at its own pace.`,
      `The BekasiGo guide recommends pairing this stop with nearby destinations in the same district for a well-rounded half-day itinerary.`,
    ],
    gallery: dest.gallery ?? [dest.image],
  }
}

export function getDestinationBySlug(slug) {
  const base = DESTINATIONS.find((d) => d.slug === slug)
  if (!base) return null
  return buildDetail(base)
}

export function getRelatedDestinations(dest, limit = 4) {
  if (!dest) return []
  const sameCat  = DESTINATIONS.filter((d) => d.id !== dest.id && d.category === dest.category)
  const sameDist = DESTINATIONS.filter((d) => d.id !== dest.id && d.district === dest.district && d.category !== dest.category)
  const pool = [...sameCat, ...sameDist]
  const uniq = pool.filter((d, i, a) => a.findIndex((x) => x.id === d.id) === i)
  return uniq.slice(0, limit)
}
