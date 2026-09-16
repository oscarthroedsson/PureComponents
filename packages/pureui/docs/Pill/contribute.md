# Pill — contributing

## File

`packages/pureui/styles/pill.css`

## Key

`.pu-pill` is a plain class, and it legitimately sits on `button`, `a`,
`label`, `span` and `li`. A removable tag holds its own remove `<button>`,
and a `<button>` cannot contain a `<button>` — which is why the container
forms exist.

The state block narrows to `:is(button, a, label)` rather than the key
handling everything, so the container forms get no hover and no pointer.

## Hover and active are variables

This is a specificity decision, not a taste one.

`.pu-pill.pill-outline` is (0,2,0) and `.pu-pill:hover` is (0,1,1). A state
that wrote `--pill-background` directly would lose to every variant, and
`pill-outline` would have had no hover at all.

So each variant writes its own `--pill-background-hover` and
`--pill-background-active` pair, and the state block only ever swaps which
one is in play. A variant that only dropped the fill would hover back to the
neutral step and stop looking like itself the moment the pointer arrived.

## `:is(button, a, label)` does two jobs

It keeps hover and the pointer away from the `<span>` and `<li>` forms, and
it raises those rules to (0,2,1) — above the (0,2,0) of every variant — so
`pill-outline` and `pill-ghost` keep their hover.

## Order inside the block

1. Variables
2. Base
3. Content — icons, flattened children, the wrapped input
4. Size
5. Shape — after size, so it replaces the radius the size carries
6. Variants
7. States — hover, active, disabled
8. Selected — **after** the variants
9. The selection marker
10. The remove control

Selected must come after the variants. Written before them the two tie on
specificity and source order hands it to the variant, which is how a selected
pill ends up looking unselected.

## The border is always there

One border, transparent when a variant wants none. Toggling the width instead
moves the box by 2px when the variant changes, which is visible in a row
where only one pill is outlined.

## The height floor

```css
min-block-size: calc(
  1lh + (var(--pill-padding-block) * 2) + (var(--pill-border-width) * 2)
);
```

A floor, not a height. It holds the box the same whether the consumer wrote
bare text or wrapped it in an element, since the `text-box` trim only reaches
a wrapped child and never the anonymous flex item bare text becomes. It is
also why the trim needs no `@supports` guard.

## The wrapped input

The input is absolute and covers the whole pill. That is a focus-ring
decision, not a layout one.

The ring is drawn once, globally, in `main.css`, around whichever element has
focus. In the `<label>` form that element is the input. At 1px the keyboard
ring would trace an invisible point beside the pill; at full size it traces
the pill itself. So the ring stays where it belongs and this file never draws
one of its own.

It inherits `--pill-radius`, because an outline follows the border radius of
the box it is drawn around — without it a rounded pill gets a square ring.

It is taken out of the flow with `opacity`, not hidden. `display: none` and
`visibility: hidden` both drop it from the tab order, and a filter you cannot
reach by keyboard is not a filter.

`position: relative` on the key is what the absolute input resolves against.

## The selection marker

Guarded by `:is(:has(input:is([type="checkbox"], [type="radio"])),
[aria-pressed])`, so only a pill that can actually be selected grows one. A
plain action pill never does.

It is present at both states and only its opacity changes, so selecting does
not resize the pill. `line-height: 1` holds the glyph in the line box so it
cannot drag the height.

`--pill-selected-marker` is content rather than a colour, so it is a string
and a consumer can swap in their own glyph.

## The remove control

`.pill-remove` lives inside the key block because it has no meaning outside a
pill — on its own it is not a component.

Its negative `margin-inline-end` reaches back into the pill's own padding, so
the target clears 24px even though the glyph is 0.75em.

## The transition sits on the key

Declared on the key, not inside `:active`. Written there it applies on the
way in and never on the way out.

## `--pill-selected-color`

`var(--color-primary-foreground)`, measured 7.0:1 on the primary fill.

## Reduced motion

The whole file's motion is the press and the colour fades, and neither
carries information — the fill, the border and the marker say everything
without them. All of it is removed.
