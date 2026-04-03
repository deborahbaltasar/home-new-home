create table if not exists public.items (
  id uuid primary key default gen_random_uuid(),
  house_id uuid not null references public.houses(id) on delete cascade,
  room_id uuid references public.rooms(id) on delete set null,
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  notes text,
  priority text not null check (priority in ('now', 'next', 'later')),
  essentiality text not null check (essentiality in ('essential', 'helpful', 'optional')),
  quantity integer not null default 1 check (quantity > 0),
  status text not null check (status in ('planning', 'researching', 'ready_to_buy', 'reserved', 'purchased')),
  image_url text,
  attachment_urls text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists items_house_id_idx on public.items(house_id);
create index if not exists items_room_id_idx on public.items(room_id);
create index if not exists items_category_id_idx on public.items(category_id);
create index if not exists items_status_idx on public.items(status);
create index if not exists items_priority_idx on public.items(priority);

alter table public.items enable row level security;

drop policy if exists "items_member_access" on public.items;
create policy "items_member_access" on public.items
for all using (
  exists (
    select 1
    from public.house_members
    where house_members.house_id = items.house_id
      and house_members.user_id = auth.jwt()->>'sub'
  )
)
with check (
  exists (
    select 1
    from public.house_members
    where house_members.house_id = items.house_id
      and house_members.user_id = auth.jwt()->>'sub'
  )
);

drop function if exists public.set_items_updated_at();
create function public.set_items_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists items_set_updated_at on public.items;
create trigger items_set_updated_at
before update on public.items
for each row
execute function public.set_items_updated_at();
