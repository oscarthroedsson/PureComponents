# Fieldset — contributing

## File

`packages/pureui/styles/Form/fieldset.css`

## Key

```css
.pu-fieldset:where(fieldset)
```

`<fieldset>` plus `<legend>` is what gives a group of controls an accessible
name. Radio buttons in particular are unusable without it. A `<div>` with a
class gives nothing.

## The UA sheet is undone in one place

```css
min-inline-size: 0;
margin: 0;
padding: 0;
border: 0;
```

`min-inline-size: 0` is the important one — a `<fieldset>` has an intrinsic
minimum width from the UA sheet that makes it refuse to shrink inside a grid.

## `--fieldset-gap` is half of `--form-gap`, and not read from it

A `.pu-form` spaces fields that are each a stack of their own — label, control,
message — so they need a full 1rem to read as separate. A fieldset holds the
answers to one question, and they are usually one line each. At 1rem those
lines drift apart and stop reading as a set.

8px is close enough to still be one group and far enough to hit separately.
The docs tell consumers to raise it where a fieldset holds full fields.

## The legend belongs to what follows it

`--fieldset-legend-gap` is a quarter of the gap between two fields, so the
legend sits closer to its first field than the fields sit to each other.

```css
& > legend { margin-block-end: var(--fieldset-legend-gap); }
```

`margin`, not `gap` — the legend sits outside the grid, so `gap` never reaches
it.

When a hint follows, the legend gives up almost all of its own spacing and the
hint takes the group's:

```css
&:has(> .pu-field-hint) > legend {
  margin-block-end: var(--fieldset-legend-hint-gap);
}
```

## `--fieldset-space-before`

```css
&:not(:first-child) { margin-block-start: var(--fieldset-space-before); }
```

Pulling the legend down onto its fields made the boundary upward the weak one:
a group started at exactly the same distance as the next field. A grid item's
margin does not collapse, so this adds cleanly to `--form-gap` and stays
predictable.

## The legend is smaller than a field label, not larger

The first attempt scaled it to 1.15em to separate it from a label, and it read
as a heading shouting over the fields it names. A group marker works the other
way: small, semibold, muted, quiet enough to scan past.

Floored at `--font-size-sm` with `max()`, so it stays legible at
`fieldset-sm`.

## The group error is the child selector, deliberately

```css
&[aria-invalid="true"] > .pu-field-error { visibility: visible; }
```

A group message answers for the **question**, so the group has to be marked
invalid itself — a child going wrong is the child's business.

`:has(:is(…))` was wrong here and shipped for exactly one commit: it matches
any descendant, so one bad postcode inside a field lit the group's message
too.

There is no native equivalent. `:user-invalid` fires on a control, never on
the fieldset around it, so a group error needs the consumer to set
`aria-invalid` — which is the correct ARIA for it in any case.

## Size and shape rewrite the channel

```css
&.fieldset-lg { --form-font-size: var(--font-size-base); }
&.fieldset-rounded { --form-radius: var(--radius-rounded); }
```

Not `--fieldset-*`. That is what retunes every control in the subtree instead
of only the fieldset's own text.

## `fieldset-panel`

The only variant that paints. Its legend gets a horizontal padding and a
matching negative margin, so the notch in the border clears the corner and
never collides with the radius.

`--fieldset-surface` is `--color-surface-muted`, one step darker than
`--form-surface`, so the fields inside a panel keep reading as boxes instead
of dissolving into it. There is no lighter surface to give them:
`--color-neutral-100` is the lightest token in `main.css`, and
`--color-neutral-50` is referenced across the library but never declared.

## Variables

Sixteen. The five legend variables exist because a `<legend>` cannot be
selected by a consumer in any useful way once it is inside our block, so every
part of it that might need changing is exposed.

`--fieldset-border-width` and `--fieldset-radius` read the channel with
fallbacks, so a panel follows the form's shape classes.
