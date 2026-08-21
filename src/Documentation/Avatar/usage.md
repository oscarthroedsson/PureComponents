# Avatar

A person as a square. Initials or a picture, alone or in a group that lists or
stacks.

## When to use

- A user's profile picture or initials
- Contact lists, comment threads, an account menu
- A set of people on one row — assignees, attendees, collaborators

## When not to use

- A general image → Image
- A logo → Image
- An icon → the icon components

## Quick start

```html
<span class="avatar">JD</span>

<span class="avatar">
  <img src="jane.jpg" alt="Jane Doe" />
</span>
```

The key alone is already `md` and `soft`. Nothing else is needed to get the
default.

## Size and shape

```html
<span class="avatar sm">JD</span>
<span class="avatar md">JD</span>
<span class="avatar lg">JD</span>

<span class="avatar sharp">JD</span>
<span class="avatar soft">JD</span>
<span class="avatar rounded">JD</span>
```

The two are independent — `sm rounded` and `lg sharp` work without anything
extra.

### A size we never named

Everything is derived from one measurement, including the initials:

```html
<span class="avatar rounded" style="--avatar-size: 7rem">JD</span>
```

The text scales with the box. You do not have to pick a font size to match.

## Colours

```html
<span class="avatar rounded"
      style="--avatar-background: var(--color-primary);
             --avatar-color: var(--color-neutral-900)">AB</span>
```

This is also all a "+3" counter needs. It is an avatar, not a separate class.

## Groups

A set of people is a list, so the group is a `<ul>`:

```html
<ul class="avatar-group rounded" role="list" data-layout="stacked">
  <li><span class="avatar"><img src="jane.jpg" alt="Jane Doe" /></span></li>
  <li><span class="avatar"><img src="raj.jpg"  alt="Raj Patel" /></span></li>
  <li><span class="avatar">+3</span></li>
</ul>
```

`role="list"` is written out on purpose — WebKit drops list semantics as soon
as `list-style: none` is set, and the group sets it.

**The group owns the size and the shape.** Put them on the `<ul>`, not on the
avatars. A size class on a child inside a group is ignored: the overlap is
measured from one square, and a stack of different sizes does not read.

| Attribute | Values | |
|---|---|---|
| `data-layout` | `list` · `stacked` | `list` is the default |
| `data-direction` | `row` · `row-reverse` · `column` · `column-reverse` | `row` follows the writing direction, so RTL needs nothing |
| `data-stack-order` | `last` | the last avatar paints on top instead of the first |
| `data-hover` | `expand` · `lift` | see below |

### data-hover

`expand` — pointing at the stack lays it out as a list, along whichever axis
`data-direction` gave it. A row opens sideways, a column opens downwards.

`lift` — pointing at one avatar brings it to the front of the stack. It keeps
its place in the row: what changes is the stacking order, not the layout. It
also grows and changes its ring, so it is unmistakable which one is in front.

They are one attribute rather than two, because an opening stack and a lifted
avatar compete for the same glance. Both answer the keyboard as well as the
pointer, both work on either axis, and both go still under
`prefers-reduced-motion`.

## Interactive

The key goes on the `<a>` or `<button>` itself:

```html
<a href="/u/jane" class="avatar rounded" aria-label="Jane Doe's profile">
  <img src="jane.jpg" alt="" />
</a>
```

The focus indicator is the house pattern — a 3px outline at 2px offset.

## Accessibility

- **A picture needs a name.** `alt` on the image, or an accessible name on the
  link or button around it. Initials are not a name: "JD" is read as two
  letters, not as a person.
- **Decoration gets `alt=""`.** An avatar next to a name that is already
  written out should not be read twice.
- **Groups are lists.** `<ul role="list">`, one `<li>` per person.
- **Initials are 1–2 characters.** The box is a fixed square and does not grow
  to fit.

## Variables

| | |
|---|---|
| `--avatar-size` | the one measurement; everything derives from it |
| `--avatar-radius` | |
| `--avatar-background` · `--avatar-color` | |
| `--avatar-font-scale` | initials as a fraction of the box (`0.4`) |
| `--avatar-focus-color` | |
| `--avatar-group-gap` | distance in the list layout |
| `--avatar-group-overlap` | how far they slide under each other |
| `--avatar-group-ring-color` | **set this to the surface the group sits on** |
| `--avatar-group-lift-scale` · `--avatar-group-lift-ring-color` | |

## Not here

The dot in the corner — presence, unread count, anything anchored to an edge.
It is the same primitive a notification button needs, so it becomes its own
component and composes onto this one.
