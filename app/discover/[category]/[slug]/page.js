// Catch-all for deep discover sub-slugs (/discover/access/lrt-jabodebek,
// /discover/culinary/bakso-bekasi-ori, /discover/stay/amaroossa, etc.). Since
// individual detail pages for these are out-of-scope for the MVP, we redirect
// callers to the appropriate directory index so they always see rich content.

import { redirect } from 'next/navigation'

const PARENT = {
  access:   '/getting-around',
  culinary: '/food',
  stay:     '/stay',
  shopping: '/discover/shopping',
  heritage: '/discover/heritage',
  urban:    '/discover/urban',
  nature:   '/discover/nature',
  family:   '/discover/family',
}

export default async function DiscoverDeepPage({ params }) {
  const { category } = await params
  redirect(PARENT[category] || '/discover')
}
