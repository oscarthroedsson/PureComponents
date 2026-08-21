# File Input Component

## Component Overview

The File Input component provides styled file upload inputs with custom button styling.

### When to Use

- File uploads
- Document selection
- Image uploads
- Multiple file selection

### When NOT to Use

- Text input (use Text Input)
- Other input types

## Quick Start

```html
<div class="formField">
  <label for="file">Upload File</label>
  <input type="file" id="file" class="fileInput" />
</div>
```

## Accessibility Requirements

- **`<label>` association** - Required
- **File input semantics** - Native file input accessibility

## API Reference

- `.fileInput` - File input class
- Border radius: `.sharp`, `.smooth`, `.rounded`
- Error state: `:user-invalid`

## Examples

See component CSS file for detailed examples.
