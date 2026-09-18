# File

A file picker. The browser's own button is styled rather than hidden, so the
control keeps its native behaviour and its keyboard handling.

## Quick start

```html
<input class="pu-file" type="file" name="attachment" />
```

## Classes

| Class | Does |
|---|---|
| `.pu-file` | The key. Requires `<input type="file">`. |
| `file-sm` | 12px. |
| `file-md` | 14px. The default. |
| `file-lg` | 16px. |
| `file-sharp` | Square corners. |
| `file-smooth` | The default corner. |
| `file-rounded` | Fully round. |
| `file-ghost` | No fill, no border. The button closes its own shape. |

## How it is built

The control is one box holding two things: the browser's button at the leading
edge, and the file name after it. The whole box opens the dialog, not only the
button — and a press reads on the button wherever in the box it started.

The file name is drawn slightly smaller and muted, because the button is the
primary half of the control.

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--file-font-size` | the form's scale | Type size. |
| `--file-line-height` | `var(--line-height-base)` | Leading. |
| `--file-surface` | the form's surface | Fill. |
| `--file-name-font-size` | 0.9 of the type size | The file name. |
| `--file-name-color` | `var(--color-text-muted)` | The file name. |
| `--file-padding-block` | the form's padding | Vertical padding, carried by the button. |
| `--file-padding-inline` | the form's padding | Horizontal padding. |
| `--file-padding-inline-end` | `--file-padding-inline` | Trailing side alone. |
| `--file-radius` | the form's radius | Corner. |
| `--file-border-width` | the form's border width | Border. |
| `--file-border-color` | the form's border colour | Border. |
| `--file-min-block-size` | derived | Floor, in case the button's padding is removed. |
| `--file-button-surface` | `var(--color-surface-muted)` | Button fill. |
| `--file-button-color` | `var(--color-text)` | Button text. |
| `--file-button-border-color` | `--file-border-color` | The divider. |
| `--file-button-radius` | derived from the field's | Button's outer corners. |
| `--file-button-radius-end` | `0px` | Button's inner corners. |
| `--file-button-gap` | `--file-padding-inline` | Space between the button and the name. |

```html
<input class="pu-file" type="file"
       style="--file-button-surface: var(--color-primary-surface)" />
```

## States

| State | Look |
|---|---|
| `:hover` | Border and button darken. |
| `:active` | Button darkens further. |
| `:user-invalid` or `aria-invalid="true"` | Border turns to the error colour. |
| `:disabled` | Muted throughout, not-allowed cursor on the box and the button. |

## Icons

`.pu-input-group` works around a file input, but only the **end** slot is
available — the button occupies the leading edge.

```html
<div class="pu-input-group">
  <input class="pu-file" type="file" name="cv" />
  <svg class="input-icon" data-placement="end" aria-hidden="true" viewBox="0 0 24 24">…</svg>
</div>
```

## Accessibility

- Every file input needs a label. See the Label docs.
- Say what is accepted, in text, next to the field — types and size limits. The
  `accept` attribute filters the dialog but is not announced.
- Use `accept` to filter, and validate on the server as well. `accept` is a
  hint, not a constraint.
- `multiple` lets several files be chosen. The name area then shows a count
  rather than a name.
- Do not hide the input and drive it from a styled `<button>`. That is what
  this component exists to avoid — the native control is already keyboard
  accessible and correctly announced.
- Bind hints and errors with `aria-describedby`, and set `aria-invalid="true"`
  when your own validation fails.

## Examples

### Sizes

```html
<input class="pu-file file-sm" type="file" />
<input class="pu-file file-md" type="file" />
<input class="pu-file file-lg" type="file" />
```

### In a field

```html
<div class="pu-field">
  <label class="pu-label" for="cv">Upload your CV</label>
  <input class="pu-file" type="file" id="cv" name="cv"
         accept=".pdf,.doc,.docx" aria-describedby="cv-hint" />
  <p class="pu-field-hint" id="cv-hint">PDF or Word, up to 5 MB.</p>
</div>
```

### Several files

```html
<input class="pu-file" type="file" name="photos" accept="image/*" multiple />
```

### Shape and variant

```html
<input class="pu-file file-sharp" type="file" />
<input class="pu-file file-rounded" type="file" />
<input class="pu-file file-ghost" type="file" />
```

### Disabled

```html
<input class="pu-file" type="file" disabled />
```
