# Alert

A message that stays on the page — an error to fix, a warning to read, a
confirmation that should not vanish. Something that appears, says its piece
and leaves on its own is a toast.

## Quick start

```html
<div class="pu-alert alert-md" data-intent="error" role="alert">
  <div class="alert-content">
    <p class="alert-title">Something went wrong</p>
    <p class="alert-message">We could not save your changes. Please try again.</p>
  </div>
</div>
```

## Parts

| Class | Does |
|---|---|
| `.pu-alert` | The key. |
| `.alert-icon` | Optional leading icon. Takes the intent colour. |
| `.alert-content` | Wraps the title and message. |
| `.alert-title` | One line of heading text. Not an `<h1>`–`<h6>`. |
| `.alert-message` | The body. |
| `.alert-actions` | Buttons, at the trailing edge. |

The layout is a grid that reshapes itself from what is present. Icon alone,
actions alone, both, or neither — no extra class needed.

## Classes

| Class | Does |
|---|---|
| `alert-sm` | Smaller type. |
| `alert-md` | The default. |
| `alert-lg` | Larger type. |
| `alert-sharp` | Square corners. |
| `alert-smooth` | The same radius `alert-md` already gives. |
| `alert-rounded` | The large corner — `--radius-rounded`, capped at `--radius-lg`. |
| `alert-outline` | Transparent fill, border in the intent colour. |
| `alert-filled` | Solid intent fill. |

## Attributes

| Attribute | Does |
|---|---|
| `data-intent="info"` | Blue. The default. |
| `data-intent="success"` | Green. |
| `data-intent="warning"` | Yellow. |
| `data-intent="error"` | Red. |
| `data-state="closing"` | Plays the exit and stops pointer events. |

The intent tints the fill, the border and the leading edge. It does not
announce anything — that is what `role` is for.

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--alert-accent` | `var(--color-info)` | The intent colour everything is derived from. |
| `--alert-accent-foreground` | `var(--color-info-foreground)` | Label colour on a filled alert. |
| `--alert-surface` | `var(--color-surface-sunken)` | What the accent is mixed into. |
| `--alert-text` | `var(--color-text)` | Body text. |
| `--alert-muted` | `var(--color-text-muted)` | Secondary text. |
| `--alert-bg` | 12% accent over the surface | Fill. |
| `--alert-border` | 48% accent over the surface | Border. |
| `--alert-radius` | `var(--radius-md)` | Corner. |

Setting `--alert-accent` alone re-tints the fill, the border and the icon
together.

```html
<div class="pu-alert alert-md" role="status" style="--alert-accent: var(--color-accent)">
```

## Accessibility

- **`role="alert"`** for something that must interrupt — an error, a failure.
  It is announced immediately.
- **`role="status"`** for everything else — a confirmation, a notice. It waits
  for a pause.
  Use one or the other. Both imply the right `aria-live` value already.
- `.alert-title` is deliberately **not** a heading. An alert is a live region:
  the whole box is announced, so a heading adds nothing and costs a phantom
  entry in the document outline. The stylesheet refuses to style `h1`–`h6`
  here.
  A page-level error summary is a real section and does want a heading — but
  that is a different component from a notice.
- An icon is decoration. Mark it `aria-hidden="true"`; the intent is already
  carried by the text.
- Never rely on the colour alone. The message says what happened.
- A dismiss button is a `.pu-btn` inside `.alert-actions`, with an
  `aria-label`.
- Motion is removed under `prefers-reduced-motion`, borders thicken under
  `prefers-contrast: more`, and the whole component switches to system
  colours under `forced-colors`.

## Examples

### Intents

```html
<div class="pu-alert alert-md" data-intent="success" role="status">
  <div class="alert-content">
    <p class="alert-title">Changes saved</p>
  </div>
</div>
```

### With an icon

```html
<div class="pu-alert alert-md" data-intent="warning" role="alert">
  <div class="alert-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24">…</svg>
  </div>
  <div class="alert-content">
    <p class="alert-title">Review required</p>
    <p class="alert-message">Check your details before continuing.</p>
  </div>
</div>
```

### With actions

```html
<div class="pu-alert alert-md" data-intent="error" role="alert">
  <div class="alert-content">
    <p class="alert-title">Upload failed</p>
  </div>
  <div class="alert-actions">
    <button class="pu-btn btn-sm btn-ghost">Retry</button>
    <button class="pu-btn btn-sm btn-ghost" aria-label="Dismiss">×</button>
  </div>
</div>
```

### Variants

```html
<div class="pu-alert alert-md alert-outline" data-intent="info" role="status">…</div>
<div class="pu-alert alert-md alert-filled" data-intent="error" role="alert">…</div>
```

### Sizes

```html
<div class="pu-alert alert-sm" role="status">…</div>
<div class="pu-alert alert-md" role="status">…</div>
<div class="pu-alert alert-lg" role="status">…</div>
```
