# UI class rules

Rules for every class PureUI ships. [css-file.md](css-file.md) covers where in
the file they go; this document covers what they must be.

---

## 1. The key class

Every component starts with one class — the key. Without the key on the
element, nothing applies.

```css
.pu-btn { … }
```

Every class the library ships is prefixed `pu-`. The prefix is collision
protection: including our stylesheet never overwrites a consumer's existing
CSS.

Every rule for the component lives inside the key block. Nesting is mandatory,
so nothing can leak out.

```css
.pu-btn {
  &.sm { … }
  &:focus-visible { … }
}
```

## 2. The key requires its native element

**Where a native element exists for the job, the key requires it.** The library
ships no JavaScript and cannot warn anyone at runtime. Refusing to style the
wrong element is the only enforcement CSS has.

```css
.pu-table:where(table) { … }        /* does nothing on a <div> */
.pu-range:where(input[type="range"]) { … }
```

### Always `:where()`

Never `element.class`, never `:is()`. Both raise specificity and break rule 3.

| Syntax | Specificity | Consumer can override with one class |
|---|---|---|
| `.pu-btn` | 0-1-0 | yes |
| `button.pu-btn` | 0-1-1 | **no** |
| `.pu-btn:is(button)` | 0-1-1 | **no** |
| `.pu-btn:where(button)` | **0-1-0** | **yes** |

`:where()` always counts as zero and filters matching just as strictly.

### When to require, when not to

The test is a question about HTML, not about taste:

> Is there an element the spec already means for this, such that any other
> element is measurably worse for a screen reader, for keyboard users, or for
> the browser's own behaviour?

Yes → require it. No → plain class.

Two things that are **not** reasons to require an element: it would be tidier,
or the demos happen to use it. Tidiness is not an accessibility argument, and
what the demos do is not a contract.

Where several elements are legitimate, list them all:

```css
.pu-btn:where(button, a, label, summary) { … }
.pu-list:where(ul, ol) { … }
```

### Current state

Requiring their element:

```
.pu-audio:where(audio)              .pu-menu:where(ul, ol)
.pu-breadcrumbs:where(ol, ul)       .pu-menu-grid:where(ul, ol)
.pu-btn:where(button, a, label, summary)
.pu-checkbox:where(input[type="checkbox"])
.pu-collapsible:where(details)      .pu-meter:where(meter)
.pu-dialog:where(dialog)            .pu-nav:where(ul, ol)
.pu-fieldset:where(fieldset)        .pu-pagination:where(ul, ol)
.pu-file:where(input[type="file"])  .pu-progress:where(progress)
.pu-form:where(form)                .pu-radio:where(input[type="radio"])
.pu-input:where(input)              .pu-range:where(input[type="range"])
.pu-label:where(label)              .pu-select:where(select)
.pu-link:where(a)                   .pu-skip-link:where(a[href])
.pu-list:where(ul, ol)              .pu-table:where(table)
                                    .pu-textarea:where(textarea)
```

Plain classes, because HTML has nothing to insist on: card, alert, badge,
toast, tooltip, avatar, field, accordion, loading, swap, pill.

Pill is the exception worth understanding. A pill is the interactive
counterpart to a badge — a badge annotates something else, a pill is its own
object. But the key legitimately sits on `span` and `li` too, because a
removable tag holds its own remove `<button>`, and a `<button>` cannot contain
a `<button>`. A tag with no interaction at all is a badge, not a pill.

## 3. Specificity budget

**A consumer must be able to override any key with one plain class of their
own.** That means the key stays at 0-1-0. This is why `:where()` is mandatory
and why nothing in the library qualifies a key with a bare element selector.

## 4. Colours

**Hardcoded colours are forbidden.** Always a token from `main.css`.

```css
color: var(--color-neutral-900);
background-color: var(--color-primary);
```

Never `#1e293b`, `rgb(30 41 59)`, `hsl(217 33% 17%)`, or a named colour.

Dark mode is not built yet, and it will be built by changing `main.css`. Every
component that went through tokens inherits it for free; every component that
hardcoded a colour has to be found and fixed by hand.

Two allowances, and only these:

- `color-mix(in hsl, var(--token) …, var(--token) …)` for hover and active
  shades.
- A translucent overlay expressed through a component variable declared at the
  top of the block, so a consumer can replace it.

Spacing, radius, shadow, transition, z-index and font size have tokens too. A
raw `px` value is acceptable only when no token expresses it and the value is
structural rather than thematic.

## 5. Sizes

`sm` · `md` · `lg`. **`md` is the default** — the base already produces the
`md` look, so `&.md` holds only what base cannot express. The key alone must
never render wrong.

```css
.pu-btn {
  font-size: var(--font-size-md);   /* base is md */

  &.sm { font-size: var(--font-size-sm); }
  &.lg { font-size: var(--font-size-lg); }
}
```

## 6. States

Drive state from what the platform gives, in this order:

1. **Native attributes and pseudo-classes** — `:disabled`, `:checked`,
   `[open]`, `:focus-visible`, `:invalid`.
2. **ARIA attributes** — `[aria-pressed="true"]`, `[aria-disabled="true"]`,
   `[aria-busy="true"]`, `[aria-invalid="true"]`. These carry meaning to
   assistive technology; a `data-` attribute carries none.
3. **`data-` attributes** — only when neither exists:
   `[data-intent="destructive"]`, `[data-icon-only]`.

When both a native and an ARIA form can occur, style both:

```css
/* .pu-btn sits on <button> and on <a>. An <a> can never be :disabled. */
&:is(:disabled, [aria-disabled="true"]) { … }
```

## 7. Shared vocabulary

Same concept, same class name, in every component.

| Concept | Classes |
|---|---|
| Size | `sm` · `md` · `lg` |
| Shape | `sharp` · `smooth` · `rounded` |
| Emphasis | `secondary` · `tertiary` · `ghost` · `outline` |
| Intent | `data-intent="info \| success \| warning \| error \| destructive"` |

Do not invent a synonym for something that already has a name.

## 8. Focus

Every interactive element has a visible `:focus-visible` indicator at 3:1
contrast. The house pattern:

```css
outline: 1px solid …;
outline-offset: 2px;
```

Focus comes from `main.css`. A component file must never draw its own outline
and must never remove one. Full rules in [accessibility.md](accessibility.md).
