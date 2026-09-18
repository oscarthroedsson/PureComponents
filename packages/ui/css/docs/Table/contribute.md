# Table — contributing

## File

`packages/ui/css/styles/table.css`

## Key

```css
.pu-table:where(table)
```

The element requirement is real. A grid of `<div>`s has no row and column
semantics for a screen reader to read out, and CSS cannot give it any.
Refusing to style the wrong element is the only enforcement available.

## `text-align: inherit` on cells

```css
& :is(th, td) {
  text-align: inherit;
}
```

`th` carries `text-align: center` from the browser, and a value set on the
element beats an inherited one — so the `text-align: start` on the key would
never reach it. `inherit` hands the cell back to whatever the nearest ancestor
decided, which is the whole point and is what makes the alignment classes work
at table, row and cell level from one set of rules.

`<caption>` gets the same treatment for the same reason.

## The alignment classes are doubled

```css
&.table-start,
& .table-start { text-align: start; }
```

The key form styles the whole table; the descendant form styles a row or a
cell. Both weigh 0-2-0, and the nearest ancestor wins through inheritance
rather than through specificity — which is why the cell form does not need to
outrank the table form.

## `border-spacing: 0`

The 2px default would show up as gaps between every cell.

## Where the rules go

- Every cell takes `border-block-end`.
- The last row in `<tbody>` loses it, so the table ends on data rather than on
  a stray line.
- `<thead>` cells take `--table-head-border-color`, which is a separate
  variable from the body's so the head can be marked off without touching the
  row rules.
- `<tfoot>` inverts: no bottom rule, a top rule in the head's colour.

## `th` weight

`font-weight: 600` rather than the browser's `bold`, which is heavier than
this needs to be.

## Order inside the block

1. Variables
2. Base
3. Structure — cells, thead, tfoot, th, caption
4. Size
5. Alignment

There is no shape section. A table has no radius of its own; `overflow`
clipping on a wrapper is the consumer's job if they want one.

## Variables

| Variable | Default |
|---|---|
| `--table-padding-block` | `var(--spacing-75)` |
| `--table-padding-inline` | `var(--spacing-100)` |
| `--table-font-size` | `var(--font-size-md)` |
| `--table-color` | `var(--color-text)` |
| `--table-head-color` | `var(--color-text-muted)` |
| `--table-border-color` | `var(--color-border)` |
| `--table-head-border-color` | `var(--color-border)` |
| `--table-border-width` | `1px` |

Sizes move padding and font size only. Nothing in the size blocks writes a
property directly.
