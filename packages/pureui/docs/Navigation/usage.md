# Navigation

A list of links — a site header, a sidebar, a section menu. It styles a real
`<ul>` or `<ol>` inside a `<nav>`.

## Quick start

```html
<nav aria-label="Main">
  <ul class="pu-nav nav-md nav-horizontal" role="list">
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/docs">Docs</a></li>
    <li><a href="/pricing">Pricing</a></li>
  </ul>
</nav>
```

The `<nav aria-label="…">` wrapper and `role="list"` are both required. See
**Accessibility**.

## Classes

| Class | Does |
|---|---|
| `.pu-nav` | The key. Requires `<ul>` or `<ol>`. |
| `nav-horizontal` | A row. The default direction. |
| `nav-vertical` | A column. |
| `nav-sm` | Tighter links, smaller type. |
| `nav-md` | The default. |
| `nav-lg` | Roomier links, larger type. |
| `nav-sharp` | Square link corners. |
| `nav-smooth` | The default corner. |
| `nav-rounded` | Larger link corners. |
| `.pu-nav-submenu` | A nested list under an item. |
| `.pu-nav-toggle` | The button that opens the menu on small screens. |
| `.nav-icon-menu` | The icon shown while the menu is closed. |
| `.nav-icon-close` | The icon shown while it is open. |

## States

Driven by attributes on the link, not by classes.

| Attribute | Does |
|---|---|
| `aria-current="page"` | The current page. Fills in the primary colour and does not respond to hover. |
| `aria-disabled="true"` | Dimmed and not clickable. |

## Submenus

```html
<nav aria-label="Main">
  <ul class="pu-nav nav-md nav-vertical" role="list">
    <li>
      <a href="/docs" aria-expanded="true" aria-controls="docs-sub">Docs</a>
      <ul class="pu-nav-submenu" id="docs-sub" role="list">
        <li><a href="/docs/install">Install</a></li>
        <li><a href="/docs/tokens">Tokens</a></li>
      </ul>
    </li>
  </ul>
</nav>
```

The submenu shows when `aria-expanded="true"` is on the link or on the `<li>`.
The attribute is both the state and the announcement — there is no class to
toggle.

## Small screens

At 768px and below the nav collapses. The toggle button appears, and the list
is hidden until it carries `aria-expanded="true"`.

```html
<button class="pu-nav-toggle" aria-expanded="false" aria-controls="main-nav"
        aria-label="Menu">
  <svg class="nav-icon-menu" viewBox="0 0 24 24" aria-hidden="true">…</svg>
  <svg class="nav-icon-close" viewBox="0 0 24 24" aria-hidden="true">…</svg>
</button>

<nav aria-label="Main">
  <ul class="pu-nav nav-md" id="main-nav" role="list" aria-expanded="false">
    …
  </ul>
</nav>
```

The two icons swap from the button's own `aria-expanded`. Your script sets the
attribute on both the button and the list; the CSS does the rest.

## Accessibility

- Wrap the list in `<nav>` with an `aria-label`. A page usually has more than
  one navigation region, and an unnamed one is hard to tell apart.
- `role="list"` on the `<ul>`. The component sets `list-style: none`, and
  WebKit drops list semantics from a list styled that way. CSS cannot put them
  back.
- `aria-current="page"` marks the current page — not a class. The attribute is
  what a screen reader reads.
- A disabled link uses `aria-disabled="true"`. An `<a>` can never be
  `:disabled`.
- The toggle button needs `aria-expanded`, `aria-controls` pointing at the
  list's `id`, and an accessible name.
- Both toggle icons are decoration. Mark them `aria-hidden="true"`.
- The current page's fill is not the only signal — it is also bolder.

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
