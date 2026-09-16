# Overflow

Overflow creates a scroll container that remains shrinkable inside a constrained
layout. The container controls its own overflow only; it does not size or restyle
its children.

## Quick start

```html
<div
  class="pu-overflow overflow-y"
  role="region"
  aria-label="Notifications"
  tabindex="0"
  style="max-block-size: 20rem"
>
  …
</div>
```

The parent layout must establish a finite available size before content can
overflow. Overflow does not set a fixed height, width or flex behavior.

## Axes

The key permits automatic scrolling on both axes:

```html
<div class="pu-overflow">…</div>
```

Select one axis when the other must not be user-scrollable:

```html
<div class="pu-overflow overflow-x">…</div>
<div class="pu-overflow overflow-y">…</div>
```

`overflow-x` uses `auto` horizontally and `hidden` vertically. `overflow-y`
uses `hidden` horizontally and `auto` vertically. Applying both utilities is
equivalent to the key alone.

Overflow does not add wrapping or sizing rules to descendants. Content that
must shrink or wrap should declare that behavior where the content is defined.
This keeps the utility predictable for tables, media and other content whose
horizontal behavior is intentional.

## Layout and Behavior

Overflow controls how excess content is exposed. Layout and Behavior control
how much space the container receives:

```html
<section
  data-direction="vertical"
  data-layout="start-top"
  style="block-size: 24rem"
>
  <header>Inbox</header>
  <div class="pu-overflow overflow-y" data-behavior="expand">…</div>
</section>
```

`data-behavior="expand"` takes the remaining block space because the parent is
a bounded vertical Layout. `pu-overflow` then scrolls the content that does not
fit.

## Persistent content outside the scroll region

Put content that must remain visible outside the element carrying Overflow. In
this example the composition establishes a finite block size, while only the
file-list body becomes a vertical scroll region:

```html
<article class="pu-card card-rounded" style="block-size: 24rem">
  <header class="card-header">
    <h3 class="card-title">Downloads</h3>
    <p class="card-subtitle">6 files</p>
  </header>
  <div class="card-body pu-overflow overflow-y">
    <ul class="pu-list list-sm" role="list">
      <li class="pu-list-item">…</li>
    </ul>
  </div>
</article>
```

`pu-overflow overflow-y` gives the body `overflow-y: auto` and
`overflow-x: hidden`. The header is its sibling rather than its descendant, so
it does not move when the file list scrolls. Put Overflow on the outer element
instead when the complete composition should scroll as one region.

## Keyboard access

A scrollable region must contain something reachable through sequential focus
navigation or be focusable itself. For a text-only region, use `tabindex="0"`.
Give a meaningful standalone region an accessible name, usually with
`role="region"` and `aria-label` or `aria-labelledby`.

Do not add an extra tab stop when interactive descendants already make the
scrollable content reachable.

## Variables

| Variable | Default | Purpose |
|---|---|---|
| `--overflow-x` | `auto` | Horizontal overflow behavior. |
| `--overflow-y` | `auto` | Vertical overflow behavior. |

The variables accept the native CSS overflow values. Prefer the axis utilities
for the standard combinations.

## Standalone stylesheet

When stylesheets are linked separately, load Overflow after component files it
must override:

```html
<link rel="stylesheet" href="pureui/styles/main.css">
<link rel="stylesheet" href="pureui/styles/a-tag.css">
<link rel="stylesheet" href="pureui/styles/list.css">
<link rel="stylesheet" href="pureui/styles/card.css">
<link rel="stylesheet" href="pureui/styles/overflow.css">
```

The package `index.css` loads Overflow in the final `pureui.utilities` layer.
