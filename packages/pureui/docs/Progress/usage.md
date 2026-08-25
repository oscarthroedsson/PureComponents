# Progress Component

## Component Overview

The Progress component displays the progress of a task or operation. It uses the native `<progress>` element with proper ARIA attributes.

### When to Use

- File upload progress
- Form completion progress
- Loading states
- Task progress indicators

### When NOT to Use

- Value ranges (use Meter component)
- Percentage displays (use text)
- Indeterminate loading (use Loading component)

## Quick Start

```html
<label for="progress1">Upload Progress</label>
<progress 
  id="progress1" 
  class="progress md" 
  value="45" 
  max="100"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow="45"
  aria-label="Upload progress: 45%"
>45%</progress>
```

## Accessibility Requirements

- **`aria-valuemin`** - Minimum value
- **`aria-valuemax`** - Maximum value
- **`aria-valuenow`** - Current value
- **`aria-label`** - Description of progress

## API Reference

- `.progress` - Base progress class
- Size variants: `.sm`, `.md`, `.lg`
- Variants: `.success`, `.error`, `.warning`
- Border radius: `.sharp`, `.smooth`, `.rounded`
- Sub-components: `.progress-wrapper`, `.progress-label`, `.progress-value`

## Examples

See component CSS file for detailed examples.
