# Form — how it is built

## The one rule that must not break

**A leaf must never declare a `--form-*` variable in its base block.**

Declared on the element, it shadows the group's value and the whole cascade
stops working. A leaf reads the channel through `var()`'s second argument:

```css
.input { --input-font-size: var(--form-font-size, var(--font-size-md)); }
```

That is why the `md` defaults appear twice — once in `form.css`, once as each
leaf's fallback. The duplication is deliberate: it is what lets a bare control
work with no ancestor.

## Why there are no descendant selectors

Because the channel is inherited, `form.css` never needs to reach into its
children. It sets variables; they read them. That is also why adding a new
control to the family costs nothing here — a new leaf reads the same channel
and lines up for free.

## What belongs here and what does not

`.form` owns spacing between its children and the channel's defaults. It owns
no box, no border, no focus ring. A field's internals are `field.css`; a
group's are `fieldset.css`.

## Design tokens

`--font-size-*`, `--spacing-*`, `--radius-*`, `--color-neutral-*`,
`--color-error`. No hardcoded colours — see AGENTS.md §4.4.
