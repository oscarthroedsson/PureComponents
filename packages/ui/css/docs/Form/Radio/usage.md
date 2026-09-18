# Radio

One choice from a set. It replaces the browser's own control so it can follow
the form's colours and scale, and it keeps the native element underneath.

## Quick start

```html
<fieldset class="pu-fieldset">
  <legend>Plan</legend>
  <label class="pu-label">
    <input class="pu-radio" type="radio" name="plan" value="free" />
    Free
  </label>
  <label class="pu-label">
    <input class="pu-radio" type="radio" name="plan" value="pro" />
    Pro
  </label>
</fieldset>
```

Radios that belong together share a `name`. That is what makes them one group
and what makes the browser allow only one.

## Classes

| Class | Does |
|---|---|
| `.pu-radio` | The key. Requires `<input type="radio">`. |
| `radio-sm` | Smaller button and dot. |
| `radio-md` | The default. |
| `radio-lg` | Larger button and dot. |

There are no shape classes. A radio is a circle — that is the only thing
telling it apart from a checkbox — and the corner does not come from the form's
shape either.

## States

| State | Look |
|---|---|
| `:checked` | Fills, and the dot scales in. |
| `:hover` | Border darkens. |
| `:user-invalid` or `aria-invalid="true"` | Border turns to the error colour. |
| `:disabled` | Muted fill, not-allowed cursor. |

A required group with nothing picked turns **every** button in it. The
constraint belongs to the group, and the question is unanswered, not one
option.

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--radio-size` | `1.15em` | Button size. |
| `--radio-border-width` | the form's border width | Border. |
| `--radio-border-color` | the form's border colour | Border. |
| `--radio-surface` | the form's surface | Fill when unchecked. |
| `--radio-checked-surface` | `var(--color-primary)` | Fill when checked. |
| `--radio-checked-border-color` | `var(--color-primary)` | Border when checked. |
| `--radio-dot-color` | `var(--color-primary-foreground)` | The dot. |
| `--radio-dot-size` | `0.42em` | The dot. |

```html
<input class="pu-radio" type="radio" name="plan"
       style="--radio-checked-surface: var(--color-success)" />
```

## Accessibility

- A radio group **must** be in a `<fieldset>` with a `<legend>`. The legend is
  what tells a screen reader what the options answer. Without it the group has
  no name.
- Every radio needs its own label. A wrapping `<label class="pu-label">` is the
  natural form.
- All radios in a group share one `name`. Different names means several
  one-option groups, and the browser will let more than one be picked.
- Put `required` on one radio in the group and the whole group is required.
- Give the group a sensible default where there is one. Where there is not,
  leave them all unchecked rather than guessing.
- Do not use radios for something that can be switched off. That is a
  checkbox — a radio cannot be unpicked once picked.
- The focus ring comes from the library. Arrow keys move between the buttons
  in a group natively.
- The control works in forced-colours mode: system colours replace the token
  palette so a checked radio is still visibly checked.
- Motion is removed under `prefers-reduced-motion`. The dot still appears — it
  simply does not scale in.

## Examples

### Sizes

```html
<label class="pu-label"><input class="pu-radio radio-sm" type="radio" name="s" /> Small</label>
<label class="pu-label"><input class="pu-radio radio-md" type="radio" name="s" /> Medium</label>
<label class="pu-label"><input class="pu-radio radio-lg" type="radio" name="s" /> Large</label>
```

### A required group with an error

```html
<fieldset class="pu-fieldset" aria-invalid="true">
  <legend>Delivery</legend>
  <label class="pu-label">
    <input class="pu-radio" type="radio" name="ship" value="standard" required />
    Standard
  </label>
  <label class="pu-label">
    <input class="pu-radio" type="radio" name="ship" value="express" required />
    Express
  </label>
  <p class="pu-field-error">Choose a delivery option.</p>
</fieldset>
```

### With a default

```html
<fieldset class="pu-fieldset">
  <legend>Theme</legend>
  <label class="pu-label"><input class="pu-radio" type="radio" name="t" value="system" checked /> System</label>
  <label class="pu-label"><input class="pu-radio" type="radio" name="t" value="light" /> Light</label>
  <label class="pu-label"><input class="pu-radio" type="radio" name="t" value="dark" /> Dark</label>
</fieldset>
```

### A disabled option

```html
<label class="pu-label">
  <input class="pu-radio" type="radio" name="plan" value="enterprise" disabled />
  Enterprise (contact sales)
</label>
```
