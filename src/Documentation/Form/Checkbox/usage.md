# Checkbox Component

## Component Overview

The Checkbox component provides accessible, styled checkboxes for boolean input. It supports single checkboxes and checkbox groups with proper label association and error handling.

### When to Use

- Single boolean choices (agree to terms, opt-in to newsletter)
- Multiple selections from a list
- Toggle settings (enable/disable features)
- Indeterminate states (parent checkboxes with mixed children)

### When NOT to Use

- Single choice from multiple options (use Radio buttons)
- Yes/No questions with only two options (consider Radio for better semantics)

## Quick Start

```html
<div class="formField">
  <label for="agree" class="checkbox-label">
    <input type="checkbox" id="agree" class="checkbox md" />
    I agree to the terms
  </label>
</div>
```

## Accessibility Requirements

- MUST have associated `<label>` element
- Indeterminate state requires `aria-checked="mixed"`
- Error states require `aria-invalid="true"` and `aria-describedby`

## API Reference

- `.checkbox` - Checkbox input class
- `.checkbox-label` - Label wrapper class
- `.checkbox-group` - Group container
- Size variants: `.sm`, `.md`, `.lg`
- Border radius: `.sharp`, `.smooth`, `.rounded`

## Examples

See component CSS file for detailed examples.
