# Del Component

## Component Overview

The Del component provides styling for deleted or struck-through text, typically used in revision tracking or price comparisons.

### When to Use

- Deleted text in revisions
- Struck-through prices
- Removed content indication
- Version comparisons

### When NOT to Use

- Error text (use error styling)
- Disabled content (use disabled state)
- Hidden content (use `display: none`)

## Quick Start

```html
<p>Price: <span class="del">$100</span> $75</p>
<del class="del">Old content</del>
```

## Accessibility Requirements

- **Semantic HTML** - Use `<del>` element when appropriate
- **Context** - Ensure deleted content is clear in context

## API Reference

- `.del` - Deleted text class
- Styling: Background color, padding, border radius, text decoration

## Examples

See component CSS file for detailed examples.
