# Navigation Component - Contribution Guide

## Code Structure

- **CSS File**: `src/Styles/nav.css`

## Implementation Details

- Semantic HTML with `<nav>` and `<ul>` elements
- Flexbox for horizontal/vertical layouts
- Submenu support with `aria-expanded`
- Mobile-responsive with toggle button
- Current page highlighting with `aria-current`

## Design Tokens Used

- Colors: `--color-primary`, `--color-neutral-*`
- Spacing: `--spacing-50`, `--spacing-75`, `--spacing-100`
- Typography: `--font-size-sm`, `--font-size-md`, `--font-size-lg`
- Border radius: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-none`
- Shadows: `--shadow-md`
- Z-index: `--z-index-header`

## Accessibility Implementation

- Semantic HTML structure
- ARIA labels for navigation context
- Current page indication
- Keyboard navigation support
- Focus indicators meet WCAG standards
