# Tooltip

A short label that appears beside its trigger on hover or keyboard focus. It
positions itself against the trigger with CSS anchor positioning and shows
itself as a popover, so no script is involved.

## Quick start

```html
<button class="pu-btn btn-md" aria-describedby="save-tip" interestfor="save-tip">
  Save
  <span id="save-tip" class="pu-tooltip" role="tooltip" popover="hint">
    Writes the current draft
  </span>
</button>
```

## Markup

The tooltip must be a **direct child of its trigger**. That is what lets the
trigger become the anchor.

The trigger carries `aria-describedby` pointing at the tooltip's `id`, and
`interestfor` with the same value. The tooltip carries `role="tooltip"`,
that `id`, and `popover="hint"`.

## Classes

| Class | Does |
|---|---|
| `.pu-tooltip` | The key. Nothing applies without it. |
| `tooltip-sm` | Extra small text. |
| `tooltip-md` | The default. The base already gives this. |
| `tooltip-lg` | Larger text. |

## Attributes

| Attribute | Does |
|---|---|
| `data-placement="top"` | Preferred side. The default. |
| `data-placement="right"` | |
| `data-placement="bottom"` | |
| `data-placement="left"` | |

Each placement declares fallbacks, so a tooltip that will not fit on its
preferred side flips to one that does.

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--tooltip-offset` | `0.5em` | Gap between the tooltip and its trigger. |

```html
<span class="pu-tooltip" role="tooltip" popover="hint" style="--tooltip-offset: 1em">
```

## Accessibility

- `role="tooltip"` and an `id` on the tooltip.
- `aria-describedby` on the trigger, pointing at that `id`. The tooltip is
  read as the trigger's description.
- The trigger must be focusable. A tooltip on something no one can focus is
  unreachable by keyboard.
- Never put the only copy of important information here. A tooltip is
  supplementary.
- Do not put interactive content inside one — it cannot be reached.
- Motion is dropped under `prefers-reduced-motion`.

## Browser support

`:interest-source` drives the show delay where it exists. Where it does not,
a `:hover, :focus-visible` fallback shows the tooltip without the delay.

## Examples

### Placements

```html
<button class="pu-btn btn-md" aria-describedby="tip-r" interestfor="tip-r">
  Right
  <span id="tip-r" class="pu-tooltip" role="tooltip" popover="hint" data-placement="right">
    Opens the panel
  </span>
</button>
```

### Sizes

```html
<span class="pu-tooltip tooltip-sm" role="tooltip" popover="hint">Small</span>
<span class="pu-tooltip tooltip-md" role="tooltip" popover="hint">Medium</span>
<span class="pu-tooltip tooltip-lg" role="tooltip" popover="hint">Large</span>
```
