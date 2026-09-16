# Progress

How far along a task is. Two forms: the native `<progress>` element, and a
`<div>` bar for the cases the native element cannot cover.

## Quick start

```html
<progress class="pu-progress progress-md" value="70" max="100"></progress>
```

## Which form

| Form | Use when |
|---|---|
| `.pu-progress` on `<progress>` | Almost always. The element carries its own role, value and announcement. |
| `.pu-progress-bar` on a `<div>` | You need segments, content inside the bar, or a value animated on its own terms. |

The non-native form has no semantics of its own. It needs the ARIA the native
element gets for free — see **Accessibility**.

## Classes

| Class | Does |
|---|---|
| `.pu-progress` | The native key. Requires `<progress>`. |
| `.pu-progress-bar` | The non-native key. |
| `.progress-fill` | The filled part, inside `.pu-progress-bar`. |
| `.pu-progress-wrapper` | Grid wrapper for a bar with a label and a value. |
| `.progress-label` | The label. |
| `.progress-value` | The readout, aligned to the end. |
| `progress-sm` | 0.5rem tall. |
| `progress-md` | 1rem tall. The default. |
| `progress-lg` | 1.5rem tall. |
| `progress-sharp` | Square ends. |
| `progress-smooth` | Slightly rounded ends. |
| `progress-rounded` | Fully round ends. The default. |

Sizes and colours work on both forms.

## Attributes

| Attribute | Does |
|---|---|
| `data-color="primary"` | The default. |
| `data-color="success"` | |
| `data-color="error"` | |
| `data-color="warning"` | |
| `data-color="info"` | |

## Indeterminate

A `<progress>` with no `value` shows a sweep instead of a fill.

```html
<progress class="pu-progress progress-md"></progress>
```

Under `prefers-reduced-motion` it falls back to a plain track. A still sweep
would read as a half-filled bar, which is a different claim.

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--progress-base` | `var(--color-primary)` | The colour the fill is taken from. |
| `--progress-color` | unset | Overrides the fill directly. |
| `--progress-fill` | `--progress-color`, else `--progress-base` | The fill. |
| `--progress-track-color` | unset | Overrides the track directly. |
| `--progress-track` | 18% of the fill | The track. |
| `--progress-radius` | `var(--radius-full)` | End shape. |
| `--progress-size` | `1rem` | Bar height. |

Setting `--progress-color` alone re-tints the fill and the track together,
because the track is derived from the fill.

```html
<progress class="pu-progress progress-md" value="40" max="100"
  style="--progress-color: var(--color-accent)"></progress>
```

## With a label

```html
<div class="pu-progress-wrapper">
  <span class="progress-label" id="upload-label">Uploading</span>
  <span class="progress-value">70%</span>
  <progress class="pu-progress progress-md" value="70" max="100"
    aria-labelledby="upload-label"></progress>
</div>
```

The label and value sit on one row above the bar, which spans both columns.
The value uses tabular figures, so the number does not shift as it counts.

## Accessibility

- Prefer `<progress>`. It carries `role="progressbar"`, its value, and the
  announcement without any attributes.
- Give it an accessible name — `aria-labelledby` pointing at a visible label,
  or `aria-label`.
- The `.pu-progress-bar` form needs the ARIA written out:

  ```html
  <div class="pu-progress-bar" role="progressbar"
       aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"
       aria-labelledby="upload-label">
    <span class="progress-fill" style="inline-size: 70%"></span>
  </div>
  ```

- A visible percentage next to the bar helps everyone, not only screen reader
  users.
- Do not rely on the colour alone to say a task failed. Say it in text.
- Transitions are removed under `prefers-reduced-motion`.

## Examples

### Sizes

```html
<progress class="pu-progress progress-sm" value="40" max="100"></progress>
<progress class="pu-progress progress-md" value="40" max="100"></progress>
<progress class="pu-progress progress-lg" value="40" max="100"></progress>
```

### Colours

```html
<progress class="pu-progress progress-md" value="40" max="100" data-color="success"></progress>
<progress class="pu-progress progress-md" value="40" max="100" data-color="error"></progress>
```

### Shape

```html
<progress class="pu-progress progress-md progress-sharp" value="40" max="100"></progress>
<progress class="pu-progress progress-md progress-rounded" value="40" max="100"></progress>
```

### The non-native bar

```html
<div class="pu-progress-bar progress-md" role="progressbar"
     aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"
     aria-label="Storage used">
  <span class="progress-fill" style="inline-size: 35%"></span>
</div>
```
