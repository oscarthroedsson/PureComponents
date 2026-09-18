# Motion — contributing

## Files

- `Motion/motion.css` owns the `pu-motion` key, timing variables, triggers,
  scope, and reduced-motion policy.
- `fade.css`, `scale.css`, `slide.css`, and `expand.css` own effects.
- `Motion/index.css` is the public all-motion entry point.

## One progress value

Every trigger only changes `--motion-progress` from `0` to `1`. Effects read
that value and never repeat trigger selectors. This makes the system grow as
effects plus triggers rather than effects multiplied by triggers.

## Scope

The key itself is the target when `data-motion-scope` is absent or `self`.
`children` targets direct children. Do not add arbitrary selector strings to
the attribute; CSS cannot safely interpret them. A deeper target needs a
wrapper or a separately agreed part API.

## Effects are explicit

CSS does not parse arbitrary effect names. Every supported `data-motion` value
must have one documented selector block. Expand is collection-only and requires
`data-motion-scope="children"`.

Expand has two layout contracts. `data-motion-layout="overlay"` (the default)
changes child `translate`, so the host and surrounding geometry stay fixed.
`data-motion-layout="reflow"` removes that travel and animates the host's row
or column gap instead, so normal layout moves surrounding content. At progress
`0` both modes have the same geometry; reflow never reserves its expanded
space at rest.

`--motion-expand-reflow` is the numeric switch behind the attribute. A
CSS-only composition may set it directly when another state, such as a view
radio, chooses the layout mode. Existing collection gaps are mapped through
`--motion-expand-rest-column-gap` and `--motion-expand-rest-row-gap` so the
effect does not have to know its consumer's component styles.

## State remains semantic

Use native and ARIA state first. `pressed` reads `aria-pressed="true"`,
`expanded` reads `open` or `aria-expanded="true"`, and `checked` reads
`:checked`. `data-motion-state="active"` is only the escape hatch for a state
the platform cannot express.

## Reduced motion

The core sets duration, delay, and stagger to `0ms`; it does not force progress
back to zero. Behaviour remains available without travel.
