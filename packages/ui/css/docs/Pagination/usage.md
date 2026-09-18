# Pagination

A row of page links. The cells are `.pu-btn`, so pagination decides only how
wide a cell may get and what its corners look like — everything else is the
button.

## Quick start

```html
<nav aria-label="Pagination">
  <ul class="pu-pagination pagination-md" role="list">
    <li><a href="?page=1" class="pu-btn btn-ghost">1</a></li>
    <li><a href="?page=2" class="pu-btn" aria-current="page">2</a></li>
    <li><a href="?page=3" class="pu-btn btn-ghost">3</a></li>
  </ul>
</nav>
```

The `<nav aria-label="Pagination">` wrapper and `role="list"` are both
required. See **Accessibility**.

## Classes

| Class | Does |
|---|---|
| `.pu-pagination` | The key. Requires `<ul>` or `<ol>`. |
| `pagination-sm` | Tighter gap, smaller type, smaller radius. |
| `pagination-md` | The default. |
| `pagination-lg` | Wider gap, larger type, larger radius. |
| `pagination-sharp` | Square cells. |
| `pagination-smooth` | The same radius `pagination-md` already gives. |
| `pagination-rounded` | Round cells. |
| `.pagination-ellipsis` | A gap marker between page ranges. |

### Size goes on the list, not on the cells

The list's size wins even if a button carries one of its own. Set
`pagination-sm`, `pagination-md` or `pagination-lg` on the `<ul>` and leave
the buttons alone.

| Class | Font size | Gap | Radius | Cell |
|---|---|---|---|---|
| `pagination-sm` | `--font-size-sm` | `--spacing-15` | `--radius-sm` | 27 × 29.5px |
| `pagination-md` | `--font-size-md` | `--spacing-25` | `--radius-md` | 31.5 × 35px |
| `pagination-lg` | `--font-size-base` | `--spacing-50` | `--radius-lg` | 36 × 40px |

## The current page

Mark it with `aria-current="page"`. The cell fills in the primary colour and
stops responding to hover — it is where you already are.

```html
<li><a href="?page=2" class="pu-btn" aria-current="page">2</a></li>
```

The usual pattern is a plain `.pu-btn` for the current page and
`.pu-btn btn-ghost` for the rest, which gives the fill for free. The
`aria-current` rule is a floor beneath that, so a row built entirely from
ghosts still shows the mark.

## Ellipsis

```html
<li><span class="pagination-ellipsis" aria-hidden="true">…</span></li>
```

It is the same width and height as a cell, so the row keeps one height and
the cells stay on their grid.

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--pagination-gap` | `var(--spacing-25)` | Space between cells. |
| `--pagination-font-size` | `var(--font-size-md)` | Type size, inherited by the buttons. |
| `--pagination-cell-size` | `2.25em` | Minimum cell width. |
| `--pagination-radius` | `var(--radius-md)` | Cell corner. |
| `--pagination-muted-color` | `var(--color-text-subtle)` | The ellipsis. |

Numbers use tabular figures, so 1 and 10 take the same width and the row holds
still between pages.

## Accessibility

- Wrap the list in `<nav aria-label="Pagination">`. A page often has more than
  one navigation region, and an unnamed one is hard to tell apart.
- `role="list"` on the `<ul>`. The component sets `list-style: none`, and
  WebKit drops list semantics from a list styled that way.
- `aria-current="page"` on the current cell — not a class. The attribute is
  what tells a screen reader which page you are on.
- Previous and next controls need real names. `aria-label="Previous page"`,
  not an arrow alone.
- The ellipsis is decoration. Mark it `aria-hidden="true"`.
- A cell that is a link should be an `<a href>`; a cell that triggers a fetch
  should be a `<button>`.

## Examples

### Sizes

```html
<ul class="pu-pagination pagination-sm" role="list">…</ul>
<ul class="pu-pagination pagination-md" role="list">…</ul>
<ul class="pu-pagination pagination-lg" role="list">…</ul>
```

### With previous and next

```html
<nav aria-label="Pagination">
  <ul class="pu-pagination pagination-md" role="list">
    <li>
      <a href="?page=1" class="pu-btn btn-ghost" data-icon-only="true" aria-label="Previous page">
        <svg viewBox="0 0 24 24" aria-hidden="true">…</svg>
      </a>
    </li>
    <li><a href="?page=1" class="pu-btn btn-ghost">1</a></li>
    <li><a href="?page=2" class="pu-btn" aria-current="page">2</a></li>
    <li><span class="pagination-ellipsis" aria-hidden="true">…</span></li>
    <li><a href="?page=9" class="pu-btn btn-ghost">9</a></li>
    <li>
      <a href="?page=3" class="pu-btn btn-ghost" data-icon-only="true" aria-label="Next page">
        <svg viewBox="0 0 24 24" aria-hidden="true">…</svg>
      </a>
    </li>
  </ul>
</nav>
```

### Shape

```html
<ul class="pu-pagination pagination-md pagination-sharp" role="list">…</ul>
<ul class="pu-pagination pagination-md pagination-rounded" role="list">…</ul>
```
