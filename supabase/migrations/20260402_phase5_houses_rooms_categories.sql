create extension if not exists pgcrypto;

create table if not exists public.houses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text,
  cover_tone text not null check (cover_tone in ('coastal', 'garden', 'sunset', 'stone')),
  created_by_user_id text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.house_members (
  id uuid primary key default gen_random_uuid(),
  house_id uuid not null references public.houses(id) on delete cascade,
  user_id text not null,
  name text not null,
  email text,
  role text not null check (role in ('owner', 'admin', 'member')),
  joined_at timestamptz not null default now(),
  unique (house_id, user_id)
);

create table if not exists public.house_invites (
  id uuid primary key default gen_random_uuid(),
  house_id uuid not null references public.houses(id) on delete cascade,
  token text not null unique,
  label text not null,
  role text not null check (role in ('admin', 'member')),
  created_by_user_id text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.rooms (
  id uuid primary key default gen_random_uuid(),
  house_id uuid not null references public.houses(id) on delete cascade,
  name text not null,
  color text not null check (color in ('sand', 'sky', 'sage', 'terracotta', 'slate')),
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  house_id uuid not null references public.houses(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);

create index if not exists house_members_user_id_idx on public.house_members(user_id);
create index if not exists house_members_house_id_idx on public.house_members(house_id);
create index if not exists house_invites_house_id_idx on public.house_invites(house_id);
create index if not exists rooms_house_id_idx on public.rooms(house_id);
create index if not exists categories_house_id_idx on public.categories(house_id);

alter table public.houses enable row level security;
alter table public.house_members enable row level security;
alter table public.house_invites enable row level security;
alter table public.rooms enable row level security;
alter table public.categories enable row level security;

drop policy if exists "houses_select_member" on public.houses;
create policy "houses_select_member" on public.houses
for select using (
  exists (
    select 1
    from public.house_members
    where house_members.house_id = houses.id
      and house_members.user_id = auth.jwt()->>'sub'
  )
);

drop policy if exists "houses_insert_owner" on public.houses;
create policy "houses_insert_owner" on public.houses
for insert with check (created_by_user_id = auth.jwt()->>'sub');

drop policy if exists "house_members_select_member" on public.house_members;
create policy "house_members_select_member" on public.house_members
for select using (
  exists (
    select 1
    from public.house_members as memberships
    where memberships.house_id = house_members.house_id
      and memberships.user_id = auth.jwt()->>'sub'
  )
);

drop policy if exists "house_invites_select_member" on public.house_invites;
create policy "house_invites_select_member" on public.house_invites
for select using (
  exists (
    select 1
    from public.house_members
    where house_members.house_id = house_invites.house_id
      and house_members.user_id = auth.jwt()->>'sub'
  )
);

drop policy if exists "rooms_member_access" on public.rooms;
create policy "rooms_member_access" on public.rooms
for all using (
  exists (
    select 1
    from public.house_members
    where house_members.house_id = rooms.house_id
      and house_members.user_id = auth.jwt()->>'sub'
  )
)
with check (
  exists (
    select 1
    from public.house_members
    where house_members.house_id = rooms.house_id
      and house_members.user_id = auth.jwt()->>'sub'
  )
);

drop policy if exists "categories_member_access" on public.categories;
create policy "categories_member_access" on public.categories
for all using (
  exists (
    select 1
    from public.house_members
    where house_members.house_id = categories.house_id
      and house_members.user_id = auth.jwt()->>'sub'
  )
)
with check (
  exists (
    select 1
    from public.house_members
    where house_members.house_id = categories.house_id
      and house_members.user_id = auth.jwt()->>'sub'
  )
);
