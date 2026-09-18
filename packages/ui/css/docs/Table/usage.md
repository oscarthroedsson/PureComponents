# Table

Rows of data in a real `<table>`. The component styles the native element and
adds nothing to the markup that the table did not already need.

## Quick start

```html
<table class="pu-table table-md">
  <caption>Regional revenue</caption>
  <thead>
    <tr><th>Region</th><th class="table-end">Revenue</th></tr>
  </thead>
  <tbody>
    <tr><td>North</td><td class="table-end">£1,240</td></tr>
    <tr><td>South</td><td class="table-end">£980</td></tr>
  </tbody>
</table>
```

## Classes

| Class | Does |
|---|---|
| `.pu-table` | The key. Requires `<table>`. |
| `table-sm` | Tighter cells, smaller type. |
| `table-md` | The default. |
| `table-lg` | Roomier cells, larger type. |
| `table-start` | Align text to the start edge. The default. |
| `table-center` | Align text to the centre. |
| `table-end` | Align text to the end edge. |
| `table-top` | Align the content to the cell's top. |
| `table-middle` | The middle. What the browser already gives. |
| `table-bottom` | Align the content to the cell's bottom. |

The key requires `<table>`. On a `<div>` nothing applies — a grid of divs has
no row and column semantics for a screen reader to read out, and CSS cannot
give it any.

## Alignment works at any level

The three alignment classes apply both on the table and on anything inside
it, so the same word means the same thing wherever you put it.

```html
<table class="pu-table table-md table-center">   <!-- whole table -->
  <tr class="table-end">                          <!-- one row -->
    <td class="table-start">…</td>                <!-- one cell -->
  </tr>
</table>
```

The nearest one wins. Numbers usually want `table-end` on the column's cells.

The three block-axis classes work the same way. They belong on the cell: a
cell aligns its whole content, so a wrapper inside it cannot push text down —
the wrapper is only as tall as its own text.

```html
<th scope="col" class="table-bottom">Feature</th>
```

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--table-padding-block` | `var(--spacing-75)` | Cell padding, vertical. |
| `--table-padding-inline` | `var(--spacing-100)` | Cell padding, horizontal. |
| `--table-font-size` | `var(--font-size-md)` | Type size. |
| `--table-color` | `var(--color-text)` | Body text. |
| `--table-head-color` | `var(--color-text-muted)` | Header text. |
| `--table-border-color` | `var(--color-border)` | Row rules. |
| `--table-head-border-color` | `var(--color-border)` | The rule under the head and over the foot. |
| `--table-border-width` | `1px` | Rule thickness. |

```html
<table class="pu-table table-md" style="--table-border-width: 2px">
```

## Structure

- `<thead>` gets muted text and its own border colour.
- The last row in `<tbody>` loses its bottom rule, so the table ends on data
  rather than on a stray line.
- `<tfoot>` takes a rule above it instead of below.
- `<caption>` is padded and aligned like the rest of the table.

## Accessibility

- Use `<th>` for header cells, not a styled `<td>`.
- Add `scope="col"` or `scope="row"` on header cells so the association is
  explicit.
- `<caption>` names the table. It is the first thing a screen reader reads,
  and it is better than a heading above the table because it is bound to it.
- A layout built from `<div>`s is not a table and this component will not
  style one.
- Do not use alignment alone to signal meaning.

## Examples

### Sizes

```html
<table class="pu-table table-sm">…</table>
<table class="pu-table table-md">…</table>
<table class="pu-table table-lg">…</table>
```

### With scopes and a foot

```html
<table class="pu-table table-md">
  <caption>Regional revenue</caption>
  <thead>
    <tr>
      <th scope="col">Region</th>
      <th scope="col" class="table-end">Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">North</th>
      <td class="table-end">£1,240</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td class="table-end">£2,220</td>
    </tr>
  </tfoot>
</table>
```

### A numeric column

```html
<tr>
  <td>Widgets</td>
  <td class="table-end">1,204</td>
</tr>
```
