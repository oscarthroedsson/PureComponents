# Badge

A small label that annotates something else — a status beside a row, a count
beside a title, a tag on a card. A badge is not interactive. Something you
click or dismiss is a pill.

## Quick start

```html
<span class="pu-badge badge-md">New</span>
```

## Classes

| Class | Does |
|---|---|
| `.pu-badge` | The key. |
| `badge-sm` | Smaller type and tighter padding. |
| `badge-md` | The default. |
| `badge-lg` | Larger type. |
| `badge-sharp` | Square corners. |
| `badge-smooth` | The same radius `badge-md` already gives. |
| `badge-rounded` | Fully round ends. |
| `badge-outline` | No fill. Border and page text colour. |
| `badge-ghost` | No fill, no border. |

The key is a plain class — HTML has no badge element. Put it on a `<span>`,
or on an `<a>` when the badge is also a link.

## Attributes

| Attribute | Does |
|---|---|
| `data-intent="info"` | Blue fill. |
| `data-intent="success"` | Green fill. |
| `data-intent="warning"` | Yellow fill. |
| `data-intent="error"` | Red fill. |

An intent reads in its own colour darkened — a red badge in dark red, a
yellow one in dark olive — rather than in neutral black.

`badge-outline` and `badge-ghost` strip the fill an intent puts there and
return the label to the page's text colour.

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--badge-font-size` | `var(--font-size-sm)` | Type size. |
| `--badge-font-weight` | `var(--font-weight-subheading)` | Weight. |
| `--badge-padding-inline` | `0.7em` | Left and right padding. |
| `--badge-padding-block` | `0.35em` | Top and bottom padding. |
| `--badge-gap` | `0.4em` | Space between an icon and the text. |
| `--badge-radius` | `var(--radius-md)` | Corner. |
| `--badge-border-width` | `1px` | Border. |
| `--badge-background` | `var(--color-surface-muted)` | Fill. |
| `--badge-border-color` | `var(--color-border)` | Border colour. |
| `--badge-color` | `var(--color-text)` | Label colour. |
| `--badge-intent-shade` | `black` | The far end an intent's text is darkened toward. |

```html
<span class="pu-badge badge-md" style="--badge-radius: 0">Flat</span>
```

## Content

An `svg`, `img` or `i` that is a direct child is sized to `1em` and follows
the text at every size. An `svg` takes `currentColor`.

A badge is a leaf. Headings and paragraphs inside one are flattened to badge
text so they do not break the box — but a heading in a badge still puts a
phantom entry in the document outline. Do not put one there.

Numbers use tabular figures, so a count that changes does not shift the box
under it.

## Accessibility

- A badge that carries meaning needs that meaning in text, not in colour
  alone. `data-intent="error"` plus the word "Failed", not red on its own.
- A count next to a label should say what it counts — `aria-label="3 unread
  messages"` on the badge, or visually hidden text beside it.
- The key on an `<a>` is the one interactive case. It gets a pointer cursor
  and underlines on hover.
- A badge is not a control. Do not put a `<button>` inside one.

## Examples

### Sizes

```html
<span class="pu-badge badge-sm">Small</span>
<span class="pu-badge badge-md">Medium</span>
<span class="pu-badge badge-lg">Large</span>
```

### Intents

```html
<span class="pu-badge badge-md" data-intent="info">Info</span>
<span class="pu-badge badge-md" data-intent="success">Passed</span>
<span class="pu-badge badge-md" data-intent="warning">Review</span>
<span class="pu-badge badge-md" data-intent="error">Failed</span>
```

### Variants

```html
<span class="pu-badge badge-md badge-outline">Outline</span>
<span class="pu-badge badge-md badge-ghost">Ghost</span>
```

### Shape

```html
<span class="pu-badge badge-md badge-sharp">Sharp</span>
<span class="pu-badge badge-md badge-smooth">Smooth</span>
<span class="pu-badge badge-md badge-rounded">Rounded</span>
```

### With an icon

```html
<span class="pu-badge badge-md" data-intent="success">
  <svg aria-hidden="true" viewBox="0 0 24 24">…</svg>
  Passed
</span>
```

### A count

```html
<span class="pu-badge badge-sm badge-rounded" aria-label="3 unread messages">3</span>
```

### As a link

```html
<a href="/tags/css" class="pu-badge badge-md">css</a>
```
