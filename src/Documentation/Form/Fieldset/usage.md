# Fieldset Component

## Component Overview

The Fieldset component provides grouping for related form fields with a legend for the group label.

### When to Use

- Grouping related form fields
- Radio button groups
- Checkbox groups
- Form sections

### When NOT to Use

- Single form fields (use FormField)
- Non-grouped inputs

## Quick Start

```html
<fieldset class="fieldSet md">
  <legend>Personal Information</legend>
  <div class="formField">
    <label for="name">Name</label>
    <input type="text" id="name" class="input md" />
  </div>
</fieldset>
```

## Accessibility Requirements

- **`<legend>` element** - Required for group label
- **Semantic grouping** - Fieldsets provide logical grouping

## API Reference

- `.fieldSet` - Fieldset class
- Size variants: `.sm`, `.md` (lg not recommended)
- Border radius: `.sharp`, `.smooth`

## Examples

See component CSS file for detailed examples.
