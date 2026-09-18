# Collapsible — contributing

## File

`packages/ui/css/styles/collapsible.css`

It imports `./Motion/swap.css` on line 1, so a page linking this file gets
the two-icon marker without linking anything else.

## Key

```css
.pu-collapsible:where(details)
```

`<details>` gives the toggle, the keyboard handling and the open/closed
announcement for free. A `<div>` with a class gives none of it and CSS cannot
add any, which is what makes the requirement worth enforcing.

## Removing the native marker takes two lines

```css
list-style: none;

&::-webkit-details-marker { display: none; }
```

`list-style` is the standard way out. WebKit still ships its own marker
pseudo-element, and the vendors have not agreed on styling the marker itself —
so the file does not style it, it removes it and draws its own.

## The marker is a mask, not an image

```css
background-color: var(--collapsible-marker-color);
mask-image: var(--collapsible-marker-icon);
```

The shape comes from the data URI and the colour from a token, so the marker
goes through the colour rules like everything else. The black inside the SVG
is only the mask's alpha channel — it is never painted.

A consumer cannot select `::after`, which is why the icon, size, colour,
rotation and duration are all variables. Reassigning
`--collapsible-marker-icon` swaps the whole glyph.

## Two markers, one rule to switch

```css
& > summary:has(.collapsible-marker)::after { content: none; }
```

A marker the consumer brought stands ours down on sight. There is nothing to
switch off and no modifier class involved.

Both marker forms take the same `inline-size`, `block-size`, `flex: none` and
`margin-inline-start: auto`, so they sit in the same place and the summary row
does not shift between them.

## `interpolate-size: allow-keywords`

Declared on the key rather than on `:root` on purpose. This is what lets
`block-size` travel to `auto` and gives the panel its slide. One experimental
property does not belong in the global scope for a single component's sake.

Firefox and Safari ignore it and the panel snaps open — correct, just not
animated.

## `::details-content`

The content is padded, sized and transitioned through the pseudo-element:

```css
&::details-content {
  block-size: 0;
  overflow: hidden;
  transition: block-size …, padding-block …, content-visibility …;
  transition-behavior: allow-discrete;
}
```

`allow-discrete` is what carries `content-visibility` across, so the panel
does not vanish before it has finished closing.

`[open]` sets `block-size: auto` and restores the block padding.

Older engines have no `::details-content` to hang padding on, so the content
would sit flush against the edge:

```css
@supports not selector(::details-content) {
  & > :not(summary) { margin-inline: var(--collapsible-padding-inline); }
}
```

Reaching the children directly there, and only there.

## `overflow: hidden` on the key

So the summary's hover fill follows the corner instead of squaring it off.

It also means an outward focus ring would be clipped, which is why the focus
offset is negative here and only here. Same width, same colour, same 3:1.

## Headings in the summary

```css
& :is(h1, h2, h3, h4, h5, h6) {
  margin: 0;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
}
```

A heading is allowed in a summary — the panel is often a real section. It must
not bring its own scale with it.

## The swap exception

```css
&[open] {
  & > summary::after,
  & > summary .collapsible-marker:not(.pu-swap) {
    rotate: var(--collapsible-marker-rotation-open);
  }
}
```

The single-icon slot turns. A `.pu-swap` slot does not — the icons inside it
do the moving, or the pair would cross while the frame spun.

## Order inside the block

1. Variables
2. Base
3. Summary
4. Marker — ours, yours, the switch
5. Content, and the `@supports` fallback
6. Size
7. Shape
8. States — `data-marker`, `[open]`
9. Reduced motion

## Relationship to Accordion

`accordion.css` composes this file by setting its variables — it never
restyles a panel and never repeats a line of it. The one place the two files
touch is the size table: the values in `.accordion-sm` / `-md` / `-lg` mirror
the ones here and have to stay in step.
