# Contributing to Shuuyou Wiki

## Current Stage

Shuuyou Wiki is currently in a single-maintainer curation phase.
The focus is building a coherent knowledge structure and writing style.

At this stage:

1. The repository is public for reading and tracking progress.
2. Write access and merge decisions are limited to maintainers.
3. External contributions are temporarily paused.

## When Collaboration Opens

A public announcement will be added to the homepage and this document.
At that time, contributions will follow normal pull request review.

## Local Validation

Before opening a change request, run:

```bash
npm run lint
npm run build
```

## Content Guidelines (for future contributors)

1. Keep module/topic hierarchy consistent: `content/docs/<module>/<topic>/index.mdx`.
2. Include frontmatter metadata when possible:
   - `title`
   - `description`
   - `updatedAt`
   - `contributors`
   - `license`
3. Avoid duplicate first-level headings in body; title should come from frontmatter.

## Questions

Use repository issues/discussions once collaboration is officially opened.
