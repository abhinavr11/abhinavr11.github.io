const truncateText = (text, maxLength = 180) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
};

const formatTopicTitle = (slug) => slug
  .replace(/[-_]+/g, ' ')
  .replace(/\b\w/g, (char) => char.toUpperCase())
  .trim();

const parseTopicHtml = (rawHtml) => {
  const parser = new DOMParser();
  const document = parser.parseFromString(rawHtml, 'text/html');

  document.querySelectorAll('script, style, link, meta, title, base').forEach((element) => {
    element.remove();
  });

  const content = document.body?.innerHTML?.trim() || rawHtml.trim();
  const plainText = document.body?.textContent?.replace(/\s+/g, ' ').trim() || '';

  return {
    content,
    excerpt: truncateText(plainText)
  };
};

const parseTopicFile = async (modulePath, sourceKey) => {
  const response = await fetch(modulePath);
  if (!response.ok) {
    throw new Error(`Failed to load miscellaneous file: ${modulePath}`);
  }

  const rawHtml = await response.text();
  const slug = sourceKey.split('/').pop()?.replace(/\.html$/, '') || '';
  const { content, excerpt } = parseTopicHtml(rawHtml);

  return {
    id: slug,
    slug,
    title: formatTopicTitle(slug),
    excerpt,
    content
  };
};

export const loadMiscellaneous = async () => {
  const topicsContext = require.context('../content/miscellaneous', false, /\.html$/);
  const topicKeys = topicsContext.keys();
  const topics = await Promise.all(
    topicKeys.map(async (key) => parseTopicFile(topicsContext(key), key))
  );

  const sortedTopics = topics.sort((a, b) => a.title.localeCompare(b.title));
  const topicBySlug = sortedTopics.reduce((acc, topic) => {
    acc[topic.slug] = topic;
    return acc;
  }, {});

  const topicById = sortedTopics.reduce((acc, topic) => {
    acc[topic.id] = topic;
    return acc;
  }, {});

  return {
    topics: sortedTopics,
    topicBySlug,
    topicById
  };
};
