# New CSS features — 2026

Ten CSS features worth knowing going into 2026, with a short explanation and a
link to the reference for each.

Source: [10 NEW CSS Features You Need To Know For 2026](https://www.youtube.com/watch?v=svqu6FDiMAs)

**Support column reflects MDN Baseline as read on 2026-08-19.** Most of these are
still *Limited availability* — they do not work in every major browser yet. Treat
them as progressive enhancement until Baseline says otherwise; nothing here is
approved for `src/Styles/` yet.

| # | Feature | Baseline |
|---|---|---|
| 1 | `corner-shape` | Limited availability |
| 2 | `shape()` | Newly available |
| 3 | Customizable `<select>` | Limited availability |
| 4 | `::scroll-marker` / `::scroll-button` | Limited availability |
| 5 | Container scroll-state queries | Limited availability |
| 6 | `stretch` keyword | Limited availability |
| 7 | `text-box` | Limited availability |
| 8 | `sibling-index()` / `sibling-count()` | Limited availability |
| 9 | `if()` | Limited availability |
| 10 | `@function` | Limited availability |

---

## 1. `corner-shape` — corners that are not just rounded

`border-radius` decides *how big* a corner is; `corner-shape` decides *what shape*
it is. Values: `round` (the default, what we have today), `bevel` (a straight cut
across the corner), `notch` (a rectangular cut inwards), `scoop` (a curved cut
inwards) and `squircle` (the rounded-square shape iOS icons use).

It needs a `border-radius` to work from — the radius sets the size of the corner,
the shape sets its geometry. Each corner can get its own shape, and it replaces
what used to require an SVG and `clip-path`.

```css
.card {
  border-radius: 24px;
  corner-shape: squircle;
}
```

📖 [MDN: `corner-shape`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/corner-shape)

---

## 2. `shape()` — draw a shape in real CSS units

A `<basic-shape>` function for `clip-path` and friends. It does what `path()`
does, but in CSS rather than SVG path syntax: it accepts percentages, `em`/`rem`,
and CSS math like `calc()`, `min()`, `max()` and `abs()`. `path()` is stuck with
raw pixel coordinates, so a `path()` shape cannot be responsive and a `shape()`
one can.

You describe an outline with commands — `line`, `hline`, `vline`, `arc`, `curve` —
starting `from` a point.

```css
.badge {
  clip-path: shape(from 50% 0%, line to 100% 50%, line to 50% 100%, line to 0% 50%);
}
```

Combined with `offset-path`, it also drives animations along a custom route.

📖 [MDN: `shape()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/basic-shape/shape) ·
[`offset-path`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/offset-path)

---

## 3. Customizable `<select>` — styling the native dropdown

The long-standing "you cannot style a select" problem. Opt in with
`appearance: base-select` on both the `<select>` and its `::picker(select)`, and
the browser hands over the internals instead of drawing an OS widget.

What becomes stylable:

- `::picker(select)` — the dropdown panel itself
- `::picker-icon` — the chevron, including animating it on open/close
- `:open` — the select while the panel is open
- `option` and `option:checked` — the individual entries
- `::checkmark` — the tick on the selected entry

The point is that this stays a real `<select>`: keyboard behaviour, screen reader
semantics and mobile pickers keep working, unlike a div reconstruction.

```css
select, ::picker(select) {
  appearance: base-select;
}
```

📖 [MDN: Customizable select elements](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Customizable_select) ·
[`::picker()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::picker)

---

## 4. `::scroll-marker` and `::scroll-button` — a carousel without JavaScript

`::scroll-marker` generates one marker per item in a scroll container — the dots
under a carousel. They behave like anchor links: clicking one scrolls to that
item. `scroll-marker-group` on the container decides whether the group of markers
is placed `before` or `after` the content, and `:target-current` matches the
marker for the item currently in view.

`::scroll-button()` generates previous/next buttons for the same container, taking
a direction (`left`, `right`, `block-start`, `inline-end`, …).

```css
.carousel {
  scroll-marker-group: after;

  & > li::scroll-marker { … }
  & > li::scroll-marker:target-current { … }
  &::scroll-marker-group { display: flex; justify-content: center; gap: 8px; }
}
```

Both are real generated buttons, so focus and keyboard navigation come for free.

📖 [MDN: `::scroll-marker`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::scroll-marker) ·
[`::scroll-button()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::scroll-button) ·
[`scroll-marker-group`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/scroll-marker-group)

---

## 5. Container scroll-state queries — style on scroll position

Container queries, but the thing being queried is scroll state instead of size.
Set `container-type: scroll-state` (optionally with a `container-name`), then
query one of three states from a descendant:

- `stuck` — a `position: sticky` element has hit its edge and is now pinned
- `snapped` — the element is the one currently snapped to in a scroll-snap container
- `scrollable` — the container can still scroll in a given direction

This replaces the usual JavaScript for these: `IntersectionObserver` sentinels for
sticky headers, scroll listeners for "scroll to top" buttons.

```css
.page { container-type: scroll-state; }

@container scroll-state(stuck: top) {
  .header { box-shadow: …; }
}
```

📖 [MDN: Container scroll-state queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Conditional_rules/Container_scroll-state_queries)

---

## 6. `stretch` — the honest `100%`

A keyword for `width` and `height`. `100%` measures the containing block, so
adding a margin pushes the element past its container. `stretch` sizes the
element's *margin box* to fill the container instead, so margins are subtracted
rather than added — regardless of `box-sizing`.

```css
.inner {
  width: stretch;
  height: stretch;
  margin: 20px;   /* stays inside the parent */
}
```

📖 [MDN: `width`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/width) ·
[`height`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/height)

---

## 7. `text-box` — trim the half-leading above and below text

Every line box carries extra space above and below the glyphs. `text-box` (the
shorthand for `text-box-trim` and `text-box-edge`) removes it, so a heading
optically aligns with whatever sits next to it.

Two parts:

- **How much to trim** — `trim-start`, `trim-end`, `trim-both`
- **Where to trim to** — top: `text` (default), `cap` (capital height), `ex`
  (lowercase x-height); bottom: `text` (default), `alphabetic` (the baseline, so
  descenders in *y* and *g* are cut)

```css
h2 {
  text-box: trim-start cap alphabetic;
}
```

📖 [MDN: `text-box`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-box) ·
[`text-box-trim`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-box-trim) ·
[`text-box-edge`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-box-edge)

---

## 8. `sibling-index()` and `sibling-count()` — position as a number

`sibling-index()` returns the element's 1-based position among its siblings;
`sibling-count()` returns how many siblings there are in total. Both are integers
usable inside `calc()`, which is what makes them different from `:nth-child()` —
you get a value to compute with instead of a selector to repeat.

Staggered animation delays stop being a generated block of `:nth-child` rules:

```css
.item {
  animation-delay: calc(sibling-index() * 80ms);
  width: calc(sibling-index() * 50px);
}
```

📖 [MDN: `sibling-index()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/sibling-index) ·
[`sibling-count()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/sibling-count)

---

## 9. `if()` — inline conditionals in any property

An inline conditional usable as the value of any property. It takes
semicolon-separated `condition: value` pairs and resolves to the first condition
that is true, with `else` as the fallback. Conditions come in three forms:
`media()`, `style()` and `supports()`.

The gain is locality: the condition lives on the property it affects, instead of
being split across a separate `@media` or `@container style()` block far away.

```css
.panel {
  flex-direction: if(media(width < 300px): column; else: row);
  background: if(style(--theme: dark): var(--color-neutral-900); else: var(--color-neutral-0));
}
```

📖 [MDN: `if()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/if)

---

## 10. `@function` — custom functions in CSS

Author-defined functions. You declare a name (custom-property syntax, so it must
start with `--`), its parameters with optional defaults and types, and a body that
can hold local variables and conditional logic, ending in `result`.

```css
@function --alpha(--color, --amount) {
  result: oklch(from var(--color) l c h / var(--amount));
}

.overlay {
  background-color: --alpha(var(--color-neutral-900), 0.6);
}
```

The same mechanism handles responsive values, returning one thing or another based
on a media query — which keeps the branch at the point of use rather than in a
separate rule block.

📖 [MDN: `@function`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@function)
