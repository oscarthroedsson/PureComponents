# Dialog Component

## Component Overview

The Dialog component provides accessible modal dialogs for blocking user interactions. It supports both native `<dialog>` elements and custom dialog implementations with proper focus management and ARIA attributes.

### When to Use

- Critical confirmations (delete, save changes)
- Important information that requires user attention
- Forms that need to be completed before continuing
- Multi-step processes
- Content that should block background interaction

### When NOT to Use

- Non-critical notifications (use Toast or Alert)
- Simple information display (use Alert)
- Navigation (use Navigation component)
- Non-blocking content

## Quick Start

```html
<dialog id="dialog" class="dialog md" aria-labelledby="dialog-title">
  <div class="dialog-header">
    <h2 id="dialog-title">Dialog Title</h2>
    <button class="dialog-close" aria-label="Close dialog">×</button>
  </div>
  <div class="dialog-body">Content</div>
  <div class="dialog-footer">
    <button class="btn" onclick="dialog.close()">Close</button>
  </div>
</dialog>
```

## Accessibility Requirements

### Required Attributes

- **`aria-labelledby`** - MUST point to dialog title element
- **`aria-describedby`** - SHOULD point to description (optional)
- **`aria-label`** - Required on close button
- **Focus Trap** - Requires JavaScript to trap focus
- **Focus Return** - Requires JavaScript to return focus to trigger

### Keyboard Navigation

- **Tab**: Navigate within dialog (trapped)
- **Shift+Tab**: Navigate backward (trapped)
- **Escape**: Close dialog (native `<dialog>` supports this)
- **Enter**: Activate focused button

### Screen Reader Support

- Dialog title is announced when opened
- Dialog description is announced (if provided)
- Focus moves to first focusable element
- Backdrop is properly handled

## API Reference

### Base Classes

- `.dialog` - Dialog element class (required)
- `.dialog-header` - Header section
- `.dialog-body` - Content section
- `.dialog-footer` - Footer section
- `.dialog-close` - Close button

### Size Variants

- `.sm` - Small dialog (400px max-width)
- `.md` - Medium dialog (600px max-width) - **Default**
- `.lg` - Large dialog (800px max-width)
- `.xl` - Extra large dialog (1200px max-width)
- `.fullscreen` - Fullscreen dialog

### Border Radius Variants

- `.sharp` - No border radius
- `.smooth` - Small border radius
- `.rounded` - Large border radius

## Examples

### Basic Dialog

```html
<dialog id="dialog" class="dialog md" aria-labelledby="dialog-title">
  <div class="dialog-header">
    <h2 id="dialog-title">Confirm Action</h2>
    <button class="dialog-close" aria-label="Close dialog" onclick="dialog.close()">×</button>
  </div>
  <div class="dialog-body">
    <p>Are you sure you want to proceed?</p>
  </div>
  <div class="dialog-footer">
    <button class="btn md" onclick="dialog.close()">Cancel</button>
    <button class="btn md" onclick="dialog.close()">Confirm</button>
  </div>
</dialog>
```

### Dialog with Description

```html
<dialog id="dialog" class="dialog md" aria-labelledby="dialog-title" aria-describedby="dialog-desc">
  <div class="dialog-header">
    <h2 id="dialog-title">Delete Item</h2>
    <button class="dialog-close" aria-label="Close dialog" onclick="dialog.close()">×</button>
  </div>
  <div class="dialog-body">
    <p id="dialog-desc">This action cannot be undone.</p>
    <p>Are you sure you want to delete this item?</p>
  </div>
  <div class="dialog-footer">
    <button class="btn md" onclick="dialog.close()">Cancel</button>
    <button class="btn md" onclick="deleteItem(); dialog.close()">Delete</button>
  </div>
</dialog>
```

## Browser Support

- Chrome 37+ (native `<dialog>`)
- Firefox 98+ (native `<dialog>`)
- Safari 15.4+ (native `<dialog>`)
- Edge 79+ (native `<dialog>`)

## Related Components

- **Alert** - For non-blocking messages
- **Toast** - For temporary notifications
- **Button** - For dialog actions
