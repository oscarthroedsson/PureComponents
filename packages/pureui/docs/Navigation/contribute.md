# Navigation — contributing

## File

`packages/pureui/styles/nav.css` — one key, everything nested.

## Key

```css
.pu-nav:where(ul, ol)
```

Navigation is a list of destinations. `list-style: none` costs the list role
in WebKit, so `role="list"` belongs in the markup.

## What is not here

- **Submenus.** Menu does nested links with `<details>` and popovers. A second
  way to nest links in Nav would be two answers to one question.
- **A small-screen toggle.** It needs a script to set `aria-expanded`, and the
  library ships none. It belongs to PureComponents.

Both existed once as `.pu-nav-submenu` and `.pu-nav-toggle`, with a top-level
media query. They were removed rather than rewritten.

## Variables are the tuning surface

Every size, spacing and colour is a `--nav-*` variable declared at the top of
the block. Size and shape classes only move variables:

```css
&.nav-sm { --nav-font-size: var(--font-size-sm); --nav-link-padding-block: var(--spacing-25); … }
&.nav-rounded { --nav-link-radius: var(--radius-rounded); }
```

`nav-lg` uses `--font-size-base`, the same top step as Button, Tabs and Form.

## Links are children, not descendants

```css
& > li > a { … }
```

A descendant selector would also style links inside anything a consumer puts
in an item.

## States come from ARIA

```css
&[aria-current="page"] { … }
&[aria-disabled="true"] { … }
```

Not from classes. The attributes carry the meaning to assistive technology and
a class carries none. `aria-disabled` rather than `:disabled` because the key
sits on links, and an `<a>` can never be `:disabled`.

The hover rule excludes the current page:

```css
&:hover:not([aria-current="page"]) { … }
```

Where you already are does not answer to the pointer — the same position
`breadcrumbs.css` and `pagination.css` take.

## Shape reaches the link, not the list

The radius belongs to the link, which is the thing with a fill. Written on the
key it would round the list box, which has no background.

## Forced colours

The current page's fill disappears in forced colours. Every link carries a
transparent 1px border at rest, and `--nav-current-border-color` turns it to
`CanvasText` there, so the current page stays marked without the links
shifting.

## Motion

Only `background-color` and `color` transition, over `--nav-duration`.
`prefers-reduced-motion` removes it.

## Order inside the block

1. Variables
2. Base — list, items, links
3. Layout — `nav-horizontal`, `nav-vertical`
4. Size
5. Shape
6. States — hover, current, disabled, forced colours, reduced motion
