# Collapsible — how it is built

**File:** `src/Styles/collapsible.css`
**Key:** `.collapsible`, on a native `<details>`

## Why native, and why now

Until recently there were two real arguments for rebuilding a disclosure out of
divs: you could not lay out `<summary>`, and you could not animate the panel
open. Both are gone.

| Capability | Status |
|---|---|
| `display: flex/grid` on `details` and `summary` | Baseline since September 2025 |
| `::details-content` | Baseline since September 2025 — Chrome 131+, Firefox 143+, Safari 18.4+ |
| `name` for exclusive groups | Broad support |
| `interpolate-size` / `calc-size()` | Chromium only. Not Baseline. |

So the structure and the styling are safe; only the height animation is not.
That is the one place this component degrades, and it degrades to "snaps open",
which is fine.

This replaced a checkbox-and-label rebuild (`details.css`, deleted). That
version lost the disclosure semantics, lost keyboard operability, lost the
browser's find-in-page opening, and its header told consumers to add
`aria-expanded` and update it with JavaScript the library does not ship.

## The marker

`::marker` cannot be rotated — the pseudo-element accepts only a narrow set of
properties, and `transform` is not among them. Vendors also still disagree on
styling the marker at all. So the native marker is removed and ours is drawn on
`summary::after`.

Removing it takes both lines, always:

```css
list-style: none;
&::-webkit-details-marker { display: none; }
```

`display: flex` on the summary happens to drop the marker in some engines. Do
not rely on that.

Ours is a **mask**, not an image:

```css
background-color: var(--collapsible-marker-color);
mask-image: var(--collapsible-marker-icon);
```

The shape comes from a data URI, the colour from a token. The black inside the
SVG is only the mask's alpha channel and is never painted — it is not a
hardcoded colour under §4.4. This is also what makes the icon swappable: a
consumer cannot select a pseudo-element, so the icon has to be a variable.

A consumer-supplied `.collapsible-marker` stands ours down through `:has()`,
the same way `breadcrumbs.css` handles a consumer-supplied separator. That
symmetry is deliberate — the two components should feel like one library.

## The swap

The slot means two things depending on what is in it. One icon: it turns. Two
icons marked `.closed` and `.open`: they cross over.

The first design for this animated *part* of an icon — a plus whose vertical
stroke retracts into a minus — using two gradient bars and `background-size`.
It was dropped. It only ever worked for one shape, and it needed a second
rendering path alongside the mask. Swapping whole objects is general: nothing
inside either icon has to be animatable, so any pair of shapes works, including
a consumer's own SVGs.

Detection is `:has(:is(.open, .closed))` on the slot, which is also what stops
the box itself rotating when it holds a pair — otherwise the frame would spin
while the icons crossed inside it.

The stack is `display: grid` with both children at `grid-area: 1 / 1`. Grid and
not `position: absolute`, so the box keeps taking its size from the icons and
nothing has to be measured.

`display: block` on those children is defence, not looks. `.closed { display:
none }` is one of the commonest utility rules in other people's stylesheets;
with no declaration of ours theirs would apply unopposed and the icon would
vanish with nothing on screen to explain it. That is the price of short class
names, and it is one line.

### Why the branches say `:not([open])` and `[open]`

Every selector in a nested list keeps its own specificity, so a bare `&` would
already lose to its `[open]` partner and the swap would work. Both states are
written out anyway, because leaning on that is a trap: add one class to either
side later and the swap inverts with nothing to show why. Spelled out, the two
branches are mutually exclusive and specificity stops being part of the answer.

### Motion is variable reassignment, not new rules

`data-marker-motion` never writes a rule. It reassigns
`--collapsible-marker-exit-scale` and `--collapsible-marker-exit-rotation` —
where the outgoing icon goes and where the incoming one comes from. `scale` is
the default and so has no block at all.

Keep it that way. A fifth motion should cost two declarations, not a new
selector.

## The animation

```css
&::details-content { block-size: 0; padding-block: 0; overflow: hidden; … }
&[open]::details-content { block-size: auto; padding-block: …; }
```

Three things worth knowing:

**`interpolate-size` is declared on the component, not on `:root`.** It is what
lets `block-size` travel to `auto`. Putting an experimental, single-engine
property in the global scope for one component's sake would be the wrong trade.

**The padding is animated along with the height.** `::details-content` is a
pseudo-element, so the global `* { box-sizing: border-box }` does not reach it;
with `content-box`, a `block-size: 0` element still shows its padding. Driving
padding to zero in the closed state is what actually collapses the row.

**`overflow: hidden` clips the panel.** Content that needs to escape the box —
a popover, an outward focus ring on the very edge — will be cut. The padding
keeps normal content clear of it.

## Deviations from the house standard

**The focus ring is inset.** The house pattern is `outline: 3px` at
`outline-offset: 2px`. Here the offset is `-3px`, because the panel clips its
own overflow to keep the corner round and would eat an outward ring. Same
width, same colour, same contrast — only the direction differs. This is the
only component that does it.

## What is deliberately not here

Grouping. `accordion.css` composes these; this file knows nothing about
neighbours. If a rule here starts caring about a sibling, it is in the wrong
file.
