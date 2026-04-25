# Writings Content

Create one markdown file per article in one of these folders:

- `technical/`
- `non-technical/`

Each file must include frontmatter at the top:

```md
---
id: unique-article-id
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

- `id` is used in the route `/writing/:id`.
- `title`, `date`, `excerpt`, and `readTime` are used in article cards.
- `externalUrl` entries open directly and skip the detail page.
