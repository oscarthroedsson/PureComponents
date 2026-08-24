# Label — how it is built

## Why it has a key at all

This styling used to live in `field.css` as `.field > label`, which reached a
bare element carrying no key of ours. That is the one thing AGENTS.md §4.1
exists to prevent: a consumer who links our stylesheet and already has
`<label>` in their markup would find it restyled without asking.

The consequence is that `.label` has to be written out in the markup. A
`<label>` inside a `.field` with no class on it gets nothing — and that is
correct.

## It sets no font-size

Nothing here declares one. The label inherits it, which is what lets a
`.form.lg` or a `.field.sm` retune the whole group without this file knowing
that either of them exists. Adding a size class here would break that.

## The disabled state is not here

A label cannot see the control it names — they are siblings. So the disabled
case is written by whoever owns both, which is `.field`. See `field.css`.
`--label-disabled-color` is declared here so `.field` has something to set,
and so a consumer can change it in one place.

## It brings no layout

No margin, no display, no alignment. The container decides where it sits,
which is why one file can serve a field, a fieldset, a checkbox row and a
table cell.

## Design tokens

`--color-neutral-900`, `--color-neutral-500`, and `--form-label-color` from
the channel.
