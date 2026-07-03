-- ============================================================================
-- BekasiGo — Baseline seed data (E-31)
-- ============================================================================
-- Seeds:
--   * Destination categories
--   * Blog categories
--   * Story columns (as tags for now; can be normalized later)
--   * Homepage section skeleton
--   * Primary navigation items
--   * Sample site_settings
-- Idempotent — safe to run multiple times.
-- ============================================================================

-- Destination categories
insert into destination_categories (slug, label, color, sort_order) values
  ('heritage',        'Heritage & Culture',   '#B48A2D', 10),
  ('nature',          'Nature',               '#1E7A72', 20),
  ('urban',           'Urban Lifestyle',      '#155F58', 30),
  ('shopping',        'Shopping',             '#8C6A20', 40),
  ('food',            'Food & Dining',        '#A34E2B', 50),
  ('family',          'Family & Kids',        '#3F9186', 60),
  ('nightlife',       'Nightlife',            '#5E4B8B', 70)
on conflict (slug) do nothing;

-- Blog categories
insert into blog_categories (slug, label, color, sort_order) values
  ('guides',    'Guides',        '#1E7A72', 10),
  ('news',      'City News',     '#A34E2B', 20),
  ('tips',      'Tips',          '#B48A2D', 30),
  ('openings',  'New Openings',  '#E27D5A', 40),
  ('updates',   'Updates',       '#155F58', 50),
  ('reviews',   'Reviews',       '#8C6A20', 60)
on conflict (slug) do nothing;

-- Homepage sections
insert into homepage_sections (key, label, kind, sort_order, settings) values
  ('hero',      'Hero video',        'hero_video', 10, '{"autoplay":true,"muted":true}'),
  ('signature', 'Signature story',    'editorial',  20, '{}'),
  ('icons',     'Icon destinations',  'carousel',   30, '{"limit":15}'),
  ('events',    'Featured events',    'grid',       40, '{"limit":6}'),
  ('stories',   'City stories',       'editorial',  50, '{}'),
  ('cta',       'Trip planner CTA',   'cta',        60, '{}')
on conflict (key) do nothing;

-- Primary navigation
insert into navigation_items (location, label, href, sort_order) values
  ('primary', 'Discover Bekasi', '/discover',      10),
  ('primary', 'Destinations',    '/destinations',  20),
  ('primary', 'Events',          '/events',        30),
  ('primary', 'Food & Drink',    '/food',          40),
  ('primary', 'Stay',            '/stay',          50),
  ('primary', 'Getting Around',  '/getting-around',60),
  ('primary', 'City Stories',    '/stories',       70),
  ('primary', 'Blog',            '/blog',          80),
  ('primary', 'Explore Map',     '/map',           90)
on conflict do nothing;

insert into navigation_items (location, label, href, sort_order) values
  ('utility', 'Press',    '/press',    10),
  ('utility', 'Partners', '/partners', 20),
  ('utility', 'CMS',      '/admin',    30)
on conflict do nothing;
