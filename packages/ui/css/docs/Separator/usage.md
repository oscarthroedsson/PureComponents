# Separator

A semantic rule between related regions. Horizontal is the default; the
vertical modifier turns the same native `<hr>` into a rule between items in a
row.

## Quick start

```html
<hr class="pu-separator">
```

The key requires an `<hr>`. It resets the browser's own margins and border,
then paints a one-pixel line with the library's border colour.

## Vertical

```html
<div class="pu-box box-sm" data-layout="center-start" data-gap="sm">
  <button class="pu-btn btn-md btn-ghost" type="button">Undo</button>
  <hr class="pu-separator separator-vertical" aria-orientation="vertical">
  <button class="pu-btn btn-md btn-ghost" type="button">Redo</button>
</div>
```

`separator-vertical` changes the visual orientation. Pair it with
`aria-orientation="vertical"` so the accessibility tree describes the same
orientation that the page shows.

The vertical rule stretches to the height the row already has. In a parent
with no height and no taller sibling, it stays empty instead of inventing a
height and making the parent grow.

## Thickness and colour

Two component variables are the complete tuning surface:

| Variable | Default | Controls |
|---|---|---|
| `--separator-thickness` | `1px` | The line's thickness. |
| `--separator-color` | `var(--color-border)` | The line's colour. |

```html
<hr
  class="pu-separator"
  style="--separator-thickness: 3px; --separator-color: var(--color-primary)"
>
```

There are no named size or colour variants. A separator usually needs one
exact structural value, and the variables accept any suitable length and
colour token without expanding the class API.

## Available-space contract

The rule takes the available length on its axis and remains shrinkable. Its
minimum inline and block sizes are zero, so a constrained Flex or Grid parent
can make the separator shorter rather than being enlarged by it.

- Horizontal fills the available inline size and keeps a fixed block
  thickness.
- Vertical fills an available block size and keeps a fixed inline thickness.
- Neither orientation grows along its length to create space that the parent
  does not already provide.

Use the parent's `data-gap` for space around a separator. Separator owns the
line itself and deliberately has no margin or spacing variable.

## Semantics

Use the separator when the break between regions is meaningful. Native `<hr>`
already exposes separator semantics, so no `role` is needed.

For a line that is only decoration, hide it from assistive technology:

```html
<hr class="pu-separator" aria-hidden="true">
```

Do not use a separator as the only signal that two regions differ. Headings,
labels and document structure must still communicate the relationship without
colour or sight.

## Standalone stylesheet

When stylesheets are linked separately, load the base tokens first:

```html
<link rel="stylesheet" href="pureui/styles/main.css">
<link rel="stylesheet" href="pureui/styles/separator.css">
```

The package `index.css` already includes both in the correct order.
