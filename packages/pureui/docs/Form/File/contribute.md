# File — how it is built

`src/Styles/Form/input/file.css`. One key class, `.file`, on
`<input type="file">`. Everything else is `::file-selector-button`.

## The button carries the height

The field declares **no block padding**. The button declares it instead:

```css
.file { padding-block: 0; padding-inline: 0 var(--file-padding-inline); }
.file::file-selector-button { padding-block: var(--file-padding-block); }
```

So the button fills the box's inner height exactly, and the field comes out at
the button's height plus its own border — the number `.input` resolves to.
Measured at `md`: button 35px, field inner 35px, field 37px, `.input` 37px.
Across the three sizes 32 / 37 / 42 against 32 / 37 / 42.

Not a percentage height on the button. `::file-selector-button` resolves
percentages against a box it does not own, and every engine has its own idea of
what that means — DaisyUI reaches the same look with
`height: calc(100% + border * 2)` and a negative block margin, which works but
leans on that resolution. This needs no percentage at all.

### Why it cannot go back on the field

This started as a negative margin: the field kept its padding and the button
was pulled out by exactly that padding, negated. That works only while the
field and the button share a font size, and since the file name was reduced
they no longer do.

`--form-padding-block` is `0.5em`, and `em` resolves against the font size of
the element that uses it. The field's is the file name's, at 0.9; the button's
is the full one. The same `0.5em` is therefore **6.3px on the field and 7px on
the button** at `md`, and only the button's is the number the rest of the
family is built on. Moving the padding back onto the field costs 0.9px —
measured 36.09 against `.input`'s 37 — and quietly breaks the parity this file
is arranged around. It was caught by measuring after the change, not by
looking; 0.9px is invisible.

The same shift is left standing in the inline direction, where it is harmless:
the field's `padding-inline-end` is 9.45px against the button's 10.5px. They
sit on opposite edges of the box and are never compared. Re-basing it by the
ratio would be correct for an `em` and wrong for the `px` a consumer might set
instead, so it is documented rather than "fixed".

`--file-min-block-size` survives as a **floor**, not as the height — it catches
a consumer who removes the button's padding, so the field cannot collapse onto
the file name alone.

## The file name is styled, and so is everything it becomes

`--file-name-font-size` and `--file-name-color` are the only handles on the
text, and they apply to "no file chosen" and to `contract.pdf` alike — one text
node, rewritten in place, no selector between the two states.

Two details in how they are declared:

**The size is a fraction of `--file-font-size`, not an `em`.** An `em` would
resolve against the *parent's* font size, so a field inside a `.field` carrying
a size of its own would scale the name off the wrong number.

**The colour is a plain token, not `var(--form-color, …)`.** `form.css`
declares `--form-color`, so a leaf's fallback is only ever reached when no
`.form` is above it. Reading the channel here would give a quiet name outside a
form and a full-strength one inside it — the same trap the padding falls into,
in a different direction.

To keep the line box intact, `line-height` is resolved against
`--file-font-size` explicitly rather than left as a ratio. `1lh` then stays
21px at `md` however small the name is drawn, and the button — set back to the
full size — sits in the same line box the name does.

## `font: inherit` is load-bearing

`::file-selector-button` is a whole element with its own UA styling and it
inherits almost nothing from the input. Measured in Chromium 148 on an input
set to Georgia and `rebeccapurple`:

| property | on the input | on the button |
|---|---|---|
| `font-size` | 24px | 24px — came through |
| `font-family` | Georgia | **Arial** |
| `color` | rebeccapurple | **black** |

So `font: inherit` and an explicit `color` are not tidiness. Without them the
button ignores the size classes entirely and the family stops lining up.
`font-size` is then set back to `--file-font-size` on the line after, because
`font: inherit` also brings across the file name's reduced size — and the
button is the primary half of the control.

That neither `color` nor `font-family` inherits is also what makes the file
name stylable at all: the text **does** inherit them while the button does not,
so the field's `color` and `font-size` reach the text alone.

## Why there is no `:read-only` branch

`<input type="file">` matches `:read-only` **at all times**, attribute or not —
it is never editable in the sense the pseudo-class means. Verified alongside
`text` (`:read-write`) and `checkbox` (`:read-only`, same as file).

This matters more than it looks. `.input` guards its hover with
`:hover:not(:disabled, :read-only)`. Copied here — and it is the obvious thing
to copy — that rule would never fire and hover would silently disappear. The
omission is deliberate and is called out in the stylesheet's header, its
`STATES` line, and the demo page, so the next person to reach for consistency
finds the reason before they make the change.

`select.css` has a related note for a different reason: `readonly` does nothing
to a `<select>` either, but a `<select>` does not match `:read-only`.

## The corners

```css
--file-button-radius: max(0px, calc(var(--file-radius) - var(--file-border-width)));
--file-button-radius-end: 0px;
```

The inner radius is the outer radius less the border's width — `max()` because
`sharp` resolves to `0 - 1px`, and a negative radius is not a value. Applied to
the button's leading corners only, through the four logical
`border-*-*-radius` longhands, so the shape follows the writing direction with
no second rule.

At `rounded` this gives 998px on a 35px-tall button, which clamps to a
half-circle that meets the field's own pill exactly.

`ghost` raises `--file-button-radius-end` to the same value rather than
overriding a property: with the field's box gone there is no edge for the flat
side to sit against, so the button closes its own shape.

## The divider

`--file-button-border-color` defaults to `var(--file-border-color)`. Two
reasons.

Contrast: `--color-neutral-200` on `--color-neutral-100` is well under 3:1, so
the surface difference cannot be what tells a low-vision user where the button
ends. The divider is the field border's colour and carries it at 4.76:1.

Cascade: because it points at the field's border rather than restating a token,
`ghost` takes the divider with it in the one declaration that clears the
border. No second rule, no chance of the two drifting.

## States

Hover and active are on the **field**, not the button — the whole box opens the
dialog, so the press has to read on the button wherever in the box it started.
`.input` and `.select` have no `:active`; this one does, because the thing the
user is pressing looks like a button and should behave like one.

## The icon, and the em base again

`.input-group` end slot only. `.input` gives both edges, `.select` gives the
start because the chevron owns the end; this is the select case mirrored — the
button is a pseudo-element at the start of the box and no padding can move it,
so a start-placement mark simply covers it.

An icon **inside** the button was tested and left out. A `background-image` on
the pseudo-element renders correctly, but the colour has to be baked into the
data URI: `mask` + `background-color`, which would let the mark take a token,
erases the button's entire surface — measured here, and the same failure
`select.css` records for a `<select>`. A baked colour cannot grey out, so a
disabled field would keep a full-strength mark. The end-slot icon is a real
element in `currentColor` and follows every state.

The clearance needed the same correction as the padding:

```css
--file-padding-inline-end: calc(
  var(--input-group-clearance) *
    (var(--file-font-size) / var(--file-name-font-size))
);
```

`--input-group-clearance` is written in `em`, and a custom property is
substituted where it is **used**. On `.input` that resolves against the
control's font size; on `.file` it resolves against the file name's reduced
one. Taken as given it yields 28.35px at `md` where `.input` gets 31.5px, and
the name ends 1.35px short of the mark instead of 4.5px — tight in the
commonest case of all, a group at the page's own size.

The ratio is not a magic number: `--file-name-font-size` is what moved the em
base, so dividing it out is exactly the correction, and it stays exact if a
consumer replaces that variable. Measured after the fix — `.file` and `.input`
now agree at every size: 31.5 / 27 / 36px, same gap to the mark.

It is approximate in one case: an `--input-group-icon-*` in absolute units,
where the ratio is applied to a length that never shrank. Measured 44.17px
against `.input`'s 41.5px for a 24px icon — surplus padding, never a collision.

## Design tokens

`--font-size-sm` · `-md` · `-base`, `--line-height-base`, `--radius-sharp` ·
`-smooth` · `-rounded`, `--color-neutral-100` … `-900`, `--color-error`,
`--transition-fast`, and the whole `--form-*` channel.

No hardcoded colours, and no `light-dark()` — see `AGENTS.md` §8.
