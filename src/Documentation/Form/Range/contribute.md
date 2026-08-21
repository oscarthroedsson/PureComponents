# Range Input Component - Contribution Guide

## Code Structure

- **CSS File**: `src/Styles/Form/inputs/range.css`

## Implementation Details

- Cross-browser range input styling
- Webkit, Firefox, and IE/Edge pseudo-element styling
- Custom thumb and track styling
- Progress fill for Firefox
- Multiple border radius variants

## Design Tokens Used

- Colors: `--color-primary`, `--color-neutral-*`
- Spacing: `--spacing-25`, `--spacing-50`, `--spacing-75`, `--spacing-100`, `--spacing-15`
- Border radius: `--radius-sharp`, `--radius-smooth`, `--radius-rounded`
- Typography: `--font-size-sm`, `--font-size-md` (for range-value)

## Accessibility Implementation

- ARIA value attributes
- Label association
- Focus indicators
- Screen reader support
- Value announcement
