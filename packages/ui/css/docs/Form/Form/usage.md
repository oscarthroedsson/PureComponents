# Form

The outer container for a set of controls. It sets the scale, the shape and
the colours that every control inside inherits, so a form is tuned in one
place rather than control by control.

## Quick start

```html
<form class="pu-form form-md">
  <div class="pu-field">
    <label class="pu-label" for="email">Email</label>
    <input class="pu-input" type="email" id="email" name="email" />
  </div>

  <button class="pu-btn btn-md" type="submit">Sign up</button>
</form>
```

## Classes

| Class | Does |
|---|---|
| `.pu-form` | The key. Requires `<form>`. |
| `form-sm` | 12px controls. |
| `form-md` | 14px controls. The default. |
| `form-lg` | 16px controls. |
| `form-sharp` | Square controls. |
| `form-smooth` | The default corner. |
| `form-rounded` | Fully round controls. |

The scale stays tight — 12 / 14 / 16px. A control is read once and typed into,
not read in paragraphs.

## The cascade

Size and shape are inherited variables, so the nearest declaration wins at any
depth. There is no descendant selector anywhere in the family.

```html
<form class="pu-form form-lg">
  <div class="pu-field">                     <!-- inherits lg -->
    <label class="pu-label" for="a">Large</label>
    <input class="pu-input" id="a" />
  </div>

  <fieldset class="pu-fieldset fieldset-sm"> <!-- sm for its subtree -->
    <legend>Group says sm</legend>
    <div class="pu-field">                   <!-- inherits sm -->
      <label class="pu-label" for="b">Small</label>
      <input class="pu-input" id="b" />
    </div>
    <div class="pu-field field-lg">          <!-- lg, and wins -->
      <label class="pu-label" for="c">Large again</label>
      <input class="pu-input" id="c" />
    </div>
  </fieldset>
</form>
```

A group retunes its subtree; a leaf changes only itself. Put `field-lg` on the
field and the label grows with the control. Put `input-lg` on the input and
only the input grows.

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--form-font-size` | `var(--font-size-md)` | Scale for every control below. |
| `--form-gap` | `var(--spacing-100)` | Space between fields. |
| `--form-field-gap` | `var(--spacing-25)` | Space inside a field. |
| `--form-padding-block` | `0.5em` | Control padding, vertical. |
| `--form-padding-inline` | `0.75em` | Control padding, horizontal. |
| `--form-radius` | `var(--radius-md)` | Control corner. |
| `--form-border-width` | `1px` | Control border. |
| `--form-border-color` | `var(--color-border-strong)` | Control border. |
| `--form-surface` | `var(--color-surface-sunken)` | Control fill. |
| `--form-color` | `var(--color-text)` | Control text. |
| `--form-label-color` | `var(--color-text)` | Labels. |
| `--form-hint-color` | `var(--color-text-subtle)` | Hints. |
| `--form-error-color` | `var(--color-error)` | Error messages. |

Set one on the form and every control below follows:

```html
<form class="pu-form form-md" style="--form-surface: transparent">
```

## Layout

The form is a grid with `--form-gap` between its children. Anything more —
columns, a two-up row — is the consumer's own CSS on a wrapper.

```html
<form class="pu-form form-md">
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem">
    <div class="pu-field">…</div>
    <div class="pu-field">…</div>
  </div>
</form>
```

## Accessibility

- Every control needs a label. `<label class="pu-label" for="…">` bound to the
  control's `id`.
- Group related controls in a `<fieldset>` with a `<legend>` — radio buttons
  especially.
- Mark required fields in the markup with `required`, and say so in the label
  text as well.
- Use the right `type` and `autocomplete`. They give the correct keyboard on a
  phone and let a password manager work.
- Errors belong in a `.pu-field-error` inside the field. See the Field docs.
- Do not disable the submit button until the form is valid. It leaves the user
  with no way to trigger validation and no explanation.

## Examples

### Sizes

```html
<form class="pu-form form-sm">…</form>
<form class="pu-form form-md">…</form>
<form class="pu-form form-lg">…</form>
```

### Shape

```html
<form class="pu-form form-md form-sharp">…</form>
<form class="pu-form form-md form-rounded">…</form>
```

### With a fieldset

```html
<form class="pu-form form-md">
  <fieldset class="pu-fieldset">
    <legend>Contact</legend>
    <div class="pu-field">
      <label class="pu-label" for="name">Name</label>
      <input class="pu-input" id="name" name="name" required />
    </div>
    <div class="pu-field">
      <label class="pu-label" for="tel">Phone</label>
      <input class="pu-input" type="tel" id="tel" name="tel" autocomplete="tel" />
    </div>
  </fieldset>
  <button class="pu-btn btn-md" type="submit">Save</button>
</form>
```
