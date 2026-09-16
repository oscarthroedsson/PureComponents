# Pagination — contributing

## File

`packages/pureui/styles/pagination.css`

## Key

```css
.pu-pagination:where(ul, ol)
```

A set of pages is a list. `list-style: none` costs the list role in WebKit, so
`role="list"` belongs in the markup.

## The cells are buttons

This file styles two things about a cell and nothing else:

```css
& > li > .pu-btn {
  min-inline-size: var(--pagination-cell-size);
  border-radius: var(--pagination-radius);
}
```

Reaching through the `<li>` puts the rule one step above `.pu-btn.btn-sm` and
its siblings, so the size on the list wins if a button also carries one. The
button keeps everything else — padding, colours, states, focus.

The cell size is in `em`, so it follows the inherited font size instead of
needing a value per size class.

## Font size is inherited, not set per cell

`.pu-btn` declares no `font-size` of its own — it takes `inherit` in its base.
So `font-size` on the key reaches every button in the row, and one declaration
per size class is enough.

`font-variant-numeric: tabular-nums` on the key means 1 and 10 get the same
digit width, so the row holds still between pages.

## The `aria-current` rule is a floor

```css
& > li > .pu-btn[aria-current="page"] {
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
  &:hover { background-color: var(--color-primary); }
}
```

Not the mechanism. The fill normally comes from the current cell being a plain
`.pu-btn` while the rest are ghosts. This keeps the mark visible in a row built
entirely from ghosts, and it matches `:hover` as well — `.pu-btn.btn-ghost:hover`
outweighs a plain attribute selector and would otherwise wash the mark off
under the pointer.

The current page is where you already are. It does not answer to hover.

## The ellipsis

`.pagination-ellipsis` takes the cell's `min-inline-size` and the button's own
`padding-block: 0.5em`, so the row keeps one height and the cells stay on
their grid. `user-select: none` keeps it out of a copied selection.

## Order inside the block

1. Variables
2. Base
3. Cells
4. Current page
5. Ellipsis
6. Size
7. Shape — after size, so it replaces the radius the size set

## Variables

| Variable | Default |
|---|---|
| `--pagination-gap` | `var(--spacing-25)` |
| `--pagination-font-size` | `var(--font-size-md)` |
| `--pagination-cell-size` | `2.25em` |
| `--pagination-radius` | `var(--radius-md)` |
| `--pagination-muted-color` | `var(--color-text-subtle)` |

Five, because most of the component is the button. Anything about how a cell
looks beyond its width and corner belongs in `button.css`.
