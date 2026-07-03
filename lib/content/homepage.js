// Central, CMS-friendly content model for the BekasiGo homepage.
// All URLs point to the official BekasiGo Cloudinary asset library.

export const CLOUDINARY = 'https://res.cloudinary.com/oi9u7lsq'

export const IMG = {
  // Landmarks (numbered per official asset library)
  stadionPatriot:        `${CLOUDINARY}/image/upload/v1783064957/1._Stadion_Patriot_Candrabhaga_uirqbj.png`,
  piramidaSummarecon:    `${CLOUDINARY}/image/upload/v1783064959/2._Piramida_Terbalik_Summarecon_Bekasi_nu7hqm.png`,
  summareconMall:        `${CLOUDINARY}/image/upload/v1783064958/3._Summarecon_Mall_Bekasi_zaqrya.png`,
  monumenKaliBekasi:     `${CLOUDINARY}/image/upload/v1783064957/4._Monumen_Kali_Bekasi_hi7nho.png`,
  stasiunBekasi:         `${CLOUDINARY}/image/upload/v1783064958/5._Stasiun_Bekasi_puphns.png`,
  hokLayKiong:           `${CLOUDINARY}/image/upload/v1783064959/6._Klenteng_Hok_Lay_Kiong_Margahayu_l8zaxv.png`,
  kampungBali:           `${CLOUDINARY}/image/upload/v1783064959/7._Kampung_Bali_Harapan_Jaya_kyl3fn.jpg`,
  transParkMall:         `${CLOUDINARY}/image/upload/v1783064955/8._Trans_Park_Mall_Juanda_Bekasi_jyumrm.jpg`,
  pakuwonMall:           `${CLOUDINARY}/image/upload/v1783064955/9._Pakuwon_Mall_Bekasi_o7irf4.jpg`,
  metropolitanMall:      `${CLOUDINARY}/image/upload/v1783064957/10._Metropolitan_Mall_Bekasi_g5vxe1.png`,
  grandMetropolitanMall: `${CLOUDINARY}/image/upload/v1783064957/11._Grand_Metropolitan_Mall_Bekasi_dkbq6z.png`,
  monumenPerjuangan:     `${CLOUDINARY}/image/upload/v1783064958/12._Monumen_Perjuangan_Rakyat_Bekasi_jvs7sk.png`,
  gedungJuang45:         `${CLOUDINARY}/image/upload/v1783064958/13._Gedung_Juang_45_oklosd.png`,
  kampungAdatKranggan:   `${CLOUDINARY}/image/upload/v1783064955/14._Kampung_Adat_Kranggan_Bekasi_aakeyp.png`,
  situRawaGede:          `${CLOUDINARY}/image/upload/v1783064956/15._Situ_Rawa_Gede_Bekasi_vyhqjt.png`,

  // Signature Floating Smart City
  floatingCity:          `${CLOUDINARY}/image/upload/v1783064956/Kota_Bekasi_Floating_Smart_City_bw0qge.jpg`,
  floatingCityBg:        `${CLOUDINARY}/image/upload/v1783064956/Kota_Bekasi_Floating_Smart_CIty_enlarge_bg_1_vk38en.png`,
  floatingCityCutout:    `${CLOUDINARY}/image/upload/v1783064956/Kota_Bekasi_Floating_Smart_CIty_without_background_alksuj.png`,
}

export const VIDEO = {
  hero: `${CLOUDINARY}/video/upload/v1783064976/Video_Hero_Section_ntlr1b.mp4`,
}

export const NAV = {
  primary: [
    { label: 'Discover',     href: '/discover' },
    { label: 'Destinations', href: '/destinations' },
    { label: 'Events',       href: '/events' },
    { label: 'Stories',      href: '/stories' },
    { label: 'Blog',         href: '/blog' },
    { label: 'Map',          href: '/map' },
  ],
  cta: { label: 'Smart Planner', href: '/planner' },
}

export const HERO = {
  eyebrow: 'Kota Bekasi · Indonesia',
  title: 'Where Heritage Meets the Smart City.',
  subtitle:
    'From centuries-old traditions to a future-forward skyline — discover a city rewriting its own story every day.',
  primaryCta: { label: 'Explore Bekasi',   href: '/discover' },
  secondaryCta: { label: 'Plan Your Trip', href: '/planner' },
  poster: IMG.floatingCity,
  videoUrl: VIDEO.hero,
  stats: [
    { k: '120+', v: 'Destinations' },
    { k: '48',   v: 'Neighborhoods' },
    { k: '365',  v: 'Days of Culture' },
  ],
}

export const QUICK_EXPLORE = {
  eyebrow: 'Quick Explore',
  title: 'Where do you want to begin?',
  kicker:
    'Jump straight into what Bekasi is best known for \u2014 seven ways to enter the city, curated for every kind of visitor.',
  action: { label: 'See full guide', href: '/discover' },
  categories: [
    {
      id: 'heritage',
      label: 'Heritage',
      href: '/discover/heritage',
      count: 24,
      image: IMG.hokLayKiong,
      kicker:
        'Betawi, Sundanese and Peranakan traditions still living in temples, kampungs, and colonial-era buildings.',
      samples: [
        { name: 'Klenteng Hok Lay Kiong',    href: '/destinations/hok-lay-kiong' },
        { name: 'Gedung Juang 45',            href: '/destinations/gedung-juang-45' },
        { name: 'Kampung Adat Kranggan',      href: '/destinations/kampung-adat-kranggan' },
      ],
    },
    {
      id: 'culinary',
      label: 'Culinary',
      href: '/discover/culinary',
      count: 30,
      image: IMG.transParkMall,
      kicker:
        'From legendary warung sate to fine-dining rows and Ramadan night markets \u2014 Bekasi eats late, and eats well.',
      samples: [
        { name: 'Warung Sate H. Sholeh',      href: '/discover/culinary/warung-sate-h-sholeh' },
        { name: 'Trans Park Culinary Row',    href: '/destinations/trans-park' },
        { name: 'Bekasi Culinary Fest 2025',  href: '/events/bekasi-culinary-fest-2025' },
      ],
    },
    {
      id: 'events',
      label: 'Events',
      href: '/events',
      count: 18,
      image: IMG.monumenPerjuangan,
      kicker:
        'The city\u2019s calendar of festivals, parades, expos and community pop-ups \u2014 there is always something happening.',
      samples: [
        { name: 'Betawi Heritage Parade',        href: '/events/betawi-heritage-parade' },
        { name: 'Smart City Innovation Expo',    href: '/events/smart-city-innovation-expo' },
        { name: 'Situ Rawa Gede Trail Run',      href: '/events/situ-rawa-gede-trail' },
      ],
    },
    {
      id: 'shopping',
      label: 'Shopping',
      href: '/discover/shopping',
      count: 12,
      image: IMG.summareconMall,
      kicker:
        'Weekend malls, boutique streets, and traditional markets \u2014 Bekasi\u2019s retail scene spans premium to hidden gem.',
      samples: [
        { name: 'Summarecon Mall Bekasi',        href: '/destinations/summarecon-mall' },
        { name: 'Grand Metropolitan Mall',       href: '/destinations/grand-metropolitan-mall' },
        { name: 'Pakuwon Mall Bekasi',           href: '/destinations/pakuwon-mall' },
      ],
    },
    {
      id: 'family',
      label: 'Family',
      href: '/discover/family',
      count: 15,
      image: IMG.piramidaSummarecon,
      kicker:
        'Open squares, kid-friendly attractions, hands-on culture spots \u2014 the Bekasi any age can enjoy.',
      samples: [
        { name: 'Piramida Terbalik Summarecon',  href: '/destinations/piramida-summarecon' },
        { name: 'Metropolitan Mall Bekasi',      href: '/destinations/metropolitan-mall' },
        { name: 'Situ Rawa Gede',                href: '/destinations/situ-rawa-gede' },
      ],
    },
    {
      id: 'waterfront',
      label: 'Waterfront',
      href: '/discover/nature',
      count: 9,
      image: IMG.situRawaGede,
      kicker:
        'Lakes, rivers and green edges that soften the city \u2014 Bekasi\u2019s slower, quieter afternoons live here.',
      samples: [
        { name: 'Situ Rawa Gede',                href: '/destinations/situ-rawa-gede' },
        { name: 'Monumen Kali Bekasi',           href: '/destinations/monumen-kali-bekasi' },
        { name: 'Kali Malang Riverfront',        href: '/destinations/kali-malang' },
      ],
    },
    {
      id: 'transport',
      label: 'Transport',
      href: '/discover/access',
      count: 22,
      image: IMG.stasiunBekasi,
      kicker:
        'LRT, commuter line, TransBekasi \u2014 the smart-city access grid that connects Bekasi to Greater Jakarta.',
      samples: [
        { name: 'Stasiun Bekasi',                href: '/destinations/stasiun-bekasi' },
        { name: 'LRT Jabodebek Terminal',        href: '/discover/access/lrt-jabodebek' },
        { name: 'TransBekasi Hub',               href: '/discover/access/transbekasi' },
      ],
    },
  ],
}

export const FLOATING_CITY = {
  chapter: 'Chapter 02 · The Signature of Bekasi',
  eyebrow: 'A Smart Urban Gateway',
  title: 'A floating city where\nSmart meets Heritage.',
  kicker:
    'Bekasi is being reimagined — an urban vision that fuses centuries of Betawi, Sundanese and Peranakan roots with a future-facing smart-city skyline. It is the gateway city of Greater Jakarta, but with a rhythm and memory entirely its own.',
  cta: { label: 'Discover Bekasi', href: '/discover' },
  image: IMG.floatingCityCutout,
  bg: IMG.floatingCityBg,
  orbits: [
    { label: 'Smart City',   pos: { top: '4%',     left: '2%'  } },
    { label: 'Heritage',     pos: { top: '16%',    right: '0%' } },
    { label: 'Waterfront',   pos: { bottom: '22%', left: '-2%' } },
    { label: 'Youthful',     pos: { bottom: '6%',  right: '2%' } },
  ],
  stats: [
    { k: '2.5M+',   v: 'Residents',          note: 'Metro population' },
    { k: '300 Yrs', v: 'Heritage',           note: 'Betawi · Sundanese · Peranakan' },
    { k: '12',      v: 'Cultural Districts', note: 'From Kranggan to Kali Malang' },
    { k: '4 Yrs',   v: 'Smart-City',         note: 'National program milestone' },
  ],
}

export const FEATURED_ICONS = {
  eyebrow: 'Icons of Bekasi',
  title: 'The landmarks that define a city.',
  kicker:
    'Six unmistakable icons — a smart shorthand for how Bekasi looks, moves, and remembers.',
  action: { label: 'See all destinations', href: '/destinations' },
  items: [
    { title: 'Stadion Patriot Candrabhaga', category: 'Sport',    district: 'Bekasi Selatan', meta: 'Sport · Bekasi Selatan', image: IMG.stadionPatriot,     href: '/destinations/stadion-patriot' },
    { title: 'Piramida Terbalik Summarecon',category: 'Urban',    district: 'Marga Mulya',    meta: 'Urban · Marga Mulya',    image: IMG.piramidaSummarecon, href: '/destinations/piramida-summarecon' },
    { title: 'Stasiun Bekasi',              category: 'Transit',  district: 'Marga Jaya',     meta: 'Transit · Marga Jaya',   image: IMG.stasiunBekasi,      href: '/destinations/stasiun-bekasi' },
    { title: 'Monumen Kali Bekasi',         category: 'Civic',    district: 'Bekasi Timur',   meta: 'Civic · Bekasi Timur',   image: IMG.monumenKaliBekasi,  href: '/destinations/monumen-kali-bekasi' },
    { title: 'Gedung Juang 45',             category: 'Heritage', district: 'Bekasi Utara',   meta: 'Heritage · Bekasi Utara',image: IMG.gedungJuang45,      href: '/destinations/gedung-juang-45' },
    { title: 'Situ Rawa Gede',              category: 'Nature',   district: 'Bantar Gebang',  meta: 'Nature · Bantar Gebang', image: IMG.situRawaGede,       href: '/destinations/situ-rawa-gede' },
  ],
}

export const HERITAGE = {
  chapter: 'Chapter 03 · Heritage & Culture',
  eyebrow: 'Heritage & Culture',
  title: 'A city with roots\nolder than its skyline.',
  kicker:
    'Bekasi carries the memory of Betawi, Sundanese, and Peranakan traditions — walk the alleys where the past keeps quiet company with the present.',
  quote:
    '"Bekasi keeps its memory in its temples, its kampungs, and its afternoons — the past is not behind us, it walks beside us."',
  quoteAttribution: 'Wawan H. — Bekasi cultural historian',
  hint: 'Hover to bring the memory into the light',
  action:          { label: 'Explore heritage stories',   href: '/stories?tag=heritage' },
  secondaryAction: { label: 'See cultural destinations',  href: '/destinations?tag=heritage' },
  items: [
    {
      title: 'Klenteng Hok Lay Kiong',
      category: 'Temple',
      district: 'Margahayu',
      excerpt: 'A 300-year-old Peranakan temple in Margahayu that anchors the city\u2019s Chinese-Indonesian heritage.',
      image: IMG.hokLayKiong,
      href:  '/destinations/hok-lay-kiong',
    },
    {
      title: 'Kampung Bali',
      category: 'Village',
      district: 'Harapan Jaya',
      excerpt: 'Balinese diaspora village in Harapan Jaya — a rare pocket of Bali culture right inside West Java.',
      image: IMG.kampungBali,
      href:  '/destinations/kampung-bali',
    },
    {
      title: 'Kampung Adat Kranggan',
      category: 'Village',
      district: 'Jatirangga',
      excerpt: 'Living Sundanese heritage village preserving centuries-old rituals, architecture and dialect.',
      image: IMG.kampungAdatKranggan,
      href:  '/destinations/kampung-adat-kranggan',
    },
    {
      title: 'Gedung Juang 45',
      category: 'Heritage',
      district: 'Bekasi Utara',
      excerpt: 'Colonial-era hall that witnessed Bekasi\u2019s independence struggle \u2014 now a monument to memory.',
      image: IMG.gedungJuang45,
      href:  '/destinations/gedung-juang-45',
    },
  ],
}

export const URBAN = {
  eyebrow: 'Urban Lifestyle',
  title: 'The new rhythm of Kota Bekasi.',
  kicker: 'Weekend malls, rooftop cafes, indie art blocks, and the quiet ambition of a city on the rise.',
  action: { label: 'Enter the urban guide', href: '/discover/urban' },
  tiles: [
    { title: 'Summarecon Mall Bekasi',       image: IMG.summareconMall,        tag: 'Lifestyle Hub' },
    { title: 'Grand Metropolitan Mall',      image: IMG.grandMetropolitanMall, tag: 'Retail' },
    { title: 'Metropolitan Mall Bekasi',     image: IMG.metropolitanMall,      tag: 'Family' },
    { title: 'Pakuwon Mall Bekasi',          image: IMG.pakuwonMall,           tag: 'Premium' },
    { title: 'Trans Park Mall Juanda',       image: IMG.transParkMall,         tag: 'Entertainment' },
  ],
}

export const CITY_PULSE = {
  eyebrow: 'City Pulse',
  title: "What's happening in Bekasi.",
  kicker: 'Concerts, festivals, exhibitions and pop-ups — the calendar the city is buzzing about.',
  action: { label: 'See all events', href: '/events' },
  events: [
    { date: 'Jun 21', month: 'JUN', title: 'Bekasi Culinary Fest 2025',    venue: 'Alun-Alun Kota Bekasi',   tag: 'Food' },
    { date: 'Jun 28', month: 'JUN', title: 'Betawi Heritage Parade',        venue: 'Kampung Sawah',           tag: 'Culture' },
    { date: 'Jul 05', month: 'JUL', title: 'Smart City Innovation Expo',    venue: 'Summarecon Convention',   tag: 'Tech' },
    { date: 'Jul 12', month: 'JUL', title: 'Situ Rawa Gede Nature Trail',   venue: 'Bantar Gebang',           tag: 'Sport' },
  ],
}

export const UTILITY = {
  eyebrow: 'Plan the essentials',
  title: 'Eat. Stay. Get around.',
  kicker: 'Everything you need to move through the city with ease.',
  columns: [
    {
      key: 'food', title: 'Where to Eat', image: IMG.summareconMall,
      href: '/discover/culinary',
      items: ['Warung Legendaris', 'Fine Dining Row', 'Street Food Trails', 'Halal Guide'],
    },
    {
      key: 'stay', title: 'Where to Stay', image: IMG.pakuwonMall,
      href: '/discover/stay',
      items: ['5-Star Retreats', 'Boutique Stays', 'Family Hotels', 'Budget Picks'],
    },
    {
      key: 'access', title: 'Getting Around', image: IMG.stasiunBekasi,
      href: '/discover/access',
      items: ['LRT & Commuter', 'TransBekasi', 'Ride-Hailing', 'Airport Transfers'],
    },
  ],
}

export const PLANNER = {
  eyebrow: 'Smart Trip Planner',
  title: 'Your itinerary, drafted by AI.',
  kicker:
    'Answer a few questions — travel style, days, budget, mood — and get a full Bekasi itinerary with destinations, restaurants, hotels, and transport, ready to refine.',
  bullets: [
    'Guest access. No account required.',
    'AI-generated timeline and map preview.',
    'Conversational refinement in one click.',
    'Sign in with Google to save or download.',
  ],
  cta: { label: 'Plan my trip', href: '/planner' },
  mockStops: [
    { time: '09:00', place: 'Klenteng Hok Lay Kiong', tag: 'Heritage' },
    { time: '12:30', place: 'Warung Sate H. Sholeh',   tag: 'Culinary' },
    { time: '15:00', place: 'Situ Rawa Gede',          tag: 'Nature' },
    { time: '19:00', place: 'Summarecon Mall Bekasi',  tag: 'Lifestyle' },
  ],
}

export const MAP_PREVIEW = {
  eyebrow: 'Explore Map',
  title: 'The city, at a glance.',
  kicker: 'Filter by category, neighborhood, or trending — a live map of everything worth visiting.',
  cta: { label: 'Open interactive map', href: '/map' },
  pins: [
    { name: 'Summarecon',        x: 62, y: 40, cat: 'Urban' },
    { name: 'Hok Lay Kiong',     x: 34, y: 55, cat: 'Heritage' },
    { name: 'Situ Rawa Gede',    x: 78, y: 30, cat: 'Nature' },
    { name: 'Stadion Patriot',   x: 45, y: 68, cat: 'Sport' },
    { name: 'Stasiun Bekasi',    x: 52, y: 50, cat: 'Transit' },
    { name: 'Gedung Juang 45',   x: 25, y: 38, cat: 'Heritage' },
  ],
}

export const STORIES = {
  eyebrow: 'Stories from Bekasi',
  title: 'Voices, streets, and afternoons.',
  kicker: 'Long-form stories from residents, chefs, artists, and travelers.',
  action: { label: 'Read all stories', href: '/stories' },
  items: [
    { title: 'The Warung That Never Sleeps',     author: 'Ratna A.', readTime: '6 min', image: IMG.transParkMall,       tag: 'Culinary' },
    { title: 'Sundays at Situ Rawa Gede',        author: 'Adi P.',   readTime: '4 min', image: IMG.situRawaGede,        tag: 'Lifestyle' },
    { title: 'Prayer Beads and Skyscrapers',     author: 'Nadia S.', readTime: '8 min', image: IMG.hokLayKiong,         tag: 'Heritage' },
    { title: 'How Bekasi Learned to Skate',      author: 'Rio K.',   readTime: '5 min', image: IMG.piramidaSummarecon,  tag: 'Youth' },
  ],
}

export const BLOG = {
  eyebrow: 'From the Blog',
  title: 'Practical guides & fresh reads.',
  action: { label: 'All articles', href: '/blog' },
  items: [
    { title: '48 Hours in Bekasi: A First-Timer Itinerary', category: 'Guide',   date: 'Jun 12, 2025', image: IMG.summareconMall },
    { title: 'The Best Warung Sate in East Bekasi',          category: 'Food',    date: 'Jun 09, 2025', image: IMG.transParkMall },
    { title: 'Ramadan Nights: A Cultural Calendar',          category: 'Culture', date: 'Jun 04, 2025', image: IMG.gedungJuang45 },
  ],
}

export const FOOTER = {
  tagline: 'The official destination guide to Kota Bekasi.',
  columns: [
    {
      title: 'Explore',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Discover Bekasi', href: '/discover' },
        { label: 'Destinations', href: '/destinations' },
        { label: 'Events', href: '/events' },
        { label: 'Explore Map', href: '/map' },
      ],
    },
    {
      title: 'Experience',
      links: [
        { label: 'Heritage & Culture', href: '/discover/heritage' },
        { label: 'Food & Drink', href: '/discover/culinary' },
        { label: 'Urban Lifestyle', href: '/discover/urban' },
        { label: 'Waterfront & Nature', href: '/discover/nature' },
        { label: 'Family Friendly', href: '/discover/family' },
      ],
    },
    {
      title: 'Plan',
      links: [
        { label: 'Smart Trip Planner', href: '/planner' },
        { label: 'Getting Around', href: '/discover/access' },
        { label: 'Where to Stay', href: '/discover/stay' },
        { label: 'Weather', href: '/plan/weather' },
        { label: 'Currency & Tips', href: '/plan/currency' },
      ],
    },
    {
      title: 'Read',
      links: [
        { label: 'City Stories', href: '/stories' },
        { label: 'Blog', href: '/blog' },
        { label: 'Press Kit', href: '/press' },
        { label: 'Newsletter', href: '/newsletter' },
      ],
    },
    {
      title: 'About',
      links: [
        { label: 'About BekasiGo', href: '/about' },
        { label: 'City Government', href: '/about/government' },
        { label: 'Partners', href: '/about/partners' },
        { label: 'Contact', href: '/contact' },
        { label: 'Careers', href: '/careers' },
      ],
    },
  ],
  social: [
    { label: 'Instagram', href: '#', icon: 'instagram' },
    { label: 'YouTube',   href: '#', icon: 'youtube' },
    { label: 'TikTok',    href: '#', icon: 'music-2' },
    { label: 'X',         href: '#', icon: 'twitter' },
    { label: 'Facebook',  href: '#', icon: 'facebook' },
  ],
  meta: [
    { label: 'Privacy', href: '/legal/privacy' },
    { label: 'Terms', href: '/legal/terms' },
    { label: 'Accessibility', href: '/legal/accessibility' },
    { label: 'Sitemap', href: '/sitemap' },
  ],
  languages: [
    { code: 'EN', label: 'English' },
    { code: 'ID', label: 'Bahasa Indonesia' },
  ],
}
