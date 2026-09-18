# Button — contributing

## File

`packages/ui/css/styles/button.css`

## Key

```css
.pu-btn:where(button, a, label, summary)
```

Four elements, all legitimate: an action, a destination, a control proxy, and
a disclosure toggle. `:where()` keeps the key at 0-1-0 so a consumer can
override it with one plain class.

## The border is never absent

It is only sometimes invisible. A filled button paints its border in its own
surface colour:

```css
--btn-surface: var(--color-primary);
--btn-border-color: var(--btn-surface);
```

That is what makes a filled button and an outline button standing side by
side the same box, on the same baseline. Every variant and every state moves
`--btn-surface` and lets the border follow. Only `btn-outline` separates the
two, by writing `--btn-border-color` itself.

Anything added later should move the variable, not write `background-color`.

## Neutralising the element

The same class has to give the same box whichever element carries it. A
`<button>` does not inherit type — it arrives with the system font, so a row
would be Arial 13px beside Poppins 14px. An `<a>` arrives underlined and in
the browser's link colour. Neither is a decision this component made, so
`font-family`, `font-size`, `font-weight`, `font-style`, `line-height` and
`text-decoration` are all reset to `inherit` or cleared in the base.

## Order inside the block

1. Variables
2. Base
3. Icon sizing
4. Size — `btn-sm` / `btn-md` / `btn-lg`
5. Shape — `btn-sharp` / `btn-smooth` / `btn-rounded`
6. Variants
7. Attributes — `data-intent`, `data-icon-only`
8. Actions — `:hover`, `:active`
9. State — `aria-pressed`, disabled

State is last so it settles what the actions above proposed. A pressed
button must not be recoloured by a hover that was declared after it.

## Specificity inside variants

`btn-outline` and the bare `:hover` both weigh (0,2,0), and source order
would hand it to `:hover` — which would fill the button with
`--color-primary` and lose the variant on the way in. Nesting the hover
inside the variant weighs (0,3,0) and wins.

Every variant that needs a hover of its own does it this way.
`btn-emphasised` deliberately has none.

`btn-tertiary` and `btn-ghost` also re-declare the disabled surface as
`transparent` — there is nothing to grey out when there was no fill to begin
with.

## Sizes carry radius

Each size sets both `font-size` and `border-radius`, so a small button gets a
proportionally small corner. The shape classes come after and replace the
radius the size set.

## Padding is em, not tokens

`padding-block: 0.5em` and `padding-inline: 0.75em` scale with the font size,
so one declaration serves all three sizes. `gap` is `0.5em` for the same
reason.

## Variables

| Variable | Default |
|---|---|
| `--btn-surface` | `var(--color-primary)` |
| `--btn-border-color` | `var(--btn-surface)` |
| `--btn-color` | `var(--color-primary-foreground)` |

Three, deliberately. Padding, radius and type are driven by size and shape
classes rather than by variables, so the sizes stay in step across the
library.

## States

`&:is(:disabled, [aria-disabled="true"])` — the key sits on `<a>` as well,
and an `<a>` can never be `:disabled`. Both forms are styled together.

`aria-pressed="true"` drives the toggle look. There is no `.active` class and
there should not be one; the ARIA attribute carries the meaning to assistive
technology and a class carries none.
