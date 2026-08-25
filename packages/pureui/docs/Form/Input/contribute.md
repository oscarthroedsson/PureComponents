# Input — how it is built

## It is the reference implementation

`textarea.css` and `select.css` mirror this file deliberately. The
`--*-min-block-size` expression in particular:

```css
calc(1lh + (padding-block * 2) + (border-width * 2))
```

is repeated verbatim in each, so the three controls land on the same height
without any of them knowing the number. Change it here and change it there.

## Why type normalisation is in this file

A bare `<input class="input" type="number">` has to look right on a page that
linked this file and nothing else. Put a spinner's removal behind an extra
import and every page has to remember it, and the one that forgets shows a
control the library removed everywhere else. Lining up is not optional;
neither is this.

Each native mark was measured before it was removed. The short version: none
of them can be sized, coloured or shaped, and each sits exactly where a
consumer would want a control of their own. Two that are easy to get wrong:

- The date family's picker indicator is set to `opacity: 0`, **not**
  `display: none` — that would take the hit test with it and leave the picker
  keyboard-only.
- `::-webkit-datetime-edit-fields-wrapper` gets `padding-block: 0` because
  Chromium adds 1px of its own, making every date type 2px taller than a text
  box in the same field. Measured 39px against 37px.

## States come after the variant

`.ghost` and the state rules both sit at (0,2,0), so source order decides. The
states have to win: a ghost field still has to show that it is hovered, wrong
or disabled. Only its resting state is invisible.

## .input-group says nothing about what it wraps

It carries positioning and grows the control's padding on the side that holds
an icon. That is its whole job — no box, no fill, no border, because those
belong to the control. A `.select` or a `.textarea` can sit in it, and
`select.css` adds its own clearance rule for exactly that.

The clearance rules set a **leaf** variable, never a `--form-*` one:

```css
&:has(> .input-icon[data-placement="start"]) > .input {
  --input-padding-inline-start: var(--input-group-clearance);
}
```

Setting the channel here would shadow the group's value and break the cascade.

## The one long selector

The date family already reserves room at the end for its picker indicator.
Grow the padding for an end-slot icon anyway and the indicator moves inward
while the mark stays at the edge — measured 20px apart. The rule that gives
that clearance back is written out in full, at (0,5,1) against (0,4,0), so it
is obvious it fires in one situation only.

## Design tokens

`--font-size-*`, `--line-height-base`, `--radius-*`, `--color-neutral-*`,
`--color-error`, `--transition-fast`.
