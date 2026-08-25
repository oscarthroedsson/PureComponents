# A-tag Component - Contribution Guide

## Code Structure

- **CSS File**: `src/Styles/a-tag.css`

## Implementation Details

- Animated underline on hover
- `::before` pseudo-element for underline
- Transition animation
- Relative positioning

## Design Tokens Used

- Colors: `var(--primary-link)` (referenced, may need definition)
- Spacing: `-2px` (hard-coded for bottom offset)
- Transitions: `0.3s ease-in-out` (hard-coded)

## Accessibility Implementation

- Semantic link element
- Focus indicators (should be added)
- Keyboard navigation (native)
