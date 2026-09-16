# Box — contributing

## File

`packages/pureui/styles/Layout/box.css`

First file in `Layout/`. A layout class is not a component: it carries no
semantics, no colour and no state, and it is meant to sit on an element the
consumer already has.

## Key

`.pu-box` is a plain class. HTML has no element that means "some padding", and
a box is legitimately a `<div>`, a `<section>`, an `<article>` or an `<aside>`
— the content decides, not the spacing.

## Four side variables, one source

```css
--box-padding: var(--spacing-100);

--box-padding-block-start: var(--box-padding);
--box-padding-block-end: var(--box-padding);
--box-padding-inline-start: var(--box-padding);
--box-padding-inline-end: var(--box-padding);
```

The base writes `padding` once, from those four. Size classes move
`--box-padding`; side classes move the four. Neither ever writes `padding`
itself, so a size and a side can never fight over the same property — the size
decides how much, the side decides where.

## The side mechanism

Two rules, in this order, and the order is the whole thing:

```css
&:is(.box-x, .box-y, .box-top, .box-bottom, .box-start, .box-end) {
  --box-padding-block-start: var(--spacing-0);
  --box-padding-block-end: var(--spacing-0);
  --box-padding-inline-start: var(--spacing-0);
  --box-padding-inline-end: var(--spacing-0);
}

&.box-x { --box-padding-inline-start: …; --box-padding-inline-end: …; }
&.box-top { --box-padding-block-start: …; }
…
```

The first fires as soon as **any** side class is present and clears all four.
The individual classes then hand back only the sides they name.

`:is()` with class arguments weighs (0,2,0), exactly what `&.box-x` weighs, so
source order decides and the rules below win. That is why the clearing rule
must stay above them.

### Why not the obvious way

The direct reading of "box-top means padding at the top only" is a rule that
zeroes the three sides it does not name. It works for one class and breaks for
two: `box-top box-bottom` would have each zeroing the other's side, leaving a
box with no padding at all. `box-x box-y` the same.

Clearing first and adding back composes instead. `box-top box-bottom` is the
same box as `box-y`, and `box-x box-y` is the same as neither — which is what a
reader expects and what the demo page shows side by side.

## `box-sizing: border-box`

The padding is inside the declared width. A box that is given a size by its
parent — a grid track, a flex basis — must not grow past it because of its own
padding.

## What the file deliberately does not have

- **No `display`.** Setting one would change the layout of whatever the box is
  put on by default, which is the one thing a spacing class must not do.
- **No width, no background, no border.** Those belong to the thing inside, or
  to the consumer.
- **No states.** A box has none. There is no `:hover`, no `:disabled`, and no
  focus indicator, because a box is never interactive.
- **No `@keyframes`, no `prefers-reduced-motion`.** Nothing animates.

`css-file.md` lists States as always required because focus alone makes it
non-optional. That reasoning does not reach a class that cannot take focus and
cannot be operated.

## `box-none` is a real size

Not an absence. It sets `--box-padding` to `--spacing-0`, so the corner and the
side machinery keep working — `box-none box-x` is a box with no padding
anywhere, which falls out correctly rather than needing a rule.

## Shape

`box-rounded` points at `--radius-rounded`, like every other rounded class.
A box has no known height, so a 999px corner would resolve to half of whatever
it happens to be and a tall box would turn into a lozenge. The corner is
therefore capped:

```css
--box-radius-max: var(--radius-lg);
border-radius: min(var(--box-radius), var(--box-radius-max));
```

`card.css`, `alert.css`, `dialog.css`, `accordion.css`, `collapsible.css` and
the Tabs panel use the same cap. `textarea.css` is where the pattern comes
from.

## Order inside the block

1. Variables
2. Base
3. Size
4. Shape
5. Sides — the clearing rule, then the six individual ones

Sides come last because they read `--box-padding`, which the size section has
already settled.

## One key per element

A box writes `padding` and `border-radius`. So does almost every component in
the library. Put `.pu-box` and `.pu-card` on one element and both write the same
properties at (0,1,0), and file order decides — not the markup.

This is the reason the library namespaces every modifier to its component:
`box-lg` and `card-lg` can sit on one element and mean two different things
without colliding. The property collision is a separate problem and namespacing
does not solve it, which is why the docs say to wrap rather than to combine.

## Boundary with the other Layout files

`box.css` owns padding and radius. `layout.css` owns the optional layout and
gap attributes on `.pu-box`; `behavior.css` owns the optional behavior
attributes on its direct children. Keep their public APIs in their own docs
instead of duplicating them here.

Inside `box.css`, `--box-padding` and the four side variables remain the
pattern to follow: a class sets variables, the base writes the property once.
A rule that writes `padding` directly would reintroduce exactly the collision
this file is built to avoid.
