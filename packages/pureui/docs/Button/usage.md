# Button

A look, not an element. `.pu-btn` sits on a `<button>` for an action, on an
`<a>` for a destination, and on a `<label>` or `<summary>` where those are
what the job calls for. It renders the same box on all four.

## Quick start

```html
<button class="pu-btn btn-md">Save</button>
```

## Choosing the element

| Element | Use for |
|---|---|
| `<button>` | Something happens on this page. |
| `<a href>` | Somewhere else to go. |
| `<label>` | A control the click should reach. |
| `<summary>` | The toggle of a `<details>`. |

On anything else nothing applies. Picking the wrong one costs keyboard
behaviour and the right announcement, which is why the key requires them.

## Classes

| Class | Does |
|---|---|
| `.pu-btn` | The key. Nothing below applies without it. |
| `btn-sm` | Smaller type and radius. |
| `btn-md` | The default. |
| `btn-lg` | Larger type and radius. |
| `btn-sharp` | Square corners. |
| `btn-smooth` | The same radius `btn-md` already gives. |
| `btn-rounded` | Fully round ends. |
| `btn-secondary` | The secondary colour, with its own hover. |
| `btn-emphasised` | The secondary colour, without a hover of its own. |
| `btn-outline` | Border and label in the primary colour, no fill. |
| `btn-tertiary` | No fill, no border. Underlines on hover. |
| `btn-ghost` | No fill. Takes a muted surface on hover. |

One filled primary button per view is the rule of thumb. Everything else on
the screen is secondary, outline, tertiary or ghost.

## Attributes

| Attribute | Does |
|---|---|
| `data-intent="destructive"` | Paints the button in the destructive colour. |
| `data-icon-only="true"` | Square box for a button with no visible label. |
| `aria-pressed="true"` \| `"false"` | Toggle state. |
| `disabled` | Native, on `<button>`. |
| `aria-disabled="true"` | For an `<a>`, which can never be `:disabled`. |

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--btn-surface` | `var(--color-primary)` | Fill. The border follows it unless a variant says otherwise. |
| `--btn-border-color` | `var(--btn-surface)` | Border. |
| `--btn-color` | `var(--color-primary-foreground)` | Label. |

```html
<button class="pu-btn btn-md" style="--btn-surface: var(--color-accent)">Custom</button>
```

## Icons

An `svg`, `img` or `i` that is a direct child is sized to `1em` and will not
shrink. It scales with the button.

```html
<button class="pu-btn btn-md">
  <svg aria-hidden="true" viewBox="0 0 24 24">…</svg>
  Save
</button>
```

Mark a decorative icon `aria-hidden="true"` so it is not announced twice.

## Accessibility

- A button with no visible label **must** have `aria-label`. Add
  `data-icon-only="true"` for the square box.
- A toggle carries `aria-pressed="true"` or `"false"` — not a class.
- Use native `disabled` on `<button>`. On `<a>` use `aria-disabled="true"`;
  an anchor cannot be `:disabled`, and both are styled.
- Focus comes from the library's shared indicator. Do not remove it.
- `:active` scales the button slightly. Nothing else depends on that motion.

## Examples

### Sizes

```html
<button class="pu-btn btn-sm">Small</button>
<button class="pu-btn btn-md">Medium</button>
<button class="pu-btn btn-lg">Large</button>
```

### Emphasis

```html
<button class="pu-btn btn-md">Primary</button>
<button class="pu-btn btn-md btn-secondary">Secondary</button>
<button class="pu-btn btn-md btn-outline">Outline</button>
<button class="pu-btn btn-md btn-tertiary">Tertiary</button>
<button class="pu-btn btn-md btn-ghost">Ghost</button>
```

### Shape

```html
<button class="pu-btn btn-md btn-sharp">Sharp</button>
<button class="pu-btn btn-md btn-smooth">Smooth</button>
<button class="pu-btn btn-md btn-rounded">Rounded</button>
```

### Destructive

```html
<button class="pu-btn btn-md" data-intent="destructive">Delete</button>
```

### Icon only

```html
<button class="pu-btn btn-md" data-icon-only="true" aria-label="Close dialog">
  <svg aria-hidden="true" viewBox="0 0 24 24">…</svg>
</button>
```

### Toggle

```html
<button class="pu-btn btn-md" aria-pressed="false">Bold</button>
```

### As a link

```html
<a href="/pricing" class="pu-btn btn-md">See pricing</a>
```

### Disabled

```html
<button class="pu-btn btn-md" disabled>Save</button>
<a class="pu-btn btn-md" aria-disabled="true">Save</a>
```

### Loading

Loading comes from `loading.css`. The button carries no loading styling of
its own — `aria-busy` is the state, `.pu-loading` is what paints it.

```html
<button class="pu-btn btn-md pu-loading" aria-busy="true" disabled>Saving…</button>
```

### In a form

```html
<form>
  <button type="submit" class="pu-btn btn-md">Submit</button>
  <button type="button" class="pu-btn btn-md btn-tertiary">Cancel</button>
</form>
```
