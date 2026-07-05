// Discover Bekasi page — CMS-ready content model.
// Uses shared IMG assets from homepage.js.

import { IMG } from './homepage'

export const DISCOVER = {
  hero: {
    eyebrow: 'Discover Bekasi',
    kicker: 'The City Guide',
    title: 'A city with two rhythms—heritage that endures, futures that arrive fast.',
    subtitle:
      'From Betawi kampungs to floating smart-city skylines, from centuries-old temples to weekend art fairs—Bekasi is a place you decode slowly, one neighborhood at a time.',
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Discover Bekasi' },
    ],
    image: IMG.floatingCity,
    imageAlt: 'Aerial view of Kota Bekasi floating smart city skyline',
    stats: [
      { k: '2.5M',    v: 'Residents' },
      { k: '210 km²', v: 'City area' },
      { k: '12',      v: 'Districts' },
      { k: '48',      v: 'Neighborhoods' },
    ],
    coords: 'N 6°14′  ·  E 106°59′',
  },

  positioning: {
    eyebrow: 'City Positioning',
    heading: 'The city, as Bekasi tells it.',
    quote: 'Bekasi is not a suburb of Jakarta. It is a city with its own memory, its own kitchen, and its own tomorrow.',
    attribution: 'BekasiGo Editorial',
    paragraphs: [
      "Nested at Jakarta's eastern edge, Kota Bekasi has quietly grown into one of Indonesia's most dynamic urban cultures. The city holds together the sacred and the modern—Betawi wedding drums in a kampung on Saturday, then a rooftop cinema in a Summarecon tower on Sunday.",
      'This guide is our attempt to introduce Bekasi the way locals experience it: through streets, temples, canteens, malls, and the small rituals that connect them.',
    ],
    pillars: [
      { title: 'Heritage that lives',      kicker: 'Not preserved—practiced.',        cat: 'heritage' },
      { title: 'A kitchen city',           kicker: 'From warung to fine dining.',    cat: 'culinary' },
      { title: 'A skyline in motion',      kicker: 'Smart City, floating high.',     cat: 'urban' },
      { title: 'Everyday nature',          kicker: 'Rivers, situ, quiet corners.',   cat: 'nature' },
    ],
    portrait: IMG.hokLayKiong,
    portraitCaption: 'Klenteng Hok Lay Kiong · Margahayu · est. 18th century',
  },

  categories: {
    eyebrow: 'Category-led exploration',
    heading: 'Enter Bekasi the way you travel.',
    kicker: 'Eight ways in—pick the lane that fits your day, your mood, or your first trip to the city.',
    action: { label: 'See all destinations', href: '/destinations' },
    items: [
      { id: 'heritage', label: 'Heritage & Culture',   count: 24, href: '/discover/heritage',  image: IMG.hokLayKiong,           kicker: 'Betawi kampungs, klenteng, colonial memory.',           size: 'lg' },
      { id: 'culinary', label: 'Food & Drink',          count: 68, href: '/food',                image: IMG.kampungBali,           kicker: 'Warung soto to rooftop kitchens.',                        size: 'md' },
      { id: 'urban',    label: 'Urban Lifestyle',       count: 32, href: '/discover/urban',      image: IMG.summareconMall,        kicker: 'Malls, rooftops, weekend markets.',                       size: 'md' },
      { id: 'nature',   label: 'Nature & Waterfront',   count: 14, href: '/discover/nature',     image: IMG.situRawaGede,          kicker: 'Rivers, situ, and slow green corners.',                   size: 'md' },
      { id: 'family',   label: 'Family Friendly',       count: 22, href: '/discover/family',     image: IMG.transParkMall,         kicker: 'Weekend spots for every age.',                            size: 'md' },
      { id: 'shopping', label: 'Shopping',              count: 18, href: '/discover/shopping',   image: IMG.pakuwonMall,           kicker: 'Mega malls to concept stores.',                           size: 'md' },
      { id: 'stay',     label: 'Where to Stay',         count: 26, href: '/stay',                image: IMG.grandMetropolitanMall, kicker: 'Boutique, business, family stays.',                       size: 'lg' },
      { id: 'transit',  label: 'Getting Around',        count:  9, href: '/getting-around',      image: IMG.stasiunBekasi,         kicker: 'LRT, KRL, buses—the fastest routes in.',                 size: 'md' },
    ],
  },

  highlights: {
    eyebrow: 'Featured Highlights',
    heading: 'Three places that explain the city.',
    kicker: 'A skyline, a temple, a kampung—start here.',
    items: [
      { number: '01', title: 'The Floating Smart City',    cat: 'urban',    location: 'Summarecon Bekasi',        image: IMG.floatingCity,          href: '/destinations/floating-smart-city',    kicker: 'Where the modern skyline redefines what a satellite city can look like from above.' },
      { number: '02', title: 'Klenteng Hok Lay Kiong',      cat: 'heritage', location: 'Margahayu',                image: IMG.hokLayKiong,           href: '/destinations/hok-lay-kiong',           kicker: 'The oldest Chinese temple in Bekasi—a still-living center of ritual since the 18th century.' },
      { number: '03', title: 'Kampung Adat Kranggan',       cat: 'heritage', location: 'Jatisampurna',              image: IMG.kampungAdatKranggan,   href: '/destinations/kampung-adat-kranggan',   kicker: 'A Sundanese-Betawi cultural village keeping traditional ceremonies alive at the city’s edge.' },
    ],
  },

  facts: {
    eyebrow: 'The city, in numbers',
    heading: 'Bekasi at a glance.',
    kicker: 'A snapshot of the scale, culture, and rhythm that shape every visit.',
    items: [
      { k: '2.5M',   v: 'Residents',        kicker: 'One of Indonesia’s most populous cities.' },
      { k: '210km²', v: 'City area',        kicker: 'A weekend size with year-long depth.' },
      { k: '12',     v: 'Districts',        kicker: 'Each with its own culinary and cultural DNA.' },
      { k: '18min',  v: 'To Central Jakarta', kicker: 'By LRT Jabodebek—the fastest way in.' },
      { k: '365',    v: 'Days of culture',  kicker: 'Festivals, markets, rituals every month.' },
      { k: '48',     v: 'Neighborhoods',    kicker: 'From kampung Betawi to master-planned towns.' },
    ],
  },

  paths: {
    eyebrow: 'Where to go next',
    heading: 'Choose your entry point.',
    kicker: 'Four ways to keep exploring—go browse, plan, or map the whole city.',
    items: [
      { label: 'Browse Destinations',     href: '/destinations', kicker: '120+ places, filtered by theme, mood, or district.', icon: 'MapPin',   count: '120+ places' },
      { label: 'What’s happening now',    href: '/events',       kicker: 'Live events, festivals, and weekend markets.',        icon: 'Calendar', count: '48 this month' },
      { label: 'Let AI plan your trip',   href: '/planner',      kicker: 'A personalized itinerary in seconds.',                 icon: 'Sparkles', count: 'AI-powered', accent: true },
      { label: 'Open the Explore Map',    href: '/map',          kicker: 'Every place on one interactive canvas.',               icon: 'Globe',    count: 'Interactive' },
    ],
  },
}
