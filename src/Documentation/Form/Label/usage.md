# Label

The name of a control.

```html
<label class="label" for="email">Email</label>
<input class="input" type="email" id="email">
```

```html
<label class="label">
  Email
  <input class="input" type="email">
</label>
```

Its own file and its own key, because a label is its own thing. It appears
inside a `.field`, inside a `.fieldset`, beside a checkbox, in a table cell, in
a toolbar — and it looks the same in all of them. Nothing owns it.

## Two ways to bind, both correct

`for=` pointing at the control's id, or the control nested inside the label.
The first is preferred: it survives the control moving, and it is what
assistive tech handles best.

`for=` must point at an id that **exists**. A label bound to nothing is worse
than no label, because it looks correct in review and announces nothing.

## The key is required

A bare `<label>` inside a `.field` gets nothing from us, and that is correct —
it is your element until you say otherwise. Link this stylesheet into a page
that already has `<label>` in its markup and nothing is restyled behind your
back.

## What does not go in it

The text is the accessible name. Do not put the unit, the hint or the error
inside it — those are `aria-describedby`, and `field.css` draws them. Putting
them in the label makes the announced name a paragraph.

## Accessibility

- A control that collects input **must** have a label. A placeholder is not
  one: it disappears on the first keystroke, it is not reliably announced, and
  at most greys it fails 1.4.3.
- Clicking a label moves focus to its control. That is native behaviour and
  nothing here interferes with it — it is also why a label must never be made
  to look like a button.
- `--label-color` measures 17.4:1 on the form surface, well past the 4.5:1 of
  1.4.3. The disabled colour is exempt from contrast under 1.4.3, which is
  what makes `--label-disabled-color` legitimate at 3.6:1.

## Size

Inherited. The label reads `--form-font-size` like everything else in the
family, so `.form.sm`, `.fieldset.lg` and `.field.sm` all reach it without a
size class of its own.

## Variables

| Variable | Controls |
|---|---|
| `--label-color` | the text |
| `--label-weight` | how hard it sits against the control |
| `--label-disabled-color` | when the control it names is disabled |
