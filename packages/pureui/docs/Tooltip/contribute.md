# Tooltip Component - Contribution Guide

## Code Structure

- **CSS File**: `src/Styles/tooltip.css`

## Implementation Details

- Two implementation approaches: `::before` pseudo-element (data-tip) and `[role="tooltip"]` element
- Absolute positioning for tooltip placement
- Opacity transitions for smooth appearance
- Position variants for top, right, left, bottom
- Keyboard accessibility via `:focus-visible`

## Design Tokens Used

- Colors: Hard-coded dark background (#333) and white text
- Spacing: `--spacing-25`, `--spacing-50`
- Typography: `--font-size-sm`, `--font-size-xs`
- Border radius: `0.25rem` (hard-coded)
- Z-index: `99` (hard-coded)

## Accessibility Implementation

- ARIA role and describedby pattern
- Keyboard accessibility with focus-visible
- Screen reader support via aria-describedby
- Pointer events disabled to prevent interaction issues
