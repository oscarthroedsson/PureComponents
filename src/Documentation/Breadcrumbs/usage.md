# Breadcrumbs

The trail that says where on the site you are.

```html
<nav aria-label="Breadcrumb">
  <ol class="breadcrumbs md" role="list">
    <li><a href="/">Home</a></li>
    <li><a href="/category">Category</a></li>
    <li><span aria-current="page">Current page</span></li>
  </ol>
</nav>
```

The class goes on the `<ol>`. An `<ol>` and not a `<ul>`: the order is the
hierarchy, not a presentation choice. The numbers are turned off; the order is
not.

## When to use it

- Showing where a page sits in a hierarchy that is more than two levels deep.
- Giving a way back up that is not the browser's back button.

## When not to use it

- Primary navigation — that is `nav.css`.
- Steps in a flow. A breadcrumb says where you are, not how far you have got;
  use Progress for that.
- Two levels. "Home > Page" is a link, not a trail.

## Three things belong to your markup

The library ships no JavaScript and cannot write markup for you. These three are
yours, and without them the component is wrong however good it looks:

| Attribute | Goes on | Why |
|---|---|---|
| `aria-label="Breadcrumb"` | the `<nav>` | Tells this landmark from the page's other navs. |
| `role="list"` | the `<ol>` | `list-style: none` makes WebKit stop announcing it as a list at all. This writes the role back without bringing the numbers with it. |
| `aria-current="page"` | the current crumb | On the element, never on the `<li>`. |

`aria-current` is also what the current-page styling hangs on. Leave it off and
the crumb renders as a plain link — which is the honest result, because without
it nothing has told anyone which page they are on.

## Size

`sm` · `md` · `lg`, on the `<ol>`. `md` is what the key class alone gives you;
the class is there to say it out loud.

## Shape

`sharp` · `smooth` · `rounded`, on the `<ol>` — or on a single crumb:

```html
<ol class="breadcrumbs sharp" role="list">
  <li><a href="/">Home</a></li>
  <li class="rounded"><a href="/category">Category</a></li>
  <li><span aria-current="page">Current page</span></li>
</ol>
```

A crumb that carries its own shape wins; one that does not falls back to the
list's.

Corners only show once something is drawn behind them. The crumbs carry padding
and a transparent background from the start, so this is all a chip takes:

```html
<ol class="breadcrumbs rounded" role="list"
    style="--breadcrumbs-crumb-background: var(--color-neutral-200)">
```

## The separator

The default mark is `>`. Four variant classes reassign it and do nothing else:

| Class | Mark |
|---|---|
| — | `>` |
| `slash` | `/` |
| `chevron` | `›` |
| `arrow` | `→` |
| `dot` | `•` |

For a mark we do not ship, set the variable yourself:

```html
<!-- every gap -->
<ol class="breadcrumbs" role="list" style="--breadcrumbs-separator: '»'">

<!-- only the gap after this crumb -->
<li style="--breadcrumbs-separator: '|'">
```

It takes an image too — `url("/icons/chevron.svg")` — but a content image cannot
be resized. When the size matters, use an element instead:

```html
<li>
  <a href="/category">Category</a>
  <span class="breadcrumbs-separator" aria-hidden="true">
    <svg …></svg>
  </span>
</li>
```

Two things you do not have to do: our own mark switches itself off when it sees
yours, so a gap can never end up with two; and the last crumb hides its
separator either way, so a loop can emit the same markup for every item, last
one included.

Your separator takes `aria-hidden="true"`. Ours is kept away from assistive tech
already.

## Variables

Set them on the `<ol>` for the whole trail, or on an `<li>` for one crumb —
custom properties inherit, and a crumb's own value always beats the list's.

| Variable | Default |
|---|---|
| `--breadcrumbs-gap` | `var(--spacing-0)` |
| `--breadcrumbs-font-size` | `var(--font-size-md)` |
| `--breadcrumbs-radius` | `var(--radius-md)` |
| `--breadcrumbs-separator` | `">"` |
| `--breadcrumbs-separator-color` | `var(--color-neutral-400)` |
| `--breadcrumbs-separator-space` | `var(--spacing-50)` |
| `--breadcrumbs-crumb-padding-inline` | `var(--spacing-25)` |
| `--breadcrumbs-crumb-padding-block` | `var(--spacing-15)` |
| `--breadcrumbs-crumb-background` | `transparent` |
| `--breadcrumbs-link-color` | `var(--color-neutral-500)` |
| `--breadcrumbs-hover-color` | `var(--color-neutral-900)` |
| `--breadcrumbs-current-color` | `var(--color-neutral-900)` |
| `--breadcrumbs-focus-color` | `var(--color-primary)` |

`--breadcrumbs-link-color` is the one to leave alone. `--color-neutral-500` is
4.8:1 on white; anything lighter drops the crumbs below the contrast floor.

## Long trails

The row wraps rather than overflowing. There is no collapse-to-ellipsis
behaviour, because deciding which crumbs to drop is a decision about your
content, not about CSS.
