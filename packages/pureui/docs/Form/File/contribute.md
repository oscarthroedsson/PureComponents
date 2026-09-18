# File — contributing

## File

`packages/pureui/styles/Form/file.css`

## Key

```css
.pu-file:where(input[type="file"])
```

The native control is styled rather than hidden. The common alternative —
`display: none` on the input and a styled `<button>` driving it — throws away
the keyboard handling, the announcement and the file-name display, and has to
rebuild all three in script.

## The button sets the height

`::file-selector-button` carries the field's block padding:

```css
&::file-selector-button {
  padding-block: var(--file-padding-block);
  padding-inline: var(--file-padding-inline);
}
```

and the field carries none:

```css
padding-block: 0;
padding-inline: 0 var(--file-padding-inline-end);
```

No block padding, and no start padding: the button provides both, from an `em`
that resolves against the full font size rather than the file name's reduced
one. Only the end padding is the field's, because there is nothing at that edge
to provide it.

`--file-min-block-size` is a floor, not the height. It only catches the case
where a consumer has taken the button's padding away, so the field never
collapses onto the file name alone.

## `font: inherit` on the button is load-bearing

`::file-selector-button` is a whole element with its own UA styling, and it
inherits almost nothing from the input. Measured in Chromium: an input set in
Georgia and rebeccapurple produced a button still in Arial and black. Only
`font-size` came through.

Without `font: inherit` and an explicit colour the button ignores the size
classes and the whole family stops lining up.

```css
&::file-selector-button {
  font: inherit;
  font-size: var(--file-font-size);
  color: var(--file-button-color);
}
```

`font: inherit` brings across the family and the line box — which is what the
button needs — but it also brings the name's reduced size, so `font-size` goes
back to full. The inherited `line-height` is already an absolute length, so the
button stays in the same line box the name sits in.

## The line-height is resolved, not a ratio

```css
line-height: calc(var(--file-font-size) * var(--file-line-height));
```

Resolved against `--file-font-size` rather than left as a ratio, so the line
box keeps the height it would have had at full size. Without this, drawing the
name smaller would shrink `1lh`, and with it `--file-min-block-size`, and the
field would stand lower than the `.pu-input` beside it.

## `--file-name-font-size` is a calc, not an em

```css
--file-name-font-size: calc(var(--file-font-size) * 0.9);
```

An `em` resolves against the parent's size, so a field in a `.pu-field`
carrying a size of its own would scale the name off the wrong number.

## `--file-name-color` is a plain token, not the channel

```css
--file-name-color: var(--color-text-muted);
```

Deliberately **not** `var(--form-color, …)`. `form.css` declares
`--form-color`, so a leaf's fallback is only ever reached when no `.pu-form` is
above it — reading the channel here would give a quiet name outside a form and
a full-strength one inside it.

## The inner radius

```css
--file-button-radius: max(0px, calc(var(--file-radius) - var(--file-border-width)));
```

What is left of the box's corner once the border has taken its width. `max()`
because sharp resolves to `0 - 1px`, and a negative radius is not a value.

`--file-button-radius-end` is `0px` so the button's inner edge is flat against
the divider. `file-ghost` sets it to the outer radius instead: with no box
around it there is no edge for the flat side to meet, so the button closes its
own shape.

## Only the divider survives

The UA draws a full outset border on the button. It is removed and replaced
with one edge:

```css
border: 0;
border-inline-end: var(--file-border-width) solid var(--file-button-border-color);
```

`--file-button-border-color` follows the field's border by default, so
`file-ghost` takes the divider with it in one declaration instead of two.

## No `:not(:read-only)` on hover

Deliberate, and not an oversight: **a file input matches `:read-only` at all
times**, so copying `input.css`'s guard would mean the rule never fired.

```css
&:hover:not(:disabled) { … }
```

## The press reads on the button

```css
&:active:not(:disabled) { --file-button-surface: …; }
```

The field is the button as far as clicking goes, so the press shows on the
button wherever in the box it started.

## States come after the variant, on purpose

`file-ghost` and `:hover` both sit at (0,2,0), so source order decides, and the
states have to win. A ghost field still has to show that it is hovered, wrong
or disabled.

## `--file-padding-inline-end` has no start counterpart

It exists so `.pu-input-group` can grow it for an end-slot icon, the same way
`.pu-input` carries `--input-padding-inline-end`. There is no start version:
the button occupies that edge.

## Order inside the block

1. Variables
2. Base
3. The button
4. Size
5. Shape
6. Variant
7. States
