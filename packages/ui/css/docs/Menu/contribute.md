# Menu — contributing

## File

`packages/ui/css/styles/menu.css`

## Key

```css
.pu-menu:where(ul, ol)
```

A menu is a list of commands. `list-style: none` costs the list role in
WebKit, so `role="menu"` or `role="list"` belongs in the markup.

## Everything is em

The base sets `font-size` and every measurement below it — padding, gap, icon
size, indent, separator margins — is in `em`. That is why the three size
classes change one property each:

```css
&.menu-sm { font-size: var(--font-size-sm); }
```

One declaration rescales the items, the icons, the shortcuts and the spacing
together. Anything added to this file should stay in `em` for the same reason.

## The item selector list

```css
.menu-item,
& > li > a,
& > li > button,
& > li > details > summary { … }
```

Repeated once for the base look and once for the states. An item is legitimately
a `<button>`, an `<a>`, or the `<summary>` of an inline submenu, and
`.menu-item` covers anything else. Keeping the list identical in both places is
what stops a state applying to only some of the forms.

## Separators can divide items or groups

`.menu-separator` can be a direct child of `.menu-content` when it separates
items, or a direct child of `.pu-menu` when it separates sibling menu groups.
The latter keeps a visual divider outside every list's semantics.

## Placement is the browser's

```css
&[popover]:not([data-submenu="flyout"]) {
  position-area: block-end span-inline-end;
  position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
}

&[popover][data-submenu="flyout"] {
  position-area: inline-end span-block-end;
  position-try-fallbacks: flip-inline, flip-block, flip-inline flip-block;
}
```

A root menu opens below its trigger, a flyout to the side, and each declares
the order it should try when it does not fit. No script measures anything.

## Width follows the trigger, with a fallback first

```css
min-inline-size: var(--menu-min-width, 16em);
min-inline-size: max(var(--menu-min-width, 16em), anchor-size(inline));
```

Two declarations of the same property on purpose. A browser without
`anchor-size()` drops the second and keeps the first.

## Three submenu forms

- **flyout** — `[popover]` plus `data-submenu="flyout"`. Top layer, opens to
  the side.
- **inline** — `data-submenu="inline"`. Stays in normal flow, strips the
  surface, the shadow and the radius, and indents by `--menu-indent`.
- **`<details>`** — the toggle mechanism for an inline submenu. The native
  marker is removed two ways (`::marker` and `::-webkit-details-marker`) and a
  `›` is drawn on `::after` instead.

`interpolate-size: allow-keywords` on the `<details>` is what lets
`::details-content` travel from `0` to `auto`. Where it is unsupported the
submenu snaps open.

## The flyout indicator is automatic

```css
& > li:has(> .pu-menu[data-submenu="flyout"]) > button[popovertarget]::after {
  content: "›";
}
```

The trigger grows a chevron because a flyout is its sibling, not because
anyone added a class.

## RTL

```css
&:dir(rtl) {
  … ::after { content: "‹"; }
  & > li > details[open] > summary::after { rotate: -90deg; }
}
```

The chevrons are the one thing in the file that has a direction, and
`position-area` handles the rest through logical values.

## The open trigger stays lit

```css
& > li > details[open] > summary,
& > li:has(> .pu-menu[data-submenu="flyout"]:popover-open) > button[popovertarget] {
  background-color: var(--menu-hover);
}
```

Both submenu forms, so the trigger of an open submenu reads as active whichever
mechanism opened it.

## Popover entry and exit

`display` and `overlay` are in the transition list with `allow-discrete`, and
`@starting-style` gives the entry something to animate from. Without the
discrete transitions the menu is removed from the top layer instantly and the
exit never plays.

## Order inside the block

1. Variables
2. Base
3. Items, icons, shortcuts
4. Title and separator
5. Size
6. Orientation
7. Popup and submenu placement
8. `<details>` submenu
9. Indicators, including RTL
10. States
11. Reduced motion

## Variables

Eight are declared at the top of the block. Five more —
`--menu-min-width`, `--menu-radius`, `--menu-item-radius`, `--menu-offset`,
`--menu-indent` — are used through `var(name, fallback)` without being
declared. They work as a tuning surface, but they do not appear in the block's
variable list, so a reader cannot find them without searching the file.
`--menu-indent` is the exception: `data-indent` declares it.

## `color-mix()` and `light-dark()`

`--menu-hover`, `--menu-active` and `--menu-current-bg` are mixes, which is
what the colour rules allow for hover and active shades.
