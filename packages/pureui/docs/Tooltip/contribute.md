# Tooltip — contributing

## File

`packages/pureui/styles/tooltip.css`

## Structure

The file has three parts.

**The anchor rule.** A `:where()` rule gives any element that carries
`aria-describedby` and has a `.pu-tooltip` child an `anchor-name`. It is
wrapped in `:where()` so it costs no specificity, and it uses `anchor-scope`
so nested triggers do not capture each other's tooltips.

**The key block.** `.pu-tooltip` is a plain class — HTML has no element that
means "tooltip", so nothing is required through `:where()`. The block holds
the one variable, the base look, the four placements, the three sizes, and
the open state.

**Two `@supports` blocks.** `:interest-source` sets the show and hide delays
where the browser has it. The negated block provides a `:hover, :focus-visible`
fallback where it does not.

## Positioning

Placement is `position-area` against the anchor, not offsets. Each placement
also sets `position-try-fallbacks`, so the browser flips the tooltip to a side
where it fits rather than letting it overflow the viewport.

`max-width` is `min(24rem, calc(100vw - 1rem))`, so a long tooltip wraps
rather than running off a narrow screen.

## Visibility

The tooltip is a popover. `:popover-open` sets the visible state, and
`@starting-style` gives it something to animate from. `display` and `overlay`
are in the transition list with `allow-discrete`, which is what lets it fade
out instead of disappearing.

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--tooltip-offset` | `0.5em` | Applied as `margin`, so it holds on every side. |

## Constraints

- No radius token. The corner is `0.35em` so it tracks the font size — a
  small tooltip gets a proportionally small corner.
- Colours come from `--color-surface-inverted` and `--color-text-inverted`.
- `transition-duration` drops to `0ms` under `prefers-reduced-motion`.
