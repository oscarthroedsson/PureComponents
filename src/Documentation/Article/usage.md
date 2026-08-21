# Article Component

## Component Overview

The Article component provides structured styling for article content with introduction sections, metadata, and body content.

### When to Use

- Blog posts
- News articles
- Long-form content
- Documentation pages

### When NOT to Use

- Short content (use regular text)
- Non-article content (use appropriate semantic elements)
- Cards (use Card component)

## Quick Start

```html
<article data-article="article-container">
  <header data-article="introduction">
    <img src="header.jpg" alt="Article header" />
  </header>
  <footer data-article="meta-data">
    <div data-article="author">
      <div>
        <div>Author Name</div>
        <time>2024-01-01</time>
      </div>
    </div>
  </footer>
  <div role="main">
    <h1>Article Title</h1>
    <p>Article content...</p>
  </div>
</article>
```

## Accessibility Requirements

- **Semantic HTML** - Use `<article>`, `<header>`, `<footer>`, `<time>`
- **`role="main"`** - For main content area
- **Data attributes** - For styling hooks

## API Reference

- `[data-article="article-container"]` - Main article container
- `[data-article="introduction"]` - Header section
- `[data-article="meta-data"]` - Author/metadata section
- `[data-article="author"]` - Author information
- `[role="main"]` - Main content area

## Examples

See component CSS file for detailed examples.
