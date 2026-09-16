# Box

Padding and a corner. Nothing else.

It sets no `display`, no width, no background and no border, so whatever you
put it on keeps the layout it already had. A flex child stays a flex child; a
grid item stays a grid item.

## Quick start

```html
<div class="pu-box">Padding on every side.</div>
```

The key alone is `box-md` on all four sides.

## Classes

| Class | Does |
|---|---|
| `.pu-box` | The key. |
| `box-none` | No padding. Keeps the corner. |
| `box-xs` | Extra-tight padding. |
| `box-sm` | Tighter padding. |
| `box-md` | The default. |
| `box-lg` | Roomier padding. |
| `box-xl` | Extra-roomy padding. |
| `box-sharp` | Square corners. |
| `box-smooth` | The same corner `box-md` already gives. |
| `box-rounded` | Larger corner. |
| `box-x` | Padding on the inline sides only. |
| `box-y` | Padding on the block sides only. |
| `box-top` | Padding at the top only. |
| `box-bottom` | Padding at the bottom only. |
| `box-start` | Padding at the leading edge only. |
| `box-end` | Padding at the trailing edge only. |

`start` and `end` rather than left and right, so a box means the same thing in
a right-to-left page. In English `box-start` is the left edge; in Arabic it is
the right one.

## Sides add up

A side class narrows the padding to the sides it names, and two of them give
you both:

```html
<div class="pu-box box-lg box-top box-bottom">…</div>   <!-- same as box-y -->
<div class="pu-box box-lg box-x box-y">…</div>          <!-- same as neither -->
<div class="pu-box box-lg box-top box-start">…</div>    <!-- top and leading edge -->
```

The size still decides how much. `box-lg box-x` is 24px on the inline sides
and nothing on the block sides.

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--box-padding` | `var(--spacing-100)` | How much padding. |
| `--box-radius` | `var(--radius-md)` | The corner. |
| `--box-padding-block-start` | `--box-padding` | The top on its own. |
| `--box-padding-block-end` | `--box-padding` | The bottom on its own. |
| `--box-padding-inline-start` | `--box-padding` | The leading edge on its own. |
| `--box-padding-inline-end` | `--box-padding` | The trailing edge on its own. |

The named sizes are points on a scale, not the whole scale. Any length works,
and the side classes go on working against it:

```html
<div class="pu-box" style="--box-padding: 3rem">…</div>
<div class="pu-box box-x" style="--box-padding: 3rem">…</div>
```

For one side that differs from the rest, set that side's variable:

```html
<div class="pu-box" style="--box-padding-block-start: 0">…</div>
```

## The corner needs something to show against

A box paints nothing. `border-radius` on an element with no background, no
border and no clipped content is invisible. Give it a surface where you want
the corner to read:

```html
<div class="pu-box box-lg box-rounded" style="background-color: var(--color-surface-sunken)">
  …
</div>
```

## One key per element

A box goes on its own element. It writes `padding` and `border-radius`, and so
does almost every component in the library — put `.pu-box` and `.pu-card` on
one element and the two fight over the same properties, with file order
deciding the winner.

Wrap instead:

```html
<div class="pu-box box-lg">
  <article class="pu-card card-md">…</article>
</div>
```

## Related layout modules

`box.css` owns padding and radius only. The same `.pu-box` can carry the
attributes provided by the separate Layout module, and its direct children can
carry the attributes provided by Behavior. Read
[Layout](../Layout/usage.md) and [Behavior](../Behavior/usage.md) for those
APIs.

## Accessibility

- A box is presentational. It adds no semantics and needs none — use the
  element the content calls for, `<section>`, `<article>`, `<aside>` or a plain
  `<div>`.
- Padding is not spacing between things. Use `gap` or margins on the parent for
  that; a box is the space *inside* an edge.

## Examples

### Sizes

```html
<div class="pu-box box-none">box-none</div>
<div class="pu-box box-xs">box-xs</div>
<div class="pu-box box-sm">box-sm</div>
<div class="pu-box box-md">box-md</div>
<div class="pu-box box-lg">box-lg</div>
<div class="pu-box box-xl">box-xl</div>
```

### Shape

```html
<div class="pu-box box-md box-sharp">Sharp</div>
<div class="pu-box box-md box-smooth">Smooth</div>
<div class="pu-box box-md box-rounded">Rounded</div>
```

### A banner with no side padding

```html
<div class="pu-box box-lg box-y">
  <img src="cover.jpg" alt="" style="inline-size: 100%" />
</div>
```

### Breathing room above a section

```html
<div class="pu-box box-lg box-top">
  <h2>Pricing</h2>
</div>
```

### Any padding you like

```html
<div class="pu-box" style="--box-padding: 4rem; --box-radius: 2rem">
  A wide, soft box.
</div>
```
