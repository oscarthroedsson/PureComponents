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
