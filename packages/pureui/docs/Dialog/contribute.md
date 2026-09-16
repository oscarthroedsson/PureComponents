# Dialog — contributing

## File

`packages/pureui/styles/dialog.css`

Two keys and one top-level `@starting-style`:

```
.pu-dialog:where(dialog)              the native element
@starting-style { … ::backdrop }      the backdrop's entry state
.pu-dialog[role="dialog"]:not(dialog) the non-native fallback
```

## Key

```css
.pu-dialog:where(dialog)
```

`<dialog>` gives the top layer, the backdrop pseudo-element, focus trapping,
Escape, and page inertness. None of that can be reproduced in CSS, which makes
this one of the clearest cases for requiring the element.

## Two transitions, not one

The base declares the **exit** transition and the exit transform; `:open`
declares the **enter** ones. That is what lets opening and closing run at
different speeds and different curves — 280ms on a spring in, 180ms on an
ease-in out.

`display` and `overlay` are in both transition lists with `allow-discrete`.
Without them the dialog is removed from the top layer the instant it closes
and the exit never plays.

`@starting-style` inside `:open` gives the entry something to animate from.

## The backdrop's entry state is at top level

```css
@starting-style {
  dialog.pu-dialog:open::backdrop { … }
}
```

Outside the key block, and written with the element qualified. A nested
`@starting-style` for `::backdrop` does not reliably apply, so the backdrop
would appear at full opacity on the first frame while the dialog faded in
behind it.

This is the one selector in the file that qualifies the class with an element.
It is inside `@starting-style` and sets no properties that a consumer would
override, so it does not affect the specificity budget for the component.

## Placement turns the dialog into a drawer

Each `data-placement` block does four things: repoints both transforms to a
translate, lengthens both durations, pins the margins to one edge, and rounds
only the corners that show.

```css
&[data-placement="right"] {
  --dialog-enter-transform: translateX(100%);
  --dialog-exit-transform: translateX(100%);
  margin-inline-start: auto;
  margin-inline-end: 0;
  border-radius: var(--dialog-radius) 0 0 var(--dialog-radius);
}
```

Because the transforms are variables, the base's transition list never
changes. A drawer slides instead of scaling without a single rule being
rewritten.

## The body is the only part that scrolls

```css
.dialog-body {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
}
```

`min-height: 0` is what lets a flex item shrink below its content and actually
scroll. `flex-shrink: 0` on the header and footer keeps them out of it.

`overscroll-behavior: contain` stops a scroll that reaches the end of the body
from continuing on the page behind the dialog.

## Sizes reach into the parts

Unlike most components in the library, `dialog-sm` and `dialog-lg` write
padding and font sizes into `.dialog-header`, `.dialog-body` and
`.dialog-footer` rather than moving variables. `dialog-md` and `dialog-xl`
change little or nothing beyond the width and radius, because the part
defaults already are the `md` values.

## `--dialog-backdrop`

A scrim darkens whatever is behind it, so it is black in both schemes. It is a
variable rather than a literal so a consumer can replace it — the one
allowance the colour rules make for a translucent overlay.

## Heading sizes, not heading levels

```css
.dialog-header {
  h1, h2, h3, h4, h5, h6 { margin: 0; font-size: var(--font-size-xl); }
}
```

Whatever level the page needs, the title looks the same. The size classes
change the size and never the level.

## `[command="close"]`

```css
[command="close"] { margin-inline-start: auto; }
```

Pushes the close button to the trailing edge of the header without the header
needing `justify-content: space-between`, which would spread a title and a
subtitle apart too.

## The non-native form

```css
.pu-dialog[role="dialog"]:not(dialog)
```

For a dialog that cannot be a `<dialog>`. It provides the fixed overlay, the
centring and the `.dialog-backdrop` element, and nothing else — focus
trapping, Escape and inertness are the consumer's to implement.

`:not(dialog)` keeps it from double-applying to a native dialog that also
carries the role.

Both `[aria-hidden="false"]` and `.dialog-open` open it, so it works whether
the consumer's script drives the attribute or the class.

## Order inside the block

1. Variables
2. Base and its exit transition
3. `:open` and its enter transition
4. Backdrop, closed and open
5. Placement
6. Size
7. Height
8. Shape
9. Parts — header, body, footer
10. Reduced motion

## Variables

| Variable | Default |
|---|---|
| `--dialog-max-width` | `600px` |
| `--dialog-radius` | `var(--radius-md)` |
| `--dialog-backdrop` | `rgb(0 0 0 / 50%)` |
| `--dialog-enter-transform` | `scale(0.96)` |
| `--dialog-exit-transform` | `scale(1.025)` |
| `--dialog-enter-duration` | `280ms` |
| `--dialog-exit-duration` | `180ms` |
| `--dialog-enter-ease` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--dialog-exit-ease` | `cubic-bezier(0.4, 0, 1, 1)` |

The durations are bare values rather than `--transition-*` tokens, which pair
a duration and an easing in one shorthand and cannot be combined with an
easing of their own.
