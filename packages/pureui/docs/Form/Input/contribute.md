# Input — contributing

## File

`packages/pureui/styles/Form/input/input.css`

Two keys: `.pu-input` and `.pu-input-group`.

## Key

```css
.pu-input:where(input)
```

## Every variable reads the channel with a fallback

```css
--input-font-size: var(--form-font-size, var(--font-size-md));
--input-surface: var(--form-surface, var(--color-surface-sunken));
```

So a bare `<input class="pu-input">` on a page with no `<form>` looks exactly
like one inside a form. There is no descendant selector reaching down from
`form.css`; the input reads the values from wherever it sits.

## The height is derived, not set

```css
--input-min-block-size: calc(
  1lh + (var(--input-padding-block) * 2) + (var(--input-border-width) * 2)
);
```

One line plus its padding and border. Every size, and every type, lands on the
same height from the same expression.

## Type normalisation lives here, not in a file per type

A bare `<input class="pu-input" type="number">` has to look right on a page
that linked this file and nothing else. Put a spinner's removal behind an extra
import and every page has to remember it, and the one that forgets shows a
control the library removed everywhere else.

Each mark was measured:

- **`::-webkit-datetime-edit-fields-wrapper`** — Chromium gives the date
  family's inner field a `padding-block` of 1px of its own, which makes every
  date type 2px taller than a text box in the same `.pu-field` — 39px against
  37px. Zeroed, the height goes back to `--input-min-block-size`. Firefox and
  Safari build these types from different parts, do not know this
  pseudo-element, and drop the rule.

- **`::-webkit-calendar-picker-indicator { block-size: 1em }`** — the clock
  indicator on `type="time"` carries an intrinsic size of its own, and at `sm`
  it is taller than the line it sits on — 32.59px while every field beside it
  measured 32.00px. Tied to the font size it stops setting the height and
  starts following it.

  Height only. Nothing here moves it: where the browser puts the indicator is
  where a consumer's mark has to go.

- **`[type="number"]`** — digits in a column do not line up in a proportional
  font, so `font-variant-numeric: tabular-nums`. Firefox reads `appearance:
  textfield`; Chromium needs `::-webkit-inner-spin-button` taken out as well,
  and the margin with it, or the arrows leave their gap behind.

- **`[type="search"]::-webkit-search-cancel-button`** — Chromium and WebKit
  draw a ✕ once the field has a value; Firefox draws none. Escape still empties
  the field, so nothing goes with it.

- **The date family's picker indicator** — `opacity: 0`, not `display: none`.
  Hiding it would take the hit test with it and leave the picker
  keyboard-only.

None of these marks can be sized, coloured or shaped, and each sits exactly
where a consumer would want a control of their own.

## States come after the variant, on purpose

`input-ghost` and `:hover` both sit at (0,2,0), so source order decides, and
the states have to win. A ghost field still has to show that it is hovered,
wrong or disabled. Only its resting state is invisible.

## `:read-only` is not `:disabled`

```css
&:read-only:not(:disabled) { cursor: default; }
```

A read-only field takes focus, its text can be selected and copied, and it is
submitted with the form. Greying it made it look disabled, which is the one
thing it is not. The cursor carries the difference instead — no I-beam,
because there is nothing to type into.

## `:focus:not(:focus-visible)`

The ring is `main.css`'s job. This rule only clears the browser's own outline
for a mouse click, where `:focus-visible` never matches.

## `.pu-input-group`

### It is a positioning context and nothing else

No box, no fill, no border. Those are the control's and it still owns them.

The group is required only when there is an icon. An `<input>` is a void
element and cannot hold children, so anything inside the box has to be a
sibling laid over it — and something has to carry the positioning and know
that the padding must grow.

It says nothing about which control it wraps, so a `.pu-select`, a
`.pu-textarea` or a `.pu-file` works in it too.

### Clearance is a leaf variable, never a channel one

```css
&:has(> .input-icon[data-placement="start"]) > .pu-input {
  --input-padding-inline-start: var(--input-group-clearance);
}
```

`--input-padding-inline-start`, not `--form-padding-inline`. The channel stays
the group's to inherit, not this element's to shadow. Writing the `--form-*`
variable here would retune every control in the subtree, not the one field
that has an icon.

The group can see what it holds, so the padding grows only on the side that
needs it.

### Icons are decoration; buttons are not

```css
> .input-icon { pointer-events: none; }
> button.input-icon { pointer-events: auto; … }
```

The click belongs to the field underneath, so hitting a plain icon focuses it
like any other part of the box. A `<button>` takes its clicks back and drops
the browser's button chrome — the box it sits in is the field's, and a second
border inside it would read as a field inside a field.

### `--input-group-icon-size` sizes squares only

An SVG or an image is squared off. Text is not — a currency symbol or a
country code sets its own width, and a consumer whose mark is wider raises the
variable so the clearance follows it.

### The disabled icon

```css
&:has(> .pu-input:disabled) > .input-icon { color: …; cursor: not-allowed; }
```

A greyed-out field with a full-strength icon reads as the one part still
working.

## Order inside the block

1. Variables
2. Base, placeholder, vendor height fixes
3. Type normalisation
4. Size
5. Shape
6. Variant
7. States
8. Reduced motion
