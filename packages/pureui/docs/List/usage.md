# List

A semantic container that arranges a collection of ListItems. List owns the
collection's padding, direction and the gap between items. It does not size or
lay out the contents inside an item.

## Quick start

```html
<ul class="pu-list list-md" role="list">
  <li class="pu-list-item">North region</li>
  <li class="pu-list-item">South region</li>
  <li class="pu-list-item">East region</li>
</ul>
```

The key alone renders the default `md` size. `list-md` may be written when an
explicit size is clearer in the markup, but it does not need a separate CSS
rule.

## Required elements

`.pu-list` only renders on a real `<ul>` or `<ol>`. `.pu-list-item` only renders
on a direct `<li>` child of that List:

```html
<ol class="pu-list" role="list">
  <li class="pu-list-item">Install the package</li>
  <li class="pu-list-item">Link the stylesheet</li>
  <li class="pu-list-item">Add the classes</li>
</ol>
```

Use `<ol>` when order carries meaning and `<ul>` when it does not.

## `role="list"` is not optional

List removes the native markers with `list-style: none`. WebKit then drops the
list semantics, so a screen reader can stop announcing the list and its item
count. `role="list"` restores those semantics and belongs on every List.

Do not add `role="listitem"` to the children. A valid `<li>` already supplies
that role.

## Ownership

List and ListItem deliberately have separate jobs:

| Owner | Controls |
|---|---|
| `.pu-list` | Collection padding, direction and gap between ListItems. |
| `.pu-list-item` | Its own padding, surface, text parts and interactive state. |
| Layout | Optional placement and gap between a ListItem's direct children. |

Do not put `data-layout` or `data-gap` on `.pu-list`. That would give List and
Layout two competing owners for the collection's display, direction and gap.

## Sizes

List ships a zero-spacing preset and the complete spatial scale:

```html
<ul class="pu-list list-none" role="list">…</ul>
<ul class="pu-list list-xs" role="list">…</ul>
<ul class="pu-list list-sm" role="list">…</ul>
<ul class="pu-list list-md" role="list">…</ul>
<ul class="pu-list list-lg" role="list">…</ul>
<ul class="pu-list list-xl" role="list">…</ul>
```

Each size changes only List padding and the gap between ListItems. It does not
change type, media or ListItem padding.

| Size | Block and inline padding | Gap |
|---|---|---|
| `none` | `var(--spacing-0)` | `var(--spacing-0)` |
| `xs` | `var(--spacing-50)` | `var(--spacing-25)` |
| `sm` | `var(--spacing-75)` | `var(--spacing-50)` |
| `md` | `var(--spacing-100)` | `var(--spacing-75)` |
| `lg` | `var(--spacing-150)` | `var(--spacing-100)` |
| `xl` | `var(--spacing-200)` | `var(--spacing-150)` |

## Direction

Vertical is the default. Use `data-direction="horizontal"` for a horizontal
collection:

```html
<ul class="pu-list list-sm" role="list" data-direction="horizontal">
  <li class="pu-list-item">Overview</li>
  <li class="pu-list-item">Activity</li>
  <li class="pu-list-item">Settings</li>
</ul>
```

Both values may be written explicitly:

```text
vertical · horizontal
```

Direction never changes DOM or reading order. Horizontal lists do not wrap by
default.

## Custom collection spacing

Override the component variables for a value outside the presets:

```html
<ul
  class="pu-list list-md"
  role="list"
  style="--list-padding-inline: var(--spacing-200); --list-gap: var(--spacing-300)"
>
  …
</ul>
```

| Variable | Default | Controls |
|---|---|---|
| `--list-padding-block` | `var(--spacing-100)` | List padding on the block axis. |
| `--list-padding-inline` | `var(--spacing-100)` | List padding on the inline axis. |
| `--list-gap` | `var(--spacing-75)` | Gap between direct ListItems. |

## Layout inside a ListItem

ListItem does not invent a second row-layout API. Use Layout when an item must
arrange several direct children:

```html
<ul class="pu-list list-md" role="list">
  <li
    class="pu-list-item"
    data-layout="center-between"
    data-gap="sm"
  >
    <span>Notifications</span>
    <button class="pu-btn btn-sm" type="button">Open</button>
  </li>
</ul>
```

Here `--list-gap` separates the `<li>` elements. `data-gap="sm"` separates the
children inside this one ListItem.

When stylesheets are linked separately, load `layout.css` after `list.css` for
this composition. The package `index.css` already loads them in the correct
layers.

## ListItem sizes and surface

ListItem owns its own padding and uses `md` by default. Its complete padding
scale is independent of the List size:

```html
<ul class="pu-list list-none" role="list">
  <li class="pu-list-item list-item-none">None</li>
  <li class="pu-list-item list-item-xs">Extra small</li>
  <li class="pu-list-item list-item-sm">Small</li>
  <li class="pu-list-item list-item-md">Medium</li>
  <li class="pu-list-item list-item-lg">Large</li>
  <li class="pu-list-item list-item-xl">Extra large</li>
</ul>
```

`list-item-md` may be written explicitly, but the key alone already renders
that size and therefore needs no separate CSS rule. Override
`--list-item-padding-block` or `--list-item-padding-inline` when a preset does
not fit.

| Size | Block and inline padding |
|---|---|
| `none` | `var(--spacing-0)` |
| `xs` | `var(--spacing-50)` |
| `sm` | `var(--spacing-75)` |
| `md` | `var(--spacing-100)` |
| `lg` | `var(--spacing-150)` |
| `xl` | `var(--spacing-200)` |

Its optional text parts are namespaced to ListItem:

```html
<li class="pu-list-item">
  <strong class="list-item-title">Ada Lovelace</strong>
  <p class="list-item-text">Last seen yesterday</p>
</li>
```

## Interactive ListItems

Put `data-interactive` on the ListItem and `.list-item-action` on its one
primary link or button. That action extends across the complete item while
secondary controls keep their own hit areas:

```html
<ul class="pu-list list-none" role="list">
  <li
    class="pu-list-item list-item-sm"
    data-interactive
    data-layout="center-between"
    data-gap="sm"
  >
    <div>
      <button class="list-item-action list-item-title" type="button" aria-pressed="false">
        Open message
      </button>
      <p class="list-item-text">Received five minutes ago</p>
    </div>
    <button class="pu-btn btn-sm btn-ghost" type="button">More</button>
  </li>
</ul>
```

`aria-pressed="true"` marks a toggle-like selected action. A current link may
use any valid `aria-current` value other than `false`. Both produce the active
ListItem surface.

## ListItem variables

| Variable | Default | Controls |
|---|---|---|
| `--list-item-padding-block` | `var(--spacing-100)` | Item padding on the block axis. |
| `--list-item-padding-inline` | `var(--spacing-100)` | Item padding on the inline axis. |
| `--list-item-radius` | `var(--radius-sharp)` | Item corner radius. |
| `--list-item-background` | `transparent` | Item surface. |
| `--list-item-hover-background` | Raised surface mixed with `--shade-hover` | Interactive hover surface. |
| `--list-item-active-background` | Raised surface mixed with `--shade-active` | Current or pressed surface. |
| `--list-item-color` | `var(--color-text)` | Item text. |
| `--list-item-muted-color` | `var(--color-text-muted)` | `.list-item-text`. |

## Accessibility

- Use `role="list"` on every List.
- Keep every `.pu-list-item` as a direct `<li>` child.
- Use `<ol>` when order carries meaning.
- Keep DOM order equal to visual and reading order.
- A decorative image takes `alt=""`.
- An interactive item has one primary action; do not place several overlapping
  primary links in the same item.
