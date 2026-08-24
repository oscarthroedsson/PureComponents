# Select

Choosing one of a set you already know.

```html
<select class="select">
  <option value="">Choose a country</option>
  <option value="se">Sweden</option>
</select>
```

The box comes from the `--form-*` channel, same as `.input`, so a select and
an input in one form are the same field. See [Form](../Form/usage.md).

## The empty option

The first option carries `value=""` so the field has no answer until someone
gives it one, and `required` can catch the case where they did not. A
placeholder option with a real value is a silent default the user never chose.

A placeholder option is **not** a label. The `<label>` still has to be there.

## The menu

With `appearance: none` the menu is not in the page at all — the browser hands
it to the operating system, which draws it in its own layer. That is why a
select on macOS opens *over* itself: Apple's convention for a pop-up button
puts the current value under the pointer. No CSS reaches that menu.

Where the browser supports `appearance: base-select`, the library takes the
menu over: it becomes an element in the page, anchored under the button, with
our fill, corner, shadow and options, and it animates open and closed.

That layer is behind `@media (hover: hover) and (pointer: fine)` on purpose. A
menu drawn in the page replaces the platform's own, and on a touch screen the
iOS wheel and the Android list are the better controls — they are the ones
people already know how to operate. A mouse gets the styled menu; a finger
keeps the native picker. Same select, same value, same markup either way.

### Optional markup for that layer

```html
<select class="select">
  <button><selectedcontent></selectedcontent></button>
  <option value="">Choose</option>
</select>
```

`<selectedcontent>` holds a live clone of the chosen option, so an option
carrying an icon can show that icon in the closed control. Without it the
browser generates its own button and everything still works.

A browser without base appearance ignores a `<button>` inside a `<select>`
entirely and strips an `<option>` to its text, so the same markup is safe to
ship everywhere. The library ships no HTML — this is yours to write.

## Not a dropdown

`multiple`, and `size` with anything but `1`, is an open list box. It does not
open, so it carries no mark and no one-line height floor — the rows decide the
height. Base appearance does not support either attribute yet, so those
controls always use the native path.

Multi-select is hard to operate: it needs a modifier key on a mouse and is
easy to break on a touch screen. A group of checkboxes is usually better.

## Icons

Use `.input-group`, the same as [Input](../Input/usage.md). The chevron owns
the end of the box, so an icon goes in the start slot.

## Accessibility

- **Must** be named by a `<label for>`.
- An `<optgroup>` label is not selectable and is announced as a group name.
  Never use one as a placeholder row.
- No focusable element may go inside a base-appearance `<select>`.
- `appearance: none` removes the control from Windows High Contrast Mode.
- `::picker-icon` and `::checkmark` are **not** in the accessibility tree.

## Size, shape

`sm` · `md` (default) · `lg` — a **leaf**.

`sharp` · `smooth` (default) · `rounded` — the shape class also cuts the
chevron's own corners, and `rounded` moves it further in from the edge.

## Variables

| Variable | Controls |
|---|---|
| `--select-icon-size` · `-color` · `-inset` · `-gap` | the chevron |
| `--select-icon-image` | its shape. Swap it for artwork of your own. |
| `--select-menu-surface` · `-border-color` · `-radius` · `-radius-max` | the menu |
| `--select-menu-padding` · `-shadow` · `-offset` | |
| `--select-menu-duration` · `-travel` | the open and the close |
| `--select-option-padding-block` · `-padding-inline` · `-radius` | |
| `--select-option-highlight` | hovered, and the one already chosen |

Menu variables are read only where the styled menu applies; elsewhere they are
ignored.
