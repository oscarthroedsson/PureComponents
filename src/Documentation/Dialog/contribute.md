# Dialog Component - Contribution Guide

## Code Structure

- **CSS File**: `src/Styles/dialog.css`

## Implementation Details

- Supports native `<dialog>` element with `::backdrop` pseudo-element
- Custom dialog implementation using `role="dialog"`
- Flexbox layout for header, body, footer structure
- Fixed positioning for custom dialogs
- Backdrop styling with blur effect

## Design Tokens Used

- Colors: `--color-neutral-50`, `--color-neutral-900`, `--color-neutral-100`
- Spacing: `--spacing-75`, `--spacing-100`, `--spacing-125`, `--spacing-150`, `--spacing-200`
- Typography: `--font-size-lg`, `--font-size-xl`, `--font-size-2xl`
- Border radius: `--radius-lg`, `--radius-md`, `--radius-none`
- Shadows: `--shadow-lg`
- Z-index: `--z-index-modal`

## Accessibility Implementation

- Native `<dialog>` provides built-in accessibility
- Custom dialogs require `role="dialog"` and `aria-modal="true"`
- Focus trap requires JavaScript (not in CSS)
- Focus return requires JavaScript (not in CSS)
- ESC key support is native for `<dialog>` element

## Testing Requirements

- Visual rendering of all size variants
- Backdrop rendering and interaction
- Focus trap functionality (with JS)
- Keyboard navigation
- Screen reader announcements
- Browser compatibility (native vs custom)
