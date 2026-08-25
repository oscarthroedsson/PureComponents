# Accordion

Several [Collapsible](../Collapsible/usage.md) panels reading as one block.

```html
<div class="accordion md">
  <details class="collapsible" name="faq">
    <summary>How do I create an account?</summary>
    <p>Click the "Sign up" button in the top right corner.</p>
  </details>
  <details class="collapsible" name="faq">
    <summary>I forgot my password.</summary>
    <p>Use "Forgot password" on the sign-in page.</p>
  </details>
</div>
```

You need both stylesheets: `collapsible.css` first, then `accordion.css`.

## The exclusive behaviour is not in this class

Give the panels the same native `name` and opening one closes the rest. Leave
`name` off and several stand open at once.

```html
<details class="collapsible" name="faq">   <!-- one open at a time -->
<details class="collapsible">              <!-- several may be open -->
```

The look is identical either way. That is why there is one wrapper class and
not two: the CSS is the same, the difference belongs to the markup, and a class
that claimed to control it would be lying — you could set it and still get the
other behaviour.

No JavaScript is involved in either case.

## When to use it

- A FAQ.
- Settings grouped into sections.
- A long page of reference material where most sections stay closed.

## When not to use it

- Switching between alternatives. That is a tab set. An accordion stacks its
  panels and may have several open; do not put `role="tablist"` on this.
- A single panel. That is [Collapsible](../Collapsible/usage.md), and it needs
  no wrapper — `<details>` already carries its own frame.
- Navigation. Use `nav.css`.

## Size

`sm` · `md` · `lg`, on the group. It is handed down to every panel, so it is
written once instead of once per row. `md` is the default.

## Shape

`sharp` · `smooth` · `rounded`, on the group. The corner belongs to the block;
the panels inside are square and let the group clip them.

## Variants

`separate` drops the shared frame and spaces the panels out, so each becomes
its own card. The right look when the questions are unrelated.

```html
<div class="accordion md separate">…</div>
```

## Everything a panel can do still works

The group never restyles its panels — it sets their variables. So markers,
colours and icons are tuned exactly as they are on a lone Collapsible.

**Where you set them matters.** A component declares its variables on itself,
and a declaration on the element beats an inherited one. So an inline style on
the wrapper is ignored:

```html
<!-- Does nothing. .collapsible declares this variable on itself. -->
<div class="accordion md" style="--collapsible-marker-color: var(--color-primary)">
```

Set it on each panel, or — better for a whole group — write one rule of your
own. A selector beats a declaration:

```css
.accordion > .collapsible {
  --collapsible-marker-color: var(--color-primary);
}
```

That is exactly how `accordion.css` hands the size down to its rows.

## Headings

On a long page, put a heading in each `<summary>`. The spec allows one heading
element there, and it lets screen reader users move between the questions by
heading instead of tabbing through every one of them:

```html
<summary><h3>Do you ship outside Sweden?</h3></summary>
```

This is the one thing worth borrowing from the ARIA APG's accordion pattern.

## Do not add ARIA to it

- No `aria-expanded` on a `<summary>`. The browser already reports it; an
  explicit one would lie. See [Collapsible](../Collapsible/usage.md).
- No `role="tablist"` / `role="tabpanel"`. Those promise arrow-key navigation
  between headers, which does not exist here.

The keyboard contract the APG asks of an accordion — Enter and Space on the
trigger, normal Tab order — is what `<summary>` already gives you.

## Variables

| Variable | Default |
|---|---|
| `--accordion-radius` | `var(--radius-md)` |
| `--accordion-border-width` | `1px` |
| `--accordion-border-color` | `var(--color-neutral-300)` |
| `--accordion-gap` | `var(--spacing-50)` — only `separate` uses it |

Everything else is tuned through the panels' own variables.
