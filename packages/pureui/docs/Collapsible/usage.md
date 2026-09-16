# Collapsible

A panel that opens and closes. It is a native `<details>` — the browser
handles the toggling, the keyboard and the announcement, and no script is
involved.

## Quick start

```html
<details class="pu-collapsible collapsible-md">
  <summary>What is included?</summary>
  <p>Everything in the standard plan, plus priority support.</p>
</details>
```

## Classes

| Class | Does |
|---|---|
| `.pu-collapsible` | The key. Requires `<details>`. |
| `collapsible-sm` | Tighter padding, smaller type and radius. |
| `collapsible-md` | The default. |
| `collapsible-lg` | Roomier padding, larger type and radius. |
| `collapsible-sharp` | Square corners. |
| `collapsible-smooth` | The same radius `collapsible-md` already gives. |
| `collapsible-rounded` | The large corner — `--radius-rounded`, capped at `--radius-lg`. |
| `.collapsible-marker` | A marker element you supply yourself. |

## Attributes

| Attribute | Does |
|---|---|
| `open` | Native. The panel starts open. The browser writes and removes it after that. |
| `data-marker="start"` | Moves the marker to the leading edge. |
| `data-marker="none"` | Draws no marker. |

## The marker

A chevron is drawn for you, at the trailing edge, and it rotates 180° when the
panel opens.

### Bringing your own

Put a `.collapsible-marker` inside the `<summary>`. The generated one stands
down on sight.

```html
<details class="pu-collapsible collapsible-md">
  <summary>
    Details
    <span class="collapsible-marker" aria-hidden="true">
      <svg viewBox="0 0 24 24">…</svg>
    </span>
  </summary>
  <p>…</p>
</details>
```

### Two icons that cross over

Add `.pu-swap` to the marker and put two icons inside it. The one for the
state you are not in fades out as the other arrives. A swap slot does not
rotate — the icons do the moving instead.

```html
<summary>
  A plus that becomes a minus
  <span class="collapsible-marker pu-swap" aria-hidden="true">
    <svg class="swap-closed" viewBox="0 0 24 24">…plus…</svg>
    <svg class="swap-open" viewBox="0 0 24 24">…minus…</svg>
  </span>
</summary>
```

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--collapsible-font-size` | `var(--font-size-md)` | Type size. |
| `--collapsible-radius` | `var(--radius-md)` | Corner. |
| `--collapsible-background` | `var(--color-surface-sunken)` | Fill. |
| `--collapsible-border-width` | `1px` | Border. |
| `--collapsible-border-color` | `var(--color-border)` | Border colour. |
| `--collapsible-padding-inline` | `var(--spacing-100)` | Horizontal padding. |
| `--collapsible-padding-block` | `var(--spacing-75)` | Vertical padding. |
| `--collapsible-gap` | `var(--spacing-75)` | Space in the summary row. |
| `--collapsible-summary-color` | `var(--color-text)` | Summary text. |
| `--collapsible-summary-weight` | `600` | Summary weight. |
| `--collapsible-summary-hover-background` | 6% shade | Summary hover fill. |
| `--collapsible-content-color` | `var(--color-text-muted)` | Body text. |
| `--collapsible-duration` | `var(--transition-medium)` | Open and close timing. |
| `--collapsible-marker-icon` | a chevron | The marker shape. |
| `--collapsible-marker-size` | `1em` | Marker box. |
| `--collapsible-marker-color` | `var(--color-text-subtle)` | Marker colour. |
| `--collapsible-marker-rotation-open` | `180deg` | How far it turns when open. |
| `--collapsible-marker-duration` | `var(--collapsible-duration)` | Marker timing. |

Swap the icon without touching a rule:

```html
<details class="pu-collapsible collapsible-md"
  style="--collapsible-marker-icon: url('data:image/svg+xml,…')">
```

## Accessibility

- A heading is allowed inside `<summary>` and keeps its outline level while
  giving up its own scale. Use one where the panel is a real section.
- The marker is decoration. Mark it `aria-hidden="true"`; `<details>` already
  reports open and closed.
- Do not add `role` or `aria-expanded` — the browser provides both.
- The summary is focusable and toggles on Enter and Space natively.
- The focus ring is drawn inside the panel, because the panel clips its own
  overflow to keep the corner round. Same width, same colour, same 3:1.
- Transitions are removed under `prefers-reduced-motion`.

## Browser support

The open and close animation needs `::details-content` and
`interpolate-size: allow-keywords`. Where either is missing the panel snaps
open instead of sliding — correct, just not animated. Padding is applied to
the children directly on those engines, so the content never sits flush
against the edge.

## Examples

### Sizes

```html
<details class="pu-collapsible collapsible-sm"><summary>Small</summary><p>…</p></details>
<details class="pu-collapsible collapsible-md"><summary>Medium</summary><p>…</p></details>
<details class="pu-collapsible collapsible-lg"><summary>Large</summary><p>…</p></details>
```

### Open on load

```html
<details class="pu-collapsible collapsible-md" open>
  <summary>Already open</summary>
  <p>…</p>
</details>
```

### Marker at the start

```html
<details class="pu-collapsible collapsible-md" data-marker="start">
  <summary>Leading chevron</summary>
  <p>…</p>
</details>
```

### No marker

```html
<details class="pu-collapsible collapsible-md" data-marker="none">
  <summary>Nothing drawn</summary>
  <p>…</p>
</details>
```

### With a heading

```html
<details class="pu-collapsible collapsible-md">
  <summary><h3>Shipping</h3></summary>
  <p>Orders ship within two working days.</p>
</details>
```

## Several panels together

Wrap them in `.pu-accordion`. See the Accordion docs.
