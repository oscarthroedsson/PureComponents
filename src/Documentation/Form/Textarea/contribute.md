# Textarea Component - Contribution Guide

## Code Structure

- **CSS File**: `src/Styles/Form/inputs/textarea.css`

## Implementation Details

- Multi-line input styling
- Resize control variants
- Character count support
- Min-height constraints
- Focus and error states

## Design Tokens Used

- Colors: `--color-primary`, `--color-error`, `--color-warning`, `--color-neutral-*`
- Spacing: `--spacing-25`, `--spacing-50`, `--spacing-75`, `--spacing-100`
- Typography: `--font-size-sm`, `--font-size-md`, `--font-size-lg`
- Border radius: `--radius-none`, `--radius-md`, `--radius-rounded`
- Min-height: `4rem`, `6rem`, `8rem` (hard-coded for sizes)

## Accessibility Implementation

- Label association
- ARIA describedby pattern
- Error state handling
- Character count with aria-live
- Focus indicators
