// City Stories — CMS-ready editorial content model.
// Bodies are structured as block arrays for a proper CMS-friendly
// rendering path (paragraph, heading, quote, image, gallery, callout, divider).

import { IMG } from './homepage'

/* ------------------------------------------------------------------ */
/* Taxonomies                                                          */
/* ------------------------------------------------------------------ */

export const STORY_COLUMNS = [
  { id: 'all',       label: 'All stories',    color: '#0B3D3A', kicker: 'The full journal' },
  { id: 'heritage',  label: 'Heritage',        color: '#B48A2D', kicker: 'Living memory of the city' },
  { id: 'voices',    label: 'Voices',          color: '#1E7A72', kicker: 'People telling their own story' },
  { id: 'places',    label: 'Places',          color: '#155F58', kicker: 'A closer look at where we live' },
  { id: 'people',    label: 'People',          color: '#A34E2B', kicker: 'The makers and keepers' },
  { id: 'kitchen',   label: 'The Kitchen',     color: '#E27D5A', kicker: 'Bekasi through its meals' },
]

/* ------------------------------------------------------------------ */
/* Stories                                                             */
/* ------------------------------------------------------------------ */

export const STORIES = [
  {
    id: 'return-of-kranggan-ritual',
    slug: 'return-of-kranggan-ritual',
    title: 'The return of the Kranggan ritual.',
    subtitle: 'How a Sundanese-Betawi village at the city’s edge is quietly re-teaching Bekasi its own rhythms.',
    column: 'heritage',
    cover: { image: IMG.kampungAdatKranggan, credit: 'BekasiGo' },
    excerpt: 'For three days each August, a small kampung on the southeastern edge of Bekasi becomes the loudest place in the city—not with speakers, but with hand drums, coconut-smoke, and songs that predate the city itself.',
    readTime: '8 min read',
    publishedAt: '2026-05-14',
    featured: true,
    size: 'lg',
    author: { name: 'Aris Prasetyo',   role: 'Contributing Editor' },
    tags: ['heritage', 'kampung', 'ritual', 'sedekah bumi'],
    body: [
      { type: 'lede', text: 'For three days each August, a small kampung on the southeastern edge of Bekasi becomes the loudest place in the city—not with speakers, but with hand drums, coconut-smoke, and songs that predate the city itself.' },
      { type: 'paragraph', text: 'Kampung Adat Kranggan doesn’t appear on most weekend itineraries. It sits about forty minutes from the Summarecon skyline, past traffic-choked ring roads and half-finished apartment blocks, until suddenly the road narrows and the concrete gives way to bamboo. What you find at the end of that road is a village that has quietly refused to be a suburb.' },
      { type: 'heading', text: 'Not preserved—practiced.' },
      { type: 'paragraph', text: 'For decades, the elders of Kranggan have maintained a ritual calendar that most of Bekasi has never heard of. Sedekah Bumi, the annual harvest thanksgiving, is not a performance for outsiders. It is a living choreography—prayers, offerings, a communal meal that must be cooked in the same wood-fired pots the village has used since anyone can remember.' },
      { type: 'quote', text: 'We are not a museum. We are a village that still prays with the season.', attribution: 'Abah Rusdi, Adat elder' },
      { type: 'image', src: IMG.hokLayKiong, caption: 'The klenteng down the road is older. The rituals here are older still.' },
      { type: 'subheading', text: 'A quiet return' },
      { type: 'paragraph', text: 'Something has been shifting in the last two years. Younger residents—many of them born in Jakarta apartments, not in the kampung itself—have started asking to attend. Some come to film. Others come to learn the drum patterns. A few, quietly, come to help cook.' },
      { type: 'paragraph', text: 'The elders don’t frame this as a revival. They frame it as continuity. The ritual, they say, never left. Bekasi just wandered for a while, and is finding its way back.' },
      { type: 'callout', title: 'If you visit', text: 'Sedekah Bumi is open to respectful visitors. Dress modestly, ask before photographing, and bring a small donation in a plain envelope—optional, but welcome.' },
      { type: 'divider' },
      { type: 'paragraph', text: 'On the last night of the ritual, the whole kampung eats together in the courtyard, and the drums keep going long after the food is gone. If you have never sat under a bamboo roof at midnight, listening to a song your grandmother might have known, this is where you start.' },
    ],
  },

  {
    id: 'the-city-that-eats-standing-up',
    slug: 'the-city-that-eats-standing-up',
    title: 'The city that eats standing up.',
    subtitle: 'A morning tour of Bekasi’s warung ecosystem—where economies, families, and neighborhoods run on soto, kopi, and small plates before 9AM.',
    column: 'kitchen',
    cover: { image: IMG.kampungBali, credit: 'Cloudinary · BekasiGo' },
    excerpt: 'Long before the malls open and the LRT starts its climb, Bekasi is already eating. A morning tour of the warungs that hold the city together.',
    readTime: '6 min read',
    publishedAt: '2026-04-27',
    featured: true,
    size: 'md',
    author: { name: 'Salma Prawira', role: 'Food editor' },
    tags: ['warung', 'food', 'breakfast', 'kitchen'],
    body: [
      { type: 'lede', text: 'Long before the malls open and the LRT starts its climb toward Jakarta, Bekasi is already eating.' },
      { type: 'paragraph', text: 'By 05:45 the soto-mie stalls in Pondok Gede are on their second batch of stock. By 06:20 the kopi tubruk at a corner in Jatiasih has served maybe forty men in identical grey shirts on their way to security posts across the city.' },
      { type: 'heading', text: 'Economies you can hear' },
      { type: 'paragraph', text: 'A warung is a small economy: one auntie, one nephew, two burners, twelve stools. Multiply that by the several thousand warung that quietly open every morning in Bekasi, and you start to understand why the city’s rhythm has less to do with skyscrapers and more to do with which pot goes on first.' },
      { type: 'quote', text: 'You want to understand a neighborhood in Bekasi? Watch what its warung sells at 6:30 AM.', attribution: 'Salma Prawira, Food editor' },
      { type: 'image', src: IMG.floatingCity, caption: 'From above, a smart city. On the ground, a soto city.' },
      { type: 'subheading', text: 'The rules of the morning' },
      { type: 'paragraph', text: 'A few unwritten rules govern the morning warung. Prices are round. Change is expected. If the sambal jar is empty, you ask; you don’t reach. And you always compliment the broth—even if you didn’t like it. Warungs are not just kitchens, they are hosts.' },
      { type: 'callout', title: 'If you go', text: 'Best warung mornings are Tuesday through Thursday. Weekends are for family kitchens; weekdays are for the city.' },
    ],
  },

  {
    id: 'a-skyline-in-motion',
    slug: 'a-skyline-in-motion',
    title: 'A skyline in motion.',
    subtitle: 'Bekasi’s built environment is changing faster than any city its size in Indonesia. What are we becoming—and who is deciding?',
    column: 'places',
    cover: { image: IMG.floatingCity, credit: 'Kota Bekasi' },
    excerpt: 'Bekasi’s built environment is changing faster than any city its size in Indonesia. What are we becoming—and who is deciding?',
    readTime: '10 min read',
    publishedAt: '2026-04-08',
    featured: true,
    size: 'md',
    author: { name: 'Rizki Andiansyah', role: 'Urbanism writer' },
    tags: ['urban', 'architecture', 'city', 'summarecon'],
    body: [
      { type: 'lede', text: 'From the observation deck at Piramida Terbalik, on a clear afternoon in April, you can count seven active tower cranes without turning your head.' },
      { type: 'paragraph', text: 'That count only rises. In the last decade Kota Bekasi has become one of the fastest-verticalizing cities in Indonesia—not the loudest, not the biggest, but the one adding floors most quickly.' },
      { type: 'heading', text: 'A city being drawn in real time' },
      { type: 'paragraph', text: 'The interesting thing about Bekasi’s skyline is that it is being drawn by many hands at once. There is no single master architect. Instead there is a mosaic of private developers, municipal ambitions, and community pushback—each pulling the skyline in a slightly different direction.' },
      { type: 'quote', text: 'Every good skyline is an argument. Ours is a very Indonesian argument.', attribution: 'Rizki Andiansyah' },
      { type: 'image', src: IMG.piramidaSummarecon, caption: 'Piramida Terbalik · Summarecon Bekasi.' },
      { type: 'paragraph', text: 'What we build in the next five years will decide whether Bekasi’s skyline is remembered as an accident of speed, or as a coherent civic project.' },
    ],
  },

  {
    id: 'ibu-yanti-and-her-forty-years-of-soto',
    slug: 'ibu-yanti-and-her-forty-years-of-soto',
    title: 'Ibu Yanti and her forty years of soto.',
    subtitle: 'A profile of the woman who has quietly fed three generations of one Bekasi neighborhood.',
    column: 'people',
    cover: { image: IMG.kampungBali },
    excerpt: 'She has never advertised. She has never franchised. She has never written down the recipe. And yet three generations of one Bekasi neighborhood grew up on her soto.',
    readTime: '5 min read',
    publishedAt: '2026-04-02',
    featured: false,
    size: 'sm',
    author: { name: 'Salma Prawira', role: 'Food editor' },
    tags: ['people', 'food', 'warung', 'profile'],
    body: [
      { type: 'paragraph', text: 'She has never advertised. She has never franchised. She has never written the recipe down.' },
      { type: 'paragraph', text: 'And yet three generations of one Bekasi neighborhood — the kind that no longer even fits neatly on a district map — grew up on Ibu Yanti’s soto.' },
      { type: 'quote', text: 'The stock has to sing before I add anything. If it does not sing, I start over.', attribution: 'Ibu Yanti' },
      { type: 'paragraph', text: 'For forty years, she has opened at 05:30, and she has closed when the pot is empty. Sometimes that is 09:15. Sometimes that is 11:00. She has never once, she says, extended the pot.' },
    ],
  },

  {
    id: 'the-lrt-changes-everything',
    slug: 'the-lrt-changes-everything',
    title: 'The LRT changes everything.',
    subtitle: 'Eighteen minutes to Central Jakarta. Two years in, we look at what the LRT Jabodebek has done to how Bekasi lives, works, and eats.',
    column: 'places',
    cover: { image: IMG.stasiunBekasi },
    excerpt: 'Two years after the LRT Jabodebek opened, we look at how the fastest line into Bekasi has quietly rewired the city’s daily rhythm.',
    readTime: '7 min read',
    publishedAt: '2026-03-18',
    featured: false,
    size: 'md',
    author: { name: 'Rizki Andiansyah', role: 'Urbanism writer' },
    tags: ['transit', 'lrt', 'jakarta'],
    body: [
      { type: 'paragraph', text: 'On paper, the LRT Jabodebek is a rail line. In practice, it is a re-drawing of a mental map.' },
      { type: 'heading', text: 'Eighteen minutes' },
      { type: 'paragraph', text: 'Eighteen minutes is now the number that governs a lot of Bekasi’s daily decisions — where to rent, where to eat, whether to bother going into Jakarta at all.' },
      { type: 'callout', title: 'Fast facts', text: 'Peak-hour trains run every 6–8 minutes. Off-peak, every 12. Weekend service has extended by an hour since 2025.' },
    ],
  },

  {
    id: 'voices-from-the-market',
    slug: 'voices-from-the-market',
    title: 'Voices from the market.',
    subtitle: 'Four small business owners at Pasar Baru Bekasi on what has changed — and what stubbornly hasn’t.',
    column: 'voices',
    cover: { image: IMG.metropolitanMall },
    excerpt: 'Four traders at Pasar Baru Bekasi on inflation, TikTok, family, and why they are still opening the same stall their parents opened.',
    readTime: '6 min read',
    publishedAt: '2026-03-04',
    featured: false,
    size: 'sm',
    author: { name: 'Aris Prasetyo', role: 'Contributing Editor' },
    tags: ['voices', 'market', 'family business'],
    body: [
      { type: 'paragraph', text: 'We asked four traders at Pasar Baru what has changed in the last five years. We got four different answers. All of them were correct.' },
      { type: 'quote', text: 'The internet did not kill us. It made us learn faster.', attribution: 'Pak Ilham, textile trader' },
    ],
  },

  {
    id: 'wayang-modern-night',
    slug: 'wayang-modern-night-behind-the-scenes',
    title: 'A modern wayang, staged for a modern city.',
    subtitle: 'Behind the scenes of an experiment: putting shadow puppetry, live electronic music, and a full LED wall on the same stage.',
    column: 'heritage',
    cover: { image: IMG.hokLayKiong },
    excerpt: 'How Bekasi Heritage Council is staging wayang alongside a full LED wall — and why the puppeteers wanted it that way.',
    readTime: '4 min read',
    publishedAt: '2026-02-18',
    featured: false,
    size: 'sm',
    author: { name: 'Aris Prasetyo', role: 'Contributing Editor' },
    tags: ['heritage', 'performance', 'wayang'],
    body: [
      { type: 'paragraph', text: 'When the Bekasi Heritage Council pitched a wayang night with electronic music and a video wall, the first person to say yes was the senior puppeteer.' },
      { type: 'paragraph', text: '“Wayang has always been the future,” he said. “We just have to bring it there again.”' },
    ],
  },

  {
    id: 'growing-up-summarecon',
    slug: 'growing-up-summarecon',
    title: 'Growing up Summarecon.',
    subtitle: 'What it is like to be the first generation of Bekasi kids raised inside a fully master-planned township — and to want more.',
    column: 'voices',
    cover: { image: IMG.summareconMall },
    excerpt: 'Three young Summarecon residents on what it is like to be part of the first fully-township generation, and what they wish the city looked like next.',
    readTime: '9 min read',
    publishedAt: '2026-02-05',
    featured: false,
    size: 'md',
    author: { name: 'Rizki Andiansyah', role: 'Urbanism writer' },
    tags: ['voices', 'youth', 'urban'],
    body: [
      { type: 'paragraph', text: 'The first generation of Bekasi kids who grew up entirely inside a master-planned township are old enough to have opinions now. They also have complaints.' },
      { type: 'heading', text: '“It is safe. It is boring. It is us.”' },
      { type: 'paragraph', text: 'What none of them want, they said in different ways, is a sanitized city. They want the smart-city convenience they were raised with, plus the messy heart of the older Bekasi.' },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Meta                                                                */
/* ------------------------------------------------------------------ */

export const STORY_META = {
  totalCount: STORIES.length,
  issue: 'Issue N° 24 · June 2026',
  hero: {
    masthead: 'The Bekasi Journal',
    eyebrow: 'City Stories',
    kicker: 'Editorial from the city itself',
    title: 'A slower way of reading the city.',
    subtitle: 'Long-form journalism from BekasiGo—on the neighborhoods, kitchens, rituals, and people that make Kota Bekasi worth writing about.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'City Stories' },
    ],
  },
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function getStoryBySlug(slug) {
  return STORIES.find((s) => s.slug === slug) ?? null
}

export function getRelatedStories(story, limit = 3) {
  if (!story) return []
  const sameCol = STORIES.filter((s) => s.id !== story.id && s.column === story.column)
  const sameTag = STORIES.filter((s) => s.id !== story.id && s.tags?.some((t) => story.tags?.includes(t)) && s.column !== story.column)
  const pool = [...sameCol, ...sameTag]
  const uniq = pool.filter((s, i, a) => a.findIndex((x) => x.id === s.id) === i)
  return uniq.slice(0, limit)
}

export function formatStoryDate(iso, opts = {}) {
  const { short = false } = opts
  const d = new Date(iso)
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric', month: short ? 'short' : 'long', year: 'numeric',
  }).format(d)
}

export function groupByColumn() {
  const map = {}
  STORY_COLUMNS.filter((c) => c.id !== 'all').forEach((c) => {
    map[c.id] = STORIES.filter((s) => s.column === c.id)
  })
  return map
}
