-- ============================================================
-- Hilary Okello Website — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- Safe to re-run: uses IF NOT EXISTS and drops policies first.
-- ============================================================
--
-- ADMIN USERS (Authentication)
-- ─────────────────────────────────────────────────────────────
-- Supabase handles auth via its built-in auth.users table.
-- No extra SQL needed. To create an admin account:
--
--   Option A (Recommended — invite):
--     Dashboard → Authentication → Users → Invite user
--     Enter the admin email, Supabase sends a magic link.
--
--   Option B (Create directly):
--     Dashboard → Authentication → Users → Add user
--     Fill in email + password → Create user
--
-- The RLS policies below allow only `authenticated` users
-- (i.e. logged-in admins) to INSERT / UPDATE / DELETE.
-- Public visitors can only SELECT (read) data.
-- ─────────────────────────────────────────────────────────────


-- ─────────────────────────────────────────────────────────────
-- 1. SHOWS
-- ─────────────────────────────────────────────────────────────
create table if not exists public.shows (
  id             uuid primary key default gen_random_uuid(),
  title          text not null,
  date           date not null,
  time           text not null default '7:30 PM',
  city           text not null default '',
  location       text not null,
  country        text not null,
  ticket_price   text not null default '',
  ticket_url     text,
  image          text not null default '',
  description    text not null default '',
  featured       boolean not null default false,
  badge          text,
  contact_number text,
  published      boolean not null default false,
  published_at   timestamptz,
  created_at     timestamptz not null default now()
);

-- Add new columns if this table already existed without them
alter table public.shows add column if not exists time           text not null default '7:30 PM';
alter table public.shows add column if not exists city           text not null default '';
alter table public.shows add column if not exists ticket_price   text not null default '';
alter table public.shows add column if not exists image          text not null default '';
alter table public.shows add column if not exists description    text not null default '';
alter table public.shows add column if not exists featured       boolean not null default false;
alter table public.shows add column if not exists badge          text;
alter table public.shows add column if not exists contact_number text;
alter table public.shows add column if not exists published      boolean not null default false;
alter table public.shows add column if not exists published_at   timestamptz;

alter table public.shows enable row level security;

drop policy if exists "shows: public read"  on public.shows;
drop policy if exists "shows: auth insert"  on public.shows;
drop policy if exists "shows: auth update"  on public.shows;
drop policy if exists "shows: auth delete"  on public.shows;

create policy "shows: public read"
  on public.shows for select using (true);

create policy "shows: auth insert"
  on public.shows for insert to authenticated with check (true);

create policy "shows: auth update"
  on public.shows for update to authenticated using (true);

create policy "shows: auth delete"
  on public.shows for delete to authenticated using (true);

create index if not exists shows_date_idx      on public.shows (date asc);
create index if not exists shows_published_idx on public.shows (published, date asc);


-- ─────────────────────────────────────────────────────────────
-- 2. GALLERY
-- ─────────────────────────────────────────────────────────────
create table if not exists public.gallery (
  id          uuid primary key default gen_random_uuid(),
  url         text not null,
  caption     text,
  category    text,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

alter table public.gallery add column if not exists sort_order integer not null default 0;

alter table public.gallery enable row level security;

drop policy if exists "gallery: public read"  on public.gallery;
drop policy if exists "gallery: auth insert"  on public.gallery;
drop policy if exists "gallery: auth update"  on public.gallery;
drop policy if exists "gallery: auth delete"  on public.gallery;

create policy "gallery: public read"
  on public.gallery for select using (true);

create policy "gallery: auth insert"
  on public.gallery for insert to authenticated with check (true);

create policy "gallery: auth update"
  on public.gallery for update to authenticated using (true);

create policy "gallery: auth delete"
  on public.gallery for delete to authenticated using (true);

create index if not exists gallery_created_at_idx on public.gallery (created_at desc);


-- ─────────────────────────────────────────────────────────────
-- 3. BIOGRAPHY
-- ─────────────────────────────────────────────────────────────
create table if not exists public.biography (
  id         uuid primary key default gen_random_uuid(),
  content    text not null default '',
  updated_at timestamptz not null default now()
);

create unique index if not exists biography_single_row_idx
  on public.biography ((true));

alter table public.biography enable row level security;

drop policy if exists "biography: public read"  on public.biography;
drop policy if exists "biography: auth insert"  on public.biography;
drop policy if exists "biography: auth update"  on public.biography;

create policy "biography: public read"
  on public.biography for select using (true);

create policy "biography: auth insert"
  on public.biography for insert to authenticated with check (true);

create policy "biography: auth update"
  on public.biography for update to authenticated using (true);

insert into public.biography (content)
values ('')
on conflict do nothing;


-- ─────────────────────────────────────────────────────────────
-- 4. BOOKING_INFO
-- ─────────────────────────────────────────────────────────────
create table if not exists public.booking_info (
  id         uuid primary key default gen_random_uuid(),
  email      text not null default '',
  phone      text not null default '',
  whatsapp   text not null default '',
  note       text not null default '',
  updated_at timestamptz not null default now()
);

create unique index if not exists booking_info_single_row_idx
  on public.booking_info ((true));

alter table public.booking_info enable row level security;

drop policy if exists "booking_info: public read"  on public.booking_info;
drop policy if exists "booking_info: auth insert"  on public.booking_info;
drop policy if exists "booking_info: auth update"  on public.booking_info;

create policy "booking_info: public read"
  on public.booking_info for select using (true);

create policy "booking_info: auth insert"
  on public.booking_info for insert to authenticated with check (true);

create policy "booking_info: auth update"
  on public.booking_info for update to authenticated using (true);

insert into public.booking_info (email, phone, whatsapp, note)
values ('', '', '', '')
on conflict do nothing;


-- ─────────────────────────────────────────────────────────────
-- 5. VIDEOS
-- ─────────────────────────────────────────────────────────────
create table if not exists public.videos (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  youtube_id  text not null,
  duration    text not null default '',
  views       text not null default '',
  is_featured boolean not null default false,
  created_at  timestamptz not null default now()
);

alter table public.videos enable row level security;

drop policy if exists "videos: public read"  on public.videos;
drop policy if exists "videos: auth insert"  on public.videos;
drop policy if exists "videos: auth update"  on public.videos;
drop policy if exists "videos: auth delete"  on public.videos;

create policy "videos: public read"
  on public.videos for select using (true);

create policy "videos: auth insert"
  on public.videos for insert to authenticated with check (true);

create policy "videos: auth update"
  on public.videos for update to authenticated using (true);

create policy "videos: auth delete"
  on public.videos for delete to authenticated using (true);

create index if not exists videos_featured_idx on public.videos (is_featured desc);


-- ─────────────────────────────────────────────────────────────
-- 6. WAITING LIST ENTRIES
-- ─────────────────────────────────────────────────────────────
create table if not exists public.waiting_list_entries (
  id         uuid primary key default gen_random_uuid(),
  show_slug  text not null,
  show_title text not null,
  username   text not null,
  phone      text not null,
  email      text not null,
  created_at timestamptz not null default now()
);

alter table public.waiting_list_entries enable row level security;

drop policy if exists "waiting_list_entries: public read"  on public.waiting_list_entries;
drop policy if exists "waiting_list_entries: auth insert"  on public.waiting_list_entries;
drop policy if exists "waiting_list_entries: auth delete"  on public.waiting_list_entries;

create policy "waiting_list_entries: public read"
  on public.waiting_list_entries for select using (true);

create policy "waiting_list_entries: auth insert"
  on public.waiting_list_entries for insert to authenticated with check (true);

create policy "waiting_list_entries: auth delete"
  on public.waiting_list_entries for delete to authenticated using (true);

create index if not exists waiting_list_entries_created_at_idx
  on public.waiting_list_entries (created_at desc);

create index if not exists waiting_list_entries_show_slug_idx
  on public.waiting_list_entries (show_slug);

