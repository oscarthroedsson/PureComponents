# Menu Component - Contribution Guide

## Code Structure

- **CSS File**: `src/Styles/Menu/menu.css`

## Implementation Details

- Semantic HTML with `<ul>` and `<li>` elements
- ARIA roles for menu semantics
- Flexbox for horizontal layout
- Details element for submenus
- Icon rotation animations
- Disabled state handling

## Design Tokens Used

- Colors: `--color-neutral-900`, `--color-neutral-800`, `--color-neutral-600`, `--color-neutral-500`
- Spacing: `--spacing-15`, `--spacing-25`, `--spacing-50`, `--spacing-150`
- Typography: `14px` (hard-coded), `12px`, `16px`
- Border radius: `--radius-sm`, `--radius-md`
- Min-width: `225px`, `200px` (hard-coded)

## Accessibility Implementation

- ARIA menu roles
- Keyboard navigation documentation
- Focus indicators
- Disabled state with proper ARIA
- Submenu expansion states
