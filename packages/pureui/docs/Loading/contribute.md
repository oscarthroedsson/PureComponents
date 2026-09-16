# Loading — contributing

## File

`packages/pureui/styles/loading.css`

## Structure

The key block is empty. Everything sits inside `&[aria-busy="true"]`, so the
class on its own paints nothing and the attribute is the only switch. The
variables are declared there for the same reason — they exist while the state
does. A consumer overrides them inline on the host element, which wins over
the block either way.

## How the sweep works

The glow is a `::after` pseudo-element covering the host, carrying a
`linear-gradient` band held in the middle of an image twice the width of the
box. The animation moves `background-position`, not the element.

The alternative — a narrow absolutely positioned box translating across — has
to be clipped by the host, and putting `overflow` on someone else's component
while it loads is not this file's to do.

`border-radius: inherit` makes the glow follow whatever corner the host
already has, so it fits a sharp button and a round avatar without knowing
which it is on.

`pointer-events: none` keeps the overlay from swallowing clicks.

## Keyframes

`@keyframes loading-sweep` sits outside the rule. `@keyframes` registers a
globally scoped name, and a parser that meets it inside a style rule drops it
without a word.

`100%` puts the band at the leading edge and `0%` at the trailing one, so
counting down runs it left to right. The extra 50% at either end carries it
fully off the box before it turns around.

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--loading-opacity` | `0.55` | Host fade. |
| `--loading-glow` | `rgb(255 255 255 / 0.6)` | Band colour. |
| `--loading-angle` | `100deg` | Band angle. |
| `--loading-duration` | `1.4s` | One pass. |

`--loading-glow` is a translucent overlay expressed as a component variable,
which is the allowance the colour rule makes for exactly this.

## Reduced motion

The animation is removed and the band is held at `65% 0` — just off the
middle, so it reads as a sheen rather than a stripe across the element.
