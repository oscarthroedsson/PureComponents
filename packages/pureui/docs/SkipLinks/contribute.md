# Skip Links Component - Contribution Guide

## Code Structure

- **CSS File**: `src/Styles/skip-links.css`

## Implementation Details

- Absolute positioning off-screen (`top: -100px`)
- Visible on focus (`:focus` pseudo-class)
- High contrast styling
- Smooth appearance on focus
- Scroll margin for target elements

## Design Tokens Used

- Colors: `--color-primary`, `--color-neutral-100`, `--color-neutral-900`
- Spacing: `--spacing-25`, `--spacing-50`, `--spacing-75`, `--spacing-100`, `--spacing-125`
- Typography: `--font-size-sm`, `--font-size-md`, `--font-size-lg`
- Border radius: `--radius-md`
- Shadows: `--shadow-md`
- Z-index: `10000` (hard-coded)

## Accessibility Implementation

- Hidden until focused
- High contrast colors
- Proper focus indicators
- Semantic link elements
- Target scroll behavior
