-- ============================================================================
-- BekasiGo — Supabase Schema Foundation (E-31)
-- ============================================================================
-- Postgres schema for a DMO (Destination Management Organization) platform.
-- Public content model + CMS + AI Trip Planner. Designed for Supabase but
-- portable to any Postgres instance.
--
-- Conventions:
--   * All primary keys are UUID v4 with server-side default.
--   * Every table has created_at / updated_at (triggered).
--   * Slugs are unique and lowercase-kebab; enforced via CHECK + index.
--   * Publish workflow uses a shared `content_status` enum.
--   * Coordinates use PostGIS `geography(Point, 4326)` where PostGIS is
--     available; falls back to `lat` / `lng` numeric columns otherwise.
--   * Rich body content is stored as `jsonb blocks[]` — CMS-editable.
--   * SEO fields live inline (title/description/canonical/og_image).
--
-- Extensions expected in Supabase:
--   uuid-ossp, pgcrypto (for gen_random_uuid), postgis (optional but nice)
-- ============================================================================

create extension if not exists "pgcrypto";
create extension if not exists "pg_trgm";  -- trigram search for admin
-- postgis is optional; the schema falls back to lat/lng numeric columns
-- create extension if not exists "postgis";

-- ---------------------------------------------------------------------------
-- 1) Shared ENUMs
-- ---------------------------------------------------------------------------
do $$ begin
  create type content_status as enum ('draft', 'published', 'scheduled', 'archived');
exception when duplicate_object then null; end $$;

do $$ begin
  create type media_type as enum ('image', 'video');
exception when duplicate_object then null; end $$;

do $$ begin
  create type trip_style as enum ('heritage', 'family', 'foodie', 'nightlife', 'nature', 'shopping', 'mixed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type transport_kind as enum ('lrt_station', 'krl_station', 'bus_terminal', 'toll_gate', 'airport_link', 'parking');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------------
-- 2) Shared trigger for updated_at
-- ---------------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- Helper: attach updated_at trigger to a table
-- Call: select attach_updated_at('destinations');
create or replace function attach_updated_at(tbl text)
returns void language plpgsql as $$
begin
  execute format(
    'drop trigger if exists trg_%1$s_updated_at on %1$s;'
    ' create trigger trg_%1$s_updated_at before update on %1$s'
    ' for each row execute function set_updated_at();',
    tbl
  );
end $$;

-- ---------------------------------------------------------------------------
-- 3) Users & roles
--    user_profiles.id references auth.users.id (Supabase native auth).
-- ---------------------------------------------------------------------------
create table if not exists roles (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null check (slug ~* '^[a-z][a-z0-9_-]{1,40}$'),
  label        text not null,
  permissions  jsonb not null default '[]'::jsonb, -- e.g. ["content:write", "media:manage"]
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
select attach_updated_at('roles');

insert into roles (slug, label, permissions) values
  ('admin',   'Administrator',   '["*"]'),
  ('editor',  'Editor',          '["content:write","media:manage","planner:manage"]'),
  ('author',  'Author',          '["content:write"]'),
  ('viewer',  'Read-only viewer','["content:read"]')
on conflict (slug) do nothing;

create table if not exists user_profiles (
  id           uuid primary key,                 -- = auth.users.id
  email        text not null,
  full_name    text,
  avatar_url   text,
  role_id      uuid references roles(id) on delete set null,
  bio          text,
  is_active    boolean not null default true,
  last_login_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists idx_user_profiles_role on user_profiles(role_id);
select attach_updated_at('user_profiles');

-- ---------------------------------------------------------------------------
-- 4) Taxonomies
-- ---------------------------------------------------------------------------
create table if not exists destination_categories (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null check (slug ~* '^[a-z0-9-]{2,60}$'),
  label        text not null,
  color        text,                       -- hex for CMS/pill display
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
select attach_updated_at('destination_categories');

create table if not exists blog_categories (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null check (slug ~* '^[a-z0-9-]{2,60}$'),
  label        text not null,
  color        text,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
select attach_updated_at('blog_categories');

create table if not exists tags (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null check (slug ~* '^[a-z0-9-]{2,60}$'),
  label        text not null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists idx_tags_label_trgm on tags using gin (label gin_trgm_ops);
select attach_updated_at('tags');

-- ---------------------------------------------------------------------------
-- 5) Media assets (Cloudinary index)
-- ---------------------------------------------------------------------------
create table if not exists media_assets (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  url           text unique not null,
  type          media_type not null default 'image',
  category      text,                            -- free-form: landmark/nature/urban/…
  alt_text      text,
  width         integer,
  height        integer,
  bytes         integer,
  aspect_ratio  text,                            -- e.g. '16:10'
  used_in       text,                            -- free-form annotation of usage locations
  uploaded_by   uuid references user_profiles(id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists idx_media_type on media_assets(type);
create index if not exists idx_media_category on media_assets(category);
create index if not exists idx_media_name_trgm on media_assets using gin (name gin_trgm_ops);
select attach_updated_at('media_assets');

-- Junction: many-to-many with tags (reusable pattern)
create table if not exists media_asset_tags (
  media_asset_id uuid references media_assets(id) on delete cascade,
  tag_id         uuid references tags(id) on delete cascade,
  primary key (media_asset_id, tag_id)
);

-- ---------------------------------------------------------------------------
-- 6) Destinations
-- ---------------------------------------------------------------------------
create table if not exists destinations (
  id                uuid primary key default gen_random_uuid(),
  slug              text unique not null check (slug ~* '^[a-z0-9-]{2,120}$'),
  title             text not null,
  excerpt           text,                              -- summary
  description       text,                              -- long-form
  body              jsonb not null default '[]'::jsonb, -- rich blocks[]
  category_id       uuid references destination_categories(id) on delete set null,
  district          text,                              -- editorial district name
  lat               numeric(9,6),
  lng               numeric(9,6),
  hours             text,
  duration          text,                              -- e.g. "1–2 hrs"
  best_time         text,
  family_friendly   boolean not null default true,
  environment       text check (environment in ('indoor','outdoor','mixed')),
  planner_priority  smallint not null default 50 check (planner_priority between 0 and 100),
  rating            numeric(3,2) check (rating between 0 and 5),
  featured          boolean not null default false,
  status            content_status not null default 'draft',
  featured_image_id uuid references media_assets(id) on delete set null,
  gallery           uuid[] default '{}',               -- array of media_assets.id
  -- SEO
  seo_title         text,
  seo_description   text,
  seo_canonical     text,
  seo_og_image_id   uuid references media_assets(id) on delete set null,
  published_at      timestamptz,
  created_by        uuid references user_profiles(id) on delete set null,
  updated_by        uuid references user_profiles(id) on delete set null,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
create index if not exists idx_destinations_status on destinations(status);
create index if not exists idx_destinations_category on destinations(category_id);
create index if not exists idx_destinations_district on destinations(district);
create index if not exists idx_destinations_title_trgm on destinations using gin (title gin_trgm_ops);
create index if not exists idx_destinations_featured on destinations(featured) where featured;
select attach_updated_at('destinations');

create table if not exists destination_tags (
  destination_id uuid references destinations(id) on delete cascade,
  tag_id         uuid references tags(id) on delete cascade,
  primary key (destination_id, tag_id)
);

-- ---------------------------------------------------------------------------
-- 7) Events
-- ---------------------------------------------------------------------------
create table if not exists events (
  id                uuid primary key default gen_random_uuid(),
  slug              text unique not null check (slug ~* '^[a-z0-9-]{2,120}$'),
  title             text not null,
  summary           text,
  content           text,
  body              jsonb not null default '[]'::jsonb,
  category          text,                              -- festival/music/market/…
  venue_name        text not null,
  venue_address     text,
  district          text,
  lat               numeric(9,6),
  lng               numeric(9,6),
  start_date        date not null,
  end_date          date,
  time_display      text,                              -- "10:00 – 22:00 WIB"
  price             text,
  organizer         text,
  capacity          text,
  cta_label         text,
  cta_url           text,
  featured          boolean not null default false,
  status            content_status not null default 'draft',
  featured_image_id uuid references media_assets(id) on delete set null,
  -- SEO
  seo_title         text,
  seo_description   text,
  seo_og_image_id   uuid references media_assets(id) on delete set null,
  related_destination_id uuid references destinations(id) on delete set null,
  published_at      timestamptz,
  created_by        uuid references user_profiles(id) on delete set null,
  updated_by        uuid references user_profiles(id) on delete set null,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  check (end_date is null or end_date >= start_date)
);
create index if not exists idx_events_status on events(status);
create index if not exists idx_events_start on events(start_date);
create index if not exists idx_events_category on events(category);
create index if not exists idx_events_featured on events(featured) where featured;
select attach_updated_at('events');

create table if not exists event_tags (
  event_id uuid references events(id) on delete cascade,
  tag_id   uuid references tags(id) on delete cascade,
  primary key (event_id, tag_id)
);

-- ---------------------------------------------------------------------------
-- 8) Restaurants (F&B directory)
-- ---------------------------------------------------------------------------
create table if not exists restaurants (
  id                uuid primary key default gen_random_uuid(),
  slug              text unique not null check (slug ~* '^[a-z0-9-]{2,120}$'),
  name              text not null,
  excerpt           text,
  description       text,
  cuisine           text,                        -- e.g. 'Sundanese', 'Peranakan', 'Coffee'
  price_level       smallint check (price_level between 1 and 4), -- $ to $$$$
  district          text,
  address           text,
  lat               numeric(9,6),
  lng               numeric(9,6),
  phone             text,
  website           text,
  reservations_url  text,
  hours             jsonb,                        -- { mon: '08:00-22:00', tue: … }
  dietary           text[],                       -- ['vegan','halal','gluten_free']
  featured          boolean not null default false,
  status            content_status not null default 'draft',
  featured_image_id uuid references media_assets(id) on delete set null,
  gallery           uuid[] default '{}',
  -- SEO
  seo_title         text,
  seo_description   text,
  seo_canonical     text,
  published_at      timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
create index if not exists idx_restaurants_status on restaurants(status);
create index if not exists idx_restaurants_district on restaurants(district);
create index if not exists idx_restaurants_cuisine on restaurants(cuisine);
create index if not exists idx_restaurants_featured on restaurants(featured) where featured;
select attach_updated_at('restaurants');

create table if not exists restaurant_tags (
  restaurant_id uuid references restaurants(id) on delete cascade,
  tag_id        uuid references tags(id) on delete cascade,
  primary key (restaurant_id, tag_id)
);

-- ---------------------------------------------------------------------------
-- 9) Hotels & accommodations
-- ---------------------------------------------------------------------------
create table if not exists hotels (
  id                uuid primary key default gen_random_uuid(),
  slug              text unique not null check (slug ~* '^[a-z0-9-]{2,120}$'),
  name              text not null,
  excerpt           text,
  description       text,
  star_rating       smallint check (star_rating between 1 and 5),
  price_level       smallint check (price_level between 1 and 4),
  district          text,
  address           text,
  lat               numeric(9,6),
  lng               numeric(9,6),
  phone             text,
  website           text,
  booking_url       text,
  amenities         text[],                       -- ['pool','gym','wifi','breakfast']
  featured          boolean not null default false,
  status            content_status not null default 'draft',
  featured_image_id uuid references media_assets(id) on delete set null,
  gallery           uuid[] default '{}',
  -- SEO
  seo_title         text,
  seo_description   text,
  published_at      timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
create index if not exists idx_hotels_status on hotels(status);
create index if not exists idx_hotels_district on hotels(district);
create index if not exists idx_hotels_star on hotels(star_rating);
select attach_updated_at('hotels');

-- ---------------------------------------------------------------------------
-- 10) Transport nodes (LRT/KRL/terminal points)
-- ---------------------------------------------------------------------------
create table if not exists transport_nodes (
  id             uuid primary key default gen_random_uuid(),
  slug           text unique not null check (slug ~* '^[a-z0-9-]{2,120}$'),
  name           text not null,
  kind           transport_kind not null,
  operator       text,                            -- 'MRT Jakarta','KAI','TransJakarta'
  district       text,
  lat            numeric(9,6),
  lng            numeric(9,6),
  lines_served   text[],                          -- ['LRT Jabodebek Cibubur Line']
  facilities     text[],
  fare_info_url  text,
  status         content_status not null default 'published',
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create index if not exists idx_transport_kind on transport_nodes(kind);
create index if not exists idx_transport_district on transport_nodes(district);
select attach_updated_at('transport_nodes');

-- ---------------------------------------------------------------------------
-- 11) Stories (editorial magazine)
-- ---------------------------------------------------------------------------
create table if not exists stories (
  id                uuid primary key default gen_random_uuid(),
  slug              text unique not null check (slug ~* '^[a-z0-9-]{2,120}$'),
  title             text not null,
  subtitle          text,
  excerpt           text,                             -- summary
  content           text,                             -- flat content (fallback)
  body              jsonb not null default '[]'::jsonb, -- rich blocks[]
  column_key        text not null,                     -- heritage/voices/places/people/kitchen
  featured          boolean not null default false,
  status            content_status not null default 'draft',
  hero_image_id     uuid references media_assets(id) on delete set null,
  read_time         text,                              -- '6 min read'
  author_name       text,
  author_role       text,
  author_avatar_id  uuid references media_assets(id) on delete set null,
  -- SEO
  seo_title         text,
  seo_description   text,
  seo_canonical     text,
  seo_og_image_id   uuid references media_assets(id) on delete set null,
  published_at      date,                              -- editorial pub date
  created_by        uuid references user_profiles(id) on delete set null,
  updated_by        uuid references user_profiles(id) on delete set null,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
create index if not exists idx_stories_status on stories(status);
create index if not exists idx_stories_column on stories(column_key);
create index if not exists idx_stories_published on stories(published_at desc);
create index if not exists idx_stories_featured on stories(featured) where featured;
select attach_updated_at('stories');

create table if not exists story_tags (
  story_id uuid references stories(id) on delete cascade,
  tag_id   uuid references tags(id) on delete cascade,
  primary key (story_id, tag_id)
);

-- ---------------------------------------------------------------------------
-- 12) Blog (practical, SEO-focused)
-- ---------------------------------------------------------------------------
create table if not exists blogs (
  id                uuid primary key default gen_random_uuid(),
  slug              text unique not null check (slug ~* '^[a-z0-9-]{2,120}$'),
  title             text not null,
  subtitle          text,
  excerpt           text,
  content           text,
  body              jsonb not null default '[]'::jsonb,
  category_id       uuid references blog_categories(id) on delete set null,
  featured          boolean not null default false,
  status            content_status not null default 'draft',
  cover_id          uuid references media_assets(id) on delete set null,
  read_time         text,
  author_name       text,
  author_role       text,
  -- SEO
  seo_title         text,
  seo_description   text,
  seo_canonical     text,
  seo_og_image_id   uuid references media_assets(id) on delete set null,
  published_at      date,
  updated_public_at date,                              -- 'last updated' shown on post
  created_by        uuid references user_profiles(id) on delete set null,
  updated_by        uuid references user_profiles(id) on delete set null,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
create index if not exists idx_blogs_status on blogs(status);
create index if not exists idx_blogs_category on blogs(category_id);
create index if not exists idx_blogs_published on blogs(published_at desc);
create index if not exists idx_blogs_featured on blogs(featured) where featured;
select attach_updated_at('blogs');

create table if not exists blog_tags (
  blog_id uuid references blogs(id) on delete cascade,
  tag_id  uuid references tags(id) on delete cascade,
  primary key (blog_id, tag_id)
);

-- Blog cross-links to related content
create table if not exists blog_related_destinations (
  blog_id        uuid references blogs(id) on delete cascade,
  destination_id uuid references destinations(id) on delete cascade,
  primary key (blog_id, destination_id)
);
create table if not exists blog_related_events (
  blog_id  uuid references blogs(id) on delete cascade,
  event_id uuid references events(id) on delete cascade,
  primary key (blog_id, event_id)
);
create table if not exists blog_related_restaurants (
  blog_id       uuid references blogs(id) on delete cascade,
  restaurant_id uuid references restaurants(id) on delete cascade,
  primary key (blog_id, restaurant_id)
);

-- ---------------------------------------------------------------------------
-- 13) Homepage sections (dynamic layout)
-- ---------------------------------------------------------------------------
create table if not exists homepage_sections (
  id           uuid primary key default gen_random_uuid(),
  key          text unique not null,                -- 'hero','signature','icons','stories'
  label        text not null,
  kind         text not null,                       -- 'hero_video','carousel','grid','editorial'
  sort_order   integer not null default 0,
  is_enabled   boolean not null default true,
  settings     jsonb not null default '{}'::jsonb,  -- section-specific config
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists idx_homepage_sections_order on homepage_sections(sort_order);
select attach_updated_at('homepage_sections');

-- Polymorphic items — a section can reference destinations, events, stories, blogs, or free-form data.
create table if not exists homepage_section_items (
  id             uuid primary key default gen_random_uuid(),
  section_id     uuid not null references homepage_sections(id) on delete cascade,
  entity_type    text not null check (entity_type in ('destination','event','story','blog','restaurant','hotel','link','custom')),
  entity_id      uuid,                                -- FK is soft — resolve in app layer
  override_title text,
  override_kicker text,
  override_image_id uuid references media_assets(id) on delete set null,
  data           jsonb not null default '{}'::jsonb,
  sort_order     integer not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create index if not exists idx_homepage_items_section on homepage_section_items(section_id, sort_order);
select attach_updated_at('homepage_section_items');

-- ---------------------------------------------------------------------------
-- 14) Navigation (mega menu + footer)
-- ---------------------------------------------------------------------------
create table if not exists navigation_items (
  id           uuid primary key default gen_random_uuid(),
  location     text not null check (location in ('primary','utility','mobile','footer','mega')),
  parent_id    uuid references navigation_items(id) on delete cascade,
  label        text not null,
  href         text not null,
  target_blank boolean not null default false,
  icon         text,                                  -- lucide name
  sort_order   integer not null default 0,
  is_enabled   boolean not null default true,
  meta         jsonb not null default '{}'::jsonb,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists idx_nav_location on navigation_items(location, sort_order);
create index if not exists idx_nav_parent on navigation_items(parent_id);
select attach_updated_at('navigation_items');

-- ---------------------------------------------------------------------------
-- 15) Site settings (singleton key/value)
-- ---------------------------------------------------------------------------
create table if not exists site_settings (
  key          text primary key,
  value        jsonb not null,
  updated_by   uuid references user_profiles(id) on delete set null,
  updated_at   timestamptz not null default now()
);
insert into site_settings (key, value) values
  ('site_name',    to_jsonb('BekasiGo'::text)),
  ('tagline',      to_jsonb('Official City Guide of Kota Bekasi'::text)),
  ('locale',       to_jsonb('en-ID'::text)),
  ('cloudinary_base', to_jsonb('https://res.cloudinary.com/oi9u7lsq'::text))
on conflict (key) do nothing;

-- ---------------------------------------------------------------------------
-- 16) Trip Planner (AI Smart Trip)
-- ---------------------------------------------------------------------------
create table if not exists trip_plans (
  id             uuid primary key default gen_random_uuid(),
  owner_id       uuid references user_profiles(id) on delete cascade,
  session_id     text,                                -- for anonymous sessions
  title          text,
  days           smallint not null default 1 check (days between 1 and 14),
  travel_style   trip_style not null default 'mixed',
  party_size     smallint not null default 2 check (party_size between 1 and 20),
  with_kids      boolean not null default false,
  budget_level   smallint check (budget_level between 1 and 4), -- $ – $$$$
  start_date     date,
  interests      text[] default '{}',
  constraints    jsonb not null default '{}'::jsonb,  -- weather-aware, mobility, halal, etc.
  ai_model       text,                                -- 'gemini-2.5-flash','gpt-4.1-mini',…
  ai_summary     text,                                -- LLM-generated narrative for the plan
  is_public      boolean not null default false,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create index if not exists idx_trip_plans_owner on trip_plans(owner_id);
create index if not exists idx_trip_plans_session on trip_plans(session_id) where session_id is not null;
select attach_updated_at('trip_plans');

create table if not exists trip_plan_items (
  id             uuid primary key default gen_random_uuid(),
  trip_plan_id   uuid not null references trip_plans(id) on delete cascade,
  day_number     smallint not null check (day_number >= 1),
  slot           smallint not null default 0,          -- ordering within a day
  entity_type    text not null check (entity_type in ('destination','event','restaurant','hotel','transport','custom')),
  entity_id      uuid,                                 -- soft FK
  starts_at      time,                                 -- e.g. 09:00
  duration_min   integer,                              -- planner-estimated minutes
  notes          text,
  ai_reason      text,                                 -- why the AI picked this stop
  override_title text,
  data           jsonb not null default '{}'::jsonb,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create index if not exists idx_trip_items_plan on trip_plan_items(trip_plan_id, day_number, slot);
select attach_updated_at('trip_plan_items');

create table if not exists trip_plan_refinements (
  id             uuid primary key default gen_random_uuid(),
  trip_plan_id   uuid not null references trip_plans(id) on delete cascade,
  role           text not null check (role in ('user','assistant','system')),
  content        text not null,                        -- user request or LLM message
  changes_json   jsonb,                                -- structured diff applied to plan
  ai_model       text,
  created_at     timestamptz not null default now()
);
create index if not exists idx_trip_refinements_plan on trip_plan_refinements(trip_plan_id, created_at);

-- ---------------------------------------------------------------------------
-- 17) Row-Level Security (RLS) — default deny, opt-in per table.
--     Enable RLS on all content tables so Supabase clients cannot bypass.
--     Actual policies (public read of published rows, admin full-access) are
--     added in a follow-up migration once the auth flow is wired.
-- ---------------------------------------------------------------------------
alter table user_profiles           enable row level security;
alter table roles                   enable row level security;
alter table destinations            enable row level security;
alter table destination_categories  enable row level security;
alter table events                  enable row level security;
alter table restaurants             enable row level security;
alter table hotels                  enable row level security;
alter table transport_nodes         enable row level security;
alter table stories                 enable row level security;
alter table blogs                   enable row level security;
alter table blog_categories         enable row level security;
alter table tags                    enable row level security;
alter table media_assets            enable row level security;
alter table homepage_sections       enable row level security;
alter table homepage_section_items  enable row level security;
alter table navigation_items        enable row level security;
alter table site_settings           enable row level security;
alter table trip_plans              enable row level security;
alter table trip_plan_items         enable row level security;
alter table trip_plan_refinements   enable row level security;

-- End of E-31 schema.
