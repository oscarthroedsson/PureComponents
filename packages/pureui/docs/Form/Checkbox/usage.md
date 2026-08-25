# Checkbox

A box that is either ticked or not.

```html
<label class="label">
  <input class="checkbox" type="checkbox">
  Email me about replies
</label>
```

A group of them belongs in a `<fieldset>` with a `<legend>` naming the
question:

```html
<fieldset class="fieldset">
  <legend>Notifications</legend>
  <div class="field">
    <label class="label">
      <input class="checkbox" type="checkbox" name="notify" value="replies">
      Replies
    </label>
  </div>
</fieldset>
```

## When to use it

- Any number of independent options, including one
- A boolean toggle — "I agree", "Remember me"

Not for a single choice from several — that is [Radio](../Radio/usage.md). Not
for one of a long known list — that is [Select](../Select/usage.md).

## Indeterminate

`el.indeterminate = true` in JavaScript, never an attribute — there is no HTML
for it. The library styles the state; setting it is yours. Use it for a
"select all" box whose children are partly ticked. It is a **display** state:
the box still submits as checked or unchecked.

## Accessibility

- Every checkbox **must** have a label. Nesting the input inside the label, as
  above, binds them without an id — useful when the markup is generated.
- A group of related boxes **must** sit in a `<fieldset>` with a `<legend>`.
  Without it a screen reader user hears each option with no idea what question
  it answers.
- `appearance: none` removes the control from Windows High Contrast Mode.
- The tick is drawn with `clip-path` on a pseudo-element and never reaches the
  accessibility tree. The state is carried by the native `:checked`, which is
  what assistive tech reads.
- Colour is never the only signal: the tick appears, and it is a shape, not a
  hue.
- The focus ring comes from `main.css`.

## Size and shape

`sm` · `md` (default) · `lg` — a **leaf**. The box is sized in `em`, so it
also follows the text it sits beside.

`sharp` · `smooth` (default) · `rounded`. The radius is **capped** at a quarter
of the box, so `rounded` does not turn a checkbox into a radio.

## Variables

| Variable | Controls |
|---|---|
| `--checkbox-size` | the box, in `em` |
| `--checkbox-radius` · `--checkbox-radius-max` | the corner, and its cap |
| `--checkbox-border-width` · `-border-color` · `-surface` | resting |
| `--checkbox-checked-surface` · `-checked-border-color` | ticked |
| `--checkbox-mark-color` · `--checkbox-mark-size` | the tick |
