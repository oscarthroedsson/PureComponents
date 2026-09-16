# Radio — contributing

## File

`packages/pureui/styles/Form/radio.css`

## Key

```css
.pu-radio:where(input[type="radio"])
```

The type is part of the requirement. Only a real radio gives the group
behaviour, the arrow-key navigation and the one-of-many announcement.

## `font: inherit` is load-bearing

Every measurement here is in `em`, and a form control does not inherit the
page's font. Without this they would be em of the browser's 13.33px instead of
the text the button sits beside.

## The radius is not from the channel

```css
border-radius: var(--radius-full);
```

Not a variable, and not `--form-radius`. A radio is a circle — that is the only
thing telling it apart from a checkbox — so a `.pu-form.form-sharp` must not be
able to square it off.

`checkbox.css` solves the mirror-image problem with a cap; here the answer is
simply not to expose it.

There is no shape section in the file for the same reason.

## The dot needs no `clip-path`

It is a circle, so `border-radius: var(--radius-full)` on the pseudo-element is
the whole shape. `checkbox.css` needs `clip-path` because a tick is not a
rectangle.

Drawn at rest and scaled to nothing, so checking reveals something already
there — which is what lets the reveal be animated.

`display: inline-grid` with `place-content: center` on the key means the dot
never has to know the button's size.

## A required group turns every button

```css
&:is(:user-invalid, [aria-invalid="true"]) { --radio-border-color: var(--color-error); }
```

A required group with nothing picked makes **every** button in it match
`:user-invalid` — the constraint belongs to the group, and the group is the
`name`, not an element. So the whole set turns, which is right: the question is
unanswered, not one option.

No rule is needed to produce this. It falls out of how the pseudo-class works,
and the file does not fight it.

## Forced colours

`appearance: none` takes the control out of the high-contrast palette:
`background-color` is not painted there, so an owned radio would be an empty
ring whether checked or not.

`CanvasText` for the ring, `Highlight` for the checked fill, `Canvas` for the
dot, `GrayText` throughout when disabled.

## `vertical-align: text-bottom`

The label decides the line; the button sits on it rather than under it.

## No disabled dot colour

`checkbox.css` re-points `--checkbox-mark-color` when disabled, because a
near-white tick on a muted fill reads as an empty box. The radio has no
equivalent rule — the disabled dot keeps `--color-primary-foreground` against
`--color-border`.

## Order inside the block

1. Variables
2. Base
3. The dot
4. Size
5. States
6. Forced colours
7. Reduced motion

There is no shape section, deliberately.

## Radio or checkbox

A radio cannot be unpicked once picked. Anything that can be switched off is a
checkbox, and anything where more than one answer is possible is a checkbox
group.
