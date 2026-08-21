# Badge

A small box of text that labels, counts, or states the status of something
next to it.

## When to use

- Status: `Draft`, `Published`, `Failed`
- Category or tag labels
- Counts on a control: unread, pending, items in a cart
- Metadata beside a title

## When not to use

- **You can click it** → Pill. A badge does not respond to the pointer and has
  no hover state.
- **It hangs on the corner of something** — a presence dot on an avatar, an
  unread mark floating over a button. That is a different primitive, anchored
  to another element's edge, and it is its own component.
- **It is the only thing saying what happened** → Alert. A badge annotates
  something already on the page.

## Quick start

```html
<span class="badge">New</span>
<span class="badge" data-intent="success">Published</span>
<span class="badge outline" data-intent="warning">Pending review</span>
```

The key alone is already `md` and already `smooth`. You only add a class to move
away from that.

## API

### Element

| Element | Allowed | Why |
|---|---|---|
| `<span>` | yes | The default. A badge is a run of text. |
| `<a>` | yes | A tag filter or a category link. Gets the house focus ring. |
| `<button>` | no | An interactive chip is Pill. |

### Size — `sm` · `md` · `lg`

`md` is the default. The scale stays inside badge territory on purpose: `lg`
is a badge you can read across a table, not a heading. It never reaches body
text size. Rendered heights are 17px, 24.8px and 28.6px.

`sm` is the one size that also tightens the padding — `--font-size-xs` is the
smallest type token there is, so below it the box can only shrink by giving
padding back.

### Shape — `sharp` · `smooth` · `rounded`

`smooth` is the default, as everywhere else in the library. Size and shape are
independent — `sm rounded` and `lg sharp` both work.

### Variant — `outline` · `ghost`

| Class | What it does |
|---|---|
| *(none)* | A light neutral box. |
| `outline` | The fill dropped, the border kept — it takes the intent's colour if there is one. |
| `ghost` | Both dropped — text alone. For a dense list where the boxes would fight each other. Same meaning `ghost` has on `.btn`. |

### Intent — `data-intent`

`info` · `success` · `warning` · `error`

Intent fills the box with its token and darkens that same token for the text —
so a yellow badge reads in dark olive and a red one in dark red, rather than
both in neutral black. That holds on `outline` and `ghost` too. It never
replaces the word inside the badge, though — see accessibility below.

```html
<span class="badge" data-intent="error">Failed</span>
<span class="badge outline" data-intent="info">Beta</span>
```

### Icons

An icon inside a badge is sized from the badge's own font size, so it follows
every size class. No wrapper element is needed — the spacing between the text
and the icon comes from `gap`.

```html
<span class="badge" data-intent="success">
  <svg viewBox="0 0 16 16" aria-hidden="true">…</svg>
  Verified
</span>
```

Decorative icons get `aria-hidden="true"`.

## Customization

Set any of these inline on the element or on a container:

```html
<span class="badge" style="--badge-background: var(--color-neutral-100)">Quieter</span>
```

| Variable | Controls |
|---|---|
| `--badge-font-size` | The one measurement. The whole box derives from it. |
| `--badge-background` · `--badge-border-color` · `--badge-color` | The three colours. Each is a plain token. |
| `--badge-intent-shade` | What an intent's text is darkened toward. |
| `--badge-padding-inline` · `--badge-padding-block` · `--badge-gap` | Spacing, in `em`. |
| `--badge-radius` · `--badge-border-width` | The box. |
| `--badge-focus-color` | The focus ring, when the key sits on an `<a>`. |

Every one of them resolves to a token from `main.css`, so overriding one keeps
the badge inside the design system rather than outside it.

## Accessibility

**The text carries the meaning, never the colour.** `data-intent` tints the
box; the word inside is what a screen reader reads and what a colour-blind
reader has left. Write `Failed` tinted red, not a red dot.

**Do not put `aria-label` on the badge.** A bare `<span>` has no role for a
name to attach to, so assistive tech does not reliably expose it. Where the
badge repeats something already written out, hide it and let the surrounding
control carry the whole name:

```html
<button class="btn" aria-label="Notifications, 3 unread">
  Notifications
  <span class="badge sm rounded" aria-hidden="true">3</span>
</button>
```

**A count that changes while the page is open** is announced by a container
the badge sits inside. `role="status"` belongs on that container — the badge
is the value, not the live region:

```html
<p role="status">
  Unread messages: <span class="badge rounded" data-intent="info">7</span>
</p>
```

**On an `<a>`** the badge gets the house focus indicator: a 3px outline at 2px
offset. Nothing to add.

**Contrast.** A badge with no intent uses `--color-neutral-900`. An intent
darkens its own token instead, at a fixed 40% — a ceiling, not a taste:
`error` is the tightest of the four and lands on 5.34:1 there. Measured worst
case across every variant on the demo page: 5.34:1. On browsers without
`color-mix()` the neutral text stands instead, still 6.46:1 or better.

The intent tokens in `main.css` are all pale pastels, so light text on them
would land near 1.5:1 — never do that.

The border is the one thing under the line: `--color-neutral-400` measures
2.5:1 against a white page, and an intent border less than that. It matters
for `outline`, where the border is the whole box. The fix belongs to the
tokens in `main.css`, not to this component.
