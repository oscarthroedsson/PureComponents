# Textarea

The box when the text runs to more than one line.

```html
<textarea class="textarea" rows="4"></textarea>
<textarea class="textarea lg rounded" rows="6"></textarea>
<textarea class="textarea" data-sizing="content"></textarea>
```

The same box as `.input`, from the same `--form-*` channel, so a textarea and
an input in one form are the same field with a different number of lines. Only
what having more than one line changes is written here.

## Height — three ways, and they do not fight

| | |
|---|---|
| `rows="4"` | the platform's answer, and the default. Nothing here overrides it. |
| `--textarea-min-block-size` | a floor in case `rows` is missing. Two lines, so a bare textarea is visibly not an input. |
| `data-sizing="content"` | the box follows what is typed, growing and shrinking as lines are added. No JavaScript, no scroll-height measuring, no hidden mirror element. |

`field-sizing: content` is recent. Where it is unsupported the declaration is
ignored and the box stays the size `rows` gave it — the field still works, it
just does not grow. That is why it is opt-in and why `rows` stays on the
element.

## Resize

`resize` is an accessibility feature, not decoration. Someone at 200% zoom
needs to be able to make the box bigger, and 1.4.4 does not let us take that
away. This component never sets `resize: none` on its own — it restricts the
axis to `block`, which is a layout decision, and the useful direction stays.

`data-resize="none"` and `data-resize="both"` are there when you need them.
Use `none` only when `data-sizing="content"` makes resizing unnecessary.

## Accessibility

- **Must** be named by a `<label for>`. In a box this large a disappearing
  placeholder is worse than in an input: there is nothing left to say what the
  paragraph being typed is for.
- A read-only textarea is not disabled: it is focusable, selectable and
  submitted. Only the cursor separates them.
- KNOWN, MEASURED FAILURE: `--color-error` is `#f87171`, 2.77:1 on white,
  under the 3:1 of 1.4.11 as an invalid border. Used anyway by decision,
  pending a darker error token. The invalid state is never carried by that
  colour alone.

## Size, shape, variant

`sm` · `md` (default) · `lg` — a **leaf**.

`sharp` · `smooth` (default) · `rounded`. `rounded` is **capped**: a textarea
is tall, and an uncapped 999px turns it into a stadium. The cap is the radius
a one-line control at the same scale resolves to, so a rounded textarea and a
rounded input carry the same corner.

`ghost` — transparent surface and border, states still show.

## Not here

- **Icons.** `.input-group` centres what it holds against a box one line tall;
  against six lines it would float in the middle of the text. A mark on a
  textarea belongs above or below it, which is `.field`'s business.
- **A character counter.** It is content, not styling — and it has to be
  announced politely, which is `aria-live` and markup, not CSS.

## Variables

| Variable | Controls |
|---|---|
| `--textarea-min-block-size` | the floor when `rows` is missing |
| `--textarea-max-block-size` | where `data-sizing="content"` stops growing |
| `--textarea-radius` · `--textarea-radius-max` | the corner, and its cap |
| `--textarea-font-size` · `-line-height` · `-color` · `-surface` | |
| `--textarea-padding-block` · `-padding-inline` | |
| `--textarea-border-width` · `-border-color` · `-placeholder-color` | |
