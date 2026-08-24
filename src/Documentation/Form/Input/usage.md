# Input

The single-line control the rest of the form family is measured against.

```html
<input class="input" type="text">
<input class="input lg rounded" type="email" autocomplete="email">
<input class="input ghost" type="search">
```

Every measurement comes from the `--form-*` channel, so an input, a select and
a textarea standing in one form are the same field with different contents.
See [Form](../Form/usage.md) for how the channel works.

## Types work out of the box

The library normalises the native marks certain types draw inside the box —
the number spinner, the search cancel button, the date picker indicator — so a
bare `<input class="input" type="number">` looks right on a page that linked
this file and nothing else. There is no extra import per type.

`type` is not decoration. It sets the mobile keyboard, the validation and the
autofill behaviour: `type="email"` and `type="tel"` are accessibility
features, not hints.

## Icons

An `<input>` is a void element and cannot hold children, so anything inside
the box has to be a sibling laid over it. That is `.input-group`:

```html
<div class="input-group">
  <svg class="input-icon" data-placement="start" aria-hidden="true">…</svg>
  <input class="input" type="search">
</div>
```

Required **only** when there is an icon. A bare `.input` needs no group.

The library draws no icons — you bring the mark, the group gives it a place to
stand and moves the text out from under it. Decorative or interactive is
decided by the element, not by a second class:

- `<svg class="input-icon">` — decoration. `pointer-events: none`, so a click
  anywhere in the box focuses the field.
- `<button class="input-icon" type="button">` — a control. Keeps its own
  clicks, focus ring and tab stop. `type="button"` is **not optional**: a
  `<button>` inside a `<form>` submits by default.

`data-placement="start | end"` — logical, so the icon lands correctly in an
RTL page without a second rule.

## States

`:hover` · `:disabled` · `:read-only` · `:user-invalid` / `[aria-invalid]` ·
`:focus-visible`

A read-only field is **not** disabled: it takes focus, its text can be
selected and copied, and it is submitted with the form. Only the cursor
separates them — greying it made it look like the one thing it is not.

## Accessibility

- **Must** be named by a real `<label for>`.
- Fields collecting the user's own information **must** carry `autocomplete`
  (WCAG 2.1 1.3.5, Level AA).
- A decorative icon **must** carry `aria-hidden="true"`. An interactive one
  **must** be a real `<button>` with an accessible name.
- `.ghost` removes the resting border. It is for a field inside a surface that
  already reads as a box — a toolbar, a table cell — never for a standalone
  field, where it leaves nothing to say a control is there.

## Size, shape, variant

`sm` · `md` (default) · `lg` — a **leaf**, so a size class here changes only
this control. To resize a whole form or group, put the class on `.form`,
`.fieldset` or `.field`.

`sharp` · `smooth` (default) · `rounded` · variant `ghost`

## Variables

| Variable | Controls |
|---|---|
| `--input-font-size` · `--input-line-height` · `--input-color` | the text |
| `--input-surface` · `--input-placeholder-color` | |
| `--input-padding-block` · `--input-padding-inline` | |
| `--input-padding-inline-start` · `--input-padding-inline-end` | per side, what `.input-group` grows |
| `--input-radius` · `--input-border-width` · `--input-border-color` | |
| `--input-min-block-size` | one line plus padding plus border — the number the family lines up against |
| `--input-group-icon-size` · `-gap` · `-color` · `-inset` | the slot |
