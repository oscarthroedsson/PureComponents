# Radio

One choice from a set, where the set is short enough to show at once.

```html
<fieldset class="fieldset">
  <legend>Delivery</legend>
  <div class="field">
    <label class="label">
      <input class="radio" type="radio" name="delivery" value="std">
      Standard — 3–5 days
    </label>
  </div>
  <div class="field">
    <label class="label">
      <input class="radio" type="radio" name="delivery" value="exp">
      Express — next day
    </label>
  </div>
</fieldset>
```

## The name attribute is what makes it a group

Every radio in a set **must** share the same `name`. That is what makes them
exclusive, what makes arrow keys move between them, and what makes the group a
single stop in the tab order. Drop it and you have several unrelated radios
that can all be selected at once.

## When to use it

- One choice from 2–5 visible options
- When seeing all the options at once matters

For a longer list use [Select](../Select/usage.md). For any number of
independent options use [Checkbox](../Checkbox/usage.md). For a yes/no that
defaults to no, a single checkbox is usually better than two radios.

A radio group cannot be un-answered once a choice is made. If "none of these"
is a valid answer, give it its own option — do not expect the user to undo.

## Accessibility

- The group **must** sit in a `<fieldset>` with a `<legend>`. The legend is
  the question; without it a screen reader user hears the options with no idea
  what they answer.
- Every radio **must** have a label. Nesting the input inside the label binds
  them without an id.
- Arrow keys move within the group and Tab leaves it. That is native, and
  nothing here interferes with it.
- A group-level message is a `.field-error` as a direct child of the fieldset,
  with `aria-invalid="true"` on the fieldset — see
  [Fieldset](../Fieldset/usage.md). `:user-invalid` fires on a control, never
  on the group.
- `appearance: none` removes the control from Windows High Contrast Mode.
- The dot never reaches the accessibility tree. The state is carried by the
  native `:checked`.

## Size

`sm` · `md` (default) · `lg` — a **leaf**. Sized in `em`, so it also follows
the text beside it.

No shape classes. A radio is round, and that roundness is what distinguishes
it from a checkbox at a glance.

## Variables

| Variable | Controls |
|---|---|
| `--radio-size` | the circle, in `em` |
| `--radio-border-width` · `-border-color` · `-surface` | resting |
| `--radio-checked-surface` · `-checked-border-color` | selected |
| `--radio-dot-color` · `--radio-dot-size` | the dot |
