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
| `range-sm` | 12px type scale. |
| `range-md` | The default. |
| `range-lg` | 16px type scale. |

Everything is measured from `--range-track-size`, which is `1.15em`, so a size
class — or the size of the `.pu-form` around it — moves the track, the fill and
the thumb together.

There are no shape classes. A range is always a capsule, the way a radio is
always a circle; `--form-radius` is not read.

## On the Form channel

Like every other control, the range reads the channel with its own fallback:

| Variable | Reads |
|---|---|
| `--range-font-size` | `--form-font-size` |
| `--range-track-color` | `--form-surface` |
| `--range-border-width` | `--form-border-width` |
| `--range-border-color` | `--form-border-color` |

```html
<form class="pu-form form-sm">
  <input class="pu-range" type="range" min="0" max="100" value="40" style="--range-value: 40%" />
</form>
```

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--range-value` | `50%` | How far the fill reaches. **Set this from your script.** |
| `--range-fill` | `var(--color-primary)` | The filled part. |
| `--range-track-size` | `1.15em` | Overall height. Everything else derives from it. |
| `--range-track-radius` | `var(--radius-rounded)` | Track corner. |
| `--range-fill-radius` | `--range-track-radius` | Fill corner. |
| `--range-thumb-size` | three quarters of the track | Thumb. |
| `--range-thumb-color` | `var(--color-primary)` | Thumb. |
| `--range-thumb-border-color` | primary, a shade darker | Thumb border. |

```html
<input class="pu-range" type="range"
       style="--range-fill: var(--color-success); --range-value: 40%" />
```

## States

| State | Look |
|---|---|
| `:hover` | Track border and thumb darken. Not while invalid or disabled. |
| `:user-invalid` or `aria-invalid="true"` | Border and thumb turn to the error colour. |
| `:disabled` | Muted track; fill and thumb stay a step darker so the value still shows. |

The thumb carries the error colour as well as the border — the part that
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

### Inside a form

```html
<form class="pu-form form-lg">
  <input class="pu-range" type="range" value="60" style="--range-value: 60%" />
</form>
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
