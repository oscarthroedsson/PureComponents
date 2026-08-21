# Del Component - Contribution Guide

## Code Structure

- **CSS File**: `src/Styles/del.css`

## Implementation Details

- Background color for deleted text
- Text decoration (strikethrough)
- Padding and border radius
- Font size adjustment

## Design Tokens Used

- Colors: `hsl(0, 100%, 50%, 0.2)` (hard-coded red tint), `var(--primary-500)` (referenced)
- Spacing: `2px 4px` (hard-coded padding)
- Border radius: `0.25rem` (hard-coded)
- Typography: `0.9em` (hard-coded)
- Text decoration: `2px` thickness (hard-coded)

## Accessibility Implementation

- Semantic del element support
- Visual indication of deleted content
- Screen reader support (native del element)
