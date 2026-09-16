# Textarea — contributing

## File

`packages/pureui/styles/Form/textarea.css`

## Key

```css
.pu-textarea:where(textarea)
```

## Every variable reads the channel with a fallback

```css
--textarea-font-size: var(--form-font-size, var(--font-size-md));
```

So a bare `.pu-textarea` works with no `.pu-form` around it.

**Never declare a `--form-*` variable in this file.** That would shadow the
group's value for the whole subtree instead of changing this one control.

## The radius cap

```css
--textarea-radius-max: calc(
  (1lh + (var(--textarea-padding-block) * 2) + (var(--textarea-border-width) * 2)) / 2
);

border-radius: min(var(--textarea-radius), var(--textarea-radius-max));
```

`border-radius` is resolved against the box, so `--radius-rounded`'s 999px
means "half of whatever this is". On a one-line `.pu-input` that is a pill,
which is the point. On a six-row textarea it is a 60px arc at each corner and
the field stops looking like a field.

So the radius is capped at the one value that is not arbitrary: **half the
height of a single-line control at this scale** — the same figure the
`.pu-input` beside it resolves its own pill to. A rounded textarea and a
rounded input then carry the same corner.

At `md` that is (21px line + 14px padding + 2px border) / 2 = 18.5px. Still
clearly rounder than smooth's 8px, and it stops there.

The cap is applied in the **base**, not in the shape blocks, so every route in
is covered: the class, an inherited `--form-radius` from a
`.pu-form.form-rounded`, and a `--textarea-radius` set inline by a consumer.

It is a maximum, not a value: anything smaller passes through untouched, which
is why `sharp` and `smooth` never meet it.

`checkbox.css` uses the same technique for the mirror-image problem.

## `--textarea-min-block-size` is a floor

```css
--textarea-min-block-size: calc(2lh + padding + border);
```

`rows` decides the height. This only catches the case where `rows` is absent —
two lines, so a bare textarea is visibly not an input. Derived the same way
`input.css` derives its own, so the two sit on the same grid.

## `resize: block`

Vertical only. The browser allows both, and dragging a textarea wider than the
form pushes the layout apart. The useful direction is kept, which is what 1.4.4
asks for.

`data-resize="none"` and `data-resize="both"` are the escape hatches.
`:disabled` sets `resize: none` — there is nothing to make room for.

## `field-sizing: content`

```css
&[data-sizing="content"] {
  field-sizing: content;
  max-block-size: var(--textarea-max-block-size);
}
```

The box follows what is typed. `rows` is ignored while it is on, the floor
above becomes the empty height, and the max is where it stops. Unsupported
browsers drop the declaration and keep the rows height.

`--textarea-max-block-size` defaults to `none`, so a box that grows keeps
growing unless the consumer says where to stop. It is only reached from this
block.

## `--textarea-line-height`

The same as `.pu-input`'s. A paragraph could argue for looser, but the only
line-height token in `main.css` is `--line-height-base`, and inventing a second
one here would put a value in a component that belongs in the token file. The
variable is exposed, so a consumer who wants prose spacing sets it without
waiting for the token.

## States come after the variant, on purpose

`textarea-ghost` and `:hover` both sit at (0,2,0), so source order decides, and
the states have to win. A ghost field still has to show that it is hovered,
wrong or disabled.

## `:read-only` is not `:disabled`

A read-only field takes focus, its text can be selected and copied, and it is
submitted with the form. Greying it made it look disabled, which is the one
thing it is not.

## Order inside the block

1. Variables, including the cap
2. Base, placeholder
3. Size
4. Shape
5. Variant
6. Height — `data-sizing`, `data-resize`
7. States
8. Reduced motion
