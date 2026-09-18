# Breadcrumbs — contributing

## File

`packages/ui/css/styles/breadcrumbs.css`

## Key

```css
.pu-breadcrumbs:where(ol, ul)
```

A trail is a list. `<ol>` is the honest choice because the order carries
meaning, but `<ul>` is accepted.

The component sets `list-style: none`, which costs the list role in WebKit.
`role="list"` in the markup is the only fix, and every example carries it.

## The separator is generated, with an escape hatch

The mark is a `::after` on every `<li>` except the last:

```css
& > li:not(:last-child)::after {
  content: var(--breadcrumbs-separator);
}
```

Because it comes from a variable, a consumer changes it with one declaration
and never touches a rule.

### Silencing it

```css
@supports (content: "x" / "") {
  & > li:not(:last-child)::after {
    content: var(--breadcrumbs-separator) / "";
  }
}
```

The same mark with its alternative text emptied, so assistive technology skips
it. It is kept in a separate `@supports` block rather than merged into the
rule above: where the syntax is unknown the whole declaration is dropped, and
dropping this one only loses the silencing, not the separator.

### A separator the consumer brought

```css
& > li:has(> .breadcrumbs-separator)::after { content: none; }
& > li:last-child > .breadcrumbs-separator { display: none; }
```

The first stands our own mark down wherever the consumer supplied one, so the
two never double up. The second makes sure nothing follows the last crumb,
whoever drew it.

## Crumb padding excludes the separator

```css
& > li > :not(.breadcrumbs-separator) { padding-inline: …; }
```

The separator has its own spacing from `--breadcrumbs-separator-space`. Giving
it the crumb's padding as well would double the gap.

## Variants apply at two levels

```css
&.breadcrumbs-slash,
& > li.breadcrumbs-slash { --breadcrumbs-separator: "/"; }
```

On the list it changes every gap; on a single `<li>` it changes only the gap
after that crumb, because the variable is read by that item's own
pseudo-element. The shape classes are doubled the same way.

## Order inside the block

1. Variables
2. Base
3. Items and crumbs
4. Separator — generated, silenced, consumer-supplied
5. Separator variants
6. Current page
7. Size
8. Shape — after size, so it replaces the radius the size set

## The current crumb does not hover

```css
& > li > [aria-current="page"] {
  &:hover { color: …; text-decoration: none; }
}
```

Where you already are does not answer to the pointer. The rule is driven by
`aria-current`, not by a class, because the attribute is what tells assistive
technology the same thing.

## Sizes carry radius

Each size sets font size, separator spacing **and** radius, so a small trail
gets a proportionally small crumb corner. The shape classes come after and
replace it.

## Variables

| Variable | Default |
|---|---|
| `--breadcrumbs-gap` | `var(--spacing-0)` |
| `--breadcrumbs-font-size` | `var(--font-size-md)` |
| `--breadcrumbs-radius` | `var(--radius-md)` |
| `--breadcrumbs-separator` | `">"` |
| `--breadcrumbs-separator-color` | `var(--color-text-subtle)` |
| `--breadcrumbs-separator-space` | `var(--spacing-50)` |
| `--breadcrumbs-crumb-padding-inline` | `var(--spacing-25)` |
| `--breadcrumbs-crumb-padding-block` | `var(--spacing-15)` |
| `--breadcrumbs-crumb-background` | `transparent` |
| `--breadcrumbs-link-color` | `var(--color-text-subtle)` |
| `--breadcrumbs-hover-color` | `var(--color-text)` |
| `--breadcrumbs-current-color` | `var(--color-text)` |

The crumb background defaults to `transparent` so a trail is plain text until
someone asks for chips. The radius and padding are declared regardless, so
setting the one variable is enough to get them.
