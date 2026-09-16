# Field

One control with its label, its hint and its error message. The field is what
holds them together and what reserves room for an error so the page does not
jump when one appears.

## Quick start

```html
<div class="pu-field">
  <label class="pu-label" for="email">Email</label>
  <input class="pu-input" type="email" id="email" name="email" />
  <p class="pu-field-error">Enter a valid email address.</p>
</div>
```

## Classes

| Class | Does |
|---|---|
| `.pu-field` | The key. |
| `.pu-field-hint` | Helper text under the control. |
| `.pu-field-error` | The error message. Hidden until the control is invalid. |
| `field-sm` | 12px control. |
| `field-md` | 14px control. The default. |
| `field-lg` | 16px control. |
| `field-sharp` | Square control. |
| `field-smooth` | The default corner. |
| `field-rounded` | Fully round control. |

The size on the field retunes the whole field — the label grows with the
control. Put the size on the control instead and only the control changes.

## Order matters

Two orders are supported:

```
label → control → error
label → control → hint → error
```

The error has to come immediately after the control, or after a hint that
comes immediately after the control.

## The error appears on its own

`.pu-field-error` is in the layout but invisible until the control is
actually invalid. Nothing needs toggling.

```html
<div class="pu-field">
  <label class="pu-label" for="age">Age</label>
  <input class="pu-input" type="number" id="age" min="18" required />
  <p class="pu-field-error">You must be 18 or over.</p>
</div>
```

It becomes visible on `:user-invalid` — after the user has interacted, not
while they are still typing the first character — and on
`aria-invalid="true"` when your own validation sets it.

Because the message is always in the layout, the field does not change height
when the error shows and nothing below it moves.

## Reserving room without a message element

For a field that has no `.pu-field-error` but should still not shift when one
is added by script:

```html
<div class="pu-field" style="--field-error-reserve: 1.5rem">
```

A field that has a message element reserves the row through that element
instead, so the two can never both apply.

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--field-font-size` | the form's scale | Type size. |
| `--field-gap` | the form's field gap | Space between label, control and message. |
| `--field-hint-color` | the form's hint colour | Hint text. |
| `--field-error-color` | the form's error colour | Error text. |
| `--field-message-font-size` | `max(0.85em, var(--font-size-sm))` | Hint and error size. |
| `--field-message-line-height` | `1.2` | Hint and error leading. |
| `--field-error-reserve` | `0px` | Room held for an error when there is no message element. |

The message size has a readability floor: it never drops below 12px, but it
still grows with the field at `field-lg`.

## Accessibility

- The label's `for` must match the control's `id`. A wrapping label without
  `for` works too, but the explicit binding is more robust.
- Bind a hint to the control with `aria-describedby`:

  ```html
  <input class="pu-input" id="pw" aria-describedby="pw-hint" />
  <p class="pu-field-hint" id="pw-hint">At least 12 characters.</p>
  ```

- Bind an error the same way, and add `aria-invalid="true"` when your own
  validation fails. `:user-invalid` handles native validation on its own but
  is not announced.
- The error text says what to do, not only that something is wrong. "Enter a
  valid email address", not "Invalid".
- A disabled control dims its label automatically.
- Colour is not the only signal — the message is text.

## Examples

### With a hint

```html
<div class="pu-field">
  <label class="pu-label" for="pw">Password</label>
  <input class="pu-input" type="password" id="pw" aria-describedby="pw-hint" />
  <p class="pu-field-hint" id="pw-hint">At least 12 characters.</p>
</div>
```

### Hint and error together

```html
<div class="pu-field">
  <label class="pu-label" for="user">Username</label>
  <input class="pu-input" id="user" required aria-describedby="user-hint" />
  <p class="pu-field-hint" id="user-hint">Letters and numbers only.</p>
  <p class="pu-field-error">Choose a username.</p>
</div>
```

### Sizes

```html
<div class="pu-field field-sm">…</div>
<div class="pu-field field-md">…</div>
<div class="pu-field field-lg">…</div>
```

### A checkbox field

```html
<div class="pu-field">
  <label class="pu-label">
    <input class="pu-checkbox" type="checkbox" name="terms" />
    I accept the terms
  </label>
</div>
```
