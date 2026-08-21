# Menu Grid Component

## Component Overview

The Menu Grid component provides a fixed-position vertical menu with expandable submenus that appear on hover.

### When to Use

- Side navigation menus
- Fixed position menus
- Vertical menu bars
- Application menus

### When NOT to Use

- Main site navigation (use Navigation component)
- Dropdown menus (use Menu component)
- Horizontal menus (use Menu or Navigation component)

## Quick Start

```html
<ul class="menu-grid">
  <li>
    <span>Menu Item</span>
    <ul>
      <li>Submenu Item</li>
    </ul>
  </li>
</ul>
```

## Accessibility Requirements

- **Semantic HTML** - Use `<ul>` and `<li>` elements
- **Keyboard navigation** - Requires JavaScript
- **ARIA attributes** - Consider `aria-expanded` for submenus

## API Reference

- `.menu-grid` - Base menu grid class
- Submenu: Nested `<ul>` elements
- Layout: `.row` class for horizontal submenu

## Examples

See component CSS file for detailed examples.
