# Card

A surface that groups related content into one unit: optional media, a
header, a body and a footer.

## When to use

- Article and product previews
- Dashboard tiles
- Anything that repeats in a grid and needs to read as one block

## When not to use

- A plain visual box with no grouping to communicate — use a `div`
- A message the user has to notice — use [Alert](../Alert/usage.md)
- Something that interrupts the page — use [Dialog](../Dialog/usage.md)

## Quick start

```html
<article class="card md">
  <figure class="card-media">
    <img src="cover.jpg" alt="" />
  </figure>
  <header class="card-header">
    <h3 class="card-title">Card title</h3>
    <p class="card-subtitle">A short line of supporting text</p>
  </header>
  <div class="card-body">
    <p>What the card is about.</p>
  </div>
  <footer class="card-footer">
    <button class="btn sm">Read more</button>
  </footer>
</article>
```

Every part is optional and independent. A card with nothing but a
`.card-body` looks finished.

## Order

DOM order decides. Put `.card-header` above `.card-media` and it renders
there — no extra class:

```html
<article class="card md">
  <header class="card-header">
    <h3 class="card-title">Title leads</h3>
  </header>
  <figure class="card-media">
    <img src="cover.jpg" alt="" />
  </figure>
</article>
```

## Width

The card sets no width of its own. The parent decides, which is what lets
a grid of cards behave like a grid:

```html
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem">
  <article class="card md">…</article>
  <article class="card md">…</article>
  <article class="card md">…</article>
</div>
```

In such a grid the cards get equal heights and the footers line up, because
the body takes the slack and the footer is pushed to the bottom.

To cap a single card, set `--card-max-width`.

## API

### Classes

| Class | Does |
|---|---|
| `card` | the key class; nothing applies without it |
| `card-media` | image, video or other visual. Runs edge to edge |
| `card-header` | holds the title and subtitle |
| `card-title` | title text. Put it on a real `<h2>`–`<h6>` |
| `card-subtitle` | supporting line under the title |
| `card-body` | the content. Takes the slack when the card is stretched |
| `card-footer` | pushed to the bottom of the card |
| `card-link` | inside an interactive card: the one link that owns it |

### Modifiers

| Axis | Values |
|---|---|
| Size | `sm` · `md` (default) · `lg` |
| Orientation | (default: column) · `horizontal` |
| Shape | `sharp` · `smooth` (default) · `rounded` |
| Emphasis | (default: surface + border) · `outline` · `ghost` · `elevated` |

Size changes density — padding and type scale — not width.

### Attributes

| Attribute | Does |
|---|---|
| `data-interactive` | the whole card becomes the hit area for `.card-link` |

### Variables

Set them inline or in your own CSS.

| Variable | Default | Controls |
|---|---|---|
| `--card-max-width` | `none` | caps the card width |
| `--card-surface` | `--color-neutral-100` | the fill |
| `--card-color` | `--color-neutral-800` | body text |
| `--card-title-color` | `--color-neutral-900` | title text |
| `--card-subtitle-color` | `--color-neutral-600` | subtitle and footer text |
| `--card-border-color` | `--color-neutral-200` | the border |
| `--card-border-width` | `1px` | |
| `--card-radius` | `--radius-md` | corner radius |
| `--card-shadow` | `--shadow-md` | drawn by `elevated` and on hover |
| `--card-padding-block` | `--spacing-100` | vertical padding, and the seam between parts |
| `--card-padding-inline` | `--spacing-100` | horizontal padding |
| `--card-font-size` | `--font-size-md` | |
| `--card-title-size` | `--font-size-h6` | |
| `--card-media-aspect-ratio` | `auto` | set `16/9` to crop every image alike |
| `--card-media-inline-size` | `40%` | media column width in `horizontal` |

```html
<article class="card md" style="--card-max-width: 22rem; --card-media-aspect-ratio: 16/9">
```

## Horizontal

```html
<article class="card md horizontal">
  <figure class="card-media"><img src="cover.jpg" alt="" /></figure>
  <div class="card-body">…</div>
</article>
```

Which side the media lands on comes from markup order — media first is the
leading side, media last is the trailing side. Same classes either way.

## Interactive card

```html
<article class="card md" data-interactive>
  <header class="card-header">
    <h3 class="card-title"><a class="card-link" href="/post/1">The whole card is the link</a></h3>
  </header>
  <div class="card-body">
    <p>Clicking anywhere follows the title link.</p>
  </div>
  <footer class="card-footer">
    <button class="btn sm">Save</button>
  </footer>
</article>
```

`.card-link` stretches an invisible overlay across the card, so the whole
surface is clickable while only one thing sits in the tab order. Other
controls inside the card — the Save button above — still work on their own.

## Accessibility

- The card is a container, not a widget. It takes no role. Use `<article>`
  for something that stands on its own, `<li>` inside a list of cards,
  `<div>` when the grouping is only visual.
- `.card-title` carries no heading semantics. Put it on a real `<h2>`–`<h6>`
  chosen to fit the page outline, never picked for its size.
- Images need alt text. Decorative ones take `alt=""`.
- An interactive card must have exactly one `<a class="card-link">`.
  A second link or a `tabindex` on the card itself turns one card into
  several tab stops.
- The focus ring is drawn on the card rather than the link, because the
  link's real box is the invisible overlay.
- The card clips its overflow, so keep `--card-padding-block` and
  `--card-padding-inline` above 5px or a focus ring on a control inside
  gets cut. The smallest size is 12px.

## Related

- [Button](../Button/usage.md) — for actions in `.card-footer`
- [Badge](../Badge/usage.md) · [Pill](../Pill/usage.md) — for metadata
