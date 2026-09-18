# Breadcrumbs

The trail back up from where you are. A list of links with a separator drawn
between them.

## Quick start

```html
<nav aria-label="Breadcrumb">
  <ol class="pu-breadcrumbs breadcrumbs-md" role="list">
    <li><a href="/">Home</a></li>
    <li><a href="/reports">Reports</a></li>
    <li><span aria-current="page">Q4</span></li>
  </ol>
</nav>
```

The `<nav aria-label="Breadcrumb">` wrapper and `role="list"` are both
required. See **Accessibility**.

## Classes

| Class | Does |
|---|---|
| `.pu-breadcrumbs` | The key. Requires `<ol>` or `<ul>`. |
| `breadcrumbs-sm` | Smaller type, tighter separators, smaller radius. |
| `breadcrumbs-md` | The default. |
| `breadcrumbs-lg` | Larger type, wider separators, larger radius. |
| `breadcrumbs-sharp` | Square crumb corners. |
| `breadcrumbs-smooth` | The same radius `breadcrumbs-md` already gives. |
| `breadcrumbs-rounded` | Fully round crumb corners. |
| `breadcrumbs-slash` | `/` as the separator. |
| `breadcrumbs-chevron` | `›` as the separator. |
| `breadcrumbs-arrow` | `→` as the separator. |
| `breadcrumbs-dot` | `•` as the separator. |
| `.breadcrumbs-separator` | A separator element you supply yourself. |

## Separators

The default is `>`. The four variants change it.

Put one on the **list** and every gap changes:

```html
<ol class="pu-breadcrumbs breadcrumbs-md breadcrumbs-chevron" role="list">…</ol>
```

Put one on a single **`<li>`** and only the gap after that crumb changes:

```html
<li class="breadcrumbs-arrow"><a href="/reports">Reports</a></li>
```

Any other mark comes from the variable:

```html
<ol class="pu-breadcrumbs breadcrumbs-md" role="list"
    style="--breadcrumbs-separator: '»'">
```

### Supplying your own element

For an icon rather than a character, put a `.breadcrumbs-separator` inside the
`<li>`. The generated mark stands down wherever one is present, so the two
never double up, and nothing is drawn after the last crumb whichever way it
was made.

```html
<li>
  <a href="/reports">Reports</a>
  <span class="breadcrumbs-separator" aria-hidden="true">
    <svg viewBox="0 0 24 24">…</svg>
  </span>
</li>
```

## Shape on one crumb

The shape classes also work on a single crumb, which is useful when one is
given a background:

```html
<li class="breadcrumbs-rounded"><a href="/reports">Reports</a></li>
```

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--breadcrumbs-gap` | `var(--spacing-0)` | Space between list items. |
| `--breadcrumbs-font-size` | `var(--font-size-md)` | Type size. |
| `--breadcrumbs-radius` | `var(--radius-md)` | Crumb corner. |
| `--breadcrumbs-separator` | `">"` | The mark itself. |
| `--breadcrumbs-separator-color` | `var(--color-text-subtle)` | Its colour. |
| `--breadcrumbs-separator-space` | `var(--spacing-50)` | Space either side of it. |
| `--breadcrumbs-crumb-padding-inline` | `var(--spacing-25)` | Crumb padding, horizontal. |
| `--breadcrumbs-crumb-padding-block` | `var(--spacing-15)` | Crumb padding, vertical. |
| `--breadcrumbs-crumb-background` | `transparent` | Crumb fill. |
| `--breadcrumbs-link-color` | `var(--color-text-subtle)` | Link colour. |
| `--breadcrumbs-hover-color` | `var(--color-text)` | Link colour on hover. |
| `--breadcrumbs-current-color` | `var(--color-text)` | The current crumb. |

## Accessibility

- Wrap the list in `<nav aria-label="Breadcrumb">`. Without the label a screen
  reader announces an unnamed navigation region, and a page usually has more
  than one.
- `role="list"` on the `<ol>`. The component sets `list-style: none`, and
  WebKit drops list semantics from a list styled that way. CSS cannot put them
  back.
- The last crumb carries `aria-current="page"`. It is where you already are,
  so it is not a link and it does not respond to hover.
- The generated separator has its alternative text emptied where the browser
  supports it, so assistive technology skips it. A separator you supply
  yourself needs `aria-hidden="true"`.
- A hovered link underlines as well as changing colour, so colour is not the
  only signal.

## Examples

### Sizes

```html
<ol class="pu-breadcrumbs breadcrumbs-sm" role="list">…</ol>
<ol class="pu-breadcrumbs breadcrumbs-md" role="list">…</ol>
<ol class="pu-breadcrumbs breadcrumbs-lg" role="list">…</ol>
```

### Separator variants

```html
<ol class="pu-breadcrumbs breadcrumbs-md breadcrumbs-slash" role="list">…</ol>
<ol class="pu-breadcrumbs breadcrumbs-md breadcrumbs-chevron" role="list">…</ol>
<ol class="pu-breadcrumbs breadcrumbs-md breadcrumbs-arrow" role="list">…</ol>
<ol class="pu-breadcrumbs breadcrumbs-md breadcrumbs-dot" role="list">…</ol>
```

### Crumbs with a background

```html
<ol class="pu-breadcrumbs breadcrumbs-md" role="list"
    style="--breadcrumbs-crumb-background: var(--color-surface-sunken)">
  <li><a href="/">Home</a></li>
  <li><span aria-current="page">Reports</span></li>
</ol>
```
