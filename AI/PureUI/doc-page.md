# How a doc page is built

One page per component, in `apps/dev-shell/pages/`. This document covers the
page: what it contains, in what order, and what each part is for. The rules for
the CSS behind it are in [css-file.md](../css-file.md); the class rules are in
[ui-classes.md](../ui-classes.md).

The shape follows Tailwind's and daisyUI's component pages on purpose. A reader
who has used either should not have to learn a new layout to read ours.

---

## The page, in order

| # | Part | Required |
|---|---|---|
| 1 | Title and intro | Always |
| 2 | Elements | When the key requires an element |
| 3 | API table | Always |
| 4 | Examples | Always — at minimum `Default` |
| 5 | Compositions | When copy-ready compositions exist |

A page is written as nothing but these. `pages/docs.js` builds the header,
navigation, table of contents and the code-and-preview panes around them.

## 1. Title and intro

The title comes from `components.js`, not from the page. The intro is one
`<meta>` in the page head:

```html
<meta name="pc-description" content="An action the reader can take. …" />
```

Two or three sentences. What the component is and the one thing about it that
is not obvious. Not a feature list — the API table below is the list.

## 2. Elements

The native elements the key is allowed to sit on, each a pill linking to that
element on MDN. They come from the registry, not the page:

```js
{ id: "Button", …, elements: ["button", "a", "label", "summary"] }
```

Written as the element name, or as element and type together —
`"input/checkbox"`, which is also the shape of MDN's own paths. The list is
whatever stands in the stylesheet's `:where()`, and nothing else. A key that is
elementless declares none and the row is left out rather than shown empty.

This row is the element requirement made visible. A reader who puts the key on
a `<div>` should be able to see, without reading the CSS, that it will do
nothing there.

## 3. API table

One `section.pc-doc` titled `API`. Three columns: the key, its category, a
short comment.

```html
<tr>
  <td><code>sm</code></td>
  <td><span class="pc-cat pc-cat-size">…Size</span></td>
  <td>Smaller type and radius.</td>
</tr>
```

Every key the component answers to belongs here — classes, `data-` attributes,
ARIA attributes and the states that carry a look. If it changes what the
component looks like, it is a row.

The category is one of nine, and only these nine. `docs.css` defines the
palette for each:

| Category | For |
|---|---|
| `Key` | The component’s required key class |
| `Size` | `sm` · `md` · `lg` |
| `Shape` | `sharp` · `smooth` · `rounded` |
| `Emphasis` | How loudly the component asks |
| `Intent` | `data-intent="…"` — meaning, not volume |
| `Layout` | How children are placed |
| `State` | `disabled`, `aria-pressed`, `:hover`, `:active` |
| `Variables` | The `--<component>-*` tuning surface |
| `Animations` | What moves, and what stills it |

A category with no rows is left out. It is not a gap to be filled. A button’s
key class is its only `Key` row.

The comment is one sentence. What it does, not why. Anything needing a
paragraph belongs in the example's note instead.

## 4. Examples

Each example is one `section.pc-demo` with a `data-title` and a `<template>`.
The markup inside the template is the single source for both the code pane and
the live preview, so the two cannot drift apart.

```html
<section class="pc-demo" id="sizes" data-title="Sizes">
  <p class="pc-note">Three sizes. They move type and radius together.</p>
  <template>
    <button class="pu-btn sm">Small</button>
  </template>
</section>
```

### The section names

These are the whole vocabulary, and they appear in this order:

| Section | Shows |
|---|---|
| `Default` | The key and a size. Always present |
| `Sizes` | `sm` · `md` · `lg` |
| `Forms` | The component inside a `<form>`, where that means something |
| `Variants` | Shape, and anything else that changes the form of the box |
| `Emphasis` | The emphasis levels beside each other |
| `States` | Disabled, pressed, hover, and how each is reached |
| `Behavior` | What the component does when operated — toggles, disclosure |
| `Custom/Override` | Overriding it: the component's variables, or the shared tokens when it has none |
| `Other` | A divider. Nothing below it is constrained |
| `Compositions` | A divider for complete copy-ready interfaces built from existing components |

Include only what applies. Never rename, never reorder. A component with no
sizes has no `Sizes` section; it does not get an empty one.

Everything that none of these names covers goes below `Other`, in sections the
page titles however it likes — `With Icons`, `Icon-Only`, `Action Groups`.
`Other` itself is a short `section.pc-doc` saying that the fixed vocabulary
ends there. The only fixed section that may follow that free-form region is
`Compositions`, which always starts the final region of the page.

`docs.js` warns in the console when a page uses a name outside this list above
`Other`, or puts two sections in the wrong order. It is a hint while authoring
and never stops the page rendering.

### Notes

`<p class="pc-note">` above the template, when the example needs a sentence.
Use it for what the markup cannot say — that `type="button"` is what stops a
cancel button submitting, that `aria-label` is the only thing making an
icon-only button usable. Not for restating the class names.

### Header actions

A demo may put buttons in its preview pane's header: something a reader can
press to see the component do what it does. A toast that needs triggering, a
toggle that needs flipping.

The action is authored **outside** the template, and `docs.js` lifts it into
the `Result` header:

```html
<section class="pc-demo" id="behavior" data-title="Behavior">
  <div class="pc-demo-actions" hidden>
    <button type="button" data-pc-action="toggle-pressed">Toggle pressed</button>
  </div>
  <template>
    <button class="pu-btn md" aria-pressed="false">Mute</button>
  </template>
</section>
```

`data-pc-action` names a handler in the page's own map, which is given the live
preview root:

```html
<script>
  window.PC_ACTIONS = {
    "toggle-pressed": function (stage) { … },
  };
</script>
```

Outside the template is the whole point. The library ships no JavaScript, so an
example carrying an `onclick` teaches markup no consumer should copy. Keeping
the action in the shell leaves the code pane showing exactly what a consumer
would write. `hidden` is on the div because it is the shell that reveals it —
without JavaScript there is nothing for the button to do.

The stage is rebuilt from the code pane on every keystroke, so a handler reads
the element it is handed and holds on to nothing inside it.

## 5. Compositions

Compositions are complete, copy-ready interface parts assembled from the
library that already exists: a navbar, an application header, a settings pane.
They add no CSS of their own. Their second job is to expose what the current
library cannot yet build cleanly.

When a page has compositions, they always begin at the bottom with one divider:

```html
<section class="pc-doc" id="compositions" data-title="Compositions">
  <p>Complete interface parts built only from existing PureUI components.</p>
</section>
```

Each composition below the divider is its own `section.pc-demo`, named for the
thing a reader can copy — `Navbar`, `Navbar with Dropdown`, `Settings Panel`.
One code pane contains one complete composition. Composition demos fill the
main content column without entering the table-of-contents column, and use
`UI` and `HTML` tabs instead of the standard split pane. `UI` is selected
first; `HTML` holds the editable, copyable source.

A composition may use anything already shipped by PureUI. It may not contain a
`<style>` element, a `style` attribute, a new class that needs CSS, or a
page-only rule reaching into its markup. `data-stage-style` may arrange the dev
shell stage, but it must not make the composition itself work. If the existing
library cannot produce the intended result, the composition shows that limit;
the page does not hide it with extra CSS.

## Language

English. The page is a document, and the same rule applies as everywhere else.

## Done means

- Intro written, and it says something the API table does not.
- `elements` in the registry matches the stylesheet's `:where()`.
- Every key the component answers to has a row, with one of the nine categories.
- `Default` present. Sections named from the vocabulary, in order.
- Anything else below `Other`.
- `Compositions`, when present, starts the final region of the page.
- Every composition is complete copy-ready HTML using existing PureUI CSS only.
- No `onclick` inside a `<template>`.
- Console clean on load.
- Seen in a browser: every size, every state, keyboard focus, both stage themes.
