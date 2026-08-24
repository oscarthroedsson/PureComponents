# Form

The frame around a set of fields, and the node that sets the scale for
everything inside it.

```html
<form class="form">
  <div class="field">…</div>
  <fieldset class="fieldset">…</fieldset>
</form>
```

`.form` draws nothing you can see. It spaces its children, and it declares the
`--form-*` channel the whole family reads.

## The channel

Every `--form-*` variable is inherited. That is the entire mechanism.

- A **group** — `.form`, `.fieldset`, `.field` — rewrites the channel and
  retunes its whole subtree.
- A **leaf** — `.input`, `.select`, `.textarea`, `.checkbox`, `.radio`,
  `.range` — rewrites only its own variables and changes only itself.

The nearest declaration wins, because a declared value always beats an
inherited one:

```
.form.lg > .fieldset.sm > .field > .input     → sm
.form.lg > .field.sm > .input.lg              → lg
<input class="input" style="--input-font-size:20px">  → 20px
```

Nothing in the family requires an ancestor. A bare `.input` on a page with no
`.form` around it works, because every leaf carries the `md` defaults as its
own fallback.

## Size and shape

`sm` · `md` (default) · `lg` — one class on the form retunes controls, labels,
hints and messages together.

`sharp` · `smooth` (default) · `rounded`

## Accessibility

- Fields collecting the user's own information **must** carry `autocomplete`.
  WCAG 2.1 1.3.5 is Level AA and lives entirely in your markup.
- A page with more than one `<form>` needs a name on each: `aria-label`, or
  `aria-labelledby` pointing at a heading.
- A placeholder is not a label. Every control gets a real `<label for>`.
- Error state reaches assistive tech through `aria-invalid` on the control,
  never through colour alone.
- Setting `--form-font-size` below 16px makes iOS Safari zoom the page on
  focus. Targeting mobile, set `--form-font-size: var(--font-size-base)`.

## Variables

Set any of these on `.form`, a `.fieldset`, a `.field`, or inline on one
control.

| Variable | Controls |
|---|---|
| `--form-font-size` | the scale everything else derives from |
| `--form-gap` | between fields and fieldsets |
| `--form-field-gap` | inside one field: label → control → message |
| `--form-padding-block` / `--form-padding-inline` | the control box, in `em` |
| `--form-radius` | |
| `--form-border-width` / `--form-border-color` | |
| `--form-surface` / `--form-color` | the control fill and text |
| `--form-label-color` / `--form-hint-color` / `--form-error-color` | |
