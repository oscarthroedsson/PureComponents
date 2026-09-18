# Card — contributing

## File

`packages/ui/css/styles/card.css`

## Key

`.pu-card` is a plain class. `<article>` is often right and `<div>` is often
right, and picking between them is a document-structure decision the
component cannot make.

## The key has no padding

```css
padding: 0;
```

The parts carry it. That is what lets `.card-media` reach the edges without
fighting anything, and it is the single decision the rest of the file is
built on.

```css
& > :is(.card-header, .card-body, .card-footer) {
  padding: var(--card-padding-block) var(--card-padding-inline);
}
```

## The seam rule

```css
& > :is(.card-header, .card-body, .card-footer)
  + :is(.card-header, .card-body, .card-footer) {
  padding-block-start: 0;
}
```

Two padded parts in a row would stack two paddings into the seam and make it
twice the size of the card's own edge padding. Dropping the upper one leaves
the seam measuring exactly one padding, the same as every edge.

`.card-media` is deliberately absent from the list, so a part that follows the
media keeps its full top padding.

## Equal heights

```css
block-size: 100%;
```

Cards live in rows. Filling the height lets a grid hand every card in a row
the same one, which is what makes the footers line up. On its own, with
nothing to fill, this resolves to the content height.

`.card-body` takes `flex: 1 1 auto` and `.card-footer` takes
`margin-block-start: auto`, so the footer sits at the bottom whatever the body
did. That is the whole reason a row of cards with unequal text still lines up.

## `overflow: hidden`

So the media respects the radius. Safe for focus rings because the padded
parts keep every control clear of the edge.

## Horizontal is a grid, not a row

```css
&.card-horizontal { display: grid; }
```

`flex-direction: row` alone would put the parts beside each other instead of
beside the media. Named grid areas keep the media in one column and let the
parts go on stacking in the other.

The trailing-media case is a `:has()` rule:

```css
&:has(> :is(.card-header, .card-body, .card-footer) ~ .card-media)
```

Media after the content in the DOM swaps the column order. Same markup, no
extra class.

The footer's `margin-block-start: auto` is reset to `0` inside the grid — the
grid row already puts it last.

## `.card-title` is a size, not a level

```css
.card-title {
  font-size: var(--card-title-size);
}
```

The class sets the size, the element sets the outline level. Kept apart on
purpose so a card can sit at any depth of a page without the component
deciding whether it is an `<h2>` or an `<h4>`.

## `data-interactive`

The stretched hit area is a pseudo-element on `.card-action`:

```css
.card-action::after { content: ""; position: absolute; inset: 0; z-index: 0; }
```

One link or button keeps the accessible name and stays the only primary action
in the tab order. Anything else clickable has to sit above that overlay to stay
reachable with a mouse, which is what the `z-index: 1` rule on nested controls
does. The primary action is excluded from that rule so its pseudo-element keeps
the card, rather than the action itself, as its containing block.

`position: relative` on the key is what the overlay resolves against, and it
is declared inside `[data-interactive]` rather than in the base — a card that
is not interactive should not establish a containing block it has no use for.

## Order inside the block

1. Variables
2. Base
3. Parts
4. Size
5. Orientation
6. Shape
7. Emphasis
8. States
9. Media queries

## Media aspect ratio

`--card-media-aspect-ratio` defaults to `auto`, which is the image's own
shape, and `object-fit` never bites. Set the variable and every image in the
row crops to the same box instead.

`.card-media` takes `flex: none` so a media band on top does not stretch to
fill the card's height.

## Variables

Fifteen, covering surface, text, border, radius, shadow, padding, type and
media. Sizes move `--card-padding-*`, `--card-font-size` and
`--card-title-size`; shapes move `--card-radius`; emphasis moves
`--card-surface` and `--card-border-*`. No rule in the file writes those
properties directly outside the base.

## Media queries

- `prefers-reduced-motion` — `transition-duration: 0ms`.
- `prefers-contrast: more` — border to 2px and to `--color-border-strong`.
- `forced-colors: active` — Canvas, CanvasText, CanvasText border.
