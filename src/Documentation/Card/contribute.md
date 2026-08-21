# Card — how it is built

`src/Styles/card.css`. One key block, everything nested inside it.

## The three decisions that shape the file

### 1. The card has no padding. The parts do.

If the padding sat on the card, `.card-media` could never reach the edges
without negative margins. So the card is `padding: 0` and each of
`.card-header`, `.card-body`, `.card-footer` carries its own.

That creates one problem, solved in two rules:

```css
& > :is(.card-header, .card-body, .card-footer) {
  padding: var(--card-padding-block) var(--card-padding-inline);
}

& > :is(.card-header, .card-body, .card-footer)
  + :is(.card-header, .card-body, .card-footer) {
  padding-block-start: 0;
}
```

Two padded parts in a row would stack two paddings into the seam and make
it twice the size of the gap to the card's own edge. Dropping the upper one
makes the seam measure exactly one padding — the same as every edge — so
the rhythm is even all the way down without a single border.

`.card-media` is deliberately absent from that list. It has no padding, so
a part that follows it keeps its full top padding, and a part *before* it
keeps its full bottom padding. That is what makes header-above-media and
header-below-media both work off DOM order alone, with no variant class.

### 2. Flex column, not grid, in the default orientation.

Grid with named areas would force a fixed visual order and kill the
header-above-media case. Flex column follows the DOM, and it makes the
footer alignment trivial:

```css
& > .card-body   { flex: 1 1 auto; }
& > .card-footer { margin-block-start: auto; }
```

Together with `block-size: 100%` on the card, a row of cards in a grid with
`align-items: stretch` gets equal heights and level footers however unequal
the text is. This is the mechanic from MDN's Layout cookbook, and it is the
main thing the old `height: fit-content` made impossible.

Outside a stretching parent, `block-size: 100%` resolves against an auto
height and falls back to the content height. Nothing to guard against.

### 3. `.horizontal` is the one place that switches to grid.

Row direction alone would lay the parts out beside each other rather than
beside the media. Named areas keep the media in one column and let the
parts go on stacking in the other:

```css
grid-template-areas:
  "media header"
  "media body"
  "media footer";
```

The media side comes from DOM order, read with `:has()`:

```css
&:has(> :is(.card-header, .card-body, .card-footer) ~ .card-media) { … }
```

Media after the content means media on the trailing side. Same classes, no
second variant. The seam rule from §1 still applies, because the parts are
still adjacent siblings and still stacked in the same column.

Losing free DOM ordering here costs nothing — in horizontal the media is a
full-height column, so the only choice left is which side it is on.

## Naming

`horizontal` matches `nav.css`, `Menu/menu.css`, `radio.css` and
`checkbox.css`, which is why it is not `side`. Column is the default and
needs no class; the modifier names the deviation, same as `nav`.

The shape scale uses `smooth`, not `soft` — the same side of that split as
button, alert, dialog, pagination, progress, meter and nav. See AGENTS.md §8.

## Size is density

`sm`/`md`/`lg` set padding and type scale. They set no width, and neither
does the base — the parent sizes the card, as in every card library worth
copying. `--card-max-width` is there for the exception.

This is why `--card-width-xs` … `--card-width-xl` in `main.css` are now
unreferenced. Five steps against a three-step size scale never lined up.
Removing them is a `main.css` change and has not been made.

## The interactive card

`data-interactive` plus one `<a class="card-link">`:

```css
.card-link::after { content: ""; position: absolute; inset: 0; z-index: 0; }

& :is(a:not(.card-link), button, input, select, textarea, label, summary) {
  position: relative;
  z-index: 1;
}
```

The overlay makes the whole card the link's hit area while keeping exactly
one thing in the tab order. Everything else clickable is lifted above the
overlay so it keeps working.

The focus ring goes on the card, via `&:has(.card-link:focus-visible)`,
because the link's real box is the invisible overlay — a ring on the link
itself would trace the title text, not the thing being activated. The
link's own outline is suppressed for the same reason.

The card's own outline is not clipped by `overflow: hidden`; an element's
outline is painted outside its box, and overflow only clips descendants.

## Why `overflow: hidden` is safe here

It is on the card so `.card-media` respects the radius. It does clip
descendants, which would matter for a focus ring on a control inside — a
ring is 5px wide (3px outline + 2px offset). The smallest padding in the
size scale is 12px, so every control stays clear of the edge. That is a
constraint on `--card-padding-block` / `--card-padding-inline`, and it is
stated in the file header.

## Tokens

Every colour is a token from `main.css` — surface, text, subtitle, border.
No `light-dark()`: alert and menu already use it ahead of the dark-mode pass
and AGENTS.md §8 says not to spread it further.

Consequence: on a dark background the filled card is a light surface, the
same as `dialog.css`, and `outline`/`ghost` lose their text. That resolves
with the `main.css` dark-mode pass, not here.

`prefers-contrast: more` raises the border to `--color-neutral-600` and 2px.
The default border is intentionally below 3:1 — a card is a container, not a
control, so SC 1.4.11 does not apply to it, and every mainstream library
draws it light for the same reason.

## Not built

- No `.card-action` slot in the header (ShadCN's `CardAction`). The footer
  covers actions today.
- No `image-full` / overlay-text variant.
