# Navigation

A list of links — a site header, a sidebar, a section menu. It styles a real
`<ul>` or `<ol>` inside a `<nav>`.

## Quick start

```html
<nav aria-label="Main">
  <ul class="pu-nav nav-md" role="list">
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/docs">Docs</a></li>
    <li><a href="/pricing">Pricing</a></li>
  </ul>
</nav>
```

The `<nav aria-label="…">` wrapper and `role="list"` are both required. See
**Accessibility**.

Nested links belong to Menu. A toggle for small screens needs a script and
belongs to PureComponents.

## Classes

| Class | Does |
|---|---|
| `.pu-nav` | The key. Requires `<ul>` or `<ol>`. |
| `nav-horizontal` | A row. The default direction. |
| `nav-vertical` | A column. Links stretch to the list's width. |
| `nav-sm` | Smaller type, tighter links. |
| `nav-md` | The default. |
| `nav-lg` | Larger type, roomier links. |
| `nav-sharp` | Square link corners. |
| `nav-smooth` | The default corner. |
| `nav-rounded` | Pill-shaped links. |

## States

Driven by attributes on the link, not by classes.

| Attribute | Does |
|---|---|
| `aria-current="page"` | The current page. Filled, bolder, and does not respond to hover. |
| `aria-disabled="true"` | Dimmed and not clickable. |

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--nav-font-size` | `var(--font-size-md)` | Type size. |
| `--nav-gap` | `var(--spacing-50)` | Space between links. |
| `--nav-link-padding-block` | `var(--spacing-50)` | Link padding, top and bottom. |
| `--nav-link-padding-inline` | `var(--spacing-75)` | Link padding, start and end. |
| `--nav-link-radius` | `var(--radius-smooth)` | Link corner. |
| `--nav-link-color` | `var(--color-text)` | Link text. |
| `--nav-link-hover-background` | `var(--color-surface-sunken)` | Hover ground. |
| `--nav-link-hover-color` | `var(--color-primary)` | Hover text. |
| `--nav-current-background` | `var(--color-primary)` | Current page fill. |
| `--nav-current-color` | `var(--color-primary-foreground)` | Current page text. |
| `--nav-disabled-opacity` | `0.5` | Disabled link. |

```html
<ul class="pu-nav nav-md" role="list" style="--nav-gap: var(--spacing-100)">…</ul>
```

## Accessibility

- Wrap the list in `<nav>` with an `aria-label`. A page usually has more than
  one navigation region, and an unnamed one is hard to tell apart.
- `role="list"` on the `<ul>`. The component sets `list-style: none`, and
  WebKit drops list semantics from a list styled that way.
- `aria-current="page"` marks the current page — not a class. The attribute is
  what a screen reader reads.
- A disabled link uses `aria-disabled="true"`. An `<a>` can never be
  `:disabled`.
- The current page's fill is not the only signal — it is also bolder, and in
  forced colours it gets a border.

## Examples

### Horizontal and vertical

```html
<ul class="pu-nav nav-md nav-horizontal" role="list">…</ul>
<ul class="pu-nav nav-md nav-vertical" role="list">…</ul>
```

### Sizes

```html
<ul class="pu-nav nav-sm" role="list">…</ul>
<ul class="pu-nav nav-md" role="list">…</ul>
<ul class="pu-nav nav-lg" role="list">…</ul>
```

### Shape

```html
<ul class="pu-nav nav-md nav-sharp" role="list">…</ul>
<ul class="pu-nav nav-md nav-rounded" role="list">…</ul>
```

### A disabled item

```html
<li><a href="/beta" aria-disabled="true">Beta</a></li>
```
