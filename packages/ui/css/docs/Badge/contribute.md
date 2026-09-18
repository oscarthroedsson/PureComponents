# Badge — contributing

## File

`packages/ui/css/styles/badge.css`

## Key

`.pu-badge` is a plain class. HTML has no element that means "badge", so
nothing is required through `:where()`.

## inline-flex, not inline

`height` and `width` are inert on an inline box, and `padding-block` paints
without reserving room in the line — a badge in running text overlaps the
line above it. `display: inline-flex` is what makes the box real.

`flex: 0 0 auto` keeps it from being squeezed by a flex or grid parent.

## The height floor

```css
min-block-size: calc(
  1lh + (var(--badge-padding-block) * 2) + (var(--badge-border-width) * 2)
);
```

This is the height a line of the badge's text would take untrimmed. It is a
floor, not a height, and it exists so a badge measures the same whether the
consumer wrote bare text or wrapped it in a `<p>`. The `text-box` trim below
only reaches a wrapped child — never the anonymous flex item that bare text
becomes.

It is also why the trim needs no `@supports` guard. A browser that cannot
trim lands on this floor anyway.

## Flattening children

```css
& > :is(h1, h2, h3, h4, h5, h6, p) { … }
```

A badge is a leaf, so whatever is inside has to look like badge text.
Headings arrive with a margin and with their own size and weight; `h1` is 2em
of the badge, which no margin reset alone would have caught.

The rule stops a heading rendering broken. It is not an invitation — a
heading in a badge still puts a phantom entry in the document outline.

## Order inside the block

1. Variables
2. Base
3. Content — icons, flattened children
4. Size
5. Shape — after size, so it replaces whatever radius the size carries
6. Intent
7. Intent text, inside `@supports`
8. Variants — after intent, so they strip its fill
9. States

Variants must come after intents. Written before them the two blocks tie on
specificity and source order hands it to the intent, which leaves
`badge-outline` and `badge-ghost` silently filled.

## `badge-sm` tightens padding

It is the only size that does. `--font-size-xs` is the smallest type token
there is, so at `sm` the box can only get smaller by giving back some of the
em padding — which is the right lever anyway. A small badge is a tight badge,
not just a badge in smaller type.

## The intent text guard

The guard is not optional.

```css
@supports (color: color-mix(in oklab, red 40%, black)) { … }
```

A `var()` inside a function defers validation to computed-value time, so an
unsupported mix does not fall back to the declaration above it — `color`
falls back to **inherit**. On a page with light text that renders a warning
badge as near-white on pale yellow, about 1.4:1. Outside the guard the base
`--color-neutral-900` stands instead, 6.46:1 or better on all four fills.

The mix runs in **oklab** and toward `--badge-intent-shade`, not toward a
neutral token. Mixing toward `--color-neutral-900` keeps that token's blue
and lands the text at 3.32:1. The same mix in oklch turns all four blue,
because black has no hue for a polar space to interpolate.

40% is a ceiling. `error` is the tightest of the four and measures 5.34:1
there.

## `--badge-intent-shade`

The one colour in the file that is not a token. There is no black token in
`main.css`, and it is declared as a variable so a consumer can replace it
rather than being stuck with it.

## Relationship to `intent.css`

`intent.css` sets `--badge-background`, `--badge-border-color` and
`--badge-color` at 0-1-0. The variants in this file weigh 0-2-0 and outrank
it, which is how `badge-outline` and `badge-ghost` stay transparent under an
intent.

## Badge or pill

A badge annotates something else. A pill is its own object and can be
clicked, selected or removed. Anything with a remove button belongs in
`pill.css`.
