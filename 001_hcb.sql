-- Jalankan SEKALI pada proyek Supabase untuk Toko HCB.
-- Migrasi atomik: tidak menghapus atau mengganti tabel/bucket yang sudah ada.
begin;

create table public.hcb_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.hcb_admins enable row level security;
revoke all on public.hcb_admins from public, anon, authenticated;
grant all on public.hcb_admins to service_role;

create function public.hcb_is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.hcb_admins where user_id = (select auth.uid()));
$$;
revoke all on function public.hcb_is_admin() from public;
grant execute on function public.hcb_is_admin() to anon, authenticated, service_role;

create function public.hcb_valid_frame(frame jsonb) returns boolean
language plpgsql immutable set search_path = '' as $$
declare w numeric; h numeric; x numeric; y numeric; cw numeric; ch numeric;
begin
  if frame is null or frame = 'null'::jsonb then return true; end if;
  if jsonb_typeof(frame) <> 'object'
    or jsonb_typeof(frame->'size') is distinct from 'array'
    or jsonb_typeof(frame->'crop') is distinct from 'array' then return false; end if;
  if jsonb_array_length(frame->'size') <> 2 or jsonb_array_length(frame->'crop') <> 4 then return false; end if;
  if exists(select 1 from jsonb_array_elements((frame->'size') || (frame->'crop')) v where jsonb_typeof(v) <> 'number') then return false; end if;
  w := (frame#>>'{size,0}')::numeric; h := (frame#>>'{size,1}')::numeric;
  x := (frame#>>'{crop,0}')::numeric; y := (frame#>>'{crop,1}')::numeric;
  cw := (frame#>>'{crop,2}')::numeric; ch := (frame#>>'{crop,3}')::numeric;
  return w > 0 and h > 0 and w <= 50000 and h <= 50000 and x >= 0 and y >= 0 and cw > 0 and ch > 0 and x+cw <= w and y+ch <= h;
exception when others then return false;
end;
$$;
revoke all on function public.hcb_valid_frame(jsonb) from public;
grant execute on function public.hcb_valid_frame(jsonb) to authenticated, service_role;

create table public.hcb_settings (
  id smallint primary key default 1 check(id=1),
  name text not null check(length(trim(name)) between 1 and 120),
  whatsapp text not null default '' check(whatsapp='' or whatsapp ~ '^[0-9]{10,15}$'),
  address text not null default '' check(length(address)<=600),
  hours text not null default '' check(length(hours)<=200),
  announcement text not null default '' check(length(announcement)<=200),
  hero_title text not null check(length(trim(hero_title)) between 1 and 180),
  hero_description text not null check(length(trim(hero_description)) between 1 and 800),
  about text not null check(length(trim(about)) between 1 and 3000),
  revision integer not null default 1 check(revision>0),
  updated_at timestamptz not null default now()
);
alter table public.hcb_settings enable row level security;
revoke all on public.hcb_settings from public, anon, authenticated;
grant select on public.hcb_settings to anon, authenticated;
grant update on public.hcb_settings to authenticated;
grant all on public.hcb_settings to service_role;
create policy hcb_settings_public_read on public.hcb_settings for select to anon, authenticated using(true);
create policy hcb_settings_admin_update on public.hcb_settings for update to authenticated using((select public.hcb_is_admin())) with check((select public.hcb_is_admin()));

create table public.hcb_products (
  id text primary key check(id ~ '^[a-z0-9][a-z0-9_-]{0,79}$'),
  name text not null check(length(trim(name)) between 1 and 150),
  category text not null check(category in ('herbal','minyak','perawatan','aksesori')),
  label text not null check(length(trim(label)) between 1 and 50),
  price integer check(price between 1 and 999999999),
  price_type text not null default 'retail' check(price_type in ('retail','reference')),
  description text not null check(length(trim(description)) between 1 and 3000),
  source text check(source is null or (length(source)<=2000 and source ~ '^https://[^[:space:]]+$')),
  image text not null default '' check(length(image)<=2000 and (image='' or image ~ '^assets/foto/[A-Za-z0-9_.-]+\.(png|jpe?g|webp)$' or image ~ '^https://[^[:space:]]+$')),
  frame jsonb check(public.hcb_valid_frame(frame)),
  active boolean not null default true,
  sort_order integer not null default 0 check(sort_order between 0 and 99999),
  unit text not null default '' check(length(unit)<=30),
  brand text not null default 'GM' check(length(trim(brand)) between 1 and 60),
  revision integer not null default 1 check(revision>0),
  updated_at timestamptz not null default now()
);
alter table public.hcb_products enable row level security;
revoke all on public.hcb_products from public, anon, authenticated;
grant select on public.hcb_products to anon, authenticated;
grant insert, update, delete on public.hcb_products to authenticated;
grant all on public.hcb_products to service_role;
create policy hcb_products_read on public.hcb_products for select to anon, authenticated using(active or (select public.hcb_is_admin()));
create policy hcb_products_insert on public.hcb_products for insert to authenticated with check((select public.hcb_is_admin()));
create policy hcb_products_update on public.hcb_products for update to authenticated using((select public.hcb_is_admin())) with check((select public.hcb_is_admin()));
create policy hcb_products_delete on public.hcb_products for delete to authenticated using((select public.hcb_is_admin()));

create function public.hcb_touch_revision() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.revision := old.revision + 1;
  new.updated_at := now();
  return new;
end;
$$;
revoke all on function public.hcb_touch_revision() from public, anon, authenticated;
create trigger hcb_settings_revision before update on public.hcb_settings for each row execute function public.hcb_touch_revision();
create trigger hcb_products_revision before update on public.hcb_products for each row execute function public.hcb_touch_revision();

-- Bucket hanya berisi foto katalog publik. Semua perubahan memerlukan admin.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('hcb-products','hcb-products',true,5242880,array['image/jpeg','image/png','image/webp']);
create policy hcb_media_admin_select on storage.objects for select to authenticated
  using(bucket_id='hcb-products' and (select public.hcb_is_admin()));
create policy hcb_media_admin_insert on storage.objects for insert to authenticated
  with check(bucket_id='hcb-products' and name ~ '^products/[a-z0-9-]+\.(jpg|png|webp)$' and (select public.hcb_is_admin()));
create policy hcb_media_admin_update on storage.objects for update to authenticated
  using(bucket_id='hcb-products' and (select public.hcb_is_admin()))
  with check(bucket_id='hcb-products' and name ~ '^products/[a-z0-9-]+\.(jpg|png|webp)$' and (select public.hcb_is_admin()));
create policy hcb_media_admin_delete on storage.objects for delete to authenticated
  using(bucket_id='hcb-products' and (select public.hcb_is_admin()));

commit;
