# Behavior

Behavior controls how a direct child participates in its parent's Layout. It
is an explicit override of the component's own base sizing and does not
require either element to be a Box.

## Quick start

```html
<div class="pu-box box-sm" data-layout="center-start" data-gap="sm">
  <button class="pu-btn" data-behavior="compact">Filters</button>
  <input class="pu-input" type="search" data-behavior="expand" aria-label="Search">
  <button class="pu-btn" data-behavior="compact">Create</button>
</div>
```

When stylesheets are linked separately, load Behavior after the component and
Layout files it overrides:

```html
<link rel="stylesheet" href="pureui/styles/button.css">
<link rel="stylesheet" href="pureui/styles/Form/input/input.css">
<link rel="stylesheet" href="pureui/styles/Layout/box.css">
<link rel="stylesheet" href="pureui/styles/Layout/layout.css">
<link rel="stylesheet" href="pureui/styles/Layout/behavior.css">
```

The package `index.css` already establishes this order.

## Expand

`data-behavior="expand"` takes available inline space and can shrink below the
component's intrinsic width:

```html
<button class="pu-btn" data-behavior="expand">Full available width</button>
```

This explicitly overrides Button's natural content width.

## Compact

`data-behavior="compact"` keeps the child close to its content width while
still respecting the parent's available inline size:

```html
<input class="pu-input" data-behavior="compact" value="Natural field width">
```

This explicitly overrides Input's normal full width.

Do not add `compact` to a component that is already naturally compact unless
you want to override its declared inline size.

## Scope

Behavior only applies to an element that is a direct child of an element
carrying `data-layout`:

```html
<nav data-layout="center-start">
  <form data-behavior="expand">This matches.</form>
  <div>
    <div data-behavior="expand">This does not match.</div>
  </div>
</nav>
```

A nested semantic element can be both at once: a behavior-controlled child in
its parent's layout and the layout owner of its own direct children.

## Accessibility

Behavior changes size participation only. It does not change DOM order,
semantics, focus order or whether an element is interactive.
