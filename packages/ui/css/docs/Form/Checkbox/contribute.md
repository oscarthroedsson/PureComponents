# Checkbox — contributing

## File

`packages/ui/css/styles/Form/checkbox.css`

## Key

```css
.pu-checkbox:where(input[type="checkbox"])
```

The type is part of the requirement. `appearance: none` on the wrong element
produces a box that looks like a checkbox and behaves like nothing.

## `font: inherit` is load-bearing

Every measurement in the file is in `em`, and without this they would be em of
the browser's own 13.33px rather than of the text the box sits beside. A form
control does not inherit the page's font.

It is what makes a size class on the `.pu-form` or the `.pu-fieldset` reach
this file at all. `input.css` and `textarea.css` say the same thing for the
same reason.

## The radius cap

```css
--checkbox-radius-max: calc(var(--checkbox-size) / 4);

border-radius: min(var(--checkbox-radius), var(--checkbox-radius-max));
```

The channel's radius is measured for a control the height of an `.pu-input` —
8px on a 37px box. This box is 15px, and 8px on 15px is a circle. So the radius
is capped at a quarter of the box, which is the same **proportion** the channel
gives a full-height control, not the same number.

Nothing raises it. A quarter of the box is as round as a checkbox is allowed to
get, whatever arrives on the channel.

## There is no `checkbox-rounded`

A circular checkbox is a radio, and the shape is the only thing telling the two
apart. The cap is what makes refusing it real — a `.pu-form.form-rounded` puts
999px on the channel, and this box still comes out square.

## The mark is a shape, not a picture

```css
&::before {
  clip-path: polygon(14% 44%, 0 60%, 40% 100%, 100% 16%, 86% 2%, 40% 70%);
}
```

`clip-path` cuts a tick out of a plain coloured square, so the colour is a
token and nothing is downloaded.

It is drawn at rest and scaled to nothing, so checking the box reveals
something that was already there rather than creating it — which is what lets
the reveal be animated at all.

`display: inline-grid` with `place-content: center` on the key means the mark
never has to know the box's size.

## Indeterminate is a different shape

```css
&:indeterminate::before {
  clip-path: polygon(0 38%, 100% 38%, 100% 62%, 0 62%);
}
```

Neither on nor off. A different shape, never a different shade — colour is not
allowed to be the only thing that separates two states.

## Invalid comes after `:checked`

A required box the user has skipped is more urgent than the fact that it is
empty, and a checked-but-rejected box still has to show it was rejected.

Both routes, always: `:user-invalid` for native validation,
`[aria-invalid="true"]` for the JS validators that set no native constraints at
all.

## The disabled mark is dark, not light

```css
&:disabled { --checkbox-mark-color: var(--color-text-subtle); }
```

A near-white tick on a `neutral-400` fill measures 1.7:1 and reads as an empty
box — the state disappears at the moment it matters, which is when the user is
trying to work out why they cannot change it.

Disabled is exempt from 1.4.3, but being exempt from a rule is not a reason to
be unreadable.

## Forced colours

`appearance: none` takes the control out of the high-contrast palette:
`background-color` is not painted there, so an owned checkbox would be an empty
outline whether checked or not.

System colours put it back — `CanvasText` for the box, `Highlight` for the
checked fill, `Canvas` for the mark cut out of it, `GrayText` throughout when
disabled.

## `vertical-align: text-bottom`

The label decides the line; the box sits on it rather than under it.

## Order inside the block

1. Variables, including the cap
2. Base
3. The mark
4. Size
5. Shape
6. States
7. Forced colours
8. Reduced motion
