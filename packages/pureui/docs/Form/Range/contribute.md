# Range — contributing

## File

`packages/pureui/styles/Form/range.css`

## Key

```css
.pu-range:where(input[type="range"])
```

The type is part of the requirement. Only a real range gives the drag, the
arrow keys, Home and End, and the value announcement.

## Everything derives from the type size

```css
--range-font-size: var(--form-font-size, var(--font-size-md));
--range-track-size: 1.15em;

--range-track-padding-block: calc(var(--range-track-size) * 0.25);
--range-track-padding-inline: calc(var(--range-track-size) * 0.5);
--range-fill-size: calc(var(--range-track-size) - 2 * var(--range-track-padding-block) - 2 * var(--range-border-width));
--range-thumb-size: calc(var(--range-track-size) * 0.75);
```

`font: inherit` and `font-size: var(--range-font-size)` on the key make the
`em` mean the form's type, so a size class on the `.pu-form` reaches the
slider. `1.15em` is the checkbox's size, so a range and a checkbox in the same
form share a height. The size classes move `--range-font-size` only.

## `--range-value` cannot be computed here

The fill is a `linear-gradient` with a hard stop:

```css
background: linear-gradient(
  to right,
  var(--range-fill) var(--range-value),
  transparent var(--range-value)
);
```

CSS has no access to the element's value as a number, so the percentage has to
come from the consumer's script. The default of `50%` means an unwired slider
still looks like a slider rather than an empty track.

The thumb's position is the browser's and is always correct.

`to right` is physical. The fill does not flip in a right-to-left document.

## The vendor pseudo-elements never share a rule

A selector list holding one unknown pseudo-element is dropped whole, so a
`-webkit-` and a `-moz-` selector written together apply in **neither** engine.
One rule each, always:

```
::-webkit-slider-runnable-track   ::-moz-range-track
::-webkit-slider-thumb            ::-moz-range-thumb
```

The two track rules are identical and the two thumb rules nearly so — the
WebKit thumb also needs `appearance: none` and a `margin-block-start` to centre
itself on the track, which Firefox does on its own.

## The track is the element, the fill is the pseudo-element

`background-color: var(--range-track-color)` on the key is the groove. The
runnable track carries the gradient inside it, inset by the key's padding.
That is why there are two radius variables: `--range-track-radius` for the
outer groove and `--range-fill-radius` for the bar inside it.

Both default to `--radius-rounded`. There are no shape classes: a range is
always a capsule, and `--form-radius` is deliberately not read, so a
`.pu-form.form-sharp` leaves it round.

## Invalid comes before `:disabled`

Same specificity, so source order decides, and a disabled control must not
read as wrong.

The border and the thumb both turn red; the thumb is the part that answers for
the value. Hover skips an invalid range so the error colour does not flicker
back to primary under the pointer.

`:user-invalid` rarely fires here, because a range always has a value, so
`[aria-invalid]` is the path that matters. Colour is never the only signal: the
`.pu-field-error` appears and `aria-invalid` is what assistive technology
hears.

## Disabled keeps the value visible

The track goes to `--color-surface-muted`, which is the same step as
`--color-border`. Fill and thumb use `--color-border-strong` instead, or the
disabled slider would be one flat grey bar with no value in it.

## No motion

There are no transitions in the file, so there is no reduced-motion block.

## Order inside the block

1. Variables — the channel first
2. Base
3. Vendor pseudo-elements, one rule each
4. Size
5. States — hover, invalid, disabled, forced colours
