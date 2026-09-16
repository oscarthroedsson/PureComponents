# Avatar

A square box holding a picture, initials, or an icon. Put several in a group
and they become a list or an overlapping stack.

Animated groups also require `Animations/index.css`, which provides the
composable `pu-motion` key and its effects.

## Quick start

```html
<span class="pu-avatar avatar-md" aria-label="Ada Lovelace">AL</span>
```

With a picture:

```html
<span class="pu-avatar avatar-md">
  <img src="ada.jpg" alt="Ada Lovelace" />
</span>
```

The key also works on the `<img>` directly:

```html
<img class="pu-avatar avatar-md" src="ada.jpg" alt="Ada Lovelace" />
```

## Classes

| Class | Does |
|---|---|
| `.pu-avatar` | The key. |
| `avatar-xs` | 1.5rem. |
| `avatar-sm` | 2rem. |
| `avatar-md` | 3rem. The default. |
| `avatar-lg` | 4rem. |
| `avatar-sharp` | Square corners. |
| `avatar-smooth` | Rounded corners. |
| `avatar-rounded` | A circle. |
| `.pu-avatar-group` | A group of avatars. Requires `<ul>`. |
| `avatar-group-xs` | 1.5rem avatars with a compact group gap. |
| `avatar-group-sm` | 2rem avatars. |
| `avatar-group-md` | 3rem avatars. The default. |
| `avatar-group-lg` | 4rem avatars. |
| `avatar-group-sharp` | Square. |
| `avatar-group-smooth` | Rounded. |
| `avatar-group-rounded` | Circles. |

Size and shape go on the **group**, not on each avatar. They are handed down.

## Any size, not just the named steps

Initials are sized as a fraction of the box rather than from a table of three
font sizes, so an arbitrary size still fits:

```html
<span class="pu-avatar" style="--avatar-size: 8rem">AL</span>
```

## Groups

```html
<ul class="pu-avatar-group avatar-group-md">
  <li><span class="pu-avatar"><img src="ada.jpg" alt="Ada Lovelace" /></span></li>
  <li><span class="pu-avatar"><img src="alan.jpg" alt="Alan Turing" /></span></li>
  <li><span class="pu-avatar" aria-label="Grace Hopper">GH</span></li>
</ul>
```

### Group attributes

| Attribute | Does |
|---|---|
| `data-layout="stacked"` | Avatars overlap instead of sitting apart. |
| `data-direction="row"` | Left to right. The default. |
| `data-direction="row-reverse"` | Right to left. |
| `data-direction="column"` | Top to bottom. |
| `data-direction="column-reverse"` | Bottom to top. |
| `data-stack-order="last"` | The last avatar paints on top instead of the first. |
| `data-hover="lift"` | The avatar under the pointer comes forward and grows. |
| `data-motion="expand-*"` | One of the six expand effects from Motion. |
| `data-motion-layout="overlay | reflow"` | Keep surrounding layout fixed or move it during expand. |
| `data-motion-on="hover focus-within"` | Pointer and keyboard triggers. |
| `data-motion-scope="children"` | Translate the avatars, not the group. |

```html
<ul class="pu-avatar-group pu-motion avatar-group-md avatar-group-rounded"
    data-layout="stacked" data-direction="row"
    data-motion="expand-right"
    data-motion-layout="overlay"
    data-motion-on="hover focus-within"
    data-motion-scope="children">
  …
</ul>
```

Expand effects are `expand-left`, `expand-right`,
`expand-horizontal-center`, `expand-up`, `expand-down`, and
`expand-vertical-center`. Motion owns whether they translate direct children
with `overlay` or grow the group's real gap with `reflow`. Neither mode
reserves expanded space at rest. `data-hover="lift"` remains component-owned
and works in both layouts.

## Variables

### Avatar

| Variable | Default | Controls |
|---|---|---|
| `--avatar-size` | `3rem` | Box size. |
| `--avatar-radius` | `var(--radius-md)` | Corner. |
| `--avatar-background` | `var(--color-surface-muted)` | Fill behind initials. |
| `--avatar-color` | `var(--color-text-muted)` | Initials colour. |
| `--avatar-font-scale` | `0.4` | Initials as a fraction of the box. |
| `--avatar-font-weight` | `var(--font-weight-subheading)` | Initials weight. |

### Group

| Variable | Default | Controls |
|---|---|---|
| `--avatar-group-size` | `3rem` | Avatar size, handed down. |
| `--avatar-group-radius` | `var(--radius-md)` | Avatar corner, handed down. |
| `--avatar-group-gap` | `var(--spacing-50)`; `var(--spacing-25)` at xs | Distance apart in a list and after expand. |
| `--avatar-group-overlap` | a third of the size | How far they overlap when stacked. |
| `--avatar-group-ring-width` | `2px` | Ring separating overlapping avatars. |
| `--avatar-group-ring-color` | `var(--color-surface)` | Ring colour. **Set this to your page's background.** |
| `--avatar-group-duration` | `280ms` | Expand and lift timing. |
| `--avatar-group-easing` | a spring curve | Expand and lift easing. |
| `--avatar-group-lift-z` | `20` | Minimum stacking level of a lifted avatar. It always clears the group. |
| `--avatar-group-lift-scale` | `1.12` | How much it grows. |
| `--avatar-group-lift-ring-color` | `var(--color-primary)` | Its ring while lifted. |
| `--avatar-group-lift-shadow` | `var(--shadow-md)` | Its shadow while lifted. |

The ring separates two overlapping shapes, so it has to read as the surface
behind the group — which the component cannot know. Set it where the group
sits:

```html
<ul class="pu-avatar-group avatar-group-md" data-layout="stacked"
    style="--avatar-group-ring-color: var(--color-surface-sunken)">
```

## Accessibility

- A picture that identifies someone needs real alt text: `alt="Ada Lovelace"`.
- Initials are not read as a name. Put the name on the avatar with
  `aria-label`, or beside it in text.
- A decorative avatar next to a name already in text takes `alt=""`.
- The group is a `<ul>`. If it is styled with `list-style: none` in your own
  CSS as well, add `role="list"` — WebKit drops list semantics from a list
  styled that way.
- An avatar that links or acts should be an `<a>` or `<button>`. It gets a
  pointer cursor and the library's focus ring.
- `data-hover="lift"` responds to `:focus-visible` as well as `:hover`, so it
  is reachable by keyboard.
- Expand responds to both `hover` and `focus-within`, so every linked avatar
  remains reachable by keyboard.
- Under `prefers-reduced-motion` the travel goes but the behaviour stays. An
  expanded stack reaches its end state instantly and a lifted avatar is still
  ringed.

## Examples

### Sizes

```html
<span class="pu-avatar avatar-xs">AL</span>
<span class="pu-avatar avatar-sm">AL</span>
<span class="pu-avatar avatar-md">AL</span>
<span class="pu-avatar avatar-lg">AL</span>
```

### Shapes

```html
<span class="pu-avatar avatar-md avatar-sharp">AL</span>
<span class="pu-avatar avatar-md avatar-smooth">AL</span>
<span class="pu-avatar avatar-md avatar-rounded">AL</span>
```

### A stack that opens

```html
<ul class="pu-avatar-group pu-motion avatar-group-md avatar-group-rounded"
    data-layout="stacked" data-direction="row"
    data-motion="expand-horizontal-center"
    data-motion-layout="reflow"
    data-motion-on="hover focus-within"
    data-motion-scope="children">
  <li><span class="pu-avatar"><img src="a.jpg" alt="Ada Lovelace" /></span></li>
  <li><span class="pu-avatar"><img src="b.jpg" alt="Alan Turing" /></span></li>
  <li><span class="pu-avatar"><img src="c.jpg" alt="Grace Hopper" /></span></li>
</ul>
```

### A stack where the last one is on top

```html
<ul class="pu-avatar-group avatar-group-md" data-layout="stacked"
    data-stack-order="last">
  …
</ul>
```

### Linked avatars that lift

```html
<ul class="pu-avatar-group avatar-group-md" data-layout="stacked" data-hover="lift">
  <li><a href="/people/ada" class="pu-avatar"><img src="a.jpg" alt="Ada Lovelace" /></a></li>
  <li><a href="/people/alan" class="pu-avatar"><img src="b.jpg" alt="Alan Turing" /></a></li>
</ul>
```

### A column

```html
<ul class="pu-avatar-group avatar-group-md" data-direction="column">…</ul>
```

### With a `<picture>`

```html
<span class="pu-avatar avatar-md">
  <picture>
    <source srcset="ada.avif" type="image/avif" />
    <img src="ada.jpg" alt="Ada Lovelace" />
  </picture>
</span>
```
