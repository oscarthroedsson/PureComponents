# Progress Component - Contribution Guide

## Code Structure

- **CSS File**: `src/Styles/progress.css`

## Implementation Details

- Native `<progress>` element styling
- Webkit and Firefox pseudo-element styling
- Custom progress bar fallback
- Smooth transitions for value changes
- Variant colors for different states

## Design Tokens Used

- Colors: `--color-primary`, `--color-success`, `--color-error`, `--color-warning`, `--color-neutral-200`
- Border radius: `--radius-full`, `--radius-sm`, `--radius-none`
- Height: `0.5rem`, `1rem`, `1.5rem` (hard-coded for sizes)

## Accessibility Implementation

- Native progress element semantics
- ARIA value attributes
- Screen reader support
- Label association
