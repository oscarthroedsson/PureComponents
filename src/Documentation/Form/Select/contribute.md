# Select Component - Contribution Guide

## Code Structure

- **CSS File**: `src/Styles/Form/inputs/select.css`

## Implementation Details

- Custom select styling with `appearance: none`
- Custom dropdown arrow using SVG data URI
- Multiple select variant with different styling
- Option styling for better appearance
- Focus and hover states

## Design Tokens Used

- Colors: `--color-primary`, `--color-error`, `--color-neutral-*`
- Spacing: `--spacing-25`, `--spacing-50`, `--spacing-75`, `--spacing-100`
- Typography: `--font-size-sm`, `--font-size-md`, `--font-size-lg`
- Border radius: `--radius-none`, `--radius-md`, `--radius-rounded`

## Accessibility Implementation

- Native select element semantics
- ARIA attributes for errors
- Focus indicators
- Keyboard navigation (native)
- Screen reader support
