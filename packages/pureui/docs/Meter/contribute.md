# Meter — contributing

## File

`packages/pureui/styles/meter.css`

## Two blocks

```
.pu-meter:where(meter)   the element
.pu-meter-wrapper        label and value layout
```

## Key

```css
.pu-meter:where(meter)
```

`<meter>` carries its value, its range state and its announcement. A styled
`<div>` carries none of it, and the three range states in particular cannot be
reproduced without re-implementing what the browser already decides.

## The engines build a meter differently

Their selectors can never share a rule. A selector list holding one unknown
pseudo-element is dropped whole, so a `-webkit-` and a `-moz-` selector
written together apply in **neither**. One rule each.

**Chromium and WebKit** — a groove pseudo-element, and one value
pseudo-element per range state:

```
::-webkit-meter-inner-element
::-webkit-meter-bar                    the groove
::-webkit-meter-optimum-value
::-webkit-meter-suboptimum-value
::-webkit-meter-even-less-good-value
```

**Firefox** — one value pseudo-element, with the range state as a pseudo-class
on the element:

```
::-moz-meter-bar
:-moz-meter-sub-optimum::-moz-meter-bar
:-moz-meter-sub-sub-optimum::-moz-meter-bar
```

Firefox has no groove pseudo-element. `background-color:
var(--meter-track-color)` on the key is the groove there.

## The radius is written out, not inherited

Unlike `progress.css`, each value pseudo-element declares
`border-radius: var(--meter-radius)` itself. A meter's value pseudo-element
does not pick up the groove's radius through `inherit`, which leaves the
filled bar square at the end it stops at.

## `box-sizing: content-box`

The padding sits outside the declared height, so `--meter-block-size` is the
height of the bar itself rather than of the bar plus its inset. The two
padding variables are derived from it as percentages, so a small meter gets a
proportionally small inset.

The base also writes `padding-block: 0.1rem` and `padding-inline: 0.3rem`
directly, alongside the derived variables.

## Width

`inline-size: 100%` on the element. Width is controlled on the wrapper, which
is what the comment in the file records.

## Order inside the block

1. Variables — frame, value, colours
2. Base
3. Colour variants
4. Size
5. Radius
6. Vendor pseudo-elements, one rule each
7. Reduced motion

The vendor rules come last because they are the longest section and the
variables above are what they read.

## The wrapper

```css
grid-template-columns: minmax(0, 1fr) auto;

& > .pu-meter { grid-column: 1 / -1; }
```

Label and value on one row, meter spanning both columns. Identical in shape to
`.pu-progress-wrapper`, deliberately — the two components should not look like
different libraries when they sit on the same page.

## Variables

| Variable | Default |
|---|---|
| `--meter-block-size` | `1rem` |
| `--meter-padding-block` | `calc(--meter-block-size * 0.1)` |
| `--meter-padding-inline` | `calc(--meter-block-size * 0.3)` |
| `--meter-radius` | `var(--radius-full)` |
| `--meter-transition` | `300ms ease` |
| `--meter-color` | `var(--color-primary)` |
| `--meter-suboptimum-color` | `var(--color-warning)` |
| `--meter-poor-color` | `var(--color-error)` |
| `--meter-track-color` | `var(--color-surface-muted)` |

`data-color` and the size classes move `--meter-color` and
`--meter-block-size` respectively. The two range colours are not exposed
through classes — a consumer who wants them different sets the variables.

## Meter or progress

A meter is a reading within a known range and can move either way. Progress
goes from nothing to done and only forward. They are announced differently,
and `meter.css` should never grow an indeterminate state — a measurement
without a value is not a measurement.
