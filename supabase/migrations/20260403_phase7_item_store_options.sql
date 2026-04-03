alter table public.items
add column if not exists target_price numeric(12, 2) check (target_price is null or target_price >= 0);

create table if not exists public.item_store_options (
  id uuid primary key default gen_random_uuid(),
  house_id uuid not null references public.houses(id) on delete cascade,
  item_id uuid not null references public.items(id) on delete cascade,
  store_name text not null,
  product_url text,
  price numeric(12, 2) not null check (price >= 0),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists item_store_options_house_id_idx on public.item_store_options(house_id);
create index if not exists item_store_options_item_id_idx on public.item_store_options(item_id);
create index if not exists item_store_options_price_idx on public.item_store_options(price);

alter table public.item_store_options enable row level security;

drop policy if exists "item_store_options_member_access" on public.item_store_options;
create policy "item_store_options_member_access" on public.item_store_options
for all using (
  exists (
    select 1
    from public.house_members
    where house_members.house_id = item_store_options.house_id
      and house_members.user_id = auth.jwt()->>'sub'
  )
)
with check (
  exists (
    select 1
    from public.house_members
    where house_members.house_id = item_store_options.house_id
      and house_members.user_id = auth.jwt()->>'sub'
  )
);

drop function if exists public.set_item_store_options_updated_at();
create function public.set_item_store_options_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists item_store_options_set_updated_at on public.item_store_options;
create trigger item_store_options_set_updated_at
before update on public.item_store_options
for each row
execute function public.set_item_store_options_updated_at();
