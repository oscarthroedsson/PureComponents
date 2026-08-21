# Text Input Component

## Component Overview

The Text Input component provides accessible, styled text input fields for forms. It supports multiple input types (text, email, password, number, tel) with proper label association, error handling, and help text.

### When to Use

- Single-line text input (names, addresses, etc.)
- Email addresses
- Phone numbers
- Passwords
- Numeric input
- Any form field requiring text entry

### When NOT to Use

- Multi-line text (use Textarea component)
- File uploads (use File Input component)
- Date selection (use date input type)
- Dropdown selection (use Select component)

## Quick Start

```html
<div class="formField">
  <label for="name">Name</label>
  <input type="text" id="name" class="input md" />
</div>
```

### Required HTML Structure

```html
<div class="formField">
  <label for="input-id">Label Text</label>
  <input 
    type="text|email|password|number|tel" 
    id="input-id" 
    class="input md"
    aria-describedby="help-id error-id"
  />
  <p id="help-id" class="helpText">Help text</p>
  <p id="error-id" class="status" role="alert">Error message</p>
</div>
```

## Accessibility Requirements

### Required Attributes

- **Label Association**: MUST use `<label for="input-id">` or wrap input in label
- **Error States**: MUST use `aria-invalid="true"` on input
- **Error Messages**: MUST use `aria-describedby` pointing to error message id
- **Help Text**: SHOULD use `aria-describedby` pointing to help text id

### Keyboard Navigation

- **Tab**: Focus the input
- **Arrow Keys**: Navigate within text (text inputs)
- **Enter**: Submit form (if in form)
- **Focus indicator**: Visible outline with 3:1 contrast ratio

### Screen Reader Support

- Label is announced when input is focused
- Help text is announced via `aria-describedby`
- Error messages are announced immediately (role="alert")
- Input type is announced (email, password, etc.)

## API Reference

### Base Classes

- `.formField` - Form field wrapper (required)
- `.input` - Input element class (required)
- `.label-container` - Alternative label container

### Input Types Supported

- `type="text"` - Standard text input
- `type="email"` - Email address
- `type="password"` - Password (masked)
- `type="number"` - Numeric input
- `type="tel"` - Telephone number
- `type="date"` - Date picker
- `type="month"` - Month picker
- `type="week"` - Week picker

### Size Variants

- `.sm` - Small input (12px font, compact padding)
- `.md` - Medium input (14px font, standard padding) - **Default**
- `.lg` - Large input (20px font, larger padding)

### Border Radius Variants

- `.sharp` - No border radius (0px)
- `.smooth` - Small border radius (2px)
- `.rounded` - Large border radius (999px)

### State Classes

- `:disabled` - Disabled state
- `:user-invalid` - Browser validation error
- `[aria-invalid="true"]` - Custom error state
- `[data-warning="true"]` - Warning state

### Helper Classes

- `.helpText` - Help text styling
- `.status` - Error/warning message styling

## Examples

### Basic Usage

```html
<div class="formField">
  <label for="name">Name</label>
  <input type="text" id="name" class="input md" />
</div>
```

### With Help Text

```html
<div class="formField">
  <label for="email">Email</label>
  <input 
    type="email" 
    id="email" 
    class="input md"
    aria-describedby="email-help"
  />
  <p id="email-help" class="helpText">Enter your email address</p>
</div>
```

### With Error State

```html
<div class="formField">
  <label for="email">Email</label>
  <input 
    type="email" 
    id="email" 
    class="input md"
    aria-invalid="true"
    aria-describedby="email-error"
    required
  />
  <p id="email-error" class="status" role="alert">Please enter a valid email</p>
</div>
```

### Password Input

```html
<div class="formField">
  <label for="password">Password</label>
  <input 
    type="password" 
    id="password" 
    class="input md"
    aria-describedby="password-help"
  />
  <p id="password-help" class="helpText">Must be at least 8 characters</p>
</div>
```

### Number Input

```html
<div class="formField">
  <label for="age">Age</label>
  <input 
    type="number" 
    id="age" 
    class="input md"
    min="0"
    max="120"
  />
</div>
```

### Disabled State

```html
<div class="formField">
  <label for="readonly">Read-only Field</label>
  <input 
    type="text" 
    id="readonly" 
    class="input md"
    value="Cannot be edited"
    disabled
  />
</div>
```

### Size Variants

```html
<div class="formField">
  <label for="small">Small</label>
  <input type="text" id="small" class="input sm" />
</div>

<div class="formField">
  <label for="medium">Medium</label>
  <input type="text" id="medium" class="input md" />
</div>

<div class="formField">
  <label for="large">Large</label>
  <input type="text" id="large" class="input lg" />
</div>
```

### Border Radius Variants

```html
<input type="text" class="input md sharp" />
<input type="text" class="input md smooth" />
<input type="text" class="input md rounded" />
```

## Browser Support

### Required CSS Features

- CSS Custom Properties (CSS Variables)
- `:focus-visible` pseudo-class
- `:has()` selector (for label-container)
- `:user-invalid` pseudo-class

### Browser Compatibility

- Chrome 105+
- Firefox 121+
- Safari 15.4+
- Edge 105+

### Known Issues

- Number input spinners are hidden (webkit and moz)
- Date picker styling varies by browser
- `:user-invalid` requires form validation

## Related Components

- **Textarea** (`textarea.css`) - For multi-line text input
- **Select** (`select.css`) - For dropdown selection
- **Form Field** (`formField.css`) - Wrapper component
- **Checkbox** (`checkbox.css`) - For boolean input
- **Radio** (`radio.css`) - For single choice selection

## Common Patterns

### Form with Multiple Fields

```html
<form>
  <div class="formField">
    <label for="firstname">First Name</label>
    <input type="text" id="firstname" class="input md" required />
  </div>
  
  <div class="formField">
    <label for="lastname">Last Name</label>
    <input type="text" id="lastname" class="input md" required />
  </div>
  
  <div class="formField">
    <label for="email">Email</label>
    <input type="email" id="email" class="input md" required />
  </div>
  
  <button type="submit" class="btn md">Submit</button>
</form>
```

### Input with Icon

```html
<div class="formField">
  <label for="search">Search</label>
  <div style="position: relative;">
    <input type="text" id="search" class="input md" />
    <svg style="position: absolute; right: 0.5rem; top: 50%; transform: translateY(-50%);" aria-hidden="true">...</svg>
  </div>
</div>
```
