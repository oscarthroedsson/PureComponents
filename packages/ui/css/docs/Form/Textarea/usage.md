# Textarea

A multi-line text field. It matches `.pu-input` in colour, border and scale, so
the two sit on the same grid in a form.

## Quick start

```html
<textarea class="pu-textarea" name="message" rows="4"></textarea>
```

## Classes

| Class | Does |
|---|---|
| `.pu-textarea` | The key. Requires `<textarea>`. |
| `textarea-sm` | 12px. |
| `textarea-md` | 14px. The default. |
| `textarea-lg` | 16px. |
| `textarea-sharp` | Square corners. |
| `textarea-smooth` | The default corner. |
| `textarea-rounded` | Rounder, capped so the box still reads as a field. |
| `textarea-ghost` | No fill, no border, until it is hovered or focused. |

`textarea-rounded` is capped at half the height of a single-line control at
the same scale — the same corner the `.pu-input` beside it resolves its pill
to. A rounded textarea and a rounded input then carry the same corner, and the
form reads as one set of controls instead of two.

## Height

`rows` decides the height. Without it the box is two lines, so a bare textarea
is visibly not an input.

### Growing with the content

```html
<textarea class="pu-textarea" data-sizing="content"
          style="--textarea-max-block-size: 20rem"></textarea>
```

The box follows what is typed. `rows` is ignored while this is on, two lines is
the empty height, and `--textarea-max-block-size` is where it stops. Set a
maximum or it keeps growing.

Browsers without support keep the `rows` height.

## Resizing

Vertical only by default. The browser allows both, and dragging a textarea
wider than the form pushes the layout apart.

| Attribute | Does |
|---|---|
| `data-resize="none"` | Not resizable. |
| `data-resize="both"` | Both directions. |

A disabled textarea cannot be resized.

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--textarea-font-size` | the form's scale | Type size. |
| `--textarea-padding-block` | the form's padding | Vertical padding. |
| `--textarea-padding-inline` | the form's padding | Horizontal padding. |
| `--textarea-radius` | the form's radius | Corner, capped. |
| `--textarea-radius-max` | derived | The cap itself. Raise it if a shape wants more. |
| `--textarea-border-width` | the form's border width | Border. |
| `--textarea-border-color` | the form's border colour | Border. |
| `--textarea-surface` | the form's surface | Fill. |
| `--textarea-color` | the form's text colour | Text. |
| `--textarea-placeholder-color` | `var(--color-text-subtle)` | Placeholder. |
| `--textarea-line-height` | `var(--line-height-base)` | Leading. Raise it for prose. |
| `--textarea-min-block-size` | two lines | The empty height. |
| `--textarea-max-block-size` | `none` | Cap when growing with content. |

```html
<textarea class="pu-textarea" style="--textarea-line-height: 1.7"></textarea>
```

## States

| State | Look |
|---|---|
| `:hover` | Border darkens. Not while disabled or read-only. |
| `:user-invalid` or `aria-invalid="true"` | Border turns to the error colour. |
| `:read-only` | Normal field, default cursor. Not greyed. |
| `:disabled` | Muted fill, muted text, not resizable. |

A ghost field still shows that it is hovered, wrong or disabled. Only its
resting state is invisible.

## Accessibility

- Every textarea needs a label. See the Label docs.
- A placeholder is not a label.
- Bind hints and errors with `aria-describedby`, and set `aria-invalid="true"`
  when your own validation fails.
- Keep the resize handle available. Being able to make a text box bigger is
  what 1.4.4 is about; the vertical direction is the useful one and it is kept
  by default.
- If you show a character count, put it in a live region so it is announced.
- The focus ring comes from the library.

## Examples

### Sizes

```html
<textarea class="pu-textarea textarea-sm" rows="3"></textarea>
<textarea class="pu-textarea textarea-md" rows="3"></textarea>
<textarea class="pu-textarea textarea-lg" rows="3"></textarea>
```

### In a field

```html
<div class="pu-field">
  <label class="pu-label" for="msg">Message</label>
  <textarea class="pu-textarea" id="msg" name="message" rows="5"
            aria-describedby="msg-hint"></textarea>
  <p class="pu-field-hint" id="msg-hint">Tell us what happened.</p>
</div>
```

### Growing with the content

```html
<textarea class="pu-textarea" data-sizing="content" name="note"
          style="--textarea-max-block-size: 24rem"></textarea>
```

### Fixed size

```html
<textarea class="pu-textarea" data-resize="none" rows="6"></textarea>
```

### Shape and variant

```html
<textarea class="pu-textarea textarea-sharp" rows="3"></textarea>
<textarea class="pu-textarea textarea-rounded" rows="3"></textarea>
<textarea class="pu-textarea textarea-ghost" rows="3"></textarea>
```

### For prose

```html
<textarea class="pu-textarea" rows="10" style="--textarea-line-height: 1.7"></textarea>
```
