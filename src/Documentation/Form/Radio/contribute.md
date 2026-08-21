# Radio Component - Contribution Guide

## Code Structure

- **CSS File**: `src/Styles/Form/inputs/radio.css`

## Implementation Details

- Custom radio styling using `-webkit-appearance: none`
- Circular design with `border-radius: 50%`
- Checked state uses `::after` pseudo-element for dot
- Fieldset grouping for proper semantics
- Horizontal layout option

## Design Tokens Used

- Colors: `--color-primary`, `--color-error`, `--color-neutral-*`
- Spacing: `--spacing-25`, `--spacing-50`, `--spacing-75`
- Typography: `--font-size-sm`, `--font-size-md`, `--font-size-lg`
- Border radius: `50%` for circular shape

## Accessibility Implementation

- Fieldset/legend pattern for grouping
- Label association
- Focus indicators
- Error state handling
- Screen reader support
