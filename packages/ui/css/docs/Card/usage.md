# Card

A bounded block holding a piece of content — an article summary, a product, a
settings panel. The parts carry the padding, which is what lets an image
reach the edges.

## Quick start

```html
<article class="pu-card card-md">
  <div class="card-header">
    <h3 class="card-title">Quarterly report</h3>
    <p class="card-subtitle">Updated yesterday</p>
  </div>
  <div class="card-body">
    <p>Revenue rose across every region.</p>
  </div>
</article>
```

## Parts

| Class | Does |
|---|---|
| `.pu-card` | The key. |
| `.card-media` | Image or video band. Reaches the edges. |
| `.card-header` | Title and subtitle. |
| `.card-title` | The title's size. The element sets the outline level. |
| `.card-subtitle` | Secondary line under the title. |
| `.card-body` | The content. Takes the slack when the card is tall. |
| `.card-footer` | Pinned to the bottom. |
| `.card-action` | The link or button whose hit area becomes the whole card. |

Every part is optional and they can appear in any order. Two padded parts in
a row drop the seam between them to one padding, so the spacing stays even.
A part that follows `.card-media` keeps its full top padding.

## Classes

| Class | Does |
|---|---|
| `card-sm` | Tighter padding, smaller type. |
| `card-md` | The default. |
| `card-lg` | Roomier padding, larger type. |
| `card-horizontal` | Media beside the content instead of above it. |
| `card-sharp` | Square corners. |
| `card-smooth` | The same radius `card-md` already gives. |
| `card-rounded` | The large corner — `--radius-rounded`, capped at `--radius-lg`. |
| `card-outline` | Transparent fill, border kept. |
| `card-ghost` | Transparent fill, no border. |
| `card-elevated` | Adds the shadow at rest. |

## Attributes

| Attribute | Does |
|---|---|
| `data-interactive` | Makes the whole card a hit area for `.card-action`, and adds hover feedback. |

## The whole card as one action

```html
<article class="pu-card card-md" data-interactive>
  <div class="card-header">
    <h3 class="card-title"><a href="/reports/q4" class="card-action">Q4 report</a></h3>
  </div>
  <div class="card-body"><p>Revenue rose across every region.</p></div>
</article>
```

One link or button keeps the accessible name and stays the only primary action
in the tab order. Its hit area is stretched over the card with a pseudo-element.
Anything else clickable inside the card is lifted above that overlay and stays
reachable.

Use a link when activating the card navigates, and a button when it performs an
action:

```html
<article class="pu-card card-md" data-interactive>
  <div class="card-header">
    <h3 class="card-title">
      <button class="card-action" command="show-modal" commandfor="report-preview">
        Preview Q4 report
      </button>
    </h3>
  </div>
</article>
```

## Horizontal

```html
<article class="pu-card card-md card-horizontal">
  <figure class="card-media"><img src="…" alt="" /></figure>
  <div class="card-body"><p>Beside the image.</p></div>
</article>
```

Put `.card-media` **after** the content in the DOM and it moves to the
trailing side. Same markup, no extra class.

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--card-max-width` | `none` | Caps the card's width. |
| `--card-surface` | `var(--color-surface-raised)` | Fill. |
| `--card-color` | `var(--color-text)` | Body text. |
| `--card-title-color` | `var(--color-text)` | Title. |
| `--card-subtitle-color` | `var(--color-text-muted)` | Subtitle, footer, caption. |
| `--card-border-color` | `var(--color-border)` | Border. |
| `--card-border-width` | `1px` | Border. |
| `--card-radius` | `var(--radius-md)` | Corner. |
| `--card-shadow` | `var(--shadow-md)` | Shadow for `card-elevated` and hover. |
| `--card-padding-block` | `var(--spacing-100)` | Vertical padding in the parts. |
| `--card-padding-inline` | `var(--spacing-100)` | Horizontal padding in the parts. |
| `--card-font-size` | `var(--font-size-md)` | Body type. |
| `--card-title-size` | `var(--font-size-h6)` | Title type. |
| `--card-media-aspect-ratio` | `auto` | Crop for media. Set it and every image in a row crops to the same box. |
| `--card-media-inline-size` | `40%` | Width of the media column when horizontal. |

```html
<article class="pu-card card-md" style="--card-max-width: 24rem">
```

## Media

```html
<figure class="card-media">
  <img src="cover.jpg" alt="" />
  <figcaption>Regional breakdown</figcaption>
</figure>
```

At the default `auto` aspect ratio the image keeps its own shape. Set
`--card-media-aspect-ratio` and every image in a grid crops to the same box,
so the row lines up.

## Accessibility

- `.card-title` sets the size; **the element sets the outline level.** Pick
  the heading that fits where the card sits on the page — `<h2>` in one place,
  `<h3>` in another. The class does not decide it for you.
- A card is not a landmark. `<article>` for standalone content, a plain
  `<div>` otherwise.
- With `data-interactive`, exactly one `.card-action`. Two primary actions
  under one overlay leave the second unreachable by pointer.
- A decorative cover image takes `alt=""`. An image carrying information
  needs real alt text.
- Do not put the card's meaning in the hover shadow alone.
- Transitions are removed under `prefers-reduced-motion`, the border thickens
  under `prefers-contrast: more`, and the card switches to system colours
  under `forced-colors`.

## Examples

### Sizes

```html
<article class="pu-card card-sm">…</article>
<article class="pu-card card-md">…</article>
<article class="pu-card card-lg">…</article>
```

### Variants

```html
<article class="pu-card card-md card-outline">…</article>
<article class="pu-card card-md card-ghost">…</article>
<article class="pu-card card-md card-elevated">…</article>
```

### With a footer

```html
<article class="pu-card card-md">
  <div class="card-body"><p>Two seats left.</p></div>
  <div class="card-footer">
    <button class="pu-btn btn-sm">Book</button>
  </div>
</article>
```

### A row of equal cards

```html
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem">
  <article class="pu-card card-md">…</article>
  <article class="pu-card card-md">…</article>
  <article class="pu-card card-md">…</article>
</div>
```

The card fills the height of its grid row, and the footer is pushed to the
bottom, so footers line up even when the text above them is uneven.
