# Separator — contributing

## File

`packages/ui/css/styles/separator.css`

## Key and element

`.pu-separator:where(hr)` requires the native `<hr>`. HTML already gives it
separator semantics, while `:where()` keeps the key inside the one-class
specificity budget.

Do not broaden the selector to `<div>` or `<span>`. A visual line without
native semantics either needs ARIA supplied by every consumer or becomes an
unannounced relationship. The native element handles the ordinary case with
no JavaScript and no extra role.

## Orientation contract

Horizontal is the base. `separator-vertical` changes only the two logical
sizes and adds `align-self: stretch` for Flex and Grid rows.

The modifier cannot change the accessibility tree. Every documented vertical
example must also carry `aria-orientation="vertical"`; every review should
check that the class and attribute remain paired.

## Containment contract

The separator takes available length but must never establish a larger parent:

- `flex: 0 1 auto` allows it to surrender length when siblings need the space;
- both minimum logical sizes are zero;
- horizontal length is capped at the parent's available inline size;
- the thickness axis is always `--separator-thickness`;
- horizontal length is `100%` and remains shrinkable;
- vertical length is automatic with `align-self: stretch`, so a Flex or Grid
  row establishes it from the row's existing cross size.

Do not add `flex-grow`, an intrinsic minimum, content, padding or default
margins. Any of those can turn the separator from a passive rule into a source
of layout size.

## Variables

All tuning stays on two variables declared at the top of the key block:

| Variable | Purpose |
|---|---|
| `--separator-thickness` | Thickness on the axis perpendicular to the rule. |
| `--separator-color` | The painted line colour. |

The one-pixel default is structural, so a raw pixel is intentional. Colour
must continue to come from a token. Do not add named colour modifiers; intent
belongs to content, while this component exposes colour as a visual override.

## Spacing ownership

Separator owns no margin. Space around it belongs to the surrounding layout,
normally `data-gap` on a parent. Adding separator spacing would create two
competing sources for the distance between siblings.

## States and focus

The component is static and has no interactive states, transitions or focus
surface. Do not make it focusable. Decorative instances use
`aria-hidden="true"` in markup; that attribute does not need a CSS rule.

## Verification

Check all of these in both stage themes:

- horizontal in normal flow and a vertical Flex layout;
- vertical between short and tall siblings in a horizontal Flex layout;
- both orientations in a bounded parent;
- an unbounded parent is not enlarged along the separator's length;
- custom thickness and colour;
- the vertical class is paired with `aria-orientation="vertical"`.
