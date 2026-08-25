# Range

A slider for a value where the exact number does not matter.

```html
<input class="range" type="range" min="0" max="100" value="40">
<input class="range primary lg" type="range" min="0" max="100" value="40">
```

## The fill is not automatic

The track is painted with a gradient that stops at `--range-value`, because
neither engine offers a pseudo-element for the filled part of a range once
`appearance: none` is set.

That variable does not update itself. The library ships no JavaScript, so if
you want the fill to follow the thumb, set it on input:

```js
el.style.setProperty("--range-value", (el.value / el.max * 100) + "%")
```

Left alone the fill sits at 50% and the thumb still moves, works and submits.
That is the trade: the control is correct without script, and only the
decoration needs one.

## Always set min and max

Without them the range is 0–100 whatever the numbers on screen say, and the
value announced to assistive tech is wrong.

## Accessibility

- **Must** be named by a `<label for>`. A slider with no name is announced as
  a bare number.
- A range is announced as a slider with a number. If the number means
  something — kronor, minutes, a percentage — say so with `aria-valuetext`.
  CSS cannot.
- **Never** the only way to enter a value that has to be exact. Pair it with a
  number field when precision matters; dragging to one specific value is a
  motor-control barrier (2.5.1).
- `appearance: none` removes the control from Windows High Contrast Mode.
- The invalid state colours the thumb, and colour is never the only signal —
  the `.field-error` appears and `aria-invalid` is what assistive tech hears.

## Size, shape, variant

`sm` · `md` (default) · `lg` — one variable, `--range-track-size`; the thumb,
the padding and the fill all derive from it.

`sharp` · `smooth` · `rounded` (default). At `smooth` the fill takes a tighter
radius than the track, because it is half the height and the same radius would
read as a pill.

`primary` — brand colour on the fill and the thumb. Neutral by default, so a
slider does not shout in a form full of quiet controls.

## States

`:disabled` and `:user-invalid` / `[aria-invalid="true"]`. A range always has a
value, so `:user-invalid` rarely fires — `aria-invalid` is the path that
matters. Disabled wins over invalid: a control that is off must not read as
wrong.

## Variables

| Variable | Controls |
|---|---|
| `--range-value` | where the fill stops. See above — not automatic. |
| `--range-track-size` | the whole control derives from this |
| `--range-track-color` · `--range-track-radius` | the unfilled part |
| `--range-fill` · `--range-fill-radius` | the filled part |
| `--range-thumb-size` | 0.75 of the track |
| `--range-thumb-color` · `-border-width` · `-border-color` | |
