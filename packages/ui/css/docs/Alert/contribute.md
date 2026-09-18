# Alert — contributing

## File

`packages/ui/css/styles/alert.css`

## Key

`.pu-alert` is a plain class. HTML has no alert element — `role="alert"` and
`role="status"` are what carry the meaning, and they belong in the markup.

## The grid reshapes itself

The base declares one column and one area:

```css
grid-template-columns: minmax(0, 1fr);
grid-template-areas: "content";
```

Three `:has()` rules add the columns that are actually present — icon,
actions, or both. Nothing needs a modifier class, and an alert cannot end up
with a column reserved for a part that is not there.

`minmax(0, 1fr)` rather than `1fr` on the content column, so a long
unbreakable string cannot push the grid wider than its container.

`min-width: max-content` on `.alert-actions` keeps buttons from wrapping
mid-word when the message is long.

## Everything derives from one accent

```css
--alert-bg: color-mix(in oklab, var(--alert-accent) 12%, var(--alert-surface));
--alert-border: color-mix(in oklab, var(--alert-accent) 48%, var(--alert-surface));
```

An intent block sets only `--alert-accent`. The fill, the border and the icon
colour follow from it, so a new intent is one declaration and a consumer
re-tinting the component is one inline variable.

The leading edge is `border-inline-start-width: 0.3em` on the same border, not
a separate element or a pseudo-element.

## `.alert-title` refuses headings

```css
.alert-title:where(:not(h1, h2, h3, h4, h5, h6))
```

An alert is a live region — `role="alert"` or `role="status"` announces the
whole box, so the title adds nothing to it and costs a phantom entry in the
document outline that screen reader users land on with the H key. The
`:where()` keeps the key at 0-1-0 and refuses to style `h1`–`h6`, which is the
only enforcement CSS has.

The exception is a page-level error summary, which is a real section and does
want a heading. That is a different component from a notice.

`badge.css` and `pill.css` take the same position.

## Order inside the block

1. Variables
2. Base, including `@starting-style`
3. Layout `:has()` rules
4. Parts
5. Size
6. Intent
7. Variants — `alert-outline`, `alert-filled`
8. Shape
9. States
10. Media queries

## `alert-filled`

```css
color: var(--alert-accent-foreground);
color: contrast-color(var(--alert-accent));
```

Two declarations of the same property on purpose. The first is the fallback;
the second replaces it where `contrast-color()` is supported and picks the
readable side automatically. A browser that does not know the function drops
the second declaration and keeps the token.

`--alert-text` and `--alert-muted` are re-pointed at `currentColor` inside the
variant, so the parts follow whichever of the two won.

## Entry and exit

`@starting-style` gives the entry something to animate from, so an alert
inserted into the DOM fades and slides in without script.

`[data-state="closing"]` is the exit. It also sets `pointer-events: none`, so
a closing alert cannot be clicked on its way out.

Under `prefers-reduced-motion` the duration goes to `0ms` **and**
`@starting-style` is neutralised — otherwise the element would still jump from
the offset position.

## Variables

| Variable | Default |
|---|---|
| `--alert-accent` | `var(--color-info)` |
| `--alert-accent-foreground` | `var(--color-info-foreground)` |
| `--alert-surface` | `var(--color-surface-sunken)` |
| `--alert-text` | `var(--color-text)` |
| `--alert-muted` | `var(--color-text-muted)` |
| `--alert-bg` | 12% accent over surface |
| `--alert-border` | 48% accent over surface |
| `--alert-radius` | `var(--radius-md)` |

## Relationship to Toast

`toast.css` is a placement and motion wrapper around this component. A toast
is a `.toast` box holding a `.pu-alert`. Anything about the notice itself
belongs here; anything about where it sits or how it flies belongs there.

## Media queries

- `prefers-reduced-motion` — transitions and the starting style removed.
- `prefers-contrast: more` — border to 2px, leading edge to 0.35em.
- `forced-colors: active` — Canvas and CanvasText throughout, icon to
  `currentColor`.
