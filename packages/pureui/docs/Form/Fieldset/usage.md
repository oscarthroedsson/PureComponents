# Fieldset

A group of controls that answer one question.

```html
<fieldset class="fieldset">
  <legend>Notifications</legend>
  <div class="field">…</div>
  <div class="field">…</div>
</fieldset>
```

Use it when several controls belong to a single question — a radio group, a
set of related checkboxes, an address block. Not as a visual container: for
that, see `.panel` below.

## The legend

A fieldset **must** have a `<legend>`, and it must be the first child. It is
the group's accessible name, and it is read before each control inside — which
is why it should be short. A long legend is repeated on every option.

A legend needed only for assistive tech is hidden with a visually-hidden
utility, **never** with `display: none` or `visibility: hidden` — both take
the name away.

The legend is deliberately left in its native position, rendered in the
fieldset's block-start border. See `contribute.md` for why.

## Group-level messages

A message for the whole group is a `.field-error` placed as a **direct child**
of the fieldset, with `aria-invalid="true"` on the fieldset while it applies:

```html
<fieldset class="fieldset" aria-invalid="true">
  <legend>Delivery</legend>
  <div class="field">…</div>
  <p class="field-error">Choose a delivery option.</p>
</fieldset>
```

That is the correct ARIA for a group-level error, and it is also the only
trigger there is: `:user-invalid` fires on a control, never on the group around
it, so a group error cannot be reached without setting the attribute.

A `.field-hint` as a direct child describes the whole group the same way.

## `<fieldset disabled>`

A real disabled state. Every control inside picks up `:disabled` with nothing
extra written here. Controls inside the **first** `<legend>` stay enabled —
that is native, and it is how a "turn this section on" checkbox is built.

## Variants

`panel` — the group stops being invisible structure and draws a surface:
background, border, radius, padding. Use it when a box is genuinely wanted, so
the inset reads as "these fields are inside something" instead of as
misalignment.

## Size and shape

`sm` · `md` (default) · `lg` and `sharp` · `smooth` · `rounded` — a fieldset is
a **group**, so a class here retunes every control, label, hint and message
inside it.

## Variables

| Variable | Controls |
|---|---|
| `--fieldset-gap` | between the fields inside |
| `--fieldset-space-before` | above the group, when it follows something |
| `--fieldset-legend-gap` · `-hint-gap` | under the legend |
| `--fieldset-legend-color` · `-weight` · `-font-size` · `-line-height` · `-letter-spacing` | |
| `--fieldset-padding-block` · `-padding-inline` | `.panel` only |
| `--fieldset-surface` · `-border-width` · `-border-color` · `-radius` | `.panel` only |
