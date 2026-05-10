create table if not exists public.article_claps (
  slug text primary key,
  count integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.article_claps
  add column if not exists count integer,
  add column if not exists updated_at timestamptz not null default now();

alter table public.article_claps
  alter column slug type text using slug::text,
  alter column count set default 0,
  alter column count set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.article_claps'::regclass
      and contype = 'p'
  ) then
    alter table public.article_claps add primary key (slug);
  end if;
end;
$$;

create unique index if not exists article_claps_slug_unique
on public.article_claps (slug);

alter table public.article_claps enable row level security;

drop policy if exists "Anyone can read article claps" on public.article_claps;

create policy "Anyone can read article claps"
on public.article_claps
for select
to anon
using (true);

create or replace function public.increment_article_claps(article_slug text)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  new_count integer;
begin
  insert into public.article_claps as claps (slug, count)
  values (article_slug, 1)
  on conflict (slug)
  do update
    set count = claps.count + 1,
        updated_at = now()
  returning count into new_count;

  return new_count;
end;
$$;

grant execute on function public.increment_article_claps(text) to anon;
