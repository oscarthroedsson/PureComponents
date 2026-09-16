# Toast — contributing

## Files

```
packages/pureui/styles/toast.css   placement, stacking, motion, swipe
apps/dev-shell/js/toast/           the behaviour layer (dev shell only)
  index.ts       the public surface and window.Toast
  toast.ts       append, remove, removeAll, timers
  createToast.ts builds the markup
  placement.ts   swipe direction from the container's placement
  types.ts       the attribute and instance types
```

Only the stylesheet ships. The behaviour layer drives the dev-shell demo and
moves to PureComponents when that package starts. The split is strict:
anything about **where a toast sits or how it moves** belongs in the CSS;
anything about **when it appears or disappears** belongs in the TS.

## Toast is a wrapper around Alert

A toast is a `.toast` box holding a `.pu-alert`. Nothing about the notice —
intents, icons, title, message, actions — is repeated here. `createToast.ts`
builds exactly the markup the two stylesheets expect:

```html
<div class="toast" data-toast-id="…">
  <div class="pu-alert alert-md" data-intent="success" role="status">
    <div class="alert-icon">…</div>
    <div class="alert-content">
      <p class="alert-title">…</p>
      <p class="alert-message">…</p>
    </div>
    <div class="alert-actions">…</div>
  </div>
</div>
```

A change to how a notice looks goes in `alert.css`, not here.

## The container spans the viewport

```css
position: fixed;
inset: 0;
pointer-events: none;
```

Rather than hugging one corner. A toast can then be dragged as far as the hand
takes it without being clipped, and placement becomes nothing more than where
inside that area the toasts are aligned — `justify-content` and `align-items`,
set by `data-placement`.

Covering the viewport is only safe because the container is invisible to the
pointer. Only the toasts take input, through `pointer-events: auto` on
`.toast`.

`:hover` still reaches the container from a toast inside it, which is what
lets the stacked layout expand on hover.

## The gap belongs to the toast

```css
& + .toast { padding-block-start: var(--toast-gap, 0.5rem); }
```

Padding on the toast, not `gap` on the container, so the boxes keep touching.
Moving the pointer from one toast to the next then never crosses a dead zone —
which is what an expanded stack depends on, now that the container itself
ignores the pointer.

## The stack is overlap, not scale

All toasts stay exactly the same size. Stacking comes only from a negative
margin, the way a group of avatars overlaps:

```css
& > .toast + .toast {
  margin-block-start: calc(0px - var(--toast-gap, 0.5rem) - var(--toast-stack-overlap, 2.75rem));
}
```

The negative margin has to swallow the gap as well, or the overlap comes out
that much shorter than asked for.

Expanding is one declaration:

```css
&:hover, &:focus-within {
  & > .toast + .toast { margin-block-start: 0; }
}
```

Dropping the negative margin is enough — the gap is already part of every
toast box.

## The stack descends from the anchored edge

Flex items paint in DOM order, so with no `z-index` the **oldest** toast would
paint on top of every newer one. The stack has to descend from the toast
nearest the edge the container is anchored to: the first child for top
placements, the last child for bottom ones. Hence two enumerations,
`:nth-child` and `:nth-last-child`.

Enumerated rather than computed, like `avatar.css`. A stack deeper than eight
is unreadable anyway, and the toasts past the cap are fully covered.

## Entry, exit and swipe, in that order

`@starting-style` on `.toast` gives the entry something to animate from.
`[data-state="closing"]` is the exit, with its own faster easing.

The swipe rules come **after** the closing state on purpose: a toast thrown out
by hand leaves the way it was thrown, not the way it came in.

```css
&[data-swipeable] { touch-action: pan-y; }
```

Horizontal swipes let the page keep scrolling vertically. Centred containers
take a vertical flick too, so there the toast has to claim the whole gesture.

## The alert inside opts out of motion

```css
& > .pu-alert {
  transition: none;
  @starting-style { opacity: 1; translate: 0; scale: 1; }
}
```

`alert.css` animates its own entry. Inside a toast the wrapper is what moves,
so the alert's animation is neutralised or the two would compound.

## Durations are written out

Not `--transition-*`. Those tokens pair a duration and an easing in one
shorthand, so combining one with an easing of our own puts two timing
functions in the same declaration and the whole thing is thrown away.
`avatar.css` does the same.

## Variables

Declared on the container:

| Variable | Default |
|---|---|
| `--toast-enter-x` | `1.5rem` |
| `--toast-enter-y` | `0` |
| `--toast-exit-x` | `1.5rem` |
| `--toast-exit-y` | `0` |

Used through `var(name, fallback)` without being declared:
`--toast-offset` (`1rem`), `--toast-gap` (`0.5rem`), `--toast-max-width`
(`28rem`), `--toast-stack-overlap` (`2.75rem`), `--toast-swipe-x`,
`--toast-swipe-y`. They work as a tuning surface but do not appear in the
block's variable list.

Each `data-placement` block sets the four enter and exit offsets, so a
left-hand container flies in from the left without being told.

## `.toast` is unprefixed

Every other part in the library is namespaced to its component —
`card-body`, `alert-title`, `menu-item`. This one is a bare `.toast`, so it
can collide with a consumer's own CSS.

## The behaviour layer

`toast.ts` owns the timers, including `pause()` and `resume()` so a toast under
the pointer or under focus does not disappear mid-read.

`createToast.ts` derives `role` from the intent when the caller does not pass
one — `error` and `warning` become `alert`, the rest `status`.

`placement.ts` reads the container's `data-placement` and decides which
directions a swipe may travel.

`window.Toast` exists because inline handlers are resolved against the global
scope, not against the module that imported them, so plain HTML needs a name
to call.
