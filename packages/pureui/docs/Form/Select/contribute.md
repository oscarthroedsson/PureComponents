# Select — contributing

## File

`packages/pureui/styles/Form/select.css`

## Key

```css
.pu-select:where(select)
```

The native control is keyboard accessible, type-ahead searchable and works
with every assistive technology. Nothing built from a `<div>` matches it.

## Every variable reads the channel with a fallback

So a bare `.pu-select` works with no `.pu-form` around it. Never declare a
`--form-*` variable here — that would shadow the group's value.

## Three chevrons, one per shape

The mark's corners follow the box's, so a sharp select gets a mitred chevron
and a rounded one gets a curved tip.

The `viewBox` is cropped to the path's own bounds. Lucide's 24×24 is mostly
air, and an uncropped box sizes the padding, not the mark.

The shapes differ in the **path**, not in `stroke-linejoin`. A chevron has one
join, and at this angle miter and round are indistinguishable — sharp and
smooth came out identical. So the tip is curved explicitly instead: a quadratic
Bezier whose control point is the original corner, starting 0.8 units back for
smooth and 1.1 for rounded, which also takes round caps.

Kept small on purpose — past about 1.5 the tip stops reading as a chevron and
starts reading as a U.

The stroke colour inside the SVG is only read in the fallback, where a
background image cannot see a token. As a mask only the alpha matters and
`--select-icon-color` paints it.

`select-rounded` also pushes `--select-icon-inset` out by half again, because a
999px corner eats into where the mark would otherwise sit.

## `padding-inline-end` is derived

```css
--select-padding-inline-end: calc(
  var(--select-icon-inset) + var(--select-icon-size) + var(--select-icon-gap)
);
```

Clear of the edge, past the mark, and a gap after it. Change the icon size and
the text stops in the right place without another edit.

## The one physical value in the file

```css
background-position: right var(--select-icon-inset) center;

&:dir(rtl) { background-position: left var(--select-icon-inset) center; }
```

A background has no logical side.

## The menu is additive

```css
@media (hover: hover) and (pointer: fine) {
  @supports (appearance: base-select) { … }
}
```

Two guards, both necessary. Without base-select support, or on a touch screen,
the control above is what renders and the platform keeps its own picker. A
touch device's native picker is better than anything this file could draw.

Inside the block the painted mark comes off — `::picker-icon` is laid out, so
the end padding becomes the gap between the element and the edge — and the mark
is redrawn as a mask on the pseudo-element, which is what lets it take a token
colour.

`align-self: center` on `::picker-icon` is required: without it the icon
baseline-aligns and rides above the centre line.

## The menu variables are declared on the control

`::picker(select)` inherits from the element, so `--select-menu-*` and
`--select-option-*` are declared in the key block rather than anywhere else.

`--select-menu-radius` is capped at `--radius-lg`, so a `select-rounded`
control does not produce a 999px menu.

## No `:read-only` branch

`readonly` does nothing to a `<select>`. Locking a choice is `disabled` plus a
hidden input, or a single option.

## List boxes opt out

```css
&:is([multiple], [size]:not([size="1"])) {
  background-image: none;
  min-block-size: 0;
  padding-inline-end: var(--select-padding-inline);
  cursor: default;
}
```

A list box does not open, so no mark and no one-line floor.

The same condition is negated on the menu block, so a list box never gets
base-select applied to it either.

## The group rules are outside the key

```css
.pu-input-group:has(> .input-icon[data-placement="start"]) > .pu-select { … }
.pu-input-group:has(> .pu-select:disabled) > .input-icon { … }
```

Only the **start** slot, because the chevron owns the end. They live at top
level because they are about the group, not about the select.

## Order inside the block

1. Variables, including the three icons and the menu set
2. Base, and the RTL background position
3. Size
4. Shape
5. States
6. List-box opt-out
7. Reduced motion

Then the two group rules, then the menu block.
