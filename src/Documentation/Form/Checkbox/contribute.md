# Checkbox Component - Contribution Guide

## Code Structure

- **CSS File**: `src/Styles/Form/inputs/checkbox.css`

## Implementation Details

- Custom checkbox styling using `-webkit-appearance: none`
- Checkmark created with `::after` pseudo-element
- Indeterminate state support via `:indeterminate` and `[aria-checked="mixed"]`
- Focus indicators meet WCAG 2.1 AA standards

## Design Tokens Used

- Colors: `--color-primary`, `--color-error`, `--color-neutral-*`
- Spacing: `--spacing-25`, `--spacing-50`, `--spacing-75`
- Typography: `--font-size-sm`, `--font-size-md`, `--font-size-lg`
- Border radius: `--radius-sm`, `--radius-md`, `--radius-none`

## Testing Requirements

- Visual rendering of checked/unchecked/indeterminate states
- Keyboard navigation and focus indicators
- Screen reader announcements
- Error state handling
