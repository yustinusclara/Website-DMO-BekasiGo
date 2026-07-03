// BekasiGo Design Tokens
// JS/TS-friendly source of truth. Mirrors what tailwind.config.js exposes as
// utility classes. Import from here for any non-CSS context: charts, maps,
// planner state, illustration components, CMS, etc.

export const colors = {
  ink:   '#0B1512',
  cream: '#F7F1E6',
  sand:  '#EFE7D6',
  coral: '#E27D5A',
  sky:   '#8CC7D6',
  emerald: {
    50:  '#EAF3F1',
    100: '#D0E5E1',
    200: '#A2CBC3',
    300: '#6FAEA4',
    400: '#3F9186',
    500: '#1E7A72',
    600: '#155F58',
    700: '#124F4A',
    800: '#0B3D3A',
    900: '#062E2B',
  },
  gold: {
    300: '#F0D69B',
    400: '#E4C179',
    500: '#D4A94C',
    600: '#B48A2D',
    700: '#8C6A20',
  },
}

// Category token map — used by tags, map pins, planner activity types.
export const categories = {
  heritage:  { label: 'Heritage',  color: '#D4A94C', dark: '#8C6A20' },
  culinary:  { label: 'Culinary',  color: '#E27D5A', dark: '#A34E2B' },
  urban:     { label: 'Urban',     color: '#1E7A72', dark: '#0B3D3A' },
  nature:    { label: 'Nature',    color: '#3F9186', dark: '#155F58' },
  events:    { label: 'Events',    color: '#8CC7D6', dark: '#3E7787' },
  shopping:  { label: 'Shopping',  color: '#B48A2D', dark: '#6A4F16' },
  transit:   { label: 'Transit',   color: '#6FAEA4', dark: '#124F4A' },
  family:    { label: 'Family',    color: '#E4C179', dark: '#8C6A20' },
  civic:     { label: 'Civic',     color: '#0B3D3A', dark: '#062E2B' },
  sport:     { label: 'Sport',     color: '#124F4A', dark: '#062E2B' },
  lifestyle: { label: 'Lifestyle', color: '#E27D5A', dark: '#A34E2B' },
}

export const radii = {
  xs:   '4px',
  sm:   '6px',
  md:   '10px',
  lg:   '12px',
  xl:   '18px',
  '2xl':'24px',
  '3xl':'32px',
  full: '9999px',
}

export const spacing = {
  section:    'py-16 md:py-24 lg:py-28',
  sectionSm:  'py-10 md:py-14',
  containerX: 'px-5 md:px-8 lg:px-10',
  gapEditorial: 'gap-8 md:gap-12 lg:gap-16',
}

export const shadows = {
  soft:      '0 1px 2px rgba(11,61,58,0.04), 0 8px 24px rgba(11,61,58,0.06)',
  elevated:  '0 4px 12px rgba(11,61,58,0.06), 0 24px 48px rgba(11,61,58,0.10)',
  deep:      '0 30px 60px rgba(6,46,43,0.35)',
  gold:      '0 12px 40px rgba(212,169,76,0.30)',
  ring:      'inset 0 0 0 1px rgba(11,61,58,0.06)',
}

export const easings = {
  outQuad:    'cubic-bezier(0.5, 1, 0.89, 1)',
  inOutQuart: 'cubic-bezier(0.76, 0, 0.24, 1)',
  expo:       'cubic-bezier(0.16, 1, 0.3, 1)',
}

export const durations = {
  fast:   150,
  base:   250,
  slow:   400,
  slower: 700,
  cinema: 1200,
}

export const typography = {
  fontFamilies: {
    display: 'var(--font-playfair), Georgia, serif',
    sans:    'var(--font-inter), system-ui, sans-serif',
    mono:    'ui-monospace, SFMono-Regular, Menlo, monospace',
  },
  scale: {
    displayXl: 'clamp(3rem, 6vw, 6rem)',
    displayLg: 'clamp(2.25rem, 4.5vw, 4rem)',
    displayMd: 'clamp(1.75rem, 3vw, 2.75rem)',
    displaySm: 'clamp(1.25rem, 2vw, 1.75rem)',
  },
  tracking: {
    tight: '-0.02em',
    normal: '0em',
    label: '0.22em',
    long: '0.3em',
  },
}

export const zIndex = {
  base:   0,
  raised: 10,
  header: 50,
  drawer: 60,
  modal:  70,
  toast:  80,
}

const tokens = { colors, categories, radii, spacing, shadows, easings, durations, typography, zIndex }
export default tokens
