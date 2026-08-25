# A-tag (Link) Component

## Component Overview

The A-tag component provides styled anchor/link elements with hover effects and proper link semantics.

### When to Use

- Navigation links
- External links
- Internal page links
- Download links

### When NOT to Use

- Buttons (use Button component)
- Non-navigational actions (use Button)
- JavaScript-only actions (use Button)

## Quick Start

```html
<a href="/page" class="anchor-base">Link Text</a>
```

## Accessibility Requirements

- **Semantic HTML** - Use `<a>` element
- **Descriptive text** - Link text should be descriptive
- **External links** - Use `target="_blank"` with `rel="noopener noreferrer"`

## API Reference

- `.anchor-base` - Base anchor class
- Hover effect: Animated underline via `::before` pseudo-element

## Examples

See component CSS file for detailed examples.
