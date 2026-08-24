# Radio — how it is built

## It is checkbox.css with two differences

The structure is deliberately identical: `appearance: none`, `inline-grid`
with `place-content: center`, a `::before` that scales from `0` to `1` on
`:checked`, sized in `em`. Read `checkbox.css` first — the reasoning there
applies here.

The two differences:

1. **`border-radius: var(--radius-full)`, and no shape classes.** A radio is
   round, always. Offering `sharp` would let it look like a checkbox, and the
   two mean different things. `checkbox.css` caps its radius for the mirror of
   this reason.
2. **The mark is a dot, not a tick.** A circle needs no `clip-path` — just
   `border-radius: var(--radius-full)` on the pseudo-element.

## Why ::checkmark is not used

The native `::checkmark` pseudo-element does not paint for radios yet. When it
does, this file can drop its `::before` — but not before, because a control
that shows no state on one engine is worse than one that draws its own
everywhere.

## The group is not this file's business

Exclusivity comes from the `name` attribute, arrow-key navigation from the
browser, and the group's frame and message from `fieldset.css`. This file
styles one control and knows nothing about its neighbours.

## Sized in em

`--radio-size: 1.15em`, `--radio-dot-size: 0.42em` — the same ratio checkbox
uses, so a radio and a checkbox in one form are visually the same weight.

## Design tokens

`--color-neutral-*`, `--color-primary`, `--radius-full`,
`--transition-fast`, and `--form-*` from the channel.
