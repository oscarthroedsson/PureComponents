# Fieldset — how it is built

## Two native behaviours, both load-bearing

**`min-inline-size: 0`** — a fieldset has `min-width: min-content` built into
the UA sheet. Left alone it refuses to shrink below its widest child and
bursts out of any grid or flex parent. It only shows at narrow viewports,
which is why it is usually found late.

**`<legend>`** is rendered in the fieldset's block-start border, not as an
ordinary child. It does not take part in the grid, so `gap` puts no space
under it — that space comes from the legend's own margin.

## Why the legend is left in the border

`float: left` plus `width: 100%` would drop it out of the border and make it
an ordinary block — Drupal's Claro does exactly that. But Safari ignores a
legend's float once the fieldset is flex or grid, and ours is grid. Two
engines would lay the group out differently.

The spacing under the legend is solved with its own margin and line-height
instead, which every engine agrees on.

## The group error uses [aria-invalid], not :has()

```css
&[aria-invalid="true"] > .field-error { visibility: visible; }
```

`:has(:is(:user-invalid, [aria-invalid="true"]))` was wrong here and shipped
for exactly one commit: it matches **any** descendant, so one bad postcode
inside a field lit the group's message too.

A group message answers for the *question*; a child going wrong is the child's
business. There is no native equivalent — `:user-invalid` fires on a control,
never on the fieldset around it — so a group error needs the consumer to set
`aria-invalid`, which is the correct ARIA for it in any case.

**Do not add `:user-invalid` here.** It has been tried.

## The child combinator is not optional

`> .field-error` — a fieldset and a field can both own a message, and each must
light only its own. Drop the `>` and a group would light every message beneath
it.

## .panel moves the legend clear of the corner

Inside `.panel` the legend takes `padding-inline` and a negative
`margin-inline-start`, so the notch it cuts in the border never collides with
the radius.

## Design tokens

`--spacing-*`, `--font-size-*`, `--radius-*`, `--color-neutral-*`.
