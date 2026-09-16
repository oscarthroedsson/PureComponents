# Range

A slider. The track shows how far along the value is, and the thumb is what
you drag.

## Quick start

```html
<input class="pu-range range-md" type="range" min="0" max="100" value="50" />
```

## The fill needs your value

The filled part of the track is drawn from `--range-value`, which the
stylesheet cannot compute. Set it as a percentage:

```html
<input class="pu-range range-md" type="range" min="0" max="100" value="70"
       style="--range-value: 70%" />
```

Keep it in step as the value changes:

```js
input.addEventListener("input", () => {
  const pct = ((input.value - input.min) / (input.max - input.min)) * 100;
  input.style.setProperty("--range-value", `${pct}%`);
});
```

Without it the fill sits at 50% regardless of the value. The thumb is still in
the right place — that part is the browser's.

## Classes

| Class | Does |
|---|---|
| `.pu-range` | The key. Requires `<input type="range">`. |
| `range-sm` | Thinner track. |
| `range-md` | The default. |
| `range-lg` | Thicker track. |
| `range-sharp` | Square track ends. |
| `range-smooth` | Slightly rounded. |
| `range-rounded` | Fully round. The default. |
| `range-primary` | Fill and thumb in the brand colour. |

Everything is derived from `--range-track-size`, so one size class moves the
track, the fill and the thumb together.

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--range-value` | `50%` | How far the fill reaches. **Set this from your script.** |
| `--range-fill` | `var(--color-border)` | The filled part. |
| `--range-track-size` | `1rem` | Overall height. Everything else derives from it. |
| `--range-track-color` | `var(--color-surface-muted)` | The track behind the fill. |
| `--range-track-radius` | `var(--radius-full)` | Track corner. |
| `--range-fill-radius` | `--range-track-radius` | Fill corner. |
| `--range-track-padding-block` | a quarter of the track | Inset above and below the fill. |
| `--range-track-padding-inline` | half the track | Inset at the ends. |
| `--range-fill-size` | derived | Fill height. |
| `--range-thumb-size` | three quarters of the track | Thumb. |
| `--range-thumb-color` | `var(--color-border-strong)` | Thumb. |
| `--range-thumb-border-width` | `1px` | Thumb border. |
| `--range-thumb-border-color` | `var(--color-border-strong)` | Thumb border. |

```html
<input class="pu-range range-md" type="range"
       style="--range-fill: var(--color-success); --range-value: 40%" />
```

## States

| State | Look |
|---|---|
| `:user-invalid` or `aria-invalid="true"` | The thumb turns to the error colour. |
| `:disabled` | Fill and thumb go muted, not-allowed cursor. |

A range has no border to turn red, so the thumb carries it — the part that
answers for the value. `:user-invalid` rarely fires here, because a range
always has a value, so `aria-invalid` is the path that matters.

## Accessibility

- Every range needs a label. See the Label docs.
- Show the value in text beside the slider. A slider with no readout is
  guesswork.
- Set `min`, `max` and `step` so the value is meaningful and the keyboard
  steps are sensible.
- Arrow keys, Home and End all work natively. Do not intercept them.
- Colour is never the only signal for an invalid range: pair `aria-invalid`
  with a `.pu-field-error`, which is what assistive technology hears.
- Where the units are not obvious, use `aria-valuetext` so the value is
  announced as "40 percent" rather than "40".

## Examples

### Sizes

```html
<input class="pu-range range-sm" type="range" />
<input class="pu-range range-md" type="range" />
<input class="pu-range range-lg" type="range" />
```

### Brand colour

```html
<input class="pu-range range-md range-primary" type="range" value="60"
       style="--range-value: 60%" />
```

### Shape

```html
<input class="pu-range range-md range-sharp" type="range" />
<input class="pu-range range-md range-smooth" type="range" />
<input class="pu-range range-md range-rounded" type="range" />
```

### With a label and a readout

```html
<div class="pu-field">
  <label class="pu-label" for="vol">Volume</label>
  <input class="pu-range range-md" type="range" id="vol" name="volume"
         min="0" max="100" step="5" value="40"
         aria-valuetext="40 percent" style="--range-value: 40%" />
  <output for="vol">40%</output>
</div>
```

### Disabled

```html
<input class="pu-range range-md" type="range" value="30"
       style="--range-value: 30%" disabled />
```
