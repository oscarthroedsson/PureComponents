# Layout

Collective placement for an element's direct children. The attribute names the
result; whether that result uses Flex or Grid is internal. Use Box only when
the layout owner also needs Box padding or radius.

## Quick start

```html
<div class="pu-box box-md" data-layout="center-between" data-gap="md">
  <button class="pu-btn">Previous</button>
  <span>Step 2 of 4</span>
  <button class="pu-btn">Continue</button>
</div>
```

Load `layout.css` after `box.css` when stylesheets are linked separately:

```html
<link rel="stylesheet" href="pureui/styles/Layout/box.css">
<link rel="stylesheet" href="pureui/styles/Layout/layout.css">
```

The package `index.css` already includes both in the correct order.

## Placement

The first word controls the block axis:

- `top` aligns direct children at the block start.
- `center` centres direct children on the block axis.
- `bottom` aligns direct children at the block end.

The second word controls the inline axis:

- `start` collects the children at the inline start.
- `center` centres the children as one group.
- `between` places the free space between every child.
- `around` places free space around every child.
- `end` collects the children at the inline end.
- `split` creates start, geometrically centred and end regions.

Every combination is available:

```text
top-start       top-center       top-between       top-around       top-end       top-split
center-start    center-center    center-between    center-around    center-end    center-split
bottom-start    bottom-center    bottom-between    bottom-around    bottom-end    bottom-split
```

## Split

`split` is for exactly three direct children. Equal outer tracks keep the
second child geometrically centred even when the first and third children have
different widths.

```html
<nav class="pu-box box-sm" data-layout="center-split" data-gap="sm">
  <span data-layout="center-start" data-gap="xs">…</span>
  <input class="pu-input" type="search" aria-label="Search">
  <span data-layout="center-end" data-gap="xs">…</span>
</nav>
```

Use a nested semantic element with `data-layout` when a region contains more
than one element. The outer layout still sees exactly three direct children.

## Gap

`data-gap` controls the space between direct children independently from Box
padding:

```text
none · xs · sm · md · lg · xl
```

```html
<div class="pu-box box-none" data-layout="center-start" data-gap="lg">
  …
</div>
```

`box-none` removes padding only. It does not remove the gap.

For a value outside the scale, set `--layout-gap`:

```html
<div class="pu-box" data-layout="center-start" style="--layout-gap: 2.25rem">
  …
</div>
```

## Containment

A layout owner gives itself and every direct child a zero minimum inline size.
That lets Flex and Grid shrink components inside the available track instead
of letting intrinsic width silently enlarge the parent.

Layout does not clip content. A component that deliberately owns scrolling,
wrapping or a minimum width keeps owning that decision.

## Accessibility

Layout is presentational. Use the semantic element required by the content and
keep DOM order equal to reading order. These presets align and distribute; they
do not visually reorder children.
