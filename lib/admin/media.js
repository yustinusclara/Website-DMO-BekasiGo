// Aggregated Media Library — indexes every Cloudinary URL used across BekasiGo.
// Categorized for filter/search in the CMS Media manager, ready to be picked
// into any content module (destinations, events, stories, blog, homepage).

import { IMG, VIDEO, CLOUDINARY } from '@/lib/content/homepage'

export const MEDIA_CATEGORIES = [
  { id: 'all',      label: 'All media',   color: '#0B3D3A' },
  { id: 'landmark', label: 'Landmarks',    color: '#B48A2D' },
  { id: 'nature',   label: 'Nature',       color: '#1E7A72' },
  { id: 'urban',    label: 'Urban',        color: '#155F58' },
  { id: 'heritage', label: 'Heritage',     color: '#A34E2B' },
  { id: 'people',   label: 'People',       color: '#8C6A20' },
  { id: 'video',    label: 'Video',        color: '#E27D5A' },
  { id: 'other',    label: 'Uncategorized', color: '#6B7280' },
]

export const MEDIA_TYPES = [
  { id: 'all',   label: 'All' },
  { id: 'image', label: 'Image' },
  { id: 'video', label: 'Video' },
]

/**
 * MEDIA_ASSETS — the single index of every Cloudinary asset in use.
 * Each entry:
 *   - id:        stable slug used across the CMS
 *   - name:      display name
 *   - url:       full Cloudinary URL
 *   - type:      'image' | 'video'
 *   - category:  see MEDIA_CATEGORIES
 *   - tags:      keywords for search
 *   - size:      approx. file size (mocked — not fetched)
 *   - dim:       aspect ratio hint
 *   - uploadedAt: mocked ISO date
 *   - usedIn:    string — which content module currently references it
 */
export const MEDIA_ASSETS = [
  // Landmarks — icon list
  { id: 'stadion-patriot',        name: 'Stadion Patriot Candrabhaga',    url: IMG.stadionPatriot,        type: 'image', category: 'landmark', tags: ['stadion', 'sport', 'landmark'],       size: '1.4 MB', dim: '16:10', uploadedAt: '2026-05-14', usedIn: 'Destinations · Events' },
  { id: 'piramida-summarecon',    name: 'Piramida Terbalik Summarecon',   url: IMG.piramidaSummarecon,    type: 'image', category: 'urban',    tags: ['summarecon', 'architecture'],          size: '1.1 MB', dim: '16:10', uploadedAt: '2026-05-14', usedIn: 'Destinations' },
  { id: 'summarecon-mall',        name: 'Summarecon Mall Bekasi',         url: IMG.summareconMall,        type: 'image', category: 'urban',    tags: ['mall', 'shopping', 'summarecon'],      size: '1.2 MB', dim: '16:10', uploadedAt: '2026-05-14', usedIn: 'Destinations · Events' },
  { id: 'monumen-kali-bekasi',    name: 'Monumen Kali Bekasi',            url: IMG.monumenKaliBekasi,     type: 'image', category: 'heritage', tags: ['monument', 'heritage'],                size: '0.9 MB', dim: '16:10', uploadedAt: '2026-05-14', usedIn: 'Destinations' },
  { id: 'stasiun-bekasi',         name: 'Stasiun Bekasi',                 url: IMG.stasiunBekasi,         type: 'image', category: 'urban',    tags: ['station', 'transit'],                  size: '1.0 MB', dim: '16:10', uploadedAt: '2026-05-14', usedIn: 'Discover · Blog' },
  { id: 'hok-lay-kiong',          name: 'Klenteng Hok Lay Kiong',         url: IMG.hokLayKiong,           type: 'image', category: 'heritage', tags: ['klenteng', 'temple', 'heritage', 'peranakan'], size: '1.3 MB', dim: '16:10', uploadedAt: '2026-05-14', usedIn: 'Destinations · Stories' },
  { id: 'kampung-bali',           name: 'Kampung Bali Harapan Jaya',      url: IMG.kampungBali,           type: 'image', category: 'heritage', tags: ['kampung', 'community', 'bali'],        size: '1.2 MB', dim: '16:10', uploadedAt: '2026-05-14', usedIn: 'Stories' },
  { id: 'trans-park-mall',        name: 'Trans Park Mall Juanda',         url: IMG.transParkMall,         type: 'image', category: 'urban',    tags: ['mall', 'family'],                      size: '1.0 MB', dim: '16:10', uploadedAt: '2026-05-14', usedIn: 'Events' },
  { id: 'pakuwon-mall',           name: 'Pakuwon Mall Bekasi',            url: IMG.pakuwonMall,           type: 'image', category: 'urban',    tags: ['mall', 'nightlife'],                   size: '1.1 MB', dim: '16:10', uploadedAt: '2026-05-14', usedIn: 'Events' },
  { id: 'metropolitan-mall',      name: 'Metropolitan Mall Bekasi',       url: IMG.metropolitanMall,      type: 'image', category: 'urban',    tags: ['mall', 'weekend'],                     size: '1.0 MB', dim: '16:10', uploadedAt: '2026-05-14', usedIn: 'Events' },
  { id: 'grand-metropolitan',     name: 'Grand Metropolitan Mall',        url: IMG.grandMetropolitanMall, type: 'image', category: 'urban',    tags: ['mall', 'shopping'],                    size: '1.1 MB', dim: '16:10', uploadedAt: '2026-05-14', usedIn: 'Events' },
  { id: 'monumen-perjuangan',     name: 'Monumen Perjuangan Rakyat',      url: IMG.monumenPerjuangan,     type: 'image', category: 'heritage', tags: ['monument', 'heritage'],                size: '0.9 MB', dim: '16:10', uploadedAt: '2026-05-14', usedIn: 'Destinations' },
  { id: 'gedung-juang-45',        name: 'Gedung Juang 45',                url: IMG.gedungJuang45,         type: 'image', category: 'heritage', tags: ['museum', 'heritage', 'history'],       size: '1.2 MB', dim: '16:10', uploadedAt: '2026-05-14', usedIn: 'Destinations · Blog' },
  { id: 'kampung-adat-kranggan',  name: 'Kampung Adat Kranggan',          url: IMG.kampungAdatKranggan,   type: 'image', category: 'heritage', tags: ['kampung', 'sundanese', 'ritual'],      size: '1.4 MB', dim: '16:10', uploadedAt: '2026-05-14', usedIn: 'Destinations · Stories · Events' },
  { id: 'situ-rawa-gede',         name: 'Situ Rawa Gede',                 url: IMG.situRawaGede,          type: 'image', category: 'nature',   tags: ['lake', 'nature'],                      size: '1.1 MB', dim: '16:10', uploadedAt: '2026-05-14', usedIn: 'Destinations' },
  { id: 'floating-city',          name: 'Kota Bekasi Floating Smart City',url: IMG.floatingCity,          type: 'image', category: 'urban',    tags: ['skyline', 'smart-city', 'signature'],  size: '1.8 MB', dim: '16:10', uploadedAt: '2026-05-14', usedIn: 'Homepage · Hero · Discover · Blog' },
  { id: 'floating-city-bg',       name: 'Floating Smart City — background',url: IMG.floatingCityBg,        type: 'image', category: 'urban',    tags: ['skyline', 'background', 'poster'],     size: '2.4 MB', dim: '16:9',  uploadedAt: '2026-05-14', usedIn: 'Homepage · Hero poster' },
  { id: 'floating-city-cutout',   name: 'Floating Smart City — cutout',   url: IMG.floatingCityCutout,    type: 'image', category: 'urban',    tags: ['skyline', 'cutout', 'transparent'],    size: '2.1 MB', dim: '1:1',   uploadedAt: '2026-05-14', usedIn: 'Homepage · Signature section' },

  // Video
  { id: 'hero-video',             name: 'Hero cinematic loop',            url: VIDEO.hero,                type: 'video', category: 'video',    tags: ['hero', 'skyline', 'loop', 'homepage'], size: '18.4 MB', dim: '16:9', uploadedAt: '2026-05-14', usedIn: 'Homepage · Hero loop' },
]

export function findMediaByUrl(url) {
  return MEDIA_ASSETS.find((m) => m.url === url) ?? null
}

export function mediaStats() {
  return {
    total: MEDIA_ASSETS.length,
    images: MEDIA_ASSETS.filter((m) => m.type === 'image').length,
    videos: MEDIA_ASSETS.filter((m) => m.type === 'video').length,
    orphaned: 0, // placeholder — could compute from usage graph
    cloudinaryBase: CLOUDINARY,
  }
}
