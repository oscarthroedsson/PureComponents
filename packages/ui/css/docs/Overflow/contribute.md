# Overflow — contributing

## File

`packages/ui/css/styles/overflow.css`

Overflow is an elementless utility key. It may sit on any block, flex or grid
container whose content can exceed an available size.

## Ownership

Overflow owns only the scroll container itself:

- its minimum and maximum participation sizes;
- which physical axis is user-scrollable;
- wrapping of long unbroken text for the vertical-only variant.

It must not set a fixed `inline-size`, `block-size`, `flex` value or grid track.
Those decisions belong to the surrounding layout. It must not select, size or
restyle descendants.

`main.css` owns the global `box-sizing: border-box` rule and the global focus
ring. Do not repeat either in this file.

## Axis contract

| Classes | X | Y |
|---|---|---|
| `pu-overflow` | `auto` | `auto` |
| `pu-overflow overflow-x` | `auto` | `hidden` |
| `pu-overflow overflow-y` | `hidden` | `auto` |
| `pu-overflow overflow-x overflow-y` | `auto` | `auto` |

The first axis rule closes both axes. Each utility then reopens the axis it
names, which makes the two utilities compose without a special-case selector.

Do not leave the unnamed axis at `visible`. CSS computes `visible` to `auto`
when the other axis is scrollable, which would turn a single-axis choice back
into a dual-axis scroll container.

## Specificity

Every axis selector uses `:where()` so the key remains within the one-class
specificity budget. A consumer can override the result with one plain class.

## Cascade layer

The package bundle imports Overflow in `pureui.utilities`, after components,
Layout and Behavior. This lets an explicit utility replace a component's base
overflow without `!important`.

When loaded as a standalone stylesheet, Overflow must follow any component
stylesheet whose overflow it should replace.

## Scroll-region boundaries

The element carrying `pu-overflow` is the scroll and clipping boundary. Keep
persistent headers, footers and controls outside that element. A surrounding
component may still provide its own border, radius or clipping, but those are
independent presentation concerns rather than Overflow behavior.

Leave enough inset inside the scroll region for descendant focus indicators;
Overflow does not add that spacing or restyle focusable content.

## Accessibility

Scrollable content must be reachable by keyboard. Documentation examples with
no interactive descendants make the region focusable with `tabindex="0"` and
give it an accessible name. The CSS key does not add focusability or semantics.
