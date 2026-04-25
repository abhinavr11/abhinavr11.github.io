const publicUrl = process.env.PUBLIC_URL && process.env.PUBLIC_URL !== '.'
  ? process.env.PUBLIC_URL
  : '';

const withPublicUrl = (url = '') => {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith(publicUrl) || !url.startsWith('/')) return url;
  return `${publicUrl}${url}`;
};

const parseFrontmatter = (rawMarkdown) => {
  const frontmatterMatch = rawMarkdown.match(/^---\n([\s\S]*?)\n---\n?/);

  if (!frontmatterMatch) {
    return { metadata: {}, content: rawMarkdown.trim() };
  }

  const metadata = frontmatterMatch[1]
    .split('\n')
    .reduce((acc, line) => {
      const separatorIndex = line.indexOf(':');
      if (separatorIndex === -1) return acc;

      const key = line.slice(0, separatorIndex).trim();
      let value = line.slice(separatorIndex + 1).trim();

      if (!key) return acc;

      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      if (value === 'true') value = true;
      if (value === 'false') value = false;

      acc[key] = value;
      return acc;
    }, {});

  const content = rawMarkdown.slice(frontmatterMatch[0].length).trim();
  return { metadata, content };
};

const parseComparableDate = (value) => {
  const timestamp = Date.parse(value || '');
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

const parseWritingFile = async (modulePath, category) => {
  const response = await fetch(modulePath);
  if (!response.ok) {
    throw new Error(`Failed to load writing file: ${modulePath}`);
  }

  const rawMarkdown = await response.text();
  const { metadata, content } = parseFrontmatter(rawMarkdown);
  const fallbackId = modulePath.split('/').pop()?.replace(/\.md$/, '') || '';

  const writing = {
    id: metadata.id || fallbackId,
    title: metadata.title || fallbackId,
    date: metadata.date || '',
    excerpt: metadata.excerpt || '',
    readTime: metadata.readTime || '',
    externalUrl: withPublicUrl(metadata.externalUrl || ''),
    category,
    content
  };

  writing.sortDate = parseComparableDate(writing.date);
  return writing;
};

const loadCategory = async (context, category) => {
  const keys = context.keys();
  const writings = await Promise.all(
    keys.map(async (key) => {
      const modulePath = context(key);
      return parseWritingFile(modulePath, category);
    })
  );

  return writings.sort((a, b) => b.sortDate - a.sortDate || a.title.localeCompare(b.title));
};

export const loadWritings = async () => {
  const technicalContext = require.context('../content/writings/technical', false, /\.md$/);
  const nonTechnicalContext = require.context('../content/writings/non-technical', false, /\.md$/);

  const [technicalWritings, nonTechnicalWritings] = await Promise.all([
    loadCategory(technicalContext, 'technical'),
    loadCategory(nonTechnicalContext, 'non-technical')
  ]);

  const allWritings = [...technicalWritings, ...nonTechnicalWritings];
  const writingById = allWritings.reduce((acc, writing) => {
    acc[writing.id] = writing;
    return acc;
  }, {});

  return {
    technicalWritings,
    nonTechnicalWritings,
    writingById
  };
};
