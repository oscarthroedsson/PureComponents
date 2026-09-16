# Skip link

A link that stays off screen until it takes focus, then drops into the top
corner. It gives keyboard users a way past a long header straight to the
content.

## Quick start

```html
<a href="#main-content" class="pu-skip-link skip-link-md">Skip to main content</a>
```

Put it first in the document — before the header, before anything else
focusable. It is only useful if it is the first stop on Tab.

## Classes

| Class | Does |
|---|---|
| `.pu-skip-link` | The key. Requires `<a href>`. |
| `skip-link-sm` | Smaller text and padding. |
| `skip-link-md` | The default. |
| `skip-link-lg` | Larger text and padding. |
| `.pu-skip-links` | Wrapper for two or more links, stacking them. |

The key requires `a[href]`. On anything else nothing applies — a skip link
that does not navigate is not a skip link.

## Several links

```html
<div class="pu-skip-links">
  <a href="#navigation" class="pu-skip-link skip-link-md">Skip to navigation</a>
  <a href="#main-content" class="pu-skip-link skip-link-md">Skip to main content</a>
  <a href="#footer" class="pu-skip-link skip-link-md">Skip to footer</a>
</div>
```

Inside the wrapper the links stack and stay in flow when focused, so the
second does not cover the first.

## Accessibility

- The `href` must point at an `id` that exists on the page.
- The target should be a landmark or a heading — `<main id="main-content">`
  rather than a random `<div>`.
- Never hide it with `display: none` or `visibility: hidden`. Both remove it
  from the tab order, which defeats the point. It is moved off screen with
  `top`, so it stays focusable.
- The text says where it goes. "Skip to main content", not "Skip".
- `:target` is given `scroll-margin-top`, so the destination is not left
  under a sticky header.

## Examples

### One link

```html
<body>
  <a href="#main" class="pu-skip-link skip-link-md">Skip to main content</a>
  <header>…</header>
  <main id="main">…</main>
</body>
```

### Sizes

```html
<a href="#main" class="pu-skip-link skip-link-sm">Skip to main content</a>
<a href="#main" class="pu-skip-link skip-link-md">Skip to main content</a>
<a href="#main" class="pu-skip-link skip-link-lg">Skip to main content</a>
```
