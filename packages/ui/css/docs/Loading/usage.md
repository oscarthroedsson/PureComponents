# Loading

A sweep of light across an element that is waiting. It goes on top of whatever
component is loading and paints nothing of its own layout, so it works on a
button, a list, a card, or a plain box.

## Quick start

```html
<button class="pu-btn btn-md pu-loading" aria-busy="true" disabled>Saving…</button>
```

## The class alone does nothing

`.pu-loading` paints only while `aria-busy="true"` is on the same element.
The attribute is the state; the class is what draws it. Remove the attribute
when the work finishes and the element returns to normal — no class change
needed.

## Classes

| Class | Does |
|---|---|
| `.pu-loading` | The key. Active only alongside `aria-busy="true"`. |

No sizes. The sweep follows the element it is put on.

## Attributes

| Attribute | Does |
|---|---|
| `aria-busy="true"` | Turns the effect on and announces the wait. |

## Variables

Set these on the element that carries the class.

| Variable | Default | Controls |
|---|---|---|
| `--loading-opacity` | `0.55` | How far the host fades while it waits. |
| `--loading-glow` | `rgb(255 255 255 / 0.6)` | Colour of the moving band. |
| `--loading-angle` | `100deg` | Angle the band travels at. |
| `--loading-duration` | `1.4s` | One pass. |

```html
<div class="pu-loading" aria-busy="true" style="--loading-duration: 2s">
```

## Accessibility

- `aria-busy="true"` tells assistive technology the region is updating.
- Disable controls that must not be pressed while waiting. `aria-busy` alone
  does not stop a click.
- Under `prefers-reduced-motion` the band stops moving and holds as a still
  sheen. The element still reads as busy.
- The sweep is decoration. `aria-busy` carries the meaning.

## Examples

### On a button

```html
<button class="pu-btn btn-md pu-loading" aria-busy="true" disabled>Saving…</button>
```

### On a component that has parts

```html
<ul class="pu-pagination pagination-md pu-loading" aria-busy="true">
  <li><a href="#1" class="pu-btn btn-ghost">1</a></li>
  <li><a href="#2" class="pu-btn" aria-current="page">2</a></li>
</ul>
```

### On a plain box

```html
<div class="pu-loading" aria-busy="true">
  <p>Quarterly report</p>
</div>
```
