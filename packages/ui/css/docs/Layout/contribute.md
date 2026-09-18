# Layout — contributing

## File

`packages/ui/css/styles/Layout/layout.css`

Layout is an attribute module activated by `data-layout`. It has no independent
key class and is deliberately valid on semantic layout owners such as `nav`,
`header`, `section`, `form` and `ul`. Box is only needed when that owner also
needs Box padding or radius.

## Contract

`[data-layout]` is a horizontal, non-wrapping layout for direct children. The
public API describes placement outcomes rather than exposing Flex or Grid
vocabulary.

The first word maps to `align-items`; the second word maps to
`justify-content` for the five ordinary outcomes.

## Why split uses Grid

`space-between` only distributes free space. It does not keep the middle child
geometrically centred when the outer children have different widths.

The three split values therefore use:

```css
grid-template-columns: minmax(0, 1fr) minmax(0, max-content) minmax(0, 1fr);
```

The equal outer tracks reserve the same amount on both sides of the middle
track. `split` deliberately supports exactly three direct children; groups
inside those regions can be any appropriate semantic element carrying their
own `data-layout`.

## Gap

`--layout-gap` defaults to `--spacing-0`. The named values map to the same
spacing scale used by Box padding:

| Value | Token |
|---|---|
| `none` | `--spacing-0` |
| `xs` | `--spacing-50` |
| `sm` | `--spacing-75` |
| `md` | `--spacing-100` |
| `lg` | `--spacing-150` |
| `xl` | `--spacing-200` |

Padding and gap must remain separate variables. A nested group commonly needs
`box-none` and a non-zero `data-gap` at the same time.

## Shrinking contract

The layout and every direct child receive `min-inline-size: 0` and
`min-block-size: 0`. Direct children also receive `max-inline-size: 100%`.
This removes the intrinsic minimum that commonly makes a Flex or Grid track
overflow.

Do not add `overflow: hidden`. Layout must make shrinking possible without
clipping menus, focus indicators or content that deliberately owns scrolling.

## Adding a value

A new public value must describe an outcome that is useful across components.
Do not expose `flex-*`, `grid-*`, track definitions or one-property utilities.
If the result needs a different internal layout algorithm, change the
implementation without changing the vocabulary.
