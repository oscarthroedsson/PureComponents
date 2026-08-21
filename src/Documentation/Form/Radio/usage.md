# Radio Component

## Component Overview

The Radio component provides accessible radio button groups for single-choice selection. Radio buttons must be grouped in a fieldset with proper labeling.

### When to Use

- Single choice from multiple options
- Yes/No questions
- Preference selection
- Option selection

### When NOT to Use

- Multiple selections (use Checkbox)
- Boolean toggles (use Checkbox)
- Dropdown selection (use Select)

## Quick Start

```html
<fieldset class="radio-group">
  <legend>Choose an option</legend>
  <div class="radio-item">
    <input type="radio" id="option1" name="choice" class="radio" value="1" />
    <label for="option1" class="radio-label">Option 1</label>
  </div>
</fieldset>
```

## Accessibility Requirements

- **`<fieldset>` and `<legend>`** - Required for grouping
- **`name` attribute** - All radios in group must share same name
- **`<label>` association** - Each radio must have associated label
- **`aria-invalid`** - For error states on fieldset

## API Reference

- `.radio-group` - Fieldset wrapper class
- `.radio-item` - Individual radio wrapper
- `.radio-label` - Label class
- `.radio` - Radio input class
- Size variants: `.sm`, `.md`, `.lg`
- Layout: `.horizontal` for horizontal layout

## Examples

See component CSS file for detailed examples.
