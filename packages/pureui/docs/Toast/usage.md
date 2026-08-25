# Toast Component

## Component Overview

The Toast component displays temporary, non-blocking notifications to users. Toasts appear at the edge of the screen and automatically dismiss or can be manually closed. They are designed for non-critical messages that don't require immediate user action.

### When to Use

- Success confirmations ("Changes saved")
- Non-critical error messages
- Information updates
- Warning notifications
- Status updates that don't block user workflow

### When NOT to Use

- Critical errors that require immediate attention (use Alert or Dialog)
- Actions that require user confirmation (use Dialog)
- Persistent messages (use Alert)
- Form validation errors (use inline error messages)

## Quick Start

```html
<div class="toast success" role="status" aria-live="polite" aria-atomic="true">
  <div class="toast-content">
    <p>Your changes have been saved</p>
  </div>
  <button class="toast-close" aria-label="Close notification">×</button>
</div>
```

### Required HTML Structure

```html
<div class="toast {variant}" role="status|alert" aria-live="polite|assertive" aria-atomic="true">
  <div class="toast-content">
    <p>Toast message</p>
  </div>
  <button class="toast-close" aria-label="Close notification">×</button>
</div>
```

## Accessibility Requirements

### Required Attributes

- **`role="status"`** - For polite, non-urgent messages
- **`role="alert"`** - For urgent, important messages
- **`aria-live="polite"`** - For status role (announces when screen reader is idle)
- **`aria-live="assertive"`** - For alert role (interrupts screen reader)
- **`aria-atomic="true"`** - Ensures complete message is announced
- **`aria-label`** - Required on close button

### Keyboard Navigation

- **Tab**: Focus the close button
- **Enter/Space**: Close the toast
- **Escape**: Should close toast (requires JavaScript)

### Screen Reader Support

- Toast messages are announced based on `aria-live` setting
- `aria-atomic="true"` ensures complete message is read
- Close button is announced with its label
- Toast position doesn't affect screen reader announcement

## API Reference

### Base Class

- `.toast` - Base toast class (required)

### Variants

- `.success` - Success message (green background)
- `.error` - Error message (red background)
- `.warning` - Warning message (yellow background)
- `.info` - Information message (blue background)
- Default - Neutral message (dark background)

### Size Variants

- `.sm` - Small toast (250-400px width, smaller padding)
- `.md` - Medium toast (300-500px width, standard padding) - **Default**
- `.lg` - Large toast (350-600px width, larger padding)

### Border Radius Variants

- `.sharp` - No border radius (0px)
- `.smooth` - Small border radius (default)
- `.rounded` - Large border radius

### Sub-components

- `.toast-content` - Content wrapper (required)
- `.toast-title` - Optional title heading
- `.toast-close` - Close button (optional)
- `.toast-container` - Container for multiple toasts

## Examples

### Basic Usage

```html
<div class="toast success" role="status" aria-live="polite" aria-atomic="true">
  <div class="toast-content">
    <p>Your changes have been saved</p>
  </div>
</div>
```

### With Close Button

```html
<div class="toast success" role="status" aria-live="polite" aria-atomic="true">
  <div class="toast-content">
    <p>Your changes have been saved</p>
  </div>
  <button class="toast-close" aria-label="Close notification">×</button>
</div>
```

### With Title

```html
<div class="toast info" role="status" aria-live="polite" aria-atomic="true">
  <div class="toast-content">
    <p class="toast-title">New Message</p>
    <p>You have a new message from John</p>
  </div>
  <button class="toast-close" aria-label="Close notification">×</button>
</div>
```

### Error Toast (Alert Role)

```html
<div class="toast error" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-content">
    <p>Error: Failed to save changes</p>
  </div>
  <button class="toast-close" aria-label="Close notification">×</button>
</div>
```

### Size Variants

```html
<div class="toast sm success" role="status" aria-live="polite" aria-atomic="true">
  <div class="toast-content">
    <p>Small toast</p>
  </div>
</div>

<div class="toast md success" role="status" aria-live="polite" aria-atomic="true">
  <div class="toast-content">
    <p>Medium toast</p>
  </div>
</div>

<div class="toast lg success" role="status" aria-live="polite" aria-atomic="true">
  <div class="toast-content">
    <p>Large toast</p>
  </div>
</div>
```

### Toast Container

```html
<div class="toast-container">
  <div class="toast success" role="status" aria-live="polite" aria-atomic="true">
    <div class="toast-content">
      <p>First toast</p>
    </div>
    <button class="toast-close" aria-label="Close notification">×</button>
  </div>
  <div class="toast info" role="status" aria-live="polite" aria-atomic="true">
    <div class="toast-content">
      <p>Second toast</p>
    </div>
    <button class="toast-close" aria-label="Close notification">×</button>
  </div>
</div>
```

## Browser Support

### Required CSS Features

- CSS Custom Properties (CSS Variables)
- Flexbox
- CSS Animations (`@keyframes`)
- `:focus-visible` pseudo-class

### Browser Compatibility

- Chrome 105+
- Firefox 121+
- Safari 15.4+
- Edge 105+

### Known Issues

- Auto-dismiss requires JavaScript (not included in CSS)
- Animation performance may vary on older devices
- Mobile positioning may need adjustment

## Related Components

- **Alert** (`alert.css`) - For persistent, important messages
- **Dialog** (`dialog.css`) - For blocking, critical messages
- **Progress** (`progress.css`) - For loading states

## Common Patterns

### Auto-dismiss Toast (JavaScript Required)

```html
<div class="toast success" role="status" aria-live="polite" aria-atomic="true" data-auto-dismiss="3000">
  <div class="toast-content">
    <p>This will auto-dismiss in 3 seconds</p>
  </div>
</div>
```

### Action Toast

```html
<div class="toast success" role="status" aria-live="polite" aria-atomic="true">
  <div class="toast-content">
    <p>File uploaded successfully</p>
    <button class="btn sm">View</button>
  </div>
  <button class="toast-close" aria-label="Close notification">×</button>
</div>
```

### Stacking Multiple Toasts

```html
<div class="toast-container">
  <!-- Toasts stack vertically with gap -->
  <div class="toast success" role="status" aria-live="polite" aria-atomic="true">
    <div class="toast-content"><p>First</p></div>
  </div>
  <div class="toast info" role="status" aria-live="polite" aria-atomic="true">
    <div class="toast-content"><p>Second</p></div>
  </div>
</div>
```
