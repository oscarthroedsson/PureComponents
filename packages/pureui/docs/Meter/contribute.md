# Meter Component - Contribution Guide

## Code Structure

- **CSS File**: `src/Styles/meter.css`

## Implementation Details

- Native `<meter>` element styling
- Webkit pseudo-elements for range colors
- Firefox styling support
- Color coding: optimum (green), suboptimum (yellow), even less good (red)

## Design Tokens Used

- Colors: `--color-success`, `--color-warning`, `--color-primary`, `--color-neutral-200`
- Border radius: `--radius-full`, `--radius-sm`, `--radius-none`
- Height: `0.5rem`, `1rem`, `1.5rem` (hard-coded for sizes)

## Accessibility Implementation

- Native meter element semantics
- ARIA value attributes
- Range attributes (low, high, optimum)
- Screen reader support
