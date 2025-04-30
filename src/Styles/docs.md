# Button

# Avatar

Our avatars can be used with **text-elements**, **text-nodes**, or **images** (`i`, `span`, `svg`, `img`).

## ⚠️ IMPORTANT

You can only have **text** or **img/icons** inside an avatar — **not both**.  
If you try to use both, our styling will not have the expected effect.  
If you still want to mix content types, you're free to override it with your own CSS.

> We always write our CSS with **low specificity** to make it easy to extend.

## Syntax

class="key type size"

- key: avatar
- type: rounded | base | sharp
- size: sm | md | lg

**Example:**

```html
<div class="avatar rounded md">A</div>
```

# Avatar Group

## ⚠️ IMPORTANT

You can controll all children (.avatar) from the parent element. If you choose to do so that rule will override the rules on the children.

> The only extra thing you can controll here is how tight the avatars is going to be.

**Syntax**
class="key type size tightness"

- key: avatar-group
- type: rounded | base | sharp
- size: sm | md | lg
- tightness: tight | base | loose

**Example**

```html
<div>
  <div class="avatar-group loose rounded">
    <div class="avatar">H</div>
    <div class="avatar">E</div>
    <!-- sm will not have an effect -->
    <div class="avatar sm">L</div>
    <div class="avatar">L</div>
    <div class="avatar">O</div>
  </div>
</div>
```

# Menu

**Syntax**
class="key type size tightness"

- key: menu
- type: rounded | base | sharp
- size: sm | md | lg
- tightness: tight | base | loose

Our menus provide a standardized way to create navigation lists with consistent styling. The menu component automatically handles spacing, hover effects, and disabled states.
Our menus can be used with lists (ul, ol), and can contain nested lists for sub-menus.

## ⚠️ IMPORTANT

Menu items are structured as list items (li), and styling automatically applies based on nesting and content structure. The menu component handles disabled states and hover effects automatically.

> We always write our CSS with low specificity to make it easy to extend.

**Syntax**
class="key size"

- key: menu
- size: sm | md | lg

**Example**
Traditional menu with items

```html
<ul class="menu md">
  <li>Menu Item 1</li>
  <li>Menu Item 2</li>
  <li>Disabled Item</li>
</ul>
```

## Sub menus

All Menus can have sub-menus. When you place an ul/ol inside of a li it automiaticlly creates a sub-menu and you can provide a title within in the li parent and new items. This can be nested to all future.

> Use class ".title" to have the title responsive to the menu
> Use class ".menu-line" to add a line to the left of the menu items
> **Example**

```html
<ul class="menu md">
  <li>Menu Item 1</li>
  <li>Menu Item 2</li>
  <li>Disabled Item</li>

  <!-- This will automaticcly be a sub-menu -->
    <li>
      <h3 class="title">Titel</h3>
      <ul class="menu-line">
        <li>Item One sub-menu</li>
        <li>Item Two sub-menu</li>
        <li>Item Three sub-menu</li>
      </ul>
      </li>
  </ul>
</ul>
```
