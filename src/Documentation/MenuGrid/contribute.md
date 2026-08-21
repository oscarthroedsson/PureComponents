# Menu Grid Component - Contribution Guide

## Code Structure

- **CSS File**: `src/Styles/Menu/menu-grid.css`

## Implementation Details

- Fixed positioning (left side, vertically centered)
- Hover-triggered submenus
- Transform animations for submenu appearance
- Flexbox for icon alignment
- Absolute positioning for submenus

## Design Tokens Used

- Colors: `--color-neutral-800`, `--color-neutral-700`, `--color-neutral-100`
- Spacing: `--spacing-25`, `--spacing-50`, `--spacing-100`
- Transitions: `0.3s ease` (hard-coded)
- Z-index: `20` (hard-coded)
- Transform: `translateY(-50%)` for vertical centering

## Accessibility Implementation

- Semantic list structure
- Keyboard navigation (requires JS)
- Focus management (should be added)
- ARIA support (should be added)
