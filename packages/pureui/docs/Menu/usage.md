# Menu Component

## Component Overview

The Menu component provides accessible menu structures for action menus, dropdowns, and navigation menus with proper ARIA roles and keyboard navigation.

### When to Use

- Action menus (context menus, dropdown actions)
- Application menus
- Command palettes
- Dropdown menus

### When NOT to Use

- Site navigation (use Navigation component)
- Simple lists (use List component)
- Breadcrumbs (use Breadcrumbs component)

## Quick Start

```html
<ul class="menu" role="menu" aria-label="Main menu">
  <li role="menuitem">
    <a href="/">Home</a>
  </li>
  <li role="menuitem" aria-disabled="true">Disabled</li>
</ul>
```

## Accessibility Requirements

- **`role="menu"` or `role="menubar"`** - Required on menu container
- **`role="menuitem"`** - Required on menu items
- **`aria-expanded`** - For submenus
- **`aria-disabled="true"`** - For disabled items
- **Keyboard navigation** - Arrow keys, Enter, Escape

## API Reference

- `.menu` - Base menu class
- Layout: `.horizontal`
- Size variants: `.sm`, `.md`, `.lg`
- Sub-components: `.menu-line`, `.titel`
- Submenu: Uses `<details>` element

## Examples

See component CSS file for detailed examples.
