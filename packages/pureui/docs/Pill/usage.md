# Pill Component

## Component Overview

The Pill component provides button-like elements styled as pills for tags, filters, or small interactive elements.

### When to Use

- Filter tags
- Category pills
- Interactive tags
- Small action buttons

### When NOT to Use

- Primary actions (use Button component)
- Navigation (use Navigation component)
- Status indicators (use Badge component)

## Quick Start

```html
<button class="pill md">Tag</button>
<button class="pill md outline">Filter</button>
<button class="pill md neutral">Category</button>
```

## Accessibility Requirements

- **Button element** - Use `<button>` for interactive pills
- **`aria-label`** - For icon-only pills
- **Keyboard accessible** - Native button support

## API Reference

- `.pill` - Pill class (on button element)
- Variants: `.outline`, `.neutral`
- Size variants: `.sm`, `.md`, `.lg`
- Border radius: `.sharp`, `.soft`, `.rounded`

## Examples

See component CSS file for detailed examples.
