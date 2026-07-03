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
  chapter: 'Chapter 04 · Urban Lifestyle',
  eyebrow: 'Urban Lifestyle',
  title: 'The new rhythm of Kota Bekasi.',
  kicker:
    'Weekend malls, rooftop cafes, indie art blocks, and the quiet ambition of a city on the rise — Bekasi at its most energetic.',
  action: { label: 'Enter the urban guide', href: '/discover/urban' },
  items: [
    {
      id: 'summarecon',
      title: 'Summarecon Mall Bekasi',
      category: 'Lifestyle Hub',
      district: 'Marga Mulya',
      excerpt:
        'A weekend anchor for young Bekasi — courtyards, rooftop cafes, and open-air music that never really quiets down.',
      knownFor: ['Rooftop dining', 'Sunday markets', 'Indie music nights'],
      image: IMG.summareconMall,
      href: '/destinations/summarecon-mall',
    },
    {
      id: 'grand-metropolitan',
      title: 'Grand Metropolitan Mall',
      category: 'Premium Retail',
      district: 'Bekasi Selatan',
      excerpt:
        'Bekasi\u2019s flagship retail avenue \u2014 marquee stores, IMAX cinema, and the city\u2019s answer to a boulevard weekend.',
      knownFor: ['Premium retail', 'IMAX cinema', 'Boulevard weekends'],
      image: IMG.grandMetropolitanMall,
      href: '/destinations/grand-metropolitan-mall',
    },
    {
      id: 'metropolitan',
      title: 'Metropolitan Mall Bekasi',
      category: 'Family Hub',
      district: 'Bekasi Barat',
      excerpt:
        'Multi-generational hangout with cinema, kids\u2019 zones and the food court that started the city\u2019s mall culture.',
      knownFor: ['Family entertainment', 'Food court legends', 'Cinema circuit'],
      image: IMG.metropolitanMall,
      href: '/destinations/metropolitan-mall',
    },
    {
      id: 'pakuwon',
      title: 'Pakuwon Mall Bekasi',
      category: 'Modern Retail',
      district: 'Bekasi Barat',
      excerpt:
        'Bekasi\u2019s newest retail landmark \u2014 glass atrium, luxury brands, and terrace dining above the boulevard.',
      knownFor: ['Luxury brands', 'Atrium dining', 'Terrace nights'],
      image: IMG.pakuwonMall,
      href: '/destinations/pakuwon-mall',
    },
    {
      id: 'trans-park',
      title: 'Trans Park Mall Juanda',
      category: 'Entertainment',
      district: 'Duren Jaya',
      excerpt:
        'Indoor theme park, water play, and the culinary row that pulls families across the city on Saturdays.',
      knownFor: ['Indoor theme park', 'Culinary row', 'Kids play zone'],
      image: IMG.transParkMall,
      href: '/destinations/trans-park',
    },
  ],
}

export const CITY_PULSE = {
  chapter: 'Chapter 05 · City Pulse',
  eyebrow: 'Events & City Pulse',
  title: "What's happening in Bekasi.",
  kicker:
    'Concerts, festivals, exhibitions and pop-ups \u2014 the calendar the city is buzzing about.',
  action: { label: 'Open full calendar', href: '/events' },
  filters: [
    { id: 'all',      label: 'All events' },
    { id: 'today',    label: 'Today' },
    { id: 'weekend',  label: 'This weekend' },
    { id: 'culture',  label: 'Culture' },
    { id: 'food',     label: 'Food' },
    { id: 'sport',    label: 'Sport' },
    { id: 'tech',     label: 'Tech' },
  ],
  liveNow: [
    { status: 'Live now',      title: 'Bekasi Culinary Fest 2025', venue: 'Alun-Alun Kota Bekasi', tag: 'Food' },
    { status: 'Live now',      title: 'Betawi Heritage Parade',    venue: 'Kampung Sawah',        tag: 'Culture' },
    { status: 'Starting soon', title: 'Rooftop Jazz Series',       venue: 'Summarecon Mall',      tag: 'Music' },
    { status: 'This week',     title: 'Smart City Innovation Expo',venue: 'Summarecon Convention',tag: 'Tech' },
  ],
  featured: {
    date:  { d: '21', m: 'JUN', y: '2025' },
    range: 'Jun 21 \u2013 23, 2025',
    title: 'Bekasi Culinary Fest 2025',
    venue: 'Alun-Alun Kota Bekasi \u00b7 Bekasi Selatan',
    category: 'Food & Festival',
    description:
      'Three days of street food trails, chef pop-ups, and Betawi cooking demos \u2014 the biggest culinary weekend of the year takes over Alun-Alun.',
    highlights: ['80+ vendors', 'Chef pop-ups', 'Betawi demos', 'Nightly music'],
    ticketStatus: 'Free entry',
    image: IMG.summareconMall,
    href:  '/events/bekasi-culinary-fest-2025',
  },
  upcoming: [
    { date: { d: '28', m: 'JUN' }, day: 'SAT', title: 'Betawi Heritage Parade',           venue: 'Kampung Sawah',            tag: 'Culture', href: '/events/betawi-heritage-parade' },
    { date: { d: '05', m: 'JUL' }, day: 'SAT', title: 'Smart City Innovation Expo',       venue: 'Summarecon Convention',    tag: 'Tech',    href: '/events/smart-city-innovation-expo' },
    { date: { d: '12', m: 'JUL' }, day: 'SAT', title: 'Situ Rawa Gede Nature Trail Run',  venue: 'Bantar Gebang',            tag: 'Sport',   href: '/events/situ-rawa-gede-trail' },
    { date: { d: '19', m: 'JUL' }, day: 'SAT', title: 'Kampung Adat Kranggan Ritual',     venue: 'Jatirangga',               tag: 'Culture', href: '/events/kranggan-ritual' },
    { date: { d: '26', m: 'JUL' }, day: 'SAT', title: 'Bekasi Youth Music Festival',      venue: 'Grand Metropolitan',       tag: 'Music',   href: '/events/youth-music-festival' },
  ],
  totalEvents: 48,
}

export const UTILITY = {
  eyebrow: 'Plan the essentials',
  title: 'Eat. Stay. Get around.',
  kicker: 'Everything you need to move through the city with ease.',
  action: { label: 'Open the Smart Planner', href: '/planner' },
  tabs: [
    {
      id: 'food',
      label: 'Where to Eat',
      icon: 'utensils',
      href: '/discover/culinary',
      count: 30,
      unit: 'restaurants curated',
      subtitle: 'From legendary warung to fine-dining rows.',
      items: [
        { name: 'Warung Sate H. Sholeh',       category: 'Betawi Sate',     price: '$$',  district: 'Bekasi Timur',   image: IMG.transParkMall,       href: '/discover/culinary/warung-sate-h-sholeh' },
        { name: 'Bakso Bekasi Ori',            category: 'Bakso Legend',    price: '$',   district: 'Bekasi Selatan', image: IMG.summareconMall,      href: '/discover/culinary/bakso-bekasi-ori' },
        { name: 'Nasi Uduk Kebon Kacang',      category: 'Nasi Uduk',       price: '$',   district: 'Bekasi Utara',   image: IMG.transParkMall,       href: '/discover/culinary/nasi-uduk-kebon-kacang' },
        { name: 'Sea Master Bekasi',           category: 'Seafood',         price: '$$$', district: 'Bekasi Barat',   image: IMG.pakuwonMall,         href: '/discover/culinary/sea-master' },
      ],
    },
    {
      id: 'stay',
      label: 'Where to Stay',
      icon: 'bed',
      href: '/discover/stay',
      count: 32,
      unit: 'hotels available',
      subtitle: '5-star retreats, boutique stays, family picks.',
      items: [
        { name: 'Grand Zuri Bekasi',           category: '4-star Business', price: '$$',  district: 'Marga Jaya',     image: IMG.summareconMall,      href: '/discover/stay/grand-zuri' },
        { name: 'Amaroossa Grande Bekasi',     category: 'Premium Retreat', price: '$$$', district: 'Bekasi Selatan', image: IMG.pakuwonMall,         href: '/discover/stay/amaroossa' },
        { name: 'Horison Ultima Bekasi',       category: 'Family Hotel',    price: '$$',  district: 'Bekasi Barat',   image: IMG.metropolitanMall,    href: '/discover/stay/horison-ultima' },
        { name: 'Aston Imperial Bekasi',       category: 'Boutique',        price: '$$$', district: 'Bekasi Timur',   image: IMG.grandMetropolitanMall,href: '/discover/stay/aston-imperial' },
      ],
    },
    {
      id: 'access',
      label: 'Getting Around',
      icon: 'train',
      href: '/discover/access',
      count: 22,
      unit: 'transit nodes mapped',
      subtitle: 'LRT, commuter line, TransBekasi and airport links.',
      items: [
        { name: 'Stasiun Bekasi',              category: 'Commuter Line',   price: '$',   district: 'Marga Jaya',     image: IMG.stasiunBekasi,       href: '/discover/access/stasiun-bekasi' },
        { name: 'LRT Jabodebek Bekasi',        category: 'LRT Terminal',    price: '$',   district: 'Jatibening',     image: IMG.stasiunBekasi,       href: '/discover/access/lrt-jabodebek' },
        { name: 'TransBekasi Corridor 1',      category: 'City Bus',        price: '$',   district: 'Kota Bekasi',    image: IMG.stasiunBekasi,       href: '/discover/access/transbekasi-1' },
        { name: 'Terminal Bekasi',             category: 'Regional Bus',    price: '$',   district: 'Bekasi Timur',   image: IMG.stasiunBekasi,       href: '/discover/access/terminal-bekasi' },
      ],
    },
  ],
}

export const PLANNER = {
  chapter: 'Chapter 06 · Smart Trip Planner',
  eyebrow: 'Smart Trip Planner',
  title: 'Your itinerary,\ndrafted by AI.',
  kicker:
    'Answer a few questions — travel style, days, mood — and get a full Bekasi itinerary with destinations, restaurants, hotels, and transport. Then refine it in conversation.',
  cta:           { label: 'Open Smart Planner',    href: '/planner' },
  secondaryCta:  { label: 'See how it works',      href: '/planner#how' },
  poweredBy: 'Powered by Gemini AI · Grounded on live BekasiGo data',
  quickInputs: {
    days: [
      { id: '1', label: '1 day' },
      { id: '2', label: '2 days' },
      { id: '3', label: '3 days' },
      { id: '5', label: '5 days' },
    ],
    interests: [
      { id: 'heritage', label: 'Heritage' },
      { id: 'food',     label: 'Food' },
      { id: 'nature',   label: 'Nature' },
      { id: 'urban',    label: 'Urban' },
      { id: 'family',   label: 'Family' },
      { id: 'shopping', label: 'Shopping' },
    ],
    styles: [
      { id: 'relaxed',  label: 'Relaxed' },
      { id: 'balanced', label: 'Balanced' },
      { id: 'packed',   label: 'Packed' },
    ],
  },
  mock: {
    tag: 'Heritage + Food',
    dayLabels: ['Day 1', 'Day 2'],
    stops: {
      'Day 1': [
        { time: '09:00', place: 'Klenteng Hok Lay Kiong', tag: 'Heritage', duration: '1h 30m' },
        { time: '11:00', place: 'Warung Sate H. Sholeh',  tag: 'Culinary', duration: '1h' },
        { time: '13:30', place: 'Situ Rawa Gede',         tag: 'Nature',   duration: '2h' },
        { time: '18:00', place: 'Summarecon Mall Bekasi', tag: 'Lifestyle',duration: '3h' },
      ],
      'Day 2': [
        { time: '09:30', place: 'Kampung Adat Kranggan',  tag: 'Heritage', duration: '2h' },
        { time: '13:00', place: 'Trans Park Culinary Row',tag: 'Culinary', duration: '1h 30m' },
        { time: '15:30', place: 'Piramida Terbalik',      tag: 'Urban',    duration: '1h' },
        { time: '17:00', place: 'Gedung Juang 45',        tag: 'Heritage', duration: '1h' },
      ],
    },
  },
  refineHint: 'Add a Betawi cultural stop before lunch.',
  pillars: [
    { icon: 'lock-open',      title: 'Guest access',           desc: 'No account required to try. Sign in only to save or download.' },
    { icon: 'sparkles',       title: 'AI-grounded on Bekasi',  desc: 'Gemini grounded on live BekasiGo destinations, events, and transport.' },
    { icon: 'message-square', title: 'Conversational refine',  desc: 'Just chat: "add a family stop", "shorter day two", "budget lunch".' },
    { icon: 'map',            title: 'Map + timeline',         desc: 'Visual timeline with route preview on Google Maps.' },
  ],
}

export const MAP_PREVIEW = {
  chapter: 'Chapter 07 · Explore Map',
  eyebrow: 'Explore Map',
  title: 'The city, at a glance.',
  kicker:
    'Filter by category, neighborhood, or trending \u2014 a live map of everything worth visiting in Kota Bekasi.',
  cta:          { label: 'Open interactive map',    href: '/map' },
  secondaryCta: { label: 'Route from my location',  href: '/map?from=me' },
  filters: [
    { id: 'all',      label: 'All places' },
    { id: 'heritage', label: 'Heritage' },
    { id: 'urban',    label: 'Urban' },
    { id: 'nature',   label: 'Nature' },
    { id: 'events',   label: 'Events' },
    { id: 'transit',  label: 'Transit' },
  ],
  districts: [
    { name: 'Bekasi Utara',   x: 28, y: 18 },
    { name: 'Bekasi Barat',   x: 18, y: 48 },
    { name: 'Bekasi Selatan', x: 44, y: 72 },
    { name: 'Bekasi Timur',   x: 72, y: 44 },
    { name: 'Rawalumbu',      x: 62, y: 78 },
    { name: 'Bantar Gebang',  x: 82, y: 26 },
  ],
  pins: [
    { id: 'p1', name: 'Summarecon Mall Bekasi',    category: 'urban',    district: 'Marga Mulya',    x: 62, y: 40, description: 'Weekend lifestyle anchor with rooftop dining and courtyards.' },
    { id: 'p2', name: 'Klenteng Hok Lay Kiong',    category: 'heritage', district: 'Margahayu',      x: 34, y: 55, description: '300-year-old Peranakan temple \u2014 the city\u2019s spiritual anchor.' },
    { id: 'p3', name: 'Situ Rawa Gede',            category: 'nature',   district: 'Bantar Gebang',  x: 78, y: 28, description: 'Lake and green belt on the eastern edge of the city.' },
    { id: 'p4', name: 'Stadion Patriot',           category: 'events',   district: 'Bekasi Selatan', x: 45, y: 68, description: 'Home of Persipasi Bekasi and the city\u2019s open-air events.' },
    { id: 'p5', name: 'Stasiun Bekasi',            category: 'transit',  district: 'Marga Jaya',     x: 52, y: 50, description: 'Main commuter line hub connecting to Jakarta and beyond.' },
    { id: 'p6', name: 'Gedung Juang 45',           category: 'heritage', district: 'Bekasi Utara',   x: 25, y: 30, description: 'Colonial-era independence landmark.' },
    { id: 'p7', name: 'Piramida Terbalik',         category: 'urban',    district: 'Marga Mulya',    x: 66, y: 34, description: 'The upside-down pyramid \u2014 Bekasi\u2019s viral urban icon.' },
    { id: 'p8', name: 'Bekasi Culinary Fest',      category: 'events',   district: 'Bekasi Selatan', x: 55, y: 62, description: 'Annual 3-day food festival at Alun-Alun.' },
  ],
  stats: [
    { k: '120+', v: 'Destinations' },
    { k: '12',   v: 'City districts' },
    { k: '48',   v: 'Kelurahan mapped' },
    { k: 'Live', v: 'Data updates' },
  ],
}

export const STORIES = {
  chapter: 'Chapter 08 · Stories from Bekasi',
  issue: 'Issue No. 12 · June 2025',
  eyebrow: 'Stories from Bekasi',
  title: 'Voices, streets, and afternoons.',
  kicker:
    'Long-form stories from residents, chefs, artists, and travelers — the writing that lets you feel the city, not just visit it.',
  action:         { label: 'Read all stories',    href: '/stories' },
  secondaryAction:{ label: 'Submit your story',   href: '/stories/submit' },
  featured: {
    title: 'The temple that watches over Margahayu.',
    slug:  'the-temple-that-watches-over-margahayu',
    excerpt:
      'For 300 years, Klenteng Hok Lay Kiong has stood at the edge of Bekasi\u2019s oldest neighborhood — a Peranakan sanctuary where prayer beads and skyscrapers share the same afternoon light.',
    author:    'Nadia Salim',
    authorRole:'Cultural Writer',
    readTime:  '8 min read',
    date:      'June 12, 2025',
    tag:       'Heritage',
    image:     IMG.hokLayKiong,
    pull:      'The past is not behind us in Bekasi. It walks beside us, in silk shoes and slower breath.',
    href:      '/stories/the-temple-that-watches-over-margahayu',
  },
  items: [
    {
      title: 'The warung that never sleeps.',
      slug:  'the-warung-that-never-sleeps',
      excerpt: 'A single lantern on Jalan Ahmad Yani, a family that has fed the city for three generations \u2014 and the sate that keeps them awake.',
      author: 'Ratna Ayu',
      authorRole: 'Food Writer',
      readTime: '6 min',
      date: 'June 09, 2025',
      tag: 'Culinary',
      image: IMG.transParkMall,
      href: '/stories/the-warung-that-never-sleeps',
    },
    {
      title: 'How Bekasi learned to skate.',
      slug:  'how-bekasi-learned-to-skate',
      excerpt: 'A quiet corner of Alun-Alun, a borrowed board, and the kids who taught the city a new language of balance.',
      author: 'Rio Kurniawan',
      authorRole: 'Youth Culture',
      readTime: '5 min',
      date: 'June 04, 2025',
      tag: 'Youth',
      image: IMG.piramidaSummarecon,
      href: '/stories/how-bekasi-learned-to-skate',
    },
    {
      title: 'Sundays at Situ Rawa Gede.',
      slug:  'sundays-at-situ-rawa-gede',
      excerpt: 'What the lake keeps and gives back \u2014 an afternoon with the fishermen, joggers, and long-shadow families of Bantar Gebang.',
      author: 'Adi Pranata',
      authorRole: 'Local Editor',
      readTime: '4 min',
      date: 'May 29, 2025',
      tag: 'Lifestyle',
      image: IMG.situRawaGede,
      href: '/stories/sundays-at-situ-rawa-gede',
    },
  ],
  totalStories: 42,
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
