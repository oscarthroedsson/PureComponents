# Pill

An object in its own right — a filter you can select, a tag you can remove,
an action you can press. A label that only annotates something else and does
nothing is a badge.

## Quick start

```html
<button class="pu-pill pill-md">All</button>
```

## Which element

| Element | Use for |
|---|---|
| `<button>` | An action or a toggle. |
| `<a href>` | A pill that navigates. |
| `<label>` | A filter wrapping a checkbox or radio. |
| `<span>` \| `<li>` | A removable tag, which holds its own remove `<button>`. |

`<span>` and `<li>` are containers, not controls. They get no hover and no
pointer cursor. They are there because a removable tag holds a `<button>`,
and a `<button>` cannot contain a `<button>`.

## Classes

| Class | Does |
|---|---|
| `.pu-pill` | The key. |
| `pill-sm` | Smaller type and tighter inline padding. |
| `pill-md` | The default. |
| `pill-lg` | Larger type. |
| `pill-sharp` | Square corners. |
| `pill-smooth` | The same radius `pill-md` already gives. |
| `pill-rounded` | Fully round ends. |
| `pill-outline` | No fill, border kept. |
| `pill-ghost` | No fill, no border. |
| `.pill-remove` | The remove control. Only inside a pill. |

## Selection

Two ways, and the pill picks up either.

**A wrapped input.** The `<label>` form holds a checkbox or radio. The input
covers the whole pill and is transparent, so the click target is the pill and
the focus ring lands on the pill.

```html
<label class="pu-pill pill-md">
  <input type="checkbox" name="filter" value="css" />
  CSS
</label>
```

**A toggle attribute.** For a `<button>`, `aria-pressed`.

```html
<button class="pu-pill pill-md" aria-pressed="false">CSS</button>
```

Either way the selected pill fills, and a check mark appears. The mark is
present at both states and only fades in, so selecting does not resize the
pill and a row of filters does not reflow under the pointer.

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--pill-font-size` | `var(--font-size-md)` | Type size. |
| `--pill-font-weight` | `var(--font-weight-subheading)` | Weight. |
| `--pill-padding-inline` | `0.75em` | Left and right padding. |
| `--pill-padding-block` | `0.35em` | Top and bottom padding. |
| `--pill-gap` | `0.4em` | Space between icon, text and remove control. |
| `--pill-radius` | `var(--radius-md)` | Corner. |
| `--pill-border-width` | `1px` | Border. |
| `--pill-background` | `var(--color-surface-muted)` | Fill. |
| `--pill-border-color` | `var(--color-border)` | Border colour. |
| `--pill-color` | `var(--color-text)` | Label colour. |
| `--pill-background-hover` | mix of the surface and `--shade-hover` | Fill on hover. |
| `--pill-background-active` | mix of the surface and `--shade-active` | Fill while pressed. |
| `--pill-selected-background` | `var(--color-primary)` | Fill when selected. |
| `--pill-selected-border-color` | `var(--color-primary)` | Border when selected. |
| `--pill-selected-color` | `var(--color-primary-foreground)` | Label when selected. |
| `--pill-selected-marker` | `"\2713"` | The selected glyph. Replace with your own. |
| `--pill-remove-radius` | `var(--radius-full)` | Corner of the remove control. |

```html
<button class="pu-pill pill-md" aria-pressed="true" style="--pill-selected-marker: '★'">
  Starred
</button>
```

## Content

An `svg`, `img` or `i` that is a direct child is sized to `1em`. An `svg`
takes `currentColor`.

A pill is a leaf. Headings and paragraphs inside one are flattened to pill
text, but a heading in a pill still puts a phantom entry in the document
outline. Do not put one there.

## Accessibility

- A removable tag needs an accessible name on the remove button that says
  what it removes — `aria-label="Remove CSS"`, not `aria-label="Remove"`.
- A toggle uses `aria-pressed`, never a class.
- A `<label>` pill must keep its input in the tab order. The input is moved
  off the page with `opacity`, not `display: none`, for exactly that reason.
- Selection is signalled by the fill **and** the check mark, so colour is
  never the only cue.
- Focus comes from the library's shared indicator. In the `<label>` form the
  ring traces the pill, because the input covers it.
- Motion is removed under `prefers-reduced-motion`. Nothing in the file
  carries information through motion.

## Examples

### Sizes

```html
<button class="pu-pill pill-sm">Small</button>
<button class="pu-pill pill-md">Medium</button>
<button class="pu-pill pill-lg">Large</button>
```

### Variants

```html
<button class="pu-pill pill-md pill-outline">Outline</button>
<button class="pu-pill pill-md pill-ghost">Ghost</button>
```

### A filter group

```html
<label class="pu-pill pill-md">
  <input type="checkbox" name="tag" value="css" /> CSS
</label>
<label class="pu-pill pill-md">
  <input type="checkbox" name="tag" value="html" /> HTML
</label>
```

### A removable tag

```html
<li class="pu-pill pill-md">
  CSS
  <button class="pill-remove" aria-label="Remove CSS">
    <svg aria-hidden="true" viewBox="0 0 24 24">…</svg>
  </button>
</li>
```

### Disabled

```html
<button class="pu-pill pill-md" disabled>Unavailable</button>
```
