# Pagination Component

## Component Overview

The Pagination component provides accessible pagination controls for navigating through multiple pages of content.

### When to Use

- Multi-page content navigation
- Search results pagination
- Data table pagination
- Article series navigation

### When NOT to Use

- Single page content
- Tab navigation (use Tabs component if available)
- Simple next/previous (use Navigation component)

## Quick Start

```html
<nav aria-label="Pagination">
  <ul class="pagination md">
    <li>
      <a href="/page/prev" class="pagination-link" aria-label="Previous page">Previous</a>
    </li>
    <li>
      <span class="pagination-link" aria-current="page">2</span>
    </li>
    <li>
      <a href="/page/next" class="pagination-link" aria-label="Next page">Next</a>
    </li>
  </ul>
</nav>
```

## Accessibility Requirements

- **`<nav aria-label="Pagination">`** - Required wrapper
- **`aria-current="page"`** - On current page
- **`aria-label`** - On Previous/Next buttons
- **`aria-disabled="true"`** - On disabled buttons
- **`aria-hidden="true"`** - On ellipsis

## API Reference

- `.pagination` - Base pagination class
- `.pagination-link` - Page link class
- `.pagination-ellipsis` - Ellipsis element
- Size variants: `.sm`, `.md`, `.lg`
- Border radius: `.sharp`, `.smooth`, `.rounded`

## Examples

See component CSS file for detailed examples.
