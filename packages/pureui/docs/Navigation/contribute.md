# Navigation — contributing

## File

`packages/pureui/styles/nav.css`

Three keys and one media query:

```
.pu-nav:where(ul, ol)   the list
.pu-nav-submenu         a nested list
.pu-nav-toggle          the small-screen button
@media (max-width: 768px)
```

## Key

```css
.pu-nav:where(ul, ol)
```

Navigation is a list of destinations. `list-style: none` costs the list role
in WebKit, so `role="list"` belongs in the markup.

## No component variables

This file declares none. Sizes, spacing and colours are written directly into
the rules from library tokens.

That is a departure from the rest of the library, where a component's tuning
surface is its variables. A consumer who wants a different link padding here
has to override the rule rather than set a property. Anything added to this
file should introduce the variables it needs rather than following the
existing pattern.

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

```css
&.nav-sharp > li > a { border-radius: var(--radius-sharp); }
```

The radius belongs to the link, which is the thing with a fill. Written on the
key it would round the list box, which has no background.

## The submenu opens from the parent's attribute

```css
.pu-nav > li[aria-expanded="true"] > &,
.pu-nav > li:has(> a[aria-expanded="true"]) > & { display: flex; }
```

Two selectors because the attribute is legitimately on either the `<li>` or
the link inside it, depending on which element the consumer's script drives.

Note these are written from the outside in, with `&` last — the submenu block
is a separate key, so it cannot reach its parent with nesting alone.

## The toggle swaps icons from `aria-expanded`

```css
&[aria-expanded="true"]  { .nav-icon-close { display: block } .nav-icon-menu { display: none } }
&[aria-expanded="false"] { .nav-icon-close { display: none }  .nav-icon-menu { display: block } }
```

`display` rather than opacity, and no transition. `Animations/swap.css` does
the same job with a crossfade and would be the thing to reach for if this ever
wants motion.

## The media query

At 768px and below the toggle appears and the list becomes an absolutely
positioned panel under the header, shown by `aria-expanded="true"` on the list
itself.

The breakpoint is a raw `768px`. There is no breakpoint token in `main.css`.

## Order inside the block

1. Base
2. Direction — `nav-horizontal`, `nav-vertical`
3. Items
4. Links, with their states nested
5. Size
6. Shape

The direction classes sit before the items because they change the flex
container, not the children.

## `transition: all`

The link declares `transition: all 0.2s ease`. `all` transitions every
animatable property including ones no rule in this file changes.

## Reduced motion

There is no `prefers-reduced-motion` block in this file.
