# Search Input Component

## Component Overview

The Search Input component provides accessible search inputs with proper semantic HTML and ARIA attributes.

### When to Use

- Site search
- Filter inputs
- Search functionality
- Query inputs

### When NOT to Use

- Regular text input (use Text Input)
- URL input (use Text Input with type="url")

## Quick Start

```html
<form role="search" aria-label="Site search">
  <div class="formField">
    <label for="search">Search</label>
    <input 
      type="search" 
      id="search" 
      class="search-input md"
      aria-label="Search site"
    />
    <button type="submit" class="btn">Search</button>
  </div>
</form>
```

## Accessibility Requirements

- **`role="search"`** - On form element
- **`aria-label`** - On search input or form
- **`<label>` association** - Required (can be visually hidden)

## API Reference

- `.search-input` - Search input class
- `.search-form` - Form wrapper
- `.search-wrapper` - Input + button wrapper
- `.search-button` - Submit button
- `.visually-hidden` - For hidden labels
- Size variants: `.sm`, `.md`, `.lg`
- Border radius: `.sharp`, `.smooth`, `.rounded`

## Examples

See component CSS file for detailed examples.
