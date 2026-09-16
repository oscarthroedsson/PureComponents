# Dialog

A modal panel. It is a native `<dialog>`, so the browser handles the top
layer, the backdrop, focus trapping, Escape to close, and making the rest of
the page inert.

## Quick start

```html
<dialog class="pu-dialog dialog-md" aria-labelledby="confirm-title">
  <div class="dialog-header">
    <h2 id="confirm-title">Delete report?</h2>
    <button class="pu-btn btn-sm btn-ghost" command="close" commandfor="confirm"
            aria-label="Close">×</button>
  </div>
  <div class="dialog-body">
    <p>This cannot be undone.</p>
  </div>
  <div class="dialog-footer">
    <button class="pu-btn btn-md btn-tertiary" command="close" commandfor="confirm">Cancel</button>
    <button class="pu-btn btn-md" data-intent="destructive">Delete</button>
  </div>
</dialog>
```

Open it with `showModal()`, or with a `command` button:

```html
<button class="pu-btn btn-md" command="show-modal" commandfor="confirm">Delete report</button>
<dialog id="confirm" class="pu-dialog dialog-md">…</dialog>
```

Use `showModal()`, not `show()`. Only the modal form gets the backdrop, the
focus trap and the inert page.

## Parts

| Class | Does |
|---|---|
| `.pu-dialog` | The key. Requires `<dialog>`. |
| `.dialog-header` | Title row. Holds the close button at the trailing edge. |
| `.dialog-body` | The content. Scrolls when it is too tall. |
| `.dialog-footer` | Actions, aligned to the trailing edge. |

All three are optional. The body is the one that grows and scrolls; the header
and footer stay put.

## Classes

| Class | Does |
|---|---|
| `dialog-sm` | 400px, tighter padding, smaller type. |
| `dialog-md` | 600px. The default. |
| `dialog-lg` | 800px, roomier padding, larger type. |
| `dialog-xl` | 1200px. |
| `dialog-fullscreen` | Fills the viewport, no corner. |
| `dialog-sharp` | Square corners. |
| `dialog-smooth` | The same radius `dialog-md` already gives. |
| `dialog-rounded` | Larger radius. |

## Attributes

| Attribute | Does |
|---|---|
| `data-placement="right"` | Slides in from the right, full height. |
| `data-placement="left"` | Slides in from the left, full height. |
| `data-placement="top"` | Slides down from the top, full width. |
| `data-placement="bottom"` | Slides up from the bottom, full width. |
| `data-height="auto"` | Height follows the content, capped at 90dvh. |
| `data-height="full"` | Fills the viewport height. |

Without a placement the dialog is centred and scales in. With one it becomes a
drawer: it slides, takes the full edge, and rounds only the corners that show.

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--dialog-max-width` | `600px` | Width cap. The dialog is `min(90vw, this)`. |
| `--dialog-radius` | `var(--radius-md)` | Corner. |
| `--dialog-backdrop` | `rgb(0 0 0 / 50%)` | The scrim. |
| `--dialog-enter-transform` | `scale(0.96)` | Where it comes from. |
| `--dialog-exit-transform` | `scale(1.025)` | Where it goes. |
| `--dialog-enter-duration` | `280ms` | Opening. |
| `--dialog-exit-duration` | `180ms` | Closing. |
| `--dialog-enter-ease` | a spring curve | Opening. |
| `--dialog-exit-ease` | an ease-in curve | Closing. |

```html
<dialog class="pu-dialog dialog-md" style="--dialog-max-width: 32rem">
```

## Accessibility

- Name the dialog. `aria-labelledby` pointing at the heading in the header, or
  `aria-label` when there is no visible title.
- Do not add `role="dialog"` or `aria-modal` to a native `<dialog>` opened with
  `showModal()`. The browser provides both.
- The close button needs an accessible name — `aria-label="Close"` when it is
  an ×.
- Escape closes a modal dialog natively. Do not prevent it.
- Focus moves into the dialog on open and returns to the opener on close. The
  browser does this; nothing here interferes.
- Pick the heading level that fits the page. The size classes set the title's
  size, not its level.
- The body sets `overscroll-behavior: contain`, so scrolling to the end of the
  dialog does not start scrolling the page behind it.
- Motion is removed under `prefers-reduced-motion`.

## The non-native form

For a dialog that cannot be a `<dialog>` — a nested overlay, or a case where
the top layer is a problem — the key also matches an element carrying
`role="dialog"`:

```html
<div class="pu-dialog dialog-md" role="dialog" aria-modal="true"
     aria-labelledby="t" aria-hidden="false">
  <div class="dialog-backdrop"></div>
  <div class="dialog-header"><h2 id="t">Title</h2></div>
  <div class="dialog-body">…</div>
</div>
```

Toggle it with `aria-hidden="false"` or the `dialog-open` class. This form
gives you the layout and the backdrop and nothing else — focus trapping,
Escape, and making the page inert are all yours to implement. Prefer the
native element.

## Examples

### Sizes

```html
<dialog class="pu-dialog dialog-sm">…</dialog>
<dialog class="pu-dialog dialog-md">…</dialog>
<dialog class="pu-dialog dialog-lg">…</dialog>
<dialog class="pu-dialog dialog-xl">…</dialog>
```

### A drawer

```html
<dialog class="pu-dialog dialog-md" data-placement="right" aria-label="Filters">
  <div class="dialog-header"><h2>Filters</h2></div>
  <div class="dialog-body">…</div>
</dialog>
```

### A sheet from the bottom

```html
<dialog class="pu-dialog dialog-md" data-placement="bottom" data-height="auto">
  <div class="dialog-body">…</div>
</dialog>
```

### Fullscreen

```html
<dialog class="pu-dialog dialog-fullscreen">…</dialog>
```

### A form that returns a value

```html
<dialog id="rename" class="pu-dialog dialog-sm" aria-labelledby="rename-title">
  <form method="dialog">
    <div class="dialog-header"><h2 id="rename-title">Rename</h2></div>
    <div class="dialog-body">
      <input class="pu-input input-md" name="title" aria-label="New name" />
    </div>
    <div class="dialog-footer">
      <button class="pu-btn btn-md btn-tertiary" value="cancel">Cancel</button>
      <button class="pu-btn btn-md" value="save">Save</button>
    </div>
  </form>
</dialog>
```

`method="dialog"` closes the dialog on submit and puts the pressed button's
value in `returnValue`.
