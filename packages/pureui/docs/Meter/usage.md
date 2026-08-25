# Meter Component

## Component Overview

The Meter component displays a scalar measurement within a known range, such as disk usage or battery level. It uses the native `<meter>` element with visual color coding for different ranges.

### When to Use

- Storage usage indicators
- Battery level displays
- Score displays within ranges
- Value ranges with optimal/suboptimal zones

### When NOT to Use

- Progress indicators (use Progress component)
- Percentage displays (use text)
- Loading states (use Loading component)

## Quick Start

```html
<label for="meter1">Storage Usage</label>
<meter 
  id="meter1" 
  class="meter md" 
  value="75" 
  min="0" 
  max="100"
  optimum="50"
  low="30"
  high="80"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow="75"
  aria-label="Storage usage: 75%"
>75%</meter>
```

## Accessibility Requirements

- **`aria-valuemin`** - Minimum value
- **`aria-valuemax`** - Maximum value
- **`aria-valuenow`** - Current value
- **`aria-label`** - Description of meter
- **`low`, `high`, `optimum`** - Range attributes for color coding

## API Reference

- `.meter` - Meter element class
- Size variants: `.sm`, `.md`, `.lg`
- Border radius: `.sharp`, `.smooth`, `.rounded`
- Sub-components: `.meter-wrapper`, `.meter-label`, `.meter-value`

## Examples

See component CSS file for detailed examples.
