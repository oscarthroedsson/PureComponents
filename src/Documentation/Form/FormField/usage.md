# Form Field Component

## Component Overview

The Form Field component provides a wrapper for form inputs with consistent spacing, label styling, and error/help text handling.

### When to Use

- Wrapping any form input
- Consistent form field layout
- Error message display
- Help text display

### When NOT to Use

- Standalone inputs without labels
- Non-form content

## Quick Start

```html
<div class="formField md">
  <label for="email">Email</label>
  <input type="email" id="email" class="input md" />
  <p class="helpText">Enter your email</p>
</div>
```

## Accessibility Requirements

- **Label association** - Inputs must have associated labels
- **Error messages** - Use `aria-describedby` and `role="alert"`
- **Help text** - Use `aria-describedby`

## API Reference

- `.formField` - Base form field wrapper
- Size variants: `.sm`, `.md`, `.lg`
- Sub-components: `.label-group`, `.helpText`, `.status`

## Examples

See component CSS file for detailed examples.
