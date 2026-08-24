# Textarea — how it is built

## It does not describe the box twice

Every measurement comes from the channel, with the same `var(--form-*, …)`
fallback pattern `input.css` uses. What is written here is only what more than
one line changes: the height floor, the resize axis, and content sizing.

## The radius cap

```css
--textarea-radius-max: calc((1lh + (padding-block * 2) + (border-width * 2)) / 2);
border-radius: min(var(--textarea-radius), var(--textarea-radius-max));
```

That expression is the height of a **one-line** control at the same scale,
halved — which is exactly the radius `rounded` resolves to on an input. So a
rounded textarea and a rounded input carry the same corner instead of the
textarea becoming a stadium.

`select.css` caps its menu radius the same way, and cites this file for it.

## The height floor is 2lh, not a pixel value

`2lh` is two lines of the element's own line-height, so the floor tracks every
size class for free. `input.css` uses `1lh` in the same expression. Neither
file knows the other's number.

## resize is never set to none in the base

Only the axis is restricted, to `block`. `data-resize` lets a consumer opt
into `none` or `both`, and `:disabled` sets `none` — a control that cannot be
typed into has nothing to make room for.

## data-sizing="content" is opt-in

`field-sizing: content` is not universally supported, and a box that silently
does not grow is better than one that requires it. `rows` stays on the element
so the unsupported path still has a sensible height.

`--textarea-max-block-size` defaults to `none` on purpose: a box that stops
growing and starts scrolling at a height the consumer did not choose is worse
than one that keeps going.

## Design tokens

`--font-size-*`, `--line-height-base`, `--radius-*`, `--color-neutral-*`,
`--color-error`, `--transition-fast`.
