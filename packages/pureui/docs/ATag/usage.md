# Link

A text link whose underline grows from the start edge on hover instead of
fading in.

## Quick start

```html
<a href="/pricing" class="pu-link">Pricing</a>
```

## Classes

| Class | Does |
|---|---|
| `.pu-link` | The key. Requires `<a>`. |

No sizes, no shapes. The link takes the type size of whatever it sits in.

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--link-color` | `var(--color-text)` | Resting colour. |
| `--link-hover-color` | `var(--color-primary)` | Colour on hover. |
| `--link-underline-color` | `var(--link-hover-color)` | Underline colour. |
| `--link-underline-size` | `1px` | Underline thickness. |
| `--link-underline-rest-size` | `0px` | Underline width at rest. Set to `100%` for a link that is always underlined. |
| `--link-underline-offset` | `2px` | Distance below the text. |
| `--link-transition-duration` | `300ms` | Colour and underline timing. |

```html
<a href="/docs" class="pu-link" style="--link-underline-rest-size: 100%">Docs</a>
```

## Accessibility

- The link text says where it goes. "Read the pricing page", not "click here".
- Colour is not the only signal — the underline appears on hover and focus.
- An external link should carry `rel="noopener noreferrer"` alongside
  `target="_blank"`.
- Transitions are removed under `prefers-reduced-motion`.

## Examples

### In running text

```html
<p>See the <a href="/pricing" class="pu-link">pricing page</a> for details.</p>
```

### External

```html
<a href="https://example.com" class="pu-link" target="_blank" rel="noopener noreferrer">
  example.com
</a>
```

### Mail and telephone

```html
<a href="mailto:contact@example.com" class="pu-link">contact@example.com</a>
<a href="tel:+1234567890" class="pu-link">+1 (234) 567-890</a>
```

### Always underlined

```html
<a href="/terms" class="pu-link" style="--link-underline-rest-size: 100%">Terms</a>
```
