# Field — how it is built

## .field-hint and .field-error are keys of their own

They are not parts nested inside `.field`. They have to work in two places:
inside a field describing one control, and as a direct child of a `.fieldset`
describing the whole group — which is what a radio group needs, where the
message belongs to the question and not to any one option.

Whoever contains them owns the reveal. `.field` lights its own
`> .field-error`; `.fieldset` lights its own. Neither can reach into the
other's, which is why both rules use the child combinator.

## Why .field reaches .label

A label cannot see whether the control beside it is disabled — they are
siblings, and CSS has no sibling-upwards selector. `.field` is the element
that can see both:

```css
&:has(:disabled) > .label { color: var(--label-disabled-color, …); }
```

The target still carries its key, so nothing without `.label` on it is
touched. This is the only place `.field` reaches into another component.

## The reserved row uses 1lh

`min-block-size: 1lh` — one line of the element's own line-height, not a
guessed pixel value. The reserved row tracks every size class for free.

## Design tokens

`--font-size-*`, `--spacing-*`, `--color-neutral-*`, `--color-error`.
