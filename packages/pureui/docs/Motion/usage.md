# Motion

Composable CSS motion. Add the `pu-motion` key and choose an effect, one or
more triggers, and a scope.

```html
<button class="pu-motion" data-motion="press" data-motion-on="active">
  Hold me
</button>
```

## API

| Attribute | Values | Does |
|---|---|---|
| `data-motion` | `fade-in` · `scale-in` · `press` | Opacity and scale effects. |
| `data-motion` | `slide-left` · `slide-right` · `slide-up` · `slide-down` | Slides into the resting position. |
| `data-motion` | `expand-left` · `expand-right` · `expand-horizontal-center` | Spreads direct children horizontally. |
| `data-motion` | `expand-up` · `expand-down` · `expand-vertical-center` | Spreads direct children vertically. |
| `data-motion-on` | space-separated trigger tokens | Chooses what drives the effect. |
| `data-motion-scope` | `self` · `children` | The host is the default; `children` targets direct children. |
| `data-motion-layout` | `overlay` · `reflow` | Expand over surrounding content or move it. The default is `overlay`. |
| `data-motion-state` | `active` | Escape hatch used with the `state` trigger. |

Trigger tokens: `hover`, `focus`, `focus-within`, `active`, `pressed`,
`expanded`, `checked`, and `state`.

`pressed`, `expanded`, and `checked` read native or ARIA state. They do not
replace it. `active` means the native `:active` pseudo-class — the time while a
pointer or key holds the control down.

## Children

```html
<div class="pu-motion"
     data-motion="fade-in"
     data-motion-on="hover focus-within"
     data-motion-scope="children">
  <span>One</span>
  <span>Two</span>
</div>
```

The trigger belongs to the parent. No separate `parent-hover` or
`parent-active` attribute is needed.

## Expand layout

Choose whether an expand effect is layout-neutral or changes the collection's
real footprint:

```html
<div class="pu-motion"
     data-motion="expand-right"
     data-motion-layout="reflow"
     data-motion-on="hover focus-within"
     data-motion-scope="children">
  <button>One</button>
  <button>Two</button>
</div>
```

`overlay` translates the children and leaves surrounding geometry untouched.
`reflow` animates the space between the children, so adjacent content moves.
Both begin at the same resting geometry; reflow does not reserve expanded
space before the trigger becomes active.

## Variables

| Variable | Default | Does |
|---|---|---|
| `--motion-duration` | `var(--duration-medium)` | Transition duration. |
| `--motion-easing` | `var(--ease-standard)` | Timing function. |
| `--motion-delay` | `0ms` | Delay before every target. |
| `--motion-stagger` | `0ms` | Additional delay per direct child. |
| `--motion-distance` | `1rem` | Shared slide distance and expand-step fallback. |
| `--motion-expand-step` | `var(--motion-distance)` | Additional distance between expanded neighbours. |
| `--motion-expand-reflow` | `0` | Layout mode as a numeric composition hook: `0` is overlay and `1` is reflow. |
| `--motion-expand-rest-column-gap` | `0px` | Existing horizontal gap retained by expand. |
| `--motion-expand-rest-row-gap` | `0px` | Existing vertical gap retained by expand. |
| `--motion-scale-from` | `0.85` | Resting scale for `scale-in`. |
| `--motion-press-scale` | `0.95` | Active scale for `press`. |

Under `prefers-reduced-motion: reduce`, duration, delay, and stagger become
`0ms`. State still changes, so content never becomes unreachable.
