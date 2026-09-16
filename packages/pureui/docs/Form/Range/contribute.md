# Range — contributing

## File

`packages/pureui/styles/Form/range.css`

## Key

```css
.pu-range:where(input[type="range"])
```

The type is part of the requirement. Only a real range gives the drag, the
arrow keys, Home and End, and the value announcement.

## Everything derives from one variable

```css
--range-track-size: 1rem;

--range-track-padding-block: calc(var(--range-track-size) * 0.25);
--range-track-padding-inline: calc(var(--range-track-size) * 0.5);
--range-fill-size: calc(var(--range-track-size) - 2 * var(--range-track-padding-block));
--range-thumb-size: calc(var(--range-track-size) * 0.75);
```

So the three size classes move one property each and the whole control scales
in proportion.

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

`range-smooth` is the only shape that sets them differently — `--radius-sm`
outside, `--radius-xs` inside — because a small fill inside a small groove
needs the tighter corner to stay concentric.

## Invalid comes before `:disabled`

Same specificity, so source order decides, and a disabled control must not
read as wrong.

A range has no border to turn red, so the thumb carries it — the part that
answers for the value.

`:user-invalid` rarely fires here, because a range always has a value, so
`[aria-invalid]` is the path that matters. Colour is never the only signal: the
`.pu-field-error` appears and `aria-invalid` is what assistive technology
hears.

## Where it departs from the family

- **It does not read the channel.** Every other control in the Form family
  takes its colours, border and radius from `--form-*` with a fallback. This
  file uses library tokens directly, so a `.pu-form.form-rounded` or a custom
  `--form-surface` does not reach it.
- **No `:hover` state.** Every other control darkens its border on hover.
- **No `prefers-reduced-motion` block.** There are no transitions in the file,
  so nothing needs removing — but there are also no transitions on the thumb,
  which every other control has on its colours.
- **`range-primary`** is an emphasis word that no other component uses.
  `secondary`, `tertiary`, `ghost` and `outline` are the shared vocabulary.

## Order inside the block

1. Variables
2. Base
3. Vendor pseudo-elements, one rule each
4. Size
5. Colour variant
6. Shape
7. States
