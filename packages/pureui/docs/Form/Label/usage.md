# Label

A visible label for a control or a labelled content group. It also handles the
case where a `<label>` wraps a checkbox or a radio, where it becomes a row.

## Quick start

```html
<label class="pu-label" for="email">Email</label>
<input class="pu-input" type="email" id="email" name="email" />
```

## Classes

| Class | Does |
|---|---|
| `.pu-label` | The key. Requires `<label>` for controls or `<p>` for content groups. |

No sizes. The label takes its scale from the field or the form around it.

## Content groups

Use a `<p>` when visible text labels content that is not a form control. The
content references the paragraph with `aria-labelledby`:

```html
<div>
  <p id="general-label" class="pu-label">General</p>
  <ul role="list" aria-labelledby="general-label">
    <li>Inbox</li>
    <li>Sent</li>
  </ul>
</div>
```

The paragraph does not create the relationship by itself. `aria-labelledby`
on the labelled element does that.

## Two shapes, decided by what is inside

**A label beside its control** is bold text.

```html
<label class="pu-label" for="name">Full name</label>
<input class="pu-input" id="name" />
```

**A label wrapping a checkbox or radio** becomes a row: the control, a gap,
then the text at normal weight, with a pointer cursor over the whole thing.

```html
<label class="pu-label">
  <input class="pu-checkbox" type="checkbox" name="terms" />
  I accept the terms
</label>
```

No class distinguishes the two. The stylesheet looks at what is inside.

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--label-color` | the form's label colour | Text. |
| `--label-weight` | `600` | Weight of a standalone label. |
| `--label-disabled-color` | `var(--color-text-subtle)` | Text when the control is disabled. |
| `--label-option-gap` | `0.6em` | Space between the box and its text, in the wrapping form. |
| `--label-option-weight` | `400` | Weight in the wrapping form. |

```html
<label class="pu-label" style="--label-weight: 500" for="name">Name</label>
```

## Accessibility

- `for` must match the control's `id`. That binding is what makes clicking the
  label focus the control and what makes a screen reader read the name.
- A `<p class="pu-label">` does not use `for`. Give it an `id` and reference
  that id with `aria-labelledby` on the content it names.
- A wrapping label works without `for`, and it is the natural form for a
  checkbox or radio.
- Every control needs one. A placeholder is not a label — it disappears as
  soon as anyone types.
- Say "Email", not "Enter your email". The label names the field; instructions
  belong in a `.pu-field-hint`.
- Mark a required field in the label text as well as with the `required`
  attribute.
- A label whose control is disabled dims automatically. That rule lives in
  `field.css`, so it needs the control and the label to be inside a
  `.pu-field`.
- Alignment in the wrapping form is `align-items: start`, so a long label
  keeps its box against the first line rather than centring it against the
  whole paragraph.

## Examples

### Standalone

```html
<div class="pu-field">
  <label class="pu-label" for="company">Company</label>
  <input class="pu-input" id="company" name="company" />
</div>
```

### Wrapping a checkbox

```html
<label class="pu-label">
  <input class="pu-checkbox" type="checkbox" name="news" />
  Send me product updates
</label>
```

### A radio group

```html
<fieldset class="pu-fieldset">
  <legend>Plan</legend>
  <label class="pu-label">
    <input class="pu-radio" type="radio" name="plan" value="free" />
    Free
  </label>
  <label class="pu-label">
    <input class="pu-radio" type="radio" name="plan" value="pro" />
    Pro
  </label>
</fieldset>
```

### Required

```html
<label class="pu-label" for="email">Email (required)</label>
<input class="pu-input" type="email" id="email" required />
```
