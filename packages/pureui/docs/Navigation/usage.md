# Navigation Component

## Component Overview

The Navigation component provides accessible navigation menus with proper semantic HTML and ARIA attributes. It supports both horizontal and vertical layouts with submenu support.

### When to Use

- Main site navigation
- Secondary navigation menus
- Breadcrumb navigation (use Breadcrumbs component)
- Tab navigation (consider Tabs component if available)

### When NOT to Use

- Action menus (use Menu component)
- Dropdown menus (use Menu component)
- Simple links (use A-tag component)

## Quick Start

```html
<nav aria-label="Main navigation">
  <ul class="nav md">
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```

## Accessibility Requirements

- **`<nav>` element** - Required wrapper
- **`aria-label`** - Required on nav element
- **`aria-current="page"`** - For current page link
- **`aria-expanded`** - For submenu toggles

## API Reference

- `.nav` - Navigation list class
- Layout: `.horizontal`, `.vertical`
- Size variants: `.sm`, `.md`, `.lg`
- Border radius: `.sharp`, `.smooth`, `.rounded`
- Sub-components: `.nav-submenu`, `.nav-toggle`

## Examples

See component CSS file for detailed examples.
