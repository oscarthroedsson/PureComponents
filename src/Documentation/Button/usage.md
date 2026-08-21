# Button Component

## Component Overview

The Button component provides accessible, styled buttons for user interactions. It supports multiple variants, sizes, and states while maintaining WCAG 2.1 Level AA accessibility standards.

### When to Use

- Primary actions (submit forms, confirm actions)
- Secondary actions (cancel, go back)
- Navigation actions (links styled as buttons)
- Icon-only actions (with proper aria-label)
- Toggle actions (with aria-pressed)

### When NOT to Use

- Don't use buttons for navigation links (use `<a>` tags instead)
- Don't use buttons for decorative purposes
- Don't use buttons without proper labels (especially icon-only buttons)

## Quick Start

```html
<button class="btn md">Click me</button>
```

### Required HTML Structure

```html
<!-- Basic button -->
<button class="btn md">Button Text</button>

<!-- Icon-only button (REQUIRES aria-label) -->
<button class="btn md" aria-label="Close dialog">×</button>

<!-- Toggle button -->
<button class="btn md" aria-pressed="false">Toggle</button>
```

## Accessibility Requirements

### Required Attributes

- **Icon-only buttons**: MUST have `aria-label` attribute
- **Toggle buttons**: MUST use `aria-pressed="true"` or `aria-pressed="false"`
- **Disabled buttons**: Use native `disabled` attribute (not `[disabled]`)

### Keyboard Navigation

- **Tab**: Focus the button
- **Enter/Space**: Activate the button
- **Focus indicator**: Visible outline with 3:1 contrast ratio

### Screen Reader Support

- Buttons are announced with their text content
- Icon-only buttons are announced via `aria-label`
- Toggle buttons announce their pressed state
- Disabled buttons are announced as disabled

## API Reference

### Base Class

- `.btn` - Base button class (required)

### Size Variants

- `.sm` - Small button (12px font, compact padding)
- `.md` - Medium button (14px font, standard padding) - **Default**
- `.lg` - Large button (16px font, larger padding)

### Style Variants

- `.secondary` - Secondary button style (uses secondary color)
- `.tertiary` - Tertiary button style (transparent background, underlined on hover)
- `.emphasised` - Emphasized button style

### Border Radius Variants

- `.sharp` - No border radius (0px)
- `.smooth` - Small border radius (default)
- `.rounded` - Large border radius (inherited from size)

### State Classes

- `:disabled` - Disabled state (use native `disabled` attribute)
- `[aria-pressed="true"]` - Toggle button pressed state
- `[iconOnly]` - Icon-only button variant

## Examples

### Basic Usage

```html
<button class="btn md">Primary Action</button>
<button class="btn md secondary">Secondary Action</button>
<button class="btn md tertiary">Tertiary Action</button>
```

### Size Variants

```html
<button class="btn sm">Small Button</button>
<button class="btn md">Medium Button</button>
<button class="btn lg">Large Button</button>
```

### With Icons

```html
<button class="btn md">
  <svg aria-hidden="true" width="16" height="16">...</svg>
  Save
</button>
```

### Icon-Only Button

```html
<button class="btn md" aria-label="Close dialog">
  <svg aria-hidden="true" width="16" height="16">...</svg>
</button>
```

### Toggle Button

```html
<button class="btn md" aria-pressed="false" onclick="this.setAttribute('aria-pressed', this.getAttribute('aria-pressed') === 'true' ? 'false' : 'true')">
  Toggle
</button>
```

### Disabled State

```html
<button class="btn md" disabled>Disabled Button</button>
```

### Border Radius Variants

```html
<button class="btn md sharp">Sharp</button>
<button class="btn md smooth">Smooth</button>
<button class="btn md rounded">Rounded</button>
```

## Browser Support

### Required CSS Features

- CSS Custom Properties (CSS Variables)
- `:focus-visible` pseudo-class
- `:has()` selector (for icon detection)
- `color-mix()` function (for hover states)

### Browser Compatibility

- Chrome 105+
- Firefox 121+
- Safari 15.4+
- Edge 105+

### Known Issues

- Older browsers without `:focus-visible` support will show focus on mouse clicks
- `color-mix()` requires modern browser support (fallback uses solid colors)

## Related Components

- **Link** (`a-tag.css`) - For navigation links
- **Icon Button** - Use Button with `aria-label` for icon-only actions
- **Form Submit** - Use Button in forms for submit actions

## Common Patterns

### Form Submission

```html
<form>
  <button type="submit" class="btn md">Submit</button>
  <button type="button" class="btn md tertiary">Cancel</button>
</form>
```

### Action Group

```html
<div style="display: flex; gap: 0.5rem;">
  <button class="btn md">Save</button>
  <button class="btn md secondary">Cancel</button>
  <button class="btn md tertiary">Delete</button>
</div>
```

### Loading State

Loading is put on top, from `loading.css`. The button carries no
loading styling of its own — `aria-busy` is the state, `.loading` is
what paints it.

```html
<button class="btn md loading" aria-busy="true" disabled>Loading...</button>
```
