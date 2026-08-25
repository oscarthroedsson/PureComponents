# File

Choosing a file to upload.

```html
<input class="file" type="file">
```

The box comes from the `--form-*` channel, same as `.input` and `.select`, so a
file field and a text field in one form are the same field with different
contents. See [Form](../Form/usage.md).

## What you can style, and what the browser keeps

A file field is two things drawn in one box: a button, and a line of text the
browser writes beside it. The split is not negotiable, so it is worth knowing
before you design around it.

**Yours**

- The box — border, surface, radius, padding, size, every state.
- The button, completely, through `::file-selector-button`.
- The text's **size and colour**. It inherits both from the input; the button
  does not. That is the whole of your control over it — and it does mean
  `color: transparent` hides the text while the button survives, if you want a
  field that is only a button.

**The browser's**

- The wording. `Choose file`, `Browse…`, `Välj fil` — set by the browser and
  the operating system's language. `content` does not apply to
  `::file-selector-button`, so it cannot be changed, and it does not follow
  your page's `lang`.
- The `no file chosen` text, which is not separately selectable.
- The file name once one is picked, including how it is shortened — the
  browser ellipsises the middle so the extension stays readable.

Because the button's words are not yours, **the `<label>` is doing more work
here than anywhere else in the family.** Everything the user needs to know —
what this file is for, which formats, how many — has to be in the label and the
hint. There is no room in the control to put it.

## The file name is drawn quieter than the button

It is set at 0.9 of the field's size and in `--color-neutral-600`, because in
both readings — empty or filled — it is the secondary half of the control: the
button is what you operate, the name is what it reports back.

Note that this applies to **both** readings, because they are the same text
node. There is no `::placeholder` here and no selector that separates empty
from filled, so "no file chosen" and `contract.pdf` are always styled together.

It is quieted only to `--color-neutral-600`, not to the `--color-neutral-500`
that `.input` gives its placeholder. A placeholder is decoration a consumer is
told not to rely on; a file name is content, and owes 1.4.3 the full 4.5:1. On
the field's surface, 500 measures 4.34:1 and fails; 600 measures 6.92:1.

Both are variables, so if the name matters more in your context than it does
in ours, raise them:

```html
<input class="file" type="file"
       style="--file-name-color: var(--color-neutral-900);
              --file-name-font-size: var(--file-font-size)">
```

## One file or many

```html
<input class="file" type="file" accept="image/*" multiple>
```

`multiple` is the whole difference. Pick more than one and the browser writes
`3 files` instead of a name, and switches its own button text to the plural.
Both happen on their own; neither is reachable from CSS.

| Attribute | What it does |
|---|---|
| `multiple` | more than one file in one field |
| `accept="image/*,.pdf"` | filters the file dialog |
| `capture="environment"` | opens the camera instead, on a phone |
| `webkitdirectory` | picks a whole folder. Non-standard, but implemented everywhere |

`accept` is a convenience, not validation. It is trivially bypassed and the
server has to check what arrives regardless.

## The one state CSS can see

Nothing in CSS can read a file's name or count. That needs JavaScript, and this
library ships none.

There is exactly one exception: an empty `required` file field is `:invalid`
and a filled one is `:valid`. That is the only route to "has a file been
chosen".

```css
.file:valid { /* something was picked */ }
```

The library does not paint it. There is no green anywhere else here, and a file
field is not the place to invent one — but the hook is native and yours to use.

Drag and drop is a related gap worth naming: a file input **is** already a drop
target, natively, and files can be dropped on it today. What is missing is any
selector for "a file is hovering over me", so the state cannot be drawn.
Progress bars, previews, a list of chosen names, removing one — all JavaScript,
all outside PureUI.

## Icons

Same `.input-group` and same `.input-icon` as [Input](../Input/usage.md) — but
the **end slot only**.

```html
<div class="input-group">
  <input class="file" type="file">
  <svg class="input-icon" data-placement="end" aria-hidden="true">…</svg>
</div>
```

The button is drawn hard against the start edge, so a mark placed there lands
on top of it and covers the browser's own label. There is no padding that can
move it — the button is a pseudo-element at the beginning of the box, not
content that flows. Nothing can detect a start-placement icon and warn you; it
will simply overlap.

This is the mirror of `.select`, where the chevron owns the end and the icon
gets the start.

**There is no icon inside the button, and that is deliberate.** It is the
natural place for one, and a background image on the pseudo-element does
render — but the colour has to be baked into the image, because `mask` erases
the button's whole surface here (the same thing `select.css` records for a
`<select>`). A baked colour stays at full strength on a disabled field. The
end-slot icon is a real element drawing in `currentColor`, so it greys with
everything else.

## `readonly` does not apply

A file input matches `:read-only` whether or not the attribute is present,
because it is never editable in the sense the pseudo-class means. So it is
useless as a condition, and there is deliberately no `:read-only` branch in
this stylesheet. Locking a chosen file is `disabled`.

## Accessibility

- **Must** be named by a `<label for>`. Stronger than the usual rule — see
  above.
- The whole field is one tab stop. The button is not separately focusable.
- The focus ring comes from `main.css`, on the field.
- The divider between button and text carries the border's colour, not a
  surface difference, so it clears 3:1 on its own.
- `capture="environment"` changes what the control is, not how it looks. Say so
  in the label if you use it.

## Size, shape, variant

`sm` · `md` (default) · `lg` — a **leaf**, so the class resizes only this
control. Put it on `.form`, `.fieldset` or `.field` to move a whole group.

`sharp` · `smooth` (default) · `rounded`. The button's leading corners take the
box's inner radius, so a rounded field ends in a half-circle that meets the
border rather than cutting across it.

`ghost` removes the **field's** box — surface and border — the same thing it
means on `.input`. The button keeps its own and closes its shape, since there
is no longer an edge for its flat side to sit against. For a file field inside
a surface that already reads as a box; never standalone, where a borderless
field says nothing about where to click.

## Variables

| Variable | Controls |
|---|---|
| `--file-font-size` · `-line-height` · `-surface` | the box |
| `--file-name-font-size` | the file name, drawn smaller than the button |
| `--file-name-color` | and quieter. A plain token, not the `--form-color` channel — otherwise the name would be quiet outside a form and full-strength inside one |
| `--file-padding-block` · `-padding-inline` | |
| `--file-padding-inline-end` | the end edge alone, so `.input-group` can grow it for an icon. No start counterpart — the button occupies that edge |
| `--file-radius` · `-border-width` · `-border-color` | |
| `--file-min-block-size` | a floor, not the height. The button sets the height |
| `--file-button-surface` · `-color` | the button |
| `--file-button-border-color` | the divider. Follows the field's border unless you say otherwise |
| `--file-button-radius` | the box's inner radius, floored at 0 |
| `--file-button-radius-end` | `0`, so the button sits flat against the text. `ghost` raises it |
| `--file-button-gap` | between the button and the file name |

```html
<input class="file" type="file"
       style="--file-button-surface: var(--color-primary);
              --file-button-color: var(--color-neutral-100)">
```
