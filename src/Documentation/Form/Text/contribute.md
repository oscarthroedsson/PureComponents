# Text Input Component - Contribution Guide

## Code Structure

### File Location

- **CSS File**: `src/Styles/Form/inputs/text.css`
- **Documentation**: `src/Documentation/Form/Text/`

### CSS Architecture

The text input component uses a dual-class system:

1. **Label Container** - `.label-container` for grouped label + input
2. **Input Element** - `.input` class for input styling
3. **Form Field Wrapper** - `.formField` (from formField.css) for complete field structure
4. **State Management** - Error, disabled, focus states
5. **Helper Text** - Help and error message styling

### Class Naming Conventions

- Label container: `.label-container`
- Input class: `.input`
- Size variants: `.input.{size}` or `.label-container.{size}`
- Helper classes: `.helpText`, `.status`
- State selectors: `:disabled`, `:user-invalid`, `[aria-invalid]`

### Selector Patterns

```css
/* Label container */
.label-container { ... }

/* Input element */
.input:is(input[type="text"], ...) { ... }

/* Size variants */
.label-container.sm { ... }
.input.sm { ... }

/* State selectors */
.input:disabled { ... }
.input:user-invalid { ... }
.input[aria-invalid="true"] { ... }
```

## Implementation Details

### How the Component Works

1. **Label Container**: Uses `:has()` selector to detect input types and apply layout
2. **Input Styling**: Base styles with outline instead of border for better focus control
3. **Focus Management**: `:focus-visible` provides keyboard-only focus indicators
4. **Error States**: Multiple error detection methods (`:user-invalid`, `[aria-invalid]`)
5. **Number Input**: Hides browser spinners for cleaner appearance

### CSS Techniques Used

- **`:has()` Selector**: Detects input types in label-container
- **`:is()` Selector**: Groups multiple input type selectors
- **`:user-invalid`**: Browser validation error state
- **`:focus-visible`**: Keyboard-only focus indicators
- **Outline vs Border**: Uses outline for better focus control
- **Pseudo-element Hiding**: Hides number input spinners

### Design Decisions and Rationale

1. **Outline Instead of Border**: Allows for better focus indicator control
2. **`:has()` for Layout**: Automatically applies flexbox when inputs are detected
3. **Multiple Error Detection**: Supports both browser and custom validation
4. **Number Spinner Hiding**: Provides cleaner, more consistent appearance
5. **Separate Input Class**: Allows standalone input styling without label-container

### Dependencies

- **Form Field Component**: Often used with `.formField` wrapper
- **Design Tokens**: Requires CSS variables from `main.css`
  - `--color-primary`, `--color-error`, `--color-warning`
  - `--color-neutral-*` colors
  - `--spacing-*` values
  - `--radius-*` values
  - `--font-size-*` values

## Accessibility Implementation

### How A11y is Achieved

1. **Label Association**: Requires explicit `<label for="id">` association
2. **Error Communication**: Uses `aria-invalid` and `aria-describedby`
3. **Help Text**: Associated via `aria-describedby`
4. **Focus Indicators**: 3px outline with 2px offset meets WCAG 2.1 AA
5. **Input Types**: Semantic input types provide context

### ARIA Attribute Handling

- **`aria-describedby`**: Links help text and error messages
- **`aria-invalid="true"`**: Indicates error state to screen readers
- **`role="alert"`**: Error messages use alert role for immediate announcement
- **`aria-required`**: Can be used (browser `required` attribute also works)

### Focus Management

- **Focus Indicator**: 3px solid outline with 2px offset
- **Contrast**: Primary color with neutral-100 shadow for 3:1 contrast
- **Keyboard Only**: `:focus-visible` ensures mouse clicks don't show focus

### Screen Reader Considerations

- Label is announced when input receives focus
- Help text is announced via `aria-describedby`
- Error messages interrupt with `role="alert"`
- Input type provides context (email, password, etc.)
- Disabled state is announced automatically

### Keyboard Navigation Implementation

- Native browser keyboard support
- Tab key moves focus between inputs
- Arrow keys navigate within text
- Enter key submits form
- All standard input keyboard shortcuts work

## Design Tokens Used

### CSS Variables Referenced

**Colors:**
- `--color-primary` - Focus indicator color
- `--color-error` - Error state outline
- `--color-warning` - Warning state outline
- `--color-neutral-50` - Input background
- `--color-neutral-100` - Focus shadow
- `--color-neutral-300` - Input border
- `--color-neutral-400` - Disabled text
- `--color-neutral-500` - Disabled label
- `--color-neutral-800` - Label text
- `--color-neutral-900` - Input text

**Spacing:**
- `--spacing-25` - Small padding, outline offset
- `--spacing-50` - Standard padding, gaps
- `--spacing-75` - Larger padding

**Typography:**
- `--font-size-sm` - Small input font (12px)
- `--font-size-md` - Medium input font (14px), label font
- `--font-size-lg` - Large input font (20px), large label font

**Border Radius:**
- `--radius-sharp` - Sharp variant (0px)
- `--radius-smooth` - Smooth variant (2px)
- `--radius-rounded` - Rounded variant (999px)

## Testing Requirements

### Manual Testing Steps

1. **Visual Testing**
   - [ ] All input types render correctly
   - [ ] All size variants have appropriate dimensions
   - [ ] Focus indicators are visible
   - [ ] Error states are visually distinct
   - [ ] Disabled state is clear

2. **Keyboard Navigation**
   - [ ] Tab key moves focus to input
   - [ ] Focus indicator appears on keyboard focus
   - [ ] Focus indicator does NOT appear on mouse click
   - [ ] All input types accept keyboard input
   - [ ] Number input accepts numeric input only

3. **Screen Reader Testing**
   - [ ] Label is announced on focus
   - [ ] Help text is announced
   - [ ] Error messages interrupt immediately
   - [ ] Input type is announced
   - [ ] Disabled state is announced

4. **Browser Compatibility**
   - [ ] Chrome (latest)
   - [ ] Firefox (latest)
   - [ ] Safari (latest)
   - [ ] Edge (latest)

5. **Form Validation**
   - [ ] Browser validation works
   - [ ] Custom validation works
   - [ ] Error messages display correctly
   - [ ] Help text hides when error appears

### Visual Regression Considerations

- Input dimensions should remain consistent
- Focus indicators should maintain 3:1 contrast
- Error states should be clearly visible
- Spacing between elements should be consistent

## Extending the Component

### How to Add New Input Types

1. **Add to Input Selector**:
```css
.input:is(
  input[type="text"],
  input[type="newtype"]
) { ... }
```

2. **Add to Label Container**:
```css
.label-container:has(input[type="newtype"]) {
  /* Specific styling */
}
```

### How to Modify Styles

- **Change Colors**: Update CSS variables in `main.css`
- **Change Spacing**: Modify padding values
- **Change Focus Style**: Update `:focus-visible` rules
- **Add Custom States**: Add new attribute selectors

### Common Customization Patterns

1. **Custom Input Types**: Add to `:is()` selector
2. **Custom Error Styles**: Override error state rules
3. **Custom Sizes**: Add new size variants
4. **Icon Integration**: Add padding for icon placement

### Breaking Change Considerations

- **Selector Changes**: Could break custom overrides
- **Class Name Changes**: Would break existing implementations
- **Removing Input Types**: Would break forms using those types
- **CSS Variable Changes**: Could affect all inputs globally

## Related Files

### Dependencies

- `src/Styles/Form/inputs/formField.css` - Form field wrapper
- `src/Styles/main.css` - Design tokens

### Files That Use This Component

- All form implementations
- Search components
- Filter components

### Related Utility Files

- `src/Styles/Form/fieldSet.css` - Fieldset grouping
