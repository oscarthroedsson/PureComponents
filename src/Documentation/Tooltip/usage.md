# Tooltip Component

## Component Overview

The Tooltip component provides accessible tooltips that appear on hover or focus. Tooltips display additional context or help text for interactive elements.

### When to Use

- Additional context for icons
- Help text for form fields
- Explanations for abbreviations
- Supplementary information

### When NOT to Use

- Critical information (use Alert)
- Long descriptions (use Dialog or inline text)
- Interactive content (use Dialog)

## Quick Start

```html
<button class="tooltip" aria-describedby="my-tooltip">
  Hover or focus me
  <span id="my-tooltip" role="tooltip">Tooltip text</span>
</button>
```

## Accessibility Requirements

- **`role="tooltip"`** - Required on tooltip element
- **`id`** - Required on tooltip element
- **`aria-describedby`** - Required on trigger, pointing to tooltip id
- **Keyboard accessible** - Visible on focus

## API Reference

- `.tooltip` - Base tooltip class
- Position variants: `.right`, `.left`, `.bottom` (default: top)
- Size variants: `.sm`, `.md`, `.lg`
- Two approaches: `data-tip` attribute or `[role="tooltip"]` element

## Examples

See component CSS file for detailed examples.
