# Accordion — contributing

## File

`packages/pureui/styles/accordion.css`

## Key

`.pu-accordion` is a plain class. The group is a container — there is no
element that means "accordion", and the panels inside carry the semantics.

## Composition through the tuning surface

This is the point of the file:

```css
& > .pu-collapsible {
  --collapsible-border-width: 0;
  --collapsible-radius: 0;
}
```

The group owns the frame, so the panels give theirs up and become rows. Note
what that is doing — setting the panel's own variables rather than restyling
the panel. It is why this file never repeats a line of `collapsible.css`.

Anything added here should follow the same rule. If a change needs a property
from `collapsible.css` rewritten, the variable it should have moved is
missing, and that is the thing to add.

## The frame

```css
border: …;
border-radius: var(--accordion-radius);
overflow: hidden;
```

The panels are square inside; `overflow: hidden` is what rounds the block.

Dividers come from the panels, not the group:

```css
& > .pu-collapsible:not(:last-child) {
  border-block-end: …;
}
```

## Size is handed down

```css
&.accordion-md {
  --accordion-radius: …;
  --accordion-gap: …;

  & > .pu-collapsible {
    --collapsible-font-size: …;
    --collapsible-padding-inline: …;
    --collapsible-padding-block: …;
    --collapsible-gap: …;
  }
}
```

The size sits on the group and reaches every panel, so it is written once in
the markup instead of once per row.

**These values mirror the size table in `collapsible.css` and have to stay in
step with it.** It is the one place the two files touch. A change to either
size table needs the same change in the other.

## `accordion-separate`

The group stops being a frame and becomes spacing:

```css
&.accordion-separate {
  border: none;
  border-radius: 0;
  overflow: visible;
  gap: var(--accordion-gap);

  & > .pu-collapsible {
    --collapsible-border-width: 1px;
    --collapsible-radius: var(--accordion-radius);
  }

  & > .pu-collapsible:not(:last-child) {
    border-block-end: var(--collapsible-border-width) solid var(--collapsible-border-color);
  }
}
```

The last rule undoes the divider. In this variant each panel carries its own
border, and the divider from the base block would sit on top of it.

The panel's radius is handed `--accordion-radius`, so the shape classes keep
working when the group is not the thing being rounded.

## Order inside the block

1. Variables
2. Base, including the panel reset
3. Size
4. Shape
5. Variants

## Variables

| Variable | Default |
|---|---|
| `--accordion-radius` | `var(--radius-md)` |
| `--accordion-border-width` | `1px` |
| `--accordion-border-color` | `var(--color-border)` |
| `--accordion-gap` | `var(--spacing-50)` |

Four. Everything else a consumer might want to change lives in
`collapsible.css` and is reachable on an individual panel.

## Exclusive groups

The `name` attribute on `<details>` is what makes a group exclusive. The
browser closes the others. There is no CSS for it and there should not be.
