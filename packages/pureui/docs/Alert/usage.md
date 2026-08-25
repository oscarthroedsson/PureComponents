# Alert Component

## Component Overview

The Alert component displays persistent, important messages to users. Alerts are more prominent than toasts and remain visible until dismissed or the condition changes.

### When to Use

- Critical errors requiring immediate attention
- Important warnings
- Success confirmations that need to persist
- Information that users must acknowledge

### When NOT to Use

- Temporary notifications (use Toast)
- Non-critical messages (use Toast)
- Blocking confirmations (use Dialog)

## Quick Start

```html
<div class="alert error" role="alert" aria-live="assertive">
  <div class="alert-content">
    <h3 class="alert-title">Error</h3>
    <p class="alert-message">Something went wrong</p>
  </div>
  <button class="alert-close" aria-label="Close alert">×</button>
</div>
```

## Accessibility Requirements

- **`role="alert"`** - For important messages (interrupts)
- **`role="status"`** - For less urgent messages (polite)
- **`aria-live="assertive"`** - For alert role
- **`aria-live="polite"`** - For status role
- **`aria-label`** - Required on close button

## API Reference

- `.alert` - Base alert class
- Variants: `.success`, `.error`, `.warning`, `.info`
- Size variants: `.sm`, `.md`, `.lg`
- Border radius: `.sharp`, `.smooth`, `.rounded`
- Sub-components: `.alert-icon`, `.alert-content`, `.alert-title`, `.alert-message`, `.alert-close`

## Examples

See component CSS file for detailed examples.
