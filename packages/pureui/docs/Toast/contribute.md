# Toast Component - Contribution Guide

## Code Structure

### File Location

- **CSS File**: `src/Styles/toast.css`
- **Documentation**: `src/Documentation/Toast/`

### CSS Architecture

The toast component uses a layered architecture:

1. **Base Toast** - Core toast styles (`.toast`)
2. **Variants** - Success, error, warning, info
3. **Size Variants** - Small, medium, large
4. **Sub-components** - Content, close button, container
5. **Animations** - Slide-in and slide-out animations

### Class Naming Conventions

- Base class: `.toast`
- Variants: `.toast.{variant}` (e.g., `.toast.success`)
- Size variants: `.toast.{size}` (e.g., `.toast.sm`)
- Sub-components: `.toast-{component}` (e.g., `.toast-content`)

### Selector Patterns

```css
/* Base class */
.toast { ... }

/* Variant classes */
.toast.success { ... }
.toast.error { ... }

/* Size variants */
.toast.sm { ... }
.toast.md { ... }

/* Sub-components */
.toast-content { ... }
.toast-close { ... }
```

## Implementation Details

### How the Component Works

1. **Base Layout**: Uses flexbox for horizontal layout (content + close button)
2. **Positioning**: Fixed positioning for screen-edge placement
3. **Variants**: Background color changes based on variant class
4. **Animations**: CSS keyframe animations for slide-in/out
5. **Container**: Wrapper for stacking multiple toasts

### CSS Techniques Used

- **Flexbox**: Horizontal layout with content and close button
- **Fixed Positioning**: Screen-edge placement
- **CSS Animations**: Slide-in and slide-out keyframes
- **CSS Custom Properties**: All colors and spacing use variables
- **Media Queries**: Responsive positioning on mobile

### Design Decisions and Rationale

1. **Fixed Positioning**: Ensures toasts don't affect page layout
2. **Flexbox Layout**: Simplifies content + close button alignment
3. **Animation**: Provides smooth, non-jarring appearance
4. **Container Pattern**: Allows stacking multiple toasts
5. **Pointer Events**: Container uses `pointer-events: none` to allow clicks through gaps

### Dependencies

- **Design Tokens**: Requires CSS variables from `main.css`
  - `--color-success`, `--color-error`, `--color-warning`, `--color-info`
  - `--color-neutral-900`, `--color-neutral-100`
  - `--spacing-*` values
  - `--radius-*` values
  - `--font-size-*` values
  - `--shadow-lg` for elevation
  - `--z-index-toast` for layering
- **No JavaScript**: Pure CSS (auto-dismiss requires JS)

## Accessibility Implementation

### How A11y is Achieved

1. **ARIA Live Regions**: `aria-live` announces toast content
2. **Role Attributes**: `role="status"` or `role="alert"` for appropriate announcement
3. **Atomic Updates**: `aria-atomic="true"` ensures complete message is read
4. **Focus Management**: Close button is focusable
5. **Keyboard Support**: Close button supports Enter/Space

### ARIA Attribute Handling

- **`role="status"`**: For polite, non-urgent messages
- **`role="alert"`**: For urgent, important messages
- **`aria-live="polite"`**: Announces when screen reader is idle
- **`aria-live="assertive"`**: Interrupts screen reader immediately
- **`aria-atomic="true"`**: Ensures complete message is announced
- **`aria-label`**: Required on close button

### Focus Management

- Close button receives focus when toast appears (requires JS)
- Focus returns to trigger element when closed (requires JS)
- Focus indicator uses `:focus-visible` for keyboard-only focus

### Screen Reader Considerations

- Toast content is announced based on `aria-live` setting
- `aria-atomic="true"` ensures complete message is read, not partial updates
- Close button is announced with its label
- Toast position doesn't affect announcement timing

### Keyboard Navigation Implementation

- Tab key moves focus to close button
- Enter/Space activates close button
- Escape key should close toast (requires JavaScript)
- Focus management requires JavaScript for proper behavior

## Design Tokens Used

### CSS Variables Referenced

**Colors:**
- `--color-success` - Success toast background
- `--color-error` - Error toast background
- `--color-warning` - Warning toast background
- `--color-info` - Info toast background
- `--color-neutral-900` - Default toast background
- `--color-neutral-100` - Toast text color

**Spacing:**
- `--spacing-50` - Small padding, gap between elements
- `--spacing-75` - Medium padding
- `--spacing-100` - Large padding, container positioning
- `--spacing-125` - Extra large padding

**Typography:**
- `--font-size-sm` - Small toast font size
- `--font-size-md` - Medium toast font size
- `--font-size-lg` - Large toast font size, title size
- `--font-size-xl` - Close button font size

**Border Radius:**
- `--radius-none` - Sharp variant (0px)
- `--radius-sm` - Smooth variant
- `--radius-md` - Default border radius
- `--radius-lg` - Rounded variant

**Shadows:**
- `--shadow-lg` - Toast elevation shadow

**Z-index:**
- `--z-index-toast` - Toast layering (1100)

## Testing Requirements

### Manual Testing Steps

1. **Visual Testing**
   - [ ] All variants render with correct colors
   - [ ] All size variants have appropriate dimensions
   - [ ] Animations play smoothly
   - [ ] Close button is visible and styled
   - [ ] Multiple toasts stack correctly

2. **Keyboard Navigation**
   - [ ] Tab key focuses close button
   - [ ] Enter key closes toast
   - [ ] Space key closes toast
   - [ ] Focus indicator is visible
   - [ ] Escape key closes toast (with JS)

3. **Screen Reader Testing**
   - [ ] Status toasts announce politely
   - [ ] Alert toasts interrupt immediately
   - [ ] Complete message is announced (aria-atomic)
   - [ ] Close button is announced correctly
   - [ ] Toast position doesn't affect announcement

4. **Browser Compatibility**
   - [ ] Chrome (latest)
   - [ ] Firefox (latest)
   - [ ] Safari (latest)
   - [ ] Edge (latest)

5. **Responsive Testing**
   - [ ] Mobile positioning is correct
   - [ ] Toast width adapts on mobile
   - [ ] Stacking works on all screen sizes

### Visual Regression Considerations

- Toast dimensions should remain consistent
- Animation timing should be smooth
- Color contrast should meet WCAG standards
- Close button alignment should be consistent

## Extending the Component

### How to Add New Variants

1. **Add Color Variant**:
```css
.toast.custom {
  background-color: var(--color-custom);
  color: var(--color-neutral-100);
}
```

2. **Add Size Variant**:
```css
.toast.xl {
  padding: var(--spacing-125) var(--spacing-150);
  font-size: var(--font-size-xl);
  min-width: 400px;
  max-width: 700px;
}
```

### How to Modify Styles

- **Change Colors**: Update CSS variables in `main.css`
- **Change Position**: Modify `top` and `right` in `.toast-container`
- **Change Animation**: Update `@keyframes` definitions
- **Change Timing**: Modify animation duration values

### Common Customization Patterns

1. **Custom Positioning**: Override `.toast-container` positioning
2. **Custom Animations**: Replace keyframe animations
3. **Custom Variants**: Add new color/style variants
4. **Custom Sizes**: Add new size classes

### Breaking Change Considerations

- **Class Name Changes**: Would break existing implementations
- **Animation Changes**: Could affect user experience
- **Position Changes**: Could break layout assumptions
- **Removing Variants**: Would break components using those variants

## Related Files

### Dependencies

- `src/Styles/main.css` - Design tokens (CSS variables)

### Files That Use This Component

- Form components (for success/error messages)
- API integration code (for status updates)
- User action handlers (for confirmations)

### Related Utility Files

- JavaScript files for toast management (not in CSS library)
- Animation utilities (if any)
