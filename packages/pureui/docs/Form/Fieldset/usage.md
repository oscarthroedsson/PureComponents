# Fieldset

A group of controls that answer one question, named by a `<legend>`. It is
also the level at which a subtree can be retuned — a fieldset can be a
different size from the form around it.

## Quick start

```html
<fieldset class="pu-fieldset">
  <legend>Delivery</legend>
  <label class="pu-label">
    <input class="pu-radio" type="radio" name="ship" value="standard" />
    Standard
  </label>
  <label class="pu-label">
    <input class="pu-radio" type="radio" name="ship" value="express" />
    Express
  </label>
</fieldset>
```

## Classes

| Class | Does |
|---|---|
| `.pu-fieldset` | The key. Requires `<fieldset>`. |
| `fieldset-sm` | 12px controls for the whole group. |
| `fieldset-md` | 14px. The default. |
| `fieldset-lg` | 16px. |
| `fieldset-sharp` | Square controls in the group. |
| `fieldset-smooth` | The default corner. |
| `fieldset-rounded` | Fully round controls. |
| `fieldset-panel` | Draws a bordered, filled box around the group. |

Size and shape retune the whole subtree, so a group is written once rather
than per control.

## Spacing

A fieldset spaces its children more tightly than a form spaces its fields. A
form holds fields that are each a stack of their own — label, control, message
— so they need room to read as separate. A fieldset usually holds one-line
options, and at the form's spacing those lines drift apart and stop reading as
a set.

Raise `--fieldset-gap` where a fieldset holds full fields rather than options:

```html
<fieldset class="pu-fieldset" style="--fieldset-gap: var(--spacing-100)">
```

A fieldset also takes extra air above it when it follows something, so a group
starts further from the previous field than two fields sit from each other.

## The legend

Smaller than a field label, not larger — small, semibold, muted, quiet enough
to scan past. It names the group; it is not a heading shouting over it.

## A hint for the whole group

```html
<fieldset class="pu-fieldset">
  <legend>Notifications</legend>
  <p class="pu-field-hint">You can change these at any time.</p>
  <label class="pu-label"><input class="pu-checkbox" type="checkbox" /> Email</label>
  <label class="pu-label"><input class="pu-checkbox" type="checkbox" /> Push</label>
</fieldset>
```

The legend gives up most of its own spacing when a hint follows it, so the two
read as one block.

## A group error

```html
<fieldset class="pu-fieldset" aria-invalid="true">
  <legend>Delivery</legend>
  …
  <p class="pu-field-error">Choose a delivery option.</p>
</fieldset>
```

A group message answers for the **question**, so the group has to be marked
invalid itself with `aria-invalid="true"`. A single control going wrong is that
control's business and shows its own message.

There is no native equivalent — `:user-invalid` fires on a control, never on
the fieldset around it — so this one needs the attribute. It is the correct
ARIA for it in any case.

## Panel

```html
<fieldset class="pu-fieldset fieldset-panel">
  <legend>Billing address</legend>
  …
</fieldset>
```

Adds a border, a corner and a fill, with the legend notched into the top edge
and kept clear of the radius.

The panel's fill is one step darker than the form's surface, so the fields
inside keep reading as boxes instead of dissolving into it.

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--fieldset-gap` | `var(--spacing-50)` | Space between children. |
| `--fieldset-legend-gap` | `var(--spacing-25)` | Space under the legend. |
| `--fieldset-legend-hint-gap` | `var(--spacing-1)` | Space under the legend when a hint follows. |
| `--fieldset-space-before` | `var(--spacing-100)` | Extra air above the group. |
| `--fieldset-legend-color` | `var(--color-text-muted)` | Legend. |
| `--fieldset-legend-weight` | `600` | Legend. |
| `--fieldset-legend-font-size` | `max(0.85em, var(--font-size-sm))` | Legend. |
| `--fieldset-legend-line-height` | `1.2` | Legend. |
| `--fieldset-legend-letter-spacing` | `0.02em` | Legend. |
| `--fieldset-padding-block` | `var(--spacing-100)` | Panel padding. |
| `--fieldset-padding-inline` | `var(--spacing-100)` | Panel padding. |
| `--fieldset-surface` | `var(--color-surface-muted)` | Panel fill. |
| `--fieldset-border-width` | the form's border width | Panel border. |
| `--fieldset-border-color` | `var(--color-border)` | Panel border. |
| `--fieldset-radius` | the form's radius | Panel corner. |

## Accessibility

- A `<fieldset>` needs a `<legend>`, and the legend must be its **first
  child**. Without one the group has no accessible name.
- Radio buttons that belong together must be in a fieldset. The legend is what
  tells a screen reader what the options are answering.
- The legend text is the question. "Delivery", not "Choose one".
- A group error needs `aria-invalid="true"` on the fieldset.
- Do not use a fieldset purely for the box. `fieldset-panel` is for a group
  that genuinely is one; a decorative box is a `<div>`.

## Examples

### Sizes

```html
<fieldset class="pu-fieldset fieldset-sm">…</fieldset>
<fieldset class="pu-fieldset fieldset-md">…</fieldset>
<fieldset class="pu-fieldset fieldset-lg">…</fieldset>
```

### A small group inside a large form

```html
<form class="pu-form form-lg">
  <div class="pu-field">
    <label class="pu-label" for="name">Name</label>
    <input class="pu-input" id="name" />
  </div>

  <fieldset class="pu-fieldset fieldset-sm">
    <legend>Preferences</legend>
    <label class="pu-label"><input class="pu-checkbox" type="checkbox" /> Email</label>
    <label class="pu-label"><input class="pu-checkbox" type="checkbox" /> SMS</label>
  </fieldset>
</form>
```

### A panel holding full fields

```html
<fieldset class="pu-fieldset fieldset-panel" style="--fieldset-gap: var(--spacing-100)">
  <legend>Billing address</legend>
  <div class="pu-field">
    <label class="pu-label" for="street">Street</label>
    <input class="pu-input" id="street" autocomplete="street-address" />
  </div>
  <div class="pu-field">
    <label class="pu-label" for="post">Postcode</label>
    <input class="pu-input" id="post" autocomplete="postal-code" />
  </div>
</fieldset>
```
