# Range Input Component

## Component Overview

The Range Input component provides accessible slider controls for numeric value selection within a range.

### When to Use

- Volume controls
- Numeric range selection
- Rating scales
- Progress indication (as input)

### When NOT to Use

- Discrete options (use Select or Radio)
- Text input (use Text Input)
- Display only (use Progress or Meter)

## Quick Start

```html
<label for="volume">Volume</label>
<input 
  type="range" 
  id="volume" 
  class="range md" 
  min="0" 
  max="100" 
  value="50"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow="50"
  aria-label="Volume control"
/>
<span class="range-value" aria-live="polite">50</span>
```

## Accessibility Requirements

- **`<label>` association** - Required
- **`aria-valuemin`** - Minimum value
- **`aria-valuemax`** - Maximum value
- **`aria-valuenow`** - Current value (update via JavaScript)
- **`aria-label`** - Description of control

## API Reference

- `.range` - Range input class
- Size variants: `.sharp`, `.smooth`, `.rounded` (border radius)
- Style variants: `.sharp`, `.smooth`, `.rounded`
- Sub-component: `.range-value` for value display

## Examples

See component CSS file for detailed examples.
