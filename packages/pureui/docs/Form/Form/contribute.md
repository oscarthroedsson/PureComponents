# Form — contributing

## File

`packages/pureui/styles/Form/form.css`

## Key

```css
.pu-form:where(form)
```

## The file is a channel

Almost nothing here paints. The block declares thirteen variables and sets
`display: grid` and a gap. Everything else in the Form family reads those
variables through `var(--form-*, fallback)`.

That is the whole design: **no file in the family uses a descendant selector
to reach a control.** A form does not style its inputs. It declares the
values, and each control reads them from wherever it happens to sit.

The consequence is that the nearest declaration wins at any depth for free.
A `<fieldset>` that rewrites `--form-font-size` retunes its subtree; a
`.pu-field` that rewrites it retunes one field; an `.pu-input` that carries its
own size class changes only itself.

Anything added to this family should follow the same pattern. Reaching a
control with a descendant selector breaks the cascade and cannot be
overridden by the markup below it.

## The size scale is deliberately tight

12 / 14 / 16px. A form control is read once and typed into, not read in
paragraphs.

`form-lg` tops out at `--font-size-base` rather than `--font-size-lg` — 20px
inputs are a heading wearing a border.

`&.form-md` is an empty block with a comment. The base already is `md`, and the
block is kept so the size section reads as complete.

## Padding is em

`--form-padding-block: 0.5em` and `--form-padding-inline: 0.75em`, so one pair
of values serves all three sizes. The same choice `button.css` makes.

## Shape uses the shape tokens

```css
&.form-rounded { --form-radius: var(--radius-rounded); }
```

`--radius-rounded` rather than a raw `--radius-lg`, so the whole family follows
`main.css` if the scale moves.

## Variables

| Variable | Default |
|---|---|
| `--form-font-size` | `var(--font-size-md)` |
| `--form-gap` | `var(--spacing-100)` |
| `--form-field-gap` | `var(--spacing-25)` |
| `--form-padding-block` | `0.5em` |
| `--form-padding-inline` | `0.75em` |
| `--form-radius` | `var(--radius-md)` |
| `--form-border-width` | `1px` |
| `--form-border-color` | `var(--color-border-strong)` |
| `--form-surface` | `var(--color-surface-sunken)` |
| `--form-color` | `var(--color-text)` |
| `--form-label-color` | `var(--color-text)` |
| `--form-hint-color` | `var(--color-text-subtle)` |
| `--form-error-color` | `var(--color-error)` |

Every one is read by at least one other file in the family, always with a
fallback so a control works outside a `<form>`.

## Layout stops at the gap

The form is a grid with one column. Columns, two-up rows and anything else are
the consumer's own CSS on a wrapper. A layout system inside the form component
would be a second, competing way to lay out a page.

## The family

```
form.css      the channel
fieldset.css  a group that can retune its subtree
field.css     one control, its label, hint and error
label.css     the label, and the option-label case
input/        input.css, file.css
select.css  textarea.css  checkbox.css  radio.css  range.css
```
