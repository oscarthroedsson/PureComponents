# List Component

## Component Overview

The List component provides styled list structures with support for images, titles, and various layouts.

### When to Use

- Item lists with images
- Product lists
- Content lists
- Navigation lists (consider Navigation component)

### When NOT to Use

- Simple unordered lists (use native `<ul>`)
- Navigation menus (use Navigation component)
- Menu items (use Menu component)

## Quick Start

```html
<ul class="list md">
  <li class="item-row">
    <img src="item.jpg" alt="Item" />
    <div>
      <h3 class="item-title">Item Title</h3>
      <p class="content">Item description</p>
    </div>
  </li>
</ul>
```

## Accessibility Requirements

- **Semantic HTML** - Use `<ul>` or `<ol>` elements
- **Alt text** - Required on images
- **Proper structure** - Use headings and paragraphs

## API Reference

- `.list` - Base list class
- `.list-container` - Container variant
- `.list-title` - List title
- `.item-row` - Row layout item
- `.item-col` - Column layout item
- `.item-title` - Item title
- `.content` - Item content
- Size variants: `.sm`, `.md`, `.lg`
- Border radius: `.rounded`

## Examples

See component CSS file for detailed examples.
