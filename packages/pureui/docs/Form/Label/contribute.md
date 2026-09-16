# Label — contributing

## File

`packages/pureui/styles/Form/label.css`

## Key

```css
.pu-label:where(label, p)
```

`<label>` binds a name to a form control. `<p>` supplies visible label text for
a non-form content group whose accessible name is connected with
`aria-labelledby`. The class styles both; the markup supplies the relationship.

## The two shapes come from `:has()`

```css
&:has(> input:is([type="checkbox"], [type="radio"])) {
  display: flex;
  gap: var(--label-option-gap);
  font-weight: var(--label-option-weight);
  cursor: pointer;
}
```

No class distinguishes a standalone label from one wrapping an option. The
stylesheet looks at what is inside, so the markup stays honest and there is
nothing to remember.

`> input` and not a descendant, so a label containing a nested field somewhere
deeper does not flip into option mode.

## `align-items: start`

Not `center`. A long option label keeps its box against the first line rather
than centring it against the whole wrapped paragraph.

## The option variables are declared inside the `:has()` block

```css
&:has(> input:is([type="checkbox"], [type="radio"])) {
  --label-option-gap: 0.6em;
  --label-option-weight: 400;
  …
}
```

They exist only in the shape that uses them. A consumer overriding them inline
on the element still wins, because inline beats a block declaration either
way.

`--label-color`, `--label-weight` and `--label-disabled-color` are at the top
of the key block, where the contract puts them.

## The disabled colour is declared here, applied elsewhere

`--label-disabled-color` is declared in this file. The rule that uses it lives
in `field.css`:

```css
&:has(:disabled) > .pu-label { color: var(--label-disabled-color, …); }
```

A label cannot see whether its control is disabled when the two are siblings,
so the field has to do it. The variable stays here because it belongs to the
label's tuning surface.

## No size section

The label takes its scale by inheritance from the field or the form around it.
Giving it a size vocabulary of its own would let a label and its control fall
out of step, which is the one thing the family's cascade exists to prevent.

## Variables

| Variable | Default |
|---|---|
| `--label-color` | `var(--form-label-color, var(--color-text))` |
| `--label-weight` | `600` |
| `--label-disabled-color` | `var(--color-text-subtle)` |
| `--label-option-gap` | `0.6em` |
| `--label-option-weight` | `400` |

`--label-color` reads the channel with a fallback, so a label works outside a
`<form>`.
