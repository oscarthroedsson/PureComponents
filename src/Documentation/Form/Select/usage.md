# Select Component

## Component Overview

The Select component provides accessible dropdown/select inputs with custom styling and proper ARIA attributes.

### When to Use

- Single selection from multiple options
- Country/state selection
- Category selection
- Predefined option lists

### When NOT to Use

- Multiple selections (use Checkbox group)
- Searchable lists (consider custom component)
- Simple yes/no (use Radio)

## Quick Start

```html
<div class="formField">
  <label for="country">Country</label>
  <select id="country" class="select md" aria-describedby="country-help">
    <option value="">Choose a country</option>
    <option value="us">United States</option>
  </select>
  <p id="country-help" class="helpText">Select your country</p>
</div>
```

## Accessibility Requirements

- **`<label>` association** - Required with `for` attribute
- **`aria-describedby`** - For help text and error messages
- **`aria-invalid="true"`** - For error states
- **Disabled options** - Use `disabled` attribute on `<option>`

## API Reference

- `.select` - Select element class
- Size variants: `.sm`, `.md`, `.lg`
- Border radius: `.sharp`, `.smooth`, `.rounded`
- Multiple select: `[multiple]` attribute
- Sub-component: `.select-wrapper`

## Examples

See component CSS file for detailed examples.
