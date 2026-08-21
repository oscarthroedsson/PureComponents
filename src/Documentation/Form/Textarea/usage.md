# Textarea Component

## Component Overview

The Textarea component provides accessible multi-line text input fields with proper label association, error handling, and optional character counting.

### When to Use

- Multi-line text input
- Comments and messages
- Long-form content
- Descriptions

### When NOT to Use

- Single-line text (use Text Input)
- Rich text editing (use rich text editor)
- Code input (use code editor)

## Quick Start

```html
<div class="formField">
  <label for="message">Message</label>
  <textarea 
    id="message" 
    class="textarea md" 
    rows="4"
    aria-describedby="message-help"
  ></textarea>
  <p id="message-help" class="helpText">Enter your message</p>
</div>
```

## Accessibility Requirements

- **`<label>` association** - Required
- **`aria-describedby`** - For help text and character count
- **`aria-invalid="true"`** - For error states
- **Character count** - Use `aria-live="polite"` on count element

## API Reference

- `.textarea` - Textarea element class
- Size variants: `.sm`, `.md`, `.lg`
- Border radius: `.sharp`, `.smooth`, `.rounded`
- Resize variants: `.resize-none`, `.resize-both`, `.resize-horizontal`, `.resize-vertical`
- Sub-components: `.textarea-footer`, `.char-count`

## Examples

See component CSS file for detailed examples.
