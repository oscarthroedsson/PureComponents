# Menu

A list of commands — a dropdown from a button, a context menu, a nested set of
options. It uses the popover API and CSS anchor positioning, so a menu opens,
places itself and flips when it does not fit without any script.

## Quick start

```html
<button class="pu-btn btn-md" popovertarget="file-menu">File</button>

<ul class="pu-menu menu-md" id="file-menu" popover role="menu">
  <li><button class="menu-item" role="menuitem">New</button></li>
  <li><button class="menu-item" role="menuitem">Open</button></li>
  <li><hr class="menu-separator" /></li>
  <li><button class="menu-item" role="menuitem">Close</button></li>
</ul>
```

## Classes

| Class | Does |
|---|---|
| `.pu-menu` | The key. Requires `<ul>` or `<ol>`. |
| `menu-sm` | Smaller type. Everything inside scales with it. |
| `menu-md` | The default. |
| `menu-lg` | Larger type. |
| `menu-horizontal` | A row instead of a column. |
| `.menu-item` | An item. Also applies to a direct `<a>`, `<button>` or `<summary>`. |
| `.menu-icon` | A leading icon. |
| `.menu-shortcut` | A keyboard hint, pushed to the trailing edge. |
| `.menu-title` | A small uppercase group heading. |
| `.menu-separator` | A dividing rule inside a list or between sibling menu groups. |

Everything is sized in `em`, so one size class on the menu rescales the items,
the icons, the padding and the shortcuts together.

## Attributes

| Attribute | Does |
|---|---|
| `popover` | Makes the menu a popover. Needed for a dropdown. |
| `data-submenu="flyout"` | A submenu that opens to the side, in the top layer. |
| `data-submenu="inline"` | A submenu that expands in place, in normal flow. |
| `data-indent="true"` | Indents an inline submenu. The default. |
| `data-indent="false"` | No indent. |
| `data-intent="destructive"` | Marks a destructive item with destructive colour and interaction states. |
| `aria-current="page"` \| `data-active` | Marks the active item. |
| `aria-disabled="true"` \| `disabled` | Dims an item and stops it responding. |

## Placement

A root popover menu opens below its trigger and flips when it does not fit. A
flyout submenu opens to the inline-end side — right in a left-to-right
language — and tries the other side when there is no room. Both are handled by
the browser.

A popover menu is at least as wide as its trigger where anchor positioning is
supported, and at least `--menu-min-width` everywhere.

## Submenus

### Flyout

```html
<li>
  <button class="menu-item" popovertarget="share-menu">Share</button>
  <ul class="pu-menu" id="share-menu" popover data-submenu="flyout" role="menu">
    <li><button class="menu-item" role="menuitem">Copy link</button></li>
    <li><button class="menu-item" role="menuitem">Email</button></li>
  </ul>
</li>
```

A `›` is added to the trigger automatically, and it becomes `‹` in a
right-to-left language.

### Inline

```html
<li>
  <details>
    <summary>More options</summary>
    <ul class="pu-menu" data-submenu="inline" role="menu">
      <li><button class="menu-item" role="menuitem">Duplicate</button></li>
      <li><button class="menu-item" role="menuitem">Archive</button></li>
    </ul>
  </details>
</li>
```

The `<details>` gives the toggle and the keyboard handling. The chevron turns
when it opens, and the panel slides where the browser supports it.

## Variables

| Variable | Default | Controls |
|---|---|---|
| `--menu-bg` | `var(--color-surface-raised)` | Fill. |
| `--menu-color` | `var(--color-text)` | Text. |
| `--menu-muted` | `var(--color-text-subtle)` | Titles and shortcuts. |
| `--menu-hover` | a shade over the fill | Item hover. |
| `--menu-active` | a deeper shade | Item while pressed. |
| `--menu-border` | `var(--color-border)` | Separators. |
| `--menu-disabled` | `var(--color-text-subtle)` | A disabled item. |
| `--menu-current-bg` | 18% primary over the fill | The active item. |
| `--menu-destructive` | `var(--color-destructive)` | Destructive item text. |
| `--menu-destructive-hover` | `var(--color-destructive-surface)` | Destructive item hover fill. |
| `--menu-destructive-active` | 20% destructive over the menu | Destructive item pressed fill. |
| `--menu-min-width` | `16em` | Minimum width. |
| `--menu-radius` | `var(--radius-md)` | Menu corner. |
| `--menu-item-radius` | `var(--radius-sm)` | Item corner. |
| `--menu-offset` | `0.4em` | Gap between a popover menu and its trigger. |
| `--menu-indent` | `1.35em` | Inline submenu indent. |

```html
<ul class="pu-menu menu-md" popover style="--menu-min-width: 22em">
```

## Accessibility

- `role="menu"` on the list and `role="menuitem"` on each item, for a menu of
  commands.
- A list of links to other pages is navigation, not a menu. Use
  `.pu-nav` for that and leave the menu roles off.
- `role="list"` instead when the list is not a command menu. The component sets
  `list-style: none`, and WebKit drops list semantics from a list styled that
  way.
- The trigger needs `popovertarget` pointing at the menu's `id`.
- Mark the active item with `aria-current` or `data-active`, not with a class.
- A disabled item uses `disabled` on a `<button>` and `aria-disabled="true"`
  on an `<a>`. An anchor can never be `:disabled`; both are styled.
- A shortcut hint in `.menu-shortcut` is visual. The real keyboard binding has
  to be implemented separately.
- Icons are decoration. Mark them `aria-hidden="true"`.
- Motion is removed under `prefers-reduced-motion`.

## Examples

### With icons and shortcuts

```html
<ul class="pu-menu menu-md" popover role="menu">
  <li class="menu-title">File</li>
  <li>
    <button class="menu-item" role="menuitem">
      <svg class="menu-icon" aria-hidden="true" viewBox="0 0 24 24">…</svg>
      New
      <span class="menu-shortcut">⌘N</span>
    </button>
  </li>
  <li><hr class="menu-separator" /></li>
  <li>
    <button class="menu-item" role="menuitem" disabled>Revert</button>
  </li>
</ul>
```

### Sizes

```html
<ul class="pu-menu menu-sm" popover role="menu">…</ul>
<ul class="pu-menu menu-md" popover role="menu">…</ul>
<ul class="pu-menu menu-lg" popover role="menu">…</ul>
```

### A horizontal menu bar

```html
<ul class="pu-menu menu-md menu-horizontal" role="menu">
  <li><button class="menu-item" role="menuitem">File</button></li>
  <li><button class="menu-item" role="menuitem">Edit</button></li>
  <li><button class="menu-item" role="menuitem">View</button></li>
</ul>
```

### An inline menu, not a popover

Leave `popover` off and the menu is a plain panel in the page.

```html
<ul class="pu-menu menu-md" role="menu">…</ul>
```
