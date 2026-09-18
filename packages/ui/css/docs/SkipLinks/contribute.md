# Skip link — contributing

## File

`packages/ui/css/styles/skip-links.css`

## Structure

Two keys and one bare rule.

`.pu-skip-link:where(a[href])` is the link itself — base, `:focus`, `:hover`,
and three sizes. The element requirement is real: the whole component is a
jump to an anchor, so an element that cannot navigate is measurably worse.

`.pu-skip-links` is the wrapper for more than one link. It re-styles the
focused state to `position: relative`, so focused links stay in flow and
stack instead of landing on top of each other at `top: 0`.

`:target { scroll-margin-top: 2rem }` sits at top level. It applies to the
destination, not to the link, which is why it cannot live inside either key.

## Hiding without leaving the tab order

The link is moved to `top: -100px` rather than hidden. `display: none` and
`visibility: hidden` both take an element out of the tab order, which would
remove the only thing this component exists to provide. `:focus` — not
`:focus-visible` — brings it back to `top: 0`, because it must appear for
every keyboard route to it.

## Sizes

Each size sets `font-size` and `padding` directly rather than moving a
variable. There are no component variables in this file.

## Constraints

- `z-index: 10000` is a raw value, above `--z-index-tooltip`. The link has to
  clear a sticky header it knows nothing about.
- `border-radius: 0 0 var(--radius-md) 0` rounds only the corner that is
  visible when the link sits in the top-left of the viewport.
- Colours are `--color-primary` and `--color-primary-foreground`, with
  `--color-primary-hover` on hover.
