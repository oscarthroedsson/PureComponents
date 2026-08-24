# Field

One control and everything that explains it.

```html
<div class="field">
  <label class="label" for="email">Email</label>
  <p class="field-hint" id="email-hint">We only use it for receipts.</p>
  <input class="input" type="email" id="email"
         aria-describedby="email-hint email-error" aria-invalid="true">
  <p class="field-error" id="email-error">Enter a valid email address.</p>
</div>
```

Every part is optional. A `.field` with nothing but a label and a control has
to look finished, and it does.

## Order is yours

DOM order decides. `label → hint → control → message` is what the demos show,
but hint-before-control and message-above-control are both defensible — GOV.UK
puts both above, because a message below the field can sit off screen at high
magnification. This file sets no `order`, so you choose.

## The reserved message row

`.field-error` always occupies one line, whether or not it is showing. That is
what stops the page jumping when a message appears. It is hidden with
`visibility`, never `display` or `opacity`:

| | reserves the row | out of the a11y tree |
|---|---|---|
| `display: none` | no | yes |
| `opacity: 0` | yes | **no** — the error is announced while the field is valid |
| `visibility: hidden` | yes | yes |

The row is revealed by the control's own state, matched two ways:

- `:user-invalid` — native constraint validation. Fires only after the user
  has interacted, which is why it is used and `:invalid` is not; `:invalid`
  paints every empty required field red on page load.
- `[aria-invalid="true"]` — JS validation. Zod, Yup and React Hook Form set no
  native constraints at all, so this is not a fallback, it is the main path.

## Accessibility

- The control **must** be named by a real `<label for>`.
- Hint and message **must** be pointed at with `aria-describedby`, listing both
  ids where both exist. CSS cannot do this — it is markup you own.
- While `.field-error` is hidden it is not in the accessibility tree, and CSS
  revealing it fires no announcement. The error reaches assistive tech through
  `aria-invalid` on the control. If you need the message spoken, render it
  into an already-visible `aria-live` region instead.
- Colour is never the only signal: the message appearing is the signal, and
  `aria-invalid` is the programmatic one.

## Size, shape, variables

`sm` · `md` (default) · `lg` and `sharp` · `smooth` · `rounded` — a field is a
**group**, so a class here retunes the control, label, hint and message
together.

| Variable | Controls |
|---|---|
| `--field-gap` | between label, control and message |
| `--field-message-font-size` | hint and message; floored at `--font-size-sm` |
| `--field-message-line-height` | tight — these are one-line labels |
| `--field-error-row` | the height one message row occupies |
| `--field-error-reserve` | `0` by default. Set it to `var(--field-error-row)` to give fields *without* a message the same height as fields with one. |
