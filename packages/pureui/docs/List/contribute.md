# List — contributing

## File

`packages/pureui/styles/list.css`

List and ListItem live in the same file because they form one semantic pair,
but each has its own key and namespace.

## Keys

```css
.pu-list:where(ul, ol)

:where(.pu-list:where(ul, ol)) > .pu-list-item:where(li)
```

List requires a native `<ul>` or `<ol>`. ListItem requires a native `<li>` and
only renders as a direct child of List. This refuses styling to a ListItem on a
`<div>`, outside a list or below an extra wrapper.

The ancestor in the ListItem selector is inside `:where()`. It therefore adds
no specificity: `.pu-list-item` remains at the one-class key budget of 0-1-0.

## Ownership

The boundary between List, ListItem and Layout is strict:

| Owner | Responsibility |
|---|---|
| List | Collection padding, direction and gap between direct items. |
| ListItem | Its own padding, surface, text parts and interactive state. |
| Layout | Optional arrangement and gap between a ListItem's direct children. |

List must not select arbitrary `li`, images, SVGs, paragraphs or item content.
ListItem must not redefine the collection's direction or gap. Neither key
duplicates Layout's alignment and distribution vocabulary.

`data-layout` and `data-gap` belong on a ListItem when it needs internal
placement. They do not belong on List, because Layout would then compete with
List for `display`, direction and `gap`.

## List base

List is a vertical, non-wrapping flex container by default. It resets native
margin, padding and markers, applies its own logical padding, and writes one
gap between direct children.

It gives itself a zero intrinsic minimum and a maximum inline size of 100%, so
the collection can shrink inside a parent layout. It does not clip content and
does not reach into its children to make them shrink.

## Sizes

Sizes are spatial presets only:

| Size | Block padding | Inline padding | Gap |
|---|---|---|---|
| `none` | `--spacing-0` | `--spacing-0` | `--spacing-0` |
| `xs` | `--spacing-50` | `--spacing-50` | `--spacing-25` |
| `sm` | `--spacing-75` | `--spacing-75` | `--spacing-50` |
| `md` | `--spacing-100` | `--spacing-100` | `--spacing-75` |
| `lg` | `--spacing-150` | `--spacing-150` | `--spacing-100` |
| `xl` | `--spacing-200` | `--spacing-200` | `--spacing-150` |

The base is `md`, so there is no `.list-md` rule. An explicit `list-md` class
is harmless and useful when generated markup always emits a size, but the key
alone must produce the correct default.

A List size never changes font size, media size or ListItem padding. Those are
not properties of the collection.

## Direction

Vertical is the base. `data-direction="horizontal"` changes only
`flex-direction`; `data-direction="vertical"` is supported as an explicit
statement of the default.

Direction is structural data rather than a visual modifier, so there are no
`list-horizontal` or `list-vertical` classes. Neither direction reorders the
DOM, and horizontal remains non-wrapping.

## ListItem base

ListItem owns logical padding, radius, background and text colour. Its `md`
padding is the default, while its surface remains neutral. `list-item-none`,
`list-item-xs`, `list-item-sm`, `list-item-lg` and `list-item-xl` redefine only
the two padding variables. `list-item-md` is an allowed explicit class, but
needs no rule because the key already renders that size.

`min-inline-size: 0` and `max-inline-size: 100%` let the item shrink inside
either List direction. ListItem does not reset descendant margins and does not
size media based on tag name.

The two optional text parts carry the ListItem namespace:

```text
.list-item-title
.list-item-text
```

## Interactive ListItems

`data-interactive` belongs to ListItem. `.list-item-action` is its one primary
link or button and extends a pseudo-element over the complete item. Secondary
interactive controls receive a higher stacking level so they keep their own
hit areas.

The interactive state redefines `--list-item-background`; it does not write a
second `background-color` declaration. `aria-pressed="true"` and
`aria-current` values other than `false` supply the active state. Hover supplies
the transient state.

Background transitions are removed under `prefers-reduced-motion: reduce`.
Focus remains the responsibility of the real primary action and the global
focus rules.

## `list-style: none` costs semantics

WebKit drops the list role from a `<ul>` or `<ol>` styled with
`list-style: none`. CSS cannot restore it. Every usage example and consumer
must therefore put `role="list"` on List. Native `<li>` supplies the implicit
listitem role; do not duplicate it.

## Removed API

The previous implementation mixed collection and item responsibilities. These
names are deliberately removed:

| Removed | Replacement |
|---|---|
| `.item-row` | Layout attributes on `.pu-list-item`. |
| `.item-title` | `.list-item-title`. |
| `.item-text` | `.list-item-text`. |
| `.list-title` | `.list-item-title`. |
| `.list-action` | `.list-item-action`. |
| `list-top`, `list-center`, `list-bottom` | A Layout placement value. |
| `list-items-none` | `list-none` on List and a `list-item-*` size on ListItem. |
| `list-ghost` | No replacement; List no longer draws dividers. |
| `--list-font-size`, `--list-title-font-size` | Typography owned by content or ListItem parts. |
| `--list-media-size` | Media owned by the consumer or its component. |
| `--list-border-*` | No replacement; List no longer draws dividers. |
| `--list-color`, `--list-muted-color` | `--list-item-color`, `--list-item-muted-color`. |

Do not keep compatibility selectors in List. They would preserve the same
cross-boundary ownership this rewrite removes.

## Order inside the file

The List key contains:

1. Variables
2. Base
3. Size
4. Direction

The ListItem key contains:

1. Variables
2. Base
3. Size
4. Parts
5. Interactive behaviour
6. States and reduced motion

## Variables

### List

| Variable | Default |
|---|---|
| `--list-padding-block` | `var(--spacing-100)` |
| `--list-padding-inline` | `var(--spacing-100)` |
| `--list-gap` | `var(--spacing-75)` |

### ListItem

| Variable | Default |
|---|---|
| `--list-item-padding-block` | `var(--spacing-100)` |
| `--list-item-padding-inline` | `var(--spacing-100)` |
| `--list-item-radius` | `var(--radius-smooth)` |
| `--list-item-background` | `transparent` |
| `--list-item-hover-background` | Raised surface with 6% of `--color-shade` |
| `--list-item-active-background` | Raised surface mixed with `--shade-active` |
| `--list-item-color` | `var(--color-text)` |
| `--list-item-muted-color` | `var(--color-text-muted)` |
