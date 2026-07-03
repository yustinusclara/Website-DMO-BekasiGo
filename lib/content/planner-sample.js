// Shared planner sample data — used by results and map modules.
// Positions are normalized 0..1 within the mock map viewport (x, y).
// Replaced by real coords from the DB / Gemini output in a follow-up prompt.

import { IMG } from '@/lib/content/homepage'

export const PLANNER_SAMPLE = {
  title: 'A heritage-then-urban weekend across Kota Bekasi.',
  summary:
    'We open with the temple courtyard while the light is still soft, break for Peranakan coffee, ' +
    'and spend the afternoon in the Summarecon precinct. Day two leans into the kampung heritage ' +
    'and closes at Alun-Alun for the sunset.',
  stats: {
    stops: 9,
    walking_min: 42,
    driving_min: 68,
    photo_windows: 3,
    weather: 'Warm · 28°C · light cloud',
  },
  hotel: {
    id: 'grand-metropolitan',
    name: 'Grand Metropolitan Suites',
    tier: 'Elevated',
    district: 'Bekasi Selatan · 15 min drive from Summarecon',
    image: IMG.grandMetropolitanMall,
    reason: 'Central, family-friendly, and within a short drive of both day-one and day-two anchors.',
    pos: { x: 0.42, y: 0.86 },
  },
  days: [
    {
      day: 1,
      title: 'Heritage morning, urban afternoon.',
      stops: [
        { id: 'hok-lay',        kind: 'destination', title: 'Klenteng Hok Lay Kiong',            kicker: 'Heritage · Bekasi Timur',    time: '08:30', duration: '90 min', pos: { x: 0.22, y: 0.68 }, image: IMG.hokLayKiong },
        { id: 'warung-aroma',   kind: 'restaurant',  title: 'Warung Kopi Aroma',                 kicker: 'Coffee & breakfast',         time: '10:20', duration: '45 min', pos: { x: 0.28, y: 0.62 } },
        { id: 'gedung-juang',   kind: 'destination', title: 'Gedung Juang 45',                   kicker: 'Heritage museum · Tambun',   time: '11:45', duration: '75 min', pos: { x: 0.38, y: 0.44 }, image: IMG.gedungJuang45 },
        { id: 'nasi-uduk',      kind: 'restaurant',  title: 'Nasi Uduk Kang Aep',                kicker: 'Sundanese · Tambun',         time: '13:10', duration: '60 min', pos: { x: 0.42, y: 0.40 } },
        { id: 'summarecon',     kind: 'destination', title: 'Summarecon Mall & Piramida',        kicker: 'Urban · Bekasi Utara',       time: '14:40', duration: '2 hrs',  pos: { x: 0.60, y: 0.24 }, image: IMG.piramidaSummarecon },
        { id: 'alun-alun',      kind: 'destination', title: 'Alun-Alun Kota Bekasi',             kicker: 'Sunset · Bekasi Timur',      time: '17:30', duration: '75 min', pos: { x: 0.34, y: 0.72 }, image: IMG.floatingCity },
      ],
      transport: [
        { id: 't-1', from: 'stasiun-bekasi', to: 'hok-lay',    mode: 'walk',  minutes: 8,  pos: { x: 0.16, y: 0.74 } },
      ],
    },
    {
      day: 2,
      title: 'Kampung mornings and quieter corners.',
      stops: [
        { id: 'kampung-kranggan', kind: 'destination', title: 'Kampung Adat Kranggan', kicker: 'Heritage community · Jatisampurna', time: '08:00', duration: '90 min', pos: { x: 0.72, y: 0.62 }, image: IMG.kampungAdatKranggan },
      ],
      transport: [],
    },
  ],
  transportHubs: [
    { id: 'stasiun-bekasi',    name: 'Stasiun Bekasi',    kind: 'krl',  pos: { x: 0.12, y: 0.78 } },
    { id: 'lrt-bekasi-timur',  name: 'LRT Bekasi Timur',  kind: 'lrt',  pos: { x: 0.30, y: 0.82 } },
  ],
}
