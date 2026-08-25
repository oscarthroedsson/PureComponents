# Collapsible

One panel that opens and closes.

```html
<details class="collapsible md">
  <summary>How do I create an account?</summary>
  <p>Click the "Sign up" button in the top right corner.</p>
</details>
```

The class goes on `<details>`, and the first child must be `<summary>`. That
pair is the component. The browser reports the open state, takes focus, and
answers Enter and Space on its own — the library ships no JavaScript and does
not need any.

## When to use it

- A question whose answer is only sometimes wanted.
- Detail that would drown the page if it were always showing.
- A branch in a tree, with `data-marker="start"`.

## When not to use it

- Something that must be visible to be found. Search does open a closed panel
  in modern browsers, but a reader scanning the page will not see it.
- Switching between alternatives — that is a tab set, and it is not this.
- A dialog. Use `dialog.css`.
- More than one panel reading as one block. That is
  [Accordion](../Accordion/usage.md), which groups these.

## Do not add ARIA to it

This is the part that is most often got wrong, so it is first:

| Do not add | Why |
|---|---|
| `aria-expanded` on the `<summary>` | The browser already reports open and closed from the `open` attribute. An explicit `aria-expanded` overrides that report, and since nothing updates it, it will announce "collapsed" while the panel stands open. |
| `role="button"` on the `<summary>` | `<summary>` has its own role. Overwriting it removes the disclosure semantics you came for. |
| `aria-controls` | Harmless but pointless here; support for it in screen readers is thin, and the relationship is already structural. |

What you *may* add: `role="region"` with an `aria-labelledby` on a panel worth
reaching as a landmark. Use it on a few important panels, not on twenty FAQ
rows — a long landmark list is noise.

## Size

`sm` · `md` · `lg`, on the `<details>`. `md` is what the key class alone gives
you; the class is there to say it out loud.

## Shape

`sharp` · `smooth` · `rounded`.

## The marker

By default we draw a chevron at the end of the row, and it turns 180° when the
panel opens. Three ways to change it, in order of effort:

**Move it or remove it.**

```html
<details class="collapsible" data-marker="start">   <!-- leads the row -->
<details class="collapsible" data-marker="none">    <!-- no marker at all -->
```

**Swap the icon.** You cannot select our marker — it is a pseudo-element — so
it is a variable instead. It is used as a mask, which is why the colour keeps
coming from `--collapsible-marker-color` and not from the file:

```html
<details class="collapsible" style="--collapsible-marker-icon: url('...')">
```

**Bring your own element.** Put it in the `<summary>` as `.collapsible-marker`.
Ours stands down on sight, and yours inherits the size, placement, rotation and
timing:

```html
<details class="collapsible md">
  <summary>
    A plus sign instead
    <svg class="collapsible-marker" aria-hidden="true">…</svg>
  </summary>
  <p>…</p>
</details>
```

`aria-hidden="true"` on your icon: it is decoration, and the state is already
announced. Ours never reaches assistive tech to begin with.

## Two icons, one per state

A single icon rotates. That reads as a change only if the shape has a
direction — a chevron does, a plus does not. Turn a plus and nothing appears
to happen, because it has fourfold symmetry.

So instead of animating something *inside* an icon, give the slot **two** and
let them cross over:

```html
<details class="collapsible md">
  <summary>
    How do I create an account?
    <span class="collapsible-marker" aria-hidden="true">
      <svg class="closed"><!-- plus --></svg>
      <svg class="open"><!-- minus --></svg>
    </span>
  </summary>
  <p>…</p>
</details>
```

`closed` is the icon shown while the panel is closed, `open` the one shown
while it is open. Both names live only inside `.collapsible-marker` and cannot
reach anything else on your page — including your own `.open` utility, if you
have one.

Because nothing inside either icon has to be animatable, this works for any
pair of shapes: plus and minus, chevron and cross, a folder open and shut.

The `aria-hidden` goes on the wrapper. Both icons are decoration.

### Choosing the motion

| `data-marker-motion` | What happens |
|---|---|
| `scale` | Default. Out fast and small, in slower with a slight overshoot. |
| `rotate` | The pair turns through the swap. For shapes with a direction. |
| `fade` | Opacity only. The quietest of the four. |
| `none` | A hard cut. |

```html
<details class="collapsible md" data-marker-motion="fade">
```

Every value is a variation on one idea: where the outgoing icon goes, and where
the incoming one comes from. Tune it further with
`--collapsible-marker-exit-scale`, `--collapsible-marker-exit-rotation` and the
four timing variables — set `--collapsible-marker-enter-delay: 0s` for a true
cross-fade with no beat between the two.

A slot holding a single icon ignores all of this. It has nothing to cross over
with, so it keeps turning by `--collapsible-marker-rotation-open`.

Under `prefers-reduced-motion` every value behaves as `none`.

## A heading in the summary

The HTML spec allows one heading element inside `<summary>`, and screen reader
users move through a long page by heading rather than by tabbing. On a page
built out of these it is worth the markup:

```html
<summary><h3>Shipping and returns</h3></summary>
```

The heading keeps its rank and gives up its scale.

## Exclusive panels, without JavaScript

The native `name` attribute joins panels into one set — opening one closes the
rest:

```html
<details class="collapsible" name="faq">…</details>
<details class="collapsible" name="faq">…</details>
```

This is the whole mechanism behind [Accordion](../Accordion/usage.md). It works
on loose panels too.

## About the animation

The open and close travel is a real height transition. It needs
`interpolate-size`, which is Chromium only. In Firefox and Safari the panel
snaps open instead — everything else is identical.

Treat the animation as an enhancement, never a requirement. The marker's
rotation animates everywhere; it is an ordinary transform. Both are silenced
under `prefers-reduced-motion`.

## Variables

| Variable | Default |
|---|---|
| `--collapsible-font-size` | `var(--font-size-md)` |
| `--collapsible-radius` | `var(--radius-md)` |
| `--collapsible-background` | `var(--color-neutral-100)` |
| `--collapsible-border-width` | `1px` |
| `--collapsible-border-color` | `var(--color-neutral-300)` |
| `--collapsible-padding-inline` | `var(--spacing-100)` |
| `--collapsible-padding-block` | `var(--spacing-75)` |
| `--collapsible-gap` | `var(--spacing-75)` |
| `--collapsible-summary-color` | `var(--color-neutral-900)` |
| `--collapsible-summary-weight` | `600` |
| `--collapsible-summary-hover-background` | 6% of `--color-neutral-900` |
| `--collapsible-content-color` | `var(--color-neutral-700)` |
| `--collapsible-focus-color` | `var(--color-primary)` |
| `--collapsible-duration` | `var(--transition-medium)` |
| `--collapsible-marker-icon` | a chevron |
| `--collapsible-marker-size` | `1em` |
| `--collapsible-marker-color` | `var(--color-neutral-500)` |
| `--collapsible-marker-rotation-open` | `180deg` |
| `--collapsible-marker-duration` | `var(--collapsible-duration)` |
| `--collapsible-marker-exit-scale` | `0.4` |
| `--collapsible-marker-exit-rotation` | `0deg` |
| `--collapsible-marker-exit-duration` | `120ms` |
| `--collapsible-marker-enter-duration` | `220ms` |
| `--collapsible-marker-enter-delay` | `90ms` |
| `--collapsible-marker-enter-easing` | a gentle overshoot |
