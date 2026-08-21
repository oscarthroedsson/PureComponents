# Button Component - Contribution Guide

## Code Structure

### File Location

- **CSS File**: `src/Styles/button.css`
- **Documentation**: `src/Documentation/Button/`

### CSS Architecture

The button component uses a modular CSS architecture:

1. **Base Styling** - Core button styles (`.btn`)
2. **Size Variants** - Small, medium, large (`.sm`, `.md`, `.lg`)
3. **Style Variants** - Primary, secondary, tertiary
4. **State Management** - Disabled, pressed, focus states
5. **Icon Support** - Automatic icon sizing and layout

### Class Naming Conventions

- Base class: `.btn`
- Variants: `.btn.{variant}` (e.g., `.btn.sm`, `.btn.secondary`)
- Attribute selectors: `[class^="btn"]` for general rules
- State selectors: `:disabled`, `:focus-visible`, `[aria-pressed]`

### Selector Patterns

```css
/* Base class */
.btn { ... }

/* Variant classes */
.btn.sm { ... }
.btn.secondary { ... }

/* Attribute-based selection */
[class^="btn"]:disabled { ... }

/* State pseudo-classes */
.btn:focus-visible { ... }
.btn:disabled { ... }
```

## Implementation Details

### How the Component Works

1. **Base Styles**: The `.btn` class provides fundamental button styling with primary color background
2. **Size System**: Size variants (sm, md, lg) control font-size and padding
3. **Variant System**: Style variants (secondary, tertiary) modify colors and backgrounds
4. **Icon Detection**: Uses `:has()` selector to detect icons and apply flexbox layout
5. **Focus Management**: `:focus-visible` ensures focus indicators only appear on keyboard navigation

### CSS Techniques Used

- **CSS Custom Properties**: All colors, spacing, and sizing use CSS variables
- **Attribute Selectors**: `[class^="btn"]` for general button rules
- **`:has()` Selector**: Detects presence of icons for automatic layout
- **`color-mix()` Function**: Creates hover states by mixing colors
- **Flexbox**: Automatic icon and text alignment

### Design Decisions and Rationale

1. **Native Button Element**: Uses `<button>` for semantic HTML and built-in keyboard support
2. **`:disabled` Pseudo-class**: Prefers `:disabled` over `[disabled]` for better browser support
3. **Focus Indicators**: 3px outline with 2px offset meets WCAG 2.1 AA contrast requirements
4. **Icon Detection**: Automatic icon sizing reduces need for wrapper elements
5. **Transform on Active**: Scale transform provides tactile feedback

### Dependencies

- **Design Tokens**: Requires CSS variables from `main.css`
  - `--color-primary`, `--color-secondary`
  - `--color-neutral-*` colors
  - `--spacing-*` values
  - `--radius-*` values
  - `--font-size-*` values
- **No JavaScript**: Pure CSS implementation

## Accessibility Implementation

### How A11y is Achieved

1. **Semantic HTML**: Uses native `<button>` element
2. **Focus Indicators**: `:focus-visible` provides visible focus with 3:1 contrast
3. **ARIA Support**: Supports `aria-label` for icon-only buttons, `aria-pressed` for toggles
4. **Keyboard Navigation**: Native button keyboard support (Tab, Enter, Space)
5. **Disabled State**: Proper `:disabled` styling prevents interaction

### ARIA Attribute Handling

- **`aria-label`**: Required for icon-only buttons (documented, not enforced in CSS)
- **`aria-pressed`**: Toggle buttons use this to indicate state
- **`aria-busy`**: The loading state. Painted by `loading.css`, not by this file.

### Focus Management

- **Focus Indicator**: 3px solid outline with 2px offset
- **Contrast**: Uses primary color with neutral-100 shadow for 3:1 contrast
- **Variant Colors**: Secondary and tertiary buttons have variant-specific focus colors

### Screen Reader Considerations

- Button text is naturally announced
- Icon-only buttons require `aria-label` (enforced by documentation)
- Toggle buttons announce pressed state via `aria-pressed`
- Disabled buttons are announced as disabled by screen readers

### Keyboard Navigation Implementation

- Native browser keyboard support (no JavaScript needed)
- Tab key moves focus between buttons
- Enter/Space activates button
- Focus indicators visible only on keyboard navigation (`:focus-visible`)

## Design Tokens Used

### CSS Variables Referenced

**Colors:**
- `--color-primary` - Primary button background
- `--color-secondary` - Secondary button background
- `--color-neutral-100` - Text color on primary buttons
- `--color-neutral-900` - Text color on tertiary buttons
- `--color-neutral-200` - Disabled button background
- `--color-neutral-400` - Disabled button text

**Spacing:**
- `--spacing-50` - Small padding, gap between icon and text
- `--spacing-75` - Medium padding
- `--spacing-100` - Large padding

**Typography:**
- `--font-size-sm` - Small button font size (12px)
- `--font-size-md` - Medium button font size (14px)
- `--font-size-base` - Large button font size (16px)

**Border Radius:**
- `--radius-sm` - Small border radius (4px)
- `--radius-md` - Medium border radius (8px)
- `--radius-lg` - Large border radius (16px)
- `--radius-none` - No border radius (0px)

**Icon Sizes:**
- `--icon-size-sm-w` / `--icon-size-sm-h` - Small icon dimensions
- `--icon-size-lg-w` / `--icon-size-lg-h` - Medium/Large icon dimensions

## Testing Requirements

### Manual Testing Steps

1. **Visual Testing**
   - [ ] All size variants render correctly
   - [ ] All style variants have distinct appearances
   - [ ] Hover states work on all variants
   - [ ] Disabled state is visually distinct
   - [ ] Focus indicators are visible

2. **Keyboard Navigation**
   - [ ] Tab key moves focus to button
   - [ ] Enter key activates button
   - [ ] Space key activates button
   - [ ] Focus indicator appears on keyboard focus
   - [ ] Focus indicator does NOT appear on mouse click

3. **Screen Reader Testing**
   - [ ] Button text is announced
   - [ ] Icon-only buttons announce aria-label
   - [ ] Toggle buttons announce pressed state
   - [ ] Disabled buttons are announced as disabled

4. **Browser Compatibility**
   - [ ] Chrome (latest)
   - [ ] Firefox (latest)
   - [ ] Safari (latest)
   - [ ] Edge (latest)

### Visual Regression Considerations

- Button sizes should remain consistent
- Focus indicators should maintain 3:1 contrast
- Hover states should be smooth transitions
- Icon alignment should be consistent across sizes

## Extending the Component

### How to Add New Variants

1. **Add Size Variant**:
```css
.btn.xl {
  font-size: var(--font-size-xl);
  padding: var(--spacing-100) var(--spacing-125);
  border-radius: var(--radius-lg);
}
```

2. **Add Style Variant**:
```css
.btn.outline {
  background-color: transparent;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
}
```

3. **Add Focus State for New Variant**:
```css
[class^="btn"].outline:focus-visible {
  outline-color: var(--color-primary);
}
```

### How to Modify Styles

- **Change Colors**: Update CSS variables in `main.css`
- **Change Spacing**: Modify padding values in size variants
- **Change Focus Style**: Update `:focus-visible` rules
- **Add Animations**: Add transition properties to base `.btn` class

### Common Customization Patterns

1. **Custom Color Scheme**: Override CSS variables
2. **Custom Sizes**: Add new size classes
3. **Custom Border Radius**: Override border-radius in variants
4. **Icon Positioning**: Modify flexbox gap or alignment

### Breaking Change Considerations

- **Class Name Changes**: Would break existing implementations
- **CSS Variable Changes**: Could affect all buttons globally
- **Selector Changes**: Could break custom overrides
- **Removing Variants**: Would break components using those variants

## Related Files

### Dependencies

- `src/Styles/main.css` - Design tokens (CSS variables)

### Files That Use This Component

- All form components (for submit buttons)
- Dialog component (for close/action buttons)
- Navigation components (for action buttons)

### Related Utility Files

- `src/Styles/main.css` - Design token definitions
