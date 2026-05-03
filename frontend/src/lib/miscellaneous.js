import manifest from '../generated/miscellaneous-manifest.json';

const publicUrl = process.env.PUBLIC_URL && process.env.PUBLIC_URL !== '.'
  ? process.env.PUBLIC_URL
  : '';

const withPublicUrl = (url = '') => {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith(publicUrl) || !url.startsWith('/')) return url;
  return `${publicUrl}${url}`;
};

const sanitizeTopicHtml = (rawHtml) => {
  const parser = new DOMParser();
  const document = parser.parseFromString(rawHtml, 'text/html');

  document.querySelectorAll('script, style, link, meta, title, base').forEach((element) => {
    element.remove();
  });

  return document.body?.innerHTML?.trim() || rawHtml.trim();
};

export const loadMiscellaneous = async () => {
  const topics = manifest
    .map((topic) => ({
      ...topic,
      url: withPublicUrl(topic.url)
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

  const topicBySlug = topics.reduce((acc, topic) => {
    acc[topic.slug] = topic;
    return acc;
  }, {});

  const topicById = topics.reduce((acc, topic) => {
    acc[topic.id] = topic;
    return acc;
  }, {});

  return {
    topics,
    topicBySlug,
    topicById
  };
};

export const loadMiscellaneousTopicContent = async (url) => {
  const response = await fetch(withPublicUrl(url));
  if (!response.ok) {
    throw new Error(`Failed to load miscellaneous file: ${url}`);
  }

  const rawHtml = await response.text();
  return sanitizeTopicHtml(rawHtml);
};
