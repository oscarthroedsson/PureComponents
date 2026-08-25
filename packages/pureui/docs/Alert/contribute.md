# Alert Component - Contribution Guide

## Code Structure

- **CSS File**: `src/Styles/alert.css`

## Implementation Details

- Flexbox layout for icon, content, and close button
- Color variants using semantic color variables
- `color-mix()` function for background tints
- Icon support with flexible sizing
- Dismissible with close button

## Design Tokens Used

- Colors: `--color-success`, `--color-error`, `--color-warning`, `--color-info`, `--color-neutral-*`
- Spacing: `--spacing-50`, `--spacing-75`, `--spacing-100`, `--spacing-125`, `--spacing-150`
- Typography: `--font-size-sm`, `--font-size-md`, `--font-size-lg`, `--font-size-xl`
- Border radius: `--radius-md`, `--radius-sm`, `--radius-lg`, `--radius-none`

## Accessibility Implementation

- ARIA live regions for dynamic content
- Role-based announcement (alert vs status)
- Focus management on close button
- Screen reader support for all variants
