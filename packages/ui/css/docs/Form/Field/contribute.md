# Field — contributing

## File

`packages/ui/css/styles/Form/field.css`

Three keys: `.pu-field`, `.pu-field-hint`, `.pu-field-error`.

## Key

`.pu-field` is a plain class. HTML has no element that means "a control with
its label and message".

## It reads the channel with fallbacks

```css
--field-font-size: var(--form-font-size, var(--font-size-md));
--field-gap: var(--form-field-gap, var(--spacing-25));
```

Every variable the field takes from `form.css` carries a fallback, so a field
works outside a `<form>` exactly as it does inside one.

## Size rewrites the channel, not the field

```css
&.field-lg { --form-font-size: var(--font-size-base); }
```

Note which variable it sets. Writing `--field-font-size` would resize the
field's own text and leave the control alone. Rewriting `--form-font-size`
retunes the channel for the whole subtree, so the label and the control move
together.

The same applies to shape: `field-rounded` sets `--form-radius`.

## The message floor

```css
--field-message-font-size: max(0.85em, var(--font-size-sm));
```

`max()` puts a readability floor under the small text: it never drops below
12px, but it still grows with the field at `field-lg`.

## The error is reserved, not toggled

```css
.pu-field-error {
  min-block-size: 1lh;
  visibility: hidden;
}
```

`visibility`, not `display`. The message keeps its row in the grid, so the
field does not change height when the error shows and nothing below it moves.

`min-block-size: 1lh` holds the row at one line even while the element is
empty.

## Two paths to visible, and why both exist

```css
:is(input, select, textarea):is(:user-invalid, [aria-invalid="true"]) + & { … }
:is(input, select, textarea):is(:user-invalid, [aria-invalid="true"]) + .pu-field-hint + & { … }
```

The control immediately before shows its own message. `+` reaches exactly one
step, so an error in one field can never light up another's. Two orders are
supported — control → error, and control → hint → error.

A control wrapped in an `.pu-input-group` breaks the sibling chain, which is
what the rule on the key covers:

```css
&:has(:is(:user-invalid, [aria-invalid="true"])) > .pu-field-error {
  visibility: visible;
}
```

`:user-invalid` rather than `:invalid`, so a required field is not red before
the user has touched it.

## `--field-error-reserve`

```css
padding-block-end: var(--field-error-reserve);

&:has(.pu-field-error) { padding-block-end: 0; }
```

An opt-in for a field with no message element that should still not shift when
one is added by script. The `:has()` rule means a field that *does* have a
message element reserves the row through that element instead, so the two can
never both apply.

## The disabled label

```css
&:has(:disabled) > .pu-label {
  color: var(--label-disabled-color, var(--color-text-subtle));
}
```

The one place the field reaches a child by selector. It is here rather than in
`label.css` because a label cannot see whether its control is disabled when the
two are siblings.

## `--field-error-row`

Declared in the variables and not read anywhere in the file. It computes the
height one message row would take.

## The message blocks

`.pu-field-hint` and `.pu-field-error` share a block for size, weight and
leading, then take their colours separately. Both redeclare the message
variables with fallbacks so they also work standalone, outside a `.pu-field`.
