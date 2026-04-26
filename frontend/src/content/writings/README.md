# Writings Content

Create one markdown file per article in one of these folders:

- `technical/`
- `non-technical/`

Each file should include frontmatter at the top:

```md
---
id: optional-article-id
title: Article title
date: April 2026
excerpt: One-line card summary
readTime: 4 min read
---

# Optional markdown body for detail page
```

If the card should open an external URL (for example a PDF), add:

```md
externalUrl: /your-file.pdf
```

Notes:

- URL is generated from the markdown filename:
  - `my-article.md` -> `/writings/my-article.html`
- `id` is optional and only used as internal metadata.
- `title`, `date`, `excerpt`, and `readTime` are used in article cards.
- `externalUrl` entries open directly and skip the detail page.
