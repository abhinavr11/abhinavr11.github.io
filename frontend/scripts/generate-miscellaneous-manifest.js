const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const sourceDir = path.join(projectRoot, 'public', 'miscellaneous');
const outputDir = path.join(projectRoot, 'src', 'generated');
const outputFile = path.join(outputDir, 'miscellaneous-manifest.json');

const ensureDirectory = (directoryPath) => {
  fs.mkdirSync(directoryPath, { recursive: true });
};

const toTitle = (slug) => slug
  .replace(/[-_]+/g, ' ')
  .replace(/\b\w/g, (char) => char.toUpperCase())
  .trim();

const stripHtml = (html) => html
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const excerptFromHtml = (html, maxLength = 180) => {
  const text = stripHtml(html);
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trimEnd()}...`;
};

ensureDirectory(sourceDir);
ensureDirectory(outputDir);

const manifest = fs.readdirSync(sourceDir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
  .map((entry) => {
    const slug = entry.name.replace(/\.html$/, '');
    const html = fs.readFileSync(path.join(sourceDir, entry.name), 'utf8');

    return {
      id: slug,
      slug,
      title: toTitle(slug),
      excerpt: excerptFromHtml(html),
      url: `/miscellaneous/${entry.name}`
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

fs.writeFileSync(outputFile, `${JSON.stringify(manifest, null, 2)}\n`);
