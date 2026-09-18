# Meter

A measurement within a known range — disk used, score, capacity. It is a
native `<meter>`, so the browser handles the value and the announcement.

A meter is not progress. Progress goes from nothing to done and only forward.
A meter is a reading that can move either way.

## Quick start

```html
<meter class="pu-meter meter-md" value="0.7" min="0" max="1">70%</meter>
```

The text inside is the fallback for browsers that cannot render a meter.

## Classes

| Class | Does |
|---|---|
| `.pu-meter` | The key. Requires `<meter>`. |
| `meter-sm` | 0.5rem tall. |
| `meter-md` | 1rem tall. The default. |
| `meter-lg` | 1.5rem tall. |
| `meter-sharp` | Square ends. |
| `meter-smooth` | Slightly rounded ends. |
| `meter-rounded` | Fully round ends. The default. |
| `.pu-meter-wrapper` | Grid wrapper for a meter with a label and a value. |
| `.meter-label` | The label. |
| `.meter-value` | The readout, aligned to the end. |

## Attributes

| Attribute | Does |
|---|---|
| `data-color="primary"` | The default. |
| `data-color="success"` | |
| `data-color="error"` | |
| `data-color="warning"` | |
| `data-color="info"` | |

`data-color` sets the **optimum** colour. The other two come from the range.

## The three ranges

`<meter>` has `low`, `high` and `optimum`, and the browser decides which of
three states the value is in. Each gets its own colour.

```html
<meter class="pu-meter meter-md" value="0.85" min="0" max="1"
       low="0.3" high="0.8" optimum="0.2">85%</meter>
```

| State | Colour |
|---|---|
| Optimum | `--meter-color` |
| Suboptimum | `--meter-suboptimum-color` |
| Poor | `--meter-poor-color` |

Note that `optimum` says which end is good. With `optimum="0.2"` a low reading
is the good one — which is what you want for disk usage.

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--meter-block-size` | `1rem` | Bar height. |
| `--meter-padding-block` | 10% of the height | Vertical inset. |
| `--meter-padding-inline` | 30% of the height | Horizontal inset. |
| `--meter-radius` | `var(--radius-rounded)` | End shape. |
| `--meter-transition` | `300ms ease` | Value timing. |
| `--meter-color` | `var(--color-primary)` | The optimum fill. |
| `--meter-suboptimum-color` | `var(--color-warning)` | The middle range. |
| `--meter-poor-color` | `var(--color-error)` | The bad range. |
| `--meter-track-color` | `var(--color-surface-muted)` | The track. |

```html
<meter class="pu-meter meter-md" value="0.4" style="--meter-color: var(--color-accent)">40%</meter>
```

## Width

The meter fills its container. Control the width on the wrapper, not on the
meter.

```html
<div style="inline-size: 20rem">
  <meter class="pu-meter meter-md" value="0.7">70%</meter>
</div>
```

## With a label

```html
<div class="pu-meter-wrapper">
  <span class="meter-label" id="disk-label">Disk used</span>
  <span class="meter-value">70%</span>
  <meter class="pu-meter meter-md" value="0.7" min="0" max="1"
         aria-labelledby="disk-label">70%</meter>
</div>
```

The value uses tabular figures so the number does not shift as it changes.

## Accessibility

- Give the meter an accessible name — `aria-labelledby` pointing at a visible
  label, or `aria-label`.
- Put the reading in text as well as in the bar. The three range colours are
  not enough on their own, and they are not distinguishable to every user.
- The text inside the element is a fallback, not a label. It is only shown
  where `<meter>` is unsupported.
- Use `<meter>` for a measurement and `<progress>` for a task. They are
  announced differently and swapping them misleads.
- Transitions are removed under `prefers-reduced-motion`.

## Examples

### Sizes

```html
<meter class="pu-meter meter-sm" value="0.6">60%</meter>
<meter class="pu-meter meter-md" value="0.6">60%</meter>
<meter class="pu-meter meter-lg" value="0.6">60%</meter>
```

### Colours

```html
<meter class="pu-meter meter-md" value="0.6" data-color="success">60%</meter>
<meter class="pu-meter meter-md" value="0.6" data-color="info">60%</meter>
```

### Shape

```html
<meter class="pu-meter meter-md meter-sharp" value="0.6">60%</meter>
<meter class="pu-meter meter-md meter-rounded" value="0.6">60%</meter>
```

### Disk usage, where low is good

```html
<div class="pu-meter-wrapper">
  <span class="meter-label" id="disk">Disk used</span>
  <span class="meter-value">92%</span>
  <meter class="pu-meter meter-md" value="0.92" min="0" max="1"
         low="0.5" high="0.85" optimum="0.2" aria-labelledby="disk">92%</meter>
</div>
```
