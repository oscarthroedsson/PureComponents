# Progress — contributing

## File

`packages/ui/css/styles/progress.css`

## Four blocks

```
:is(.pu-progress, .pu-progress-bar)   variables, colours, sizes, shapes
.pu-progress:where(progress)          the native element
.pu-progress-bar                      the div form
.pu-progress-wrapper                  label and value layout
```

The shared block comes first so both forms take the same vocabulary from one
place. Nothing in it paints — it only sets variables, which is what lets a
size or colour class work on either key without being written twice.

## The fill derives the track

```css
--progress-base: var(--color-primary);
--progress-fill: var(--progress-color, var(--progress-base));
--progress-track: var(--progress-track-color, color-mix(in oklab, var(--progress-fill) 18%, transparent));
```

Three levels, and each is an escape hatch for the one below.

- `--progress-base` is what the colour classes and `data-color` move.
- `--progress-color` lets a consumer override the fill without touching the
  named colours.
- `--progress-track-color` does the same for the track, which is otherwise
  derived from whatever the fill ended up being.

Setting the fill alone re-tints both, which is the common case.

## Vendor pseudo-elements never share a rule

A selector list holding one unknown pseudo-element is dropped whole, so a
`-webkit-` and a `-moz-` selector written together apply in **neither**
engine. They get one rule each, always.

The engines also disagree on what the value element is:

- Chromium and WebKit: `::-webkit-progress-bar` is the track,
  `::-webkit-progress-value` is the fill.
- Firefox: `::-moz-progress-bar` is the **fill**, and the track is the
  element's own background.

`background-color: var(--progress-track)` on the key is what gives Firefox its
track.

## `border-radius: inherit`

On every value pseudo-element. It is what keeps the radius variants down to a
single custom property instead of a rule per engine.

## Indeterminate

```css
&:indeterminate {
  background-image: linear-gradient(90deg, transparent, var(--progress-fill) 50%, transparent);
  animation: progress-indeterminate …;
}
```

The sweep rides on the element's own background, so both engines show the same
thing once their value pseudo-element is taken out of the way — which is what
the three `background-color: transparent` rules inside the block do.

`@keyframes progress-indeterminate` sits at top level. `@keyframes` registers
a globally scoped name and a parser that meets it inside a style rule drops it
without a word.

Under `prefers-reduced-motion` the image and the animation are both removed. A
still sweep would read as a half-filled bar, which is a different claim.

## The non-native bar

For segments, a value animated on its own terms, or content inside the bar.
`.progress-fill` is a block child whose `inline-size` the consumer sets.

It carries no semantics. The ARIA the native element gets for free has to be
written into the markup, and the usage docs say so in the one place it
matters.

## The wrapper

```css
grid-template-columns: minmax(0, 1fr) auto;

& > :is(.pu-progress, .pu-progress-bar) { grid-column: 1 / -1; }
```

Label and value on one row, bar spanning both columns. `minmax(0, 1fr)` so a
long label cannot push the value off the end. `font-variant-numeric:
tabular-nums` on the value so the number does not shift as it counts.

## The alias classes

`progress-success`, `progress-error` and `progress-warning` set the same
variable `data-color` does. They exist so markup written against the classes
goes on working; `data-color` is the form to reach for.

## Variables

| Variable | Default |
|---|---|
| `--progress-base` | `var(--color-primary)` |
| `--progress-color` | unset |
| `--progress-fill` | `--progress-color`, else `--progress-base` |
| `--progress-track-color` | unset |
| `--progress-track` | 18% of the fill |
| `--progress-radius` | `var(--radius-full)` |
| `--progress-size` | `1rem` |
