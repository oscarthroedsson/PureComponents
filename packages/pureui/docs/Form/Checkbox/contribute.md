# Checkbox — how it is built

## appearance: none, and then everything is ours

`appearance: base` is not supported for checkboxes anywhere yet. What works
today is `appearance: none` plus a pseudo-element — and it paints on both
checkbox and radio, which was not always true. The old advice that a replaced
input takes no pseudo-elements stopped being correct when `appearance: none`
stopped making it replaced.

## The tick is a clip-path, not a character

`clip-path: polygon(…)` on `::before`, filled with `--checkbox-mark-color`. Not
a `✓` glyph, which would depend on the font; not an SVG in a `data:` URI,
whose fill would be a hardcoded colour. The polygon takes the token directly.

It scales from `0` to `1` on `:checked`, so the tick grows in rather than
appearing. Under `prefers-reduced-motion` that transition goes.

## The radius cap

```css
--checkbox-radius-max: calc(var(--checkbox-size) / 4);
border-radius: min(var(--checkbox-radius), var(--checkbox-radius-max));
```

Without it, `rounded` (999px) would make the box a circle — which is a radio.
Two components that mean different things must not be able to look identical.
`textarea.css` and `select.css` cap for the same reason.

## place-content: center on a grid

`display: inline-grid` with `place-content: center` centres the tick with no
positioning and no magic numbers. `vertical-align: text-bottom` is what sits
it correctly on the line beside its label; `flex: none` stops it being
squashed when the label wraps.

## Sized in em

`--checkbox-size: 1.15em` — slightly larger than the text it sits beside, and
it follows that text through every size class without the box knowing which
one applied.

## Design tokens

`--color-neutral-*`, `--color-primary`, `--radius-*`, `--transition-fast`,
and `--form-*` from the channel.
