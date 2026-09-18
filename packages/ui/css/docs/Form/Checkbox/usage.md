# Checkbox

A box you tick. It replaces the browser's own control so it can follow the
form's colours and scale, and it keeps the native element underneath.

## Quick start

```html
<label class="pu-label">
  <input class="pu-checkbox" type="checkbox" name="terms" />
  I accept the terms
</label>
```

The wrapping label makes the whole row clickable and gives the box its name.

## Classes

| Class | Does |
|---|---|
| `.pu-checkbox` | The key. Requires `<input type="checkbox">`. |
| `checkbox-sm` | Smaller box and mark. |
| `checkbox-md` | The default. |
| `checkbox-lg` | Larger box and mark. |
| `checkbox-sharp` | Square corners. |
| `checkbox-smooth` | The default soft corner. |

There is no `checkbox-rounded`. A circular checkbox is a radio, and the shape
is the only thing telling the two apart. The corner is capped at a quarter of
the box, so even a `form-rounded` around it leaves the box square.

## States

| State | Look |
|---|---|
| `:checked` | Fills, and the tick scales in. |
| `:indeterminate` | Fills, and a dash replaces the tick. |
| `:hover` | Border darkens. |
| `:user-invalid` or `aria-invalid="true"` | Border turns to the error colour, checked or not. |
| `:disabled` | Muted fill, dark mark, not-allowed cursor. |

Indeterminate is a different **shape**, never a different shade. Colour is not
allowed to be the only thing separating two states.

Set it from script — there is no attribute for it:

```js
document.querySelector("#all").indeterminate = true;
```

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--checkbox-size` | `1.15em` | Box size. |
| `--checkbox-radius` | the form's radius | Corner, capped at a quarter of the box. |
| `--checkbox-border-width` | the form's border width | Border. |
| `--checkbox-border-color` | the form's border colour | Border. |
| `--checkbox-surface` | the form's surface | Fill when unchecked. |
| `--checkbox-checked-surface` | `var(--color-primary)` | Fill when checked. |
| `--checkbox-checked-border-color` | `var(--color-primary)` | Border when checked. |
| `--checkbox-mark-color` | `var(--color-primary-foreground)` | The tick. |
| `--checkbox-mark-size` | `0.65em` | The tick. |

```html
<input class="pu-checkbox" type="checkbox"
       style="--checkbox-checked-surface: var(--color-success)" />
```

## Accessibility

- Every checkbox needs a label. A wrapping `<label class="pu-label">` is the
  natural form.
- Group related checkboxes in a `<fieldset>` with a `<legend>`.
- Use `required` for a box that must be ticked, and say so in the label.
- Set `aria-invalid="true"` when your own validation fails; `:user-invalid`
  covers native validation.
- The focus ring comes from the library and lands on the box.
- The control works in forced-colours mode: system colours replace the token
  palette so a checked box is still visibly checked.
- Motion is removed under `prefers-reduced-motion`. The tick still appears —
  it simply does not scale in.

## Examples

### Sizes

```html
<label class="pu-label"><input class="pu-checkbox checkbox-sm" type="checkbox" /> Small</label>
<label class="pu-label"><input class="pu-checkbox checkbox-md" type="checkbox" /> Medium</label>
<label class="pu-label"><input class="pu-checkbox checkbox-lg" type="checkbox" /> Large</label>
```

### A group

```html
<fieldset class="pu-fieldset">
  <legend>Notifications</legend>
  <label class="pu-label"><input class="pu-checkbox" type="checkbox" name="n" value="email" /> Email</label>
  <label class="pu-label"><input class="pu-checkbox" type="checkbox" name="n" value="sms" /> SMS</label>
  <label class="pu-label"><input class="pu-checkbox" type="checkbox" name="n" value="push" /> Push</label>
</fieldset>
```

### Select all

```html
<label class="pu-label">
  <input class="pu-checkbox" type="checkbox" id="all" />
  Select all
</label>
```

```js
const all = document.querySelector("#all");
all.indeterminate = someButNotAllChecked;
```

### Required, with an error

```html
<div class="pu-field">
  <label class="pu-label">
    <input class="pu-checkbox" type="checkbox" name="terms" required />
    I accept the terms
  </label>
  <p class="pu-field-error">You must accept the terms to continue.</p>
</div>
```

### Shape

```html
<input class="pu-checkbox checkbox-sharp" type="checkbox" />
<input class="pu-checkbox checkbox-smooth" type="checkbox" />
```
