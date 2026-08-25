# Select — how it is built

## Two layers, and the second is additive

Sections 2–5 are the control every browser gets. Section 6 is what a browser
with `appearance: base-select` **and** a fine pointer gets on top. A browser
that does not know the value drops the whole block; a touch device never
enters it. Either way the control above renders and the select behaves
identically.

Both sides have to opt in — the select **and** `::picker(select)`. Opting in
only the select leaves the button styled and the menu still native, which
looks broken rather than half-done.

## The mark is a background, and that is not a preference

`appearance: none` takes the browser's arrow with it, so the library has to
put one back. It cannot be a pseudo-element: a `<select>` is a replaced
element and `::before` does not paint on it.

The artwork is Lucide's chevron with the viewBox cropped to the path's own
bounds. Lucide's 24×24 is mostly air — the path only spans x 6→18, y 9→15 — so
an uncropped box sizes the padding instead of the mark, and the end padding,
which is derived from `--select-icon-size`, comes out wrong.

### Why the shapes differ in the path, not in stroke-linejoin

A chevron has one join. At that angle `miter` and `round` are
indistinguishable, and `sharp` and `smooth` came out identical — this shipped
once and was caught in review. The tip is curved explicitly instead: a
quadratic Bézier whose control point is the original corner, starting 0.8
units back for `smooth` and 1.1 for `rounded`, which also takes round caps.

Kept small on purpose. Past about 1.5 the tip stops reading as a chevron and
starts reading as a U.

### The one hardcoded colour in the family

The stroke in the fallback SVG is `%2364748b`, not a token. Four techniques
were tested and none work:

| | result |
|---|---|
| `var()` inside the data URI | the image does not parse at all |
| `currentColor` inside it | renders black; an SVG-as-image is its own document |
| `background-blend-mode` with a token-coloured layer | correct on a light surface, **breaks on a dark one** — the whole layer shows as a rectangle |
| `mask` + `background-color` | correct colour, but the mask erases the whole box on a `<select>` |

So the fallback stroke is baked in. It is contained: the entire `url()` is the
variable `--select-icon-image-sharp` / `-smooth` / `-rounded`, so the dark-mode
pass in `main.css` swaps three lines. Section 6 needs nothing — there the same
artwork is a mask and takes `--select-icon-color`.

## Section 6 details

- The picker is anchored to the button **implicitly**. No `anchor-name`, no
  `position-anchor`.
- `--select-menu-radius` is capped by `--select-menu-radius-max`. A menu is
  tall, and the control's 999px at `rounded` would turn it into a stadium —
  the same problem `textarea.css` caps for itself.
- `::picker-icon` needs `align-self: center`, or it baseline-aligns and rides
  above the centre line.
- The animation lives inside `@media (prefers-reduced-motion: no-preference)`
  rather than being written and then undone. With no transition at all the
  popover simply appears, which is what reduced motion asks for.
  `allow-discrete` covers `display` and `overlay`; `@starting-style` gives the
  entry somewhere to come from, without which only the close would animate.
- `option` and `optgroup` are reached through the key, never as bare elements.
  `optgroup` takes `.label`'s colour and weight from the same channel — a
  group name labels the options under it. It cannot carry the key itself,
  because `<optgroup>` is the consumer's element.

## Design tokens

`--font-size-*`, `--line-height-base`, `--radius-*`, `--spacing-25`,
`--shadow-md`, `--color-neutral-*`, `--color-error`, `--transition-fast`.
