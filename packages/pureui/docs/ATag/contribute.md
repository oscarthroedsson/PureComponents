# Link — contributing

## File

`packages/pureui/styles/a-tag.css`

## Structure

One key block, in the standard order: variables, base, states. There is no
size section — the link inherits its type size from context, and giving it
one of its own would break it out of the paragraph it sits in.

`.pu-link:where(a)` requires the anchor. A link that does not navigate is
worse for keyboard and screen reader users than one that does, which is the
test for requiring an element.

## The underline

The underline is a `::before` pseudo-element rather than `text-decoration`,
so it can grow from the start edge instead of fading in. `inline-size` goes
from `--link-underline-rest-size` to `100%` on hover.

A consumer cannot select `::before`, which is why every part of it is a
variable: colour, thickness, offset, and the resting width. Setting
`--link-underline-rest-size: 100%` gives a link that is underlined at rest
and still animates its colour.

Positioning uses logical properties — `inset-inline-start` and
`inset-block-end` — so the underline starts at the correct edge in both
writing directions.

## Variables

| Variable | Default |
|---|---|
| `--link-color` | `var(--color-text)` |
| `--link-hover-color` | `var(--color-primary)` |
| `--link-underline-color` | `var(--link-hover-color)` |
| `--link-underline-size` | `1px` |
| `--link-underline-rest-size` | `0px` |
| `--link-underline-offset` | `2px` |
| `--link-transition-duration` | `300ms` |

`--link-underline-color` defaults to the hover colour rather than to a token
of its own, so changing `--link-hover-color` alone keeps the two in step.

## Constraints

- No `&.md` block. The base is the only size, and the component has no size
  vocabulary.
- Both transitions are removed under `prefers-reduced-motion`, on the element
  and on the pseudo-element.
- Focus comes from `main.css`. This file draws no outline.
