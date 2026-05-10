const SUPABASE_URL = (
  process.env.REACT_APP_SUPABASE_URL
  || process.env.NEXT_PUBLIC_SUPABASE_URL
  || 'https://gvxmmjmzaxkwnlxodoaj.supabase.co'
).replace(/\/$/, '');

const SUPABASE_PUBLISHABLE_KEY = (
  process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY
  || process.env.REACT_APP_SUPABASE_ANON_KEY
  || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  || 'sb_publishable_4qCjRSRzvGbvDfiflXH6kg_UL__J99b'
);

const requestHeaders = {
  apikey: SUPABASE_PUBLISHABLE_KEY,
  Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
  'Content-Type': 'application/json'
};

export const isArticleClapsConfigured = Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY);

export const getArticleClapCount = async (slug) => {
  if (!isArticleClapsConfigured || !slug) return 0;

  const query = new URLSearchParams({
    slug: `eq.${slug}`,
    select: 'count'
  });

  const response = await fetch(`${SUPABASE_URL}/rest/v1/article_claps?${query.toString()}`, {
    headers: requestHeaders
  });

  if (!response.ok) {
    throw new Error('Unable to load clap count.');
  }

  const rows = await response.json();
  return rows[0]?.count || 0;
};

export const incrementArticleClaps = async (slug) => {
  if (!isArticleClapsConfigured || !slug) return 0;

  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/increment_article_claps`, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify({ article_slug: slug })
  });

  if (!response.ok) {
    throw new Error('Unable to save clap.');
  }

  return response.json();
};
