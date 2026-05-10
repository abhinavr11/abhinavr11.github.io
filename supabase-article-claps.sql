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

create table if not exists public.article_clap_votes (
  slug text not null,
  visitor_id text not null,
  created_at timestamptz not null default now(),
  primary key (slug, visitor_id)
);

alter table public.article_claps enable row level security;
alter table public.article_clap_votes enable row level security;

drop policy if exists "Anyone can read article claps" on public.article_claps;

create policy "Anyone can read article claps"
on public.article_claps
for select
to anon
using (true);

drop function if exists public.increment_article_claps(text);

create or replace function public.increment_article_claps(article_slug text, visitor_key text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  current_count integer;
  inserted_vote_count integer;
begin
  if article_slug is null or visitor_key is null then
    return jsonb_build_object('count', 0, 'did_clap', false);
  end if;

  insert into public.article_claps (slug, count)
  values (article_slug, 0)
  on conflict (slug) do nothing;

  insert into public.article_clap_votes (slug, visitor_id)
  values (article_slug, visitor_key)
  on conflict (slug, visitor_id) do nothing;

  get diagnostics inserted_vote_count = row_count;

  if inserted_vote_count = 1 then
    update public.article_claps
    set count = count + 1,
        updated_at = now()
    where slug = article_slug
    returning count into current_count;
  else
    select count
    into current_count
    from public.article_claps
    where slug = article_slug;
  end if;

  return jsonb_build_object(
    'count', coalesce(current_count, 0),
    'did_clap', inserted_vote_count = 1
  );
end;
$$;

grant execute on function public.increment_article_claps(text, text) to anon;
