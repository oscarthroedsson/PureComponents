# Loading Component - Contribution Guide

## Code Structure

- **CSS File**: `src/Styles/loading.css`

## Implementation Details

- The class is the opt-in, `aria-busy="true"` is the state. Everything is
  nested inside `.loading`, so nothing reaches an element that did not ask.
- The element is dimmed with `opacity`. Its own colours are kept — no fill
  is painted over the content.
- The glow is an `::after` covering the element, moved by
  `background-position` rather than by translating a narrow box. A
  translating box has to be clipped by the host, and putting `overflow` on
  someone else's component while it loads is not this file's to do.
- `border-radius: inherit` on the glow, so it follows whatever corner the
  element already has.
- `@keyframes` sits outside the rule: the name is globally scoped, and a
  parser that meets it inside a style rule drops it silently.

## Design Tokens Used

- `--loading-glow` is a light translucent white, not `currentColor`. The
  adaptive version was tried and dropped: on a light surface it resolves to
  near-black, and a dark band travelling across reads as a smear rather than
  as a glow.
- No library colour tokens are read directly — loading has to work on top
  of anything.

## Accessibility Implementation

- `prefers-reduced-motion: reduce` stops the glow and holds it still.
- The overlay is `pointer-events: none`, so it never eats a click.
- Loading does not disable anything. That stays with the consumer.
