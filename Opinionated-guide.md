# Opinionated-guide.md

**Nothing in this file is in force. It is a plan, not a rule.**

Until Oscar gives the order, every stylesheet follows the standard already set
out in `AGENTS.md`. Do not apply anything below to a component because you
happened to be editing it. Do not start the analysis in §3 on your own
initiative. If a component you are working on looks like it belongs in the
opinionated column, report that — do not act on it.

---

## 1. Why this file exists

PureUI was started with an intent that was never written down: the library
should be **opinionated**, and that opinion should push the consumer toward
semantically correct, more usable HTML.

A stylesheet that styles `.card` on anything is neutral. A stylesheet that
styles `.table` only when the class sits on a real `<table>` has an opinion,
and the consumer who put it on a `<div>` finds out immediately — their page
renders unstyled instead of rendering wrong-but-pretty.

That is the lever. The library ships no JavaScript and cannot warn anybody at
runtime. Refusing to style the wrong element is the only enforcement mechanism
CSS has.

## 2. The rule this would introduce

**Where a native element exists for the job, the key class requires it.**

```css
/* opinionated: the class does nothing on a <div> */
dialog.dialog { … }
.table:is(table) { … }
```

**Where no native element exists, keep the plain class.** A card, an alert, a
badge, a toast — HTML has nothing to insist on, so insisting on anything would
be arbitrary, and arbitrary strictness is just friction.

```css
/* not opinionated, and should not be forced to be */
.card { … }
.alert { … }
```

The test is simple, and it is a question about HTML, not about taste:

> Is there an element the spec already means for this, such that any other
> element is measurably worse for a screen reader, for keyboard users, or for
> the browser's own behaviour?

Yes → require it. No → plain class, as today.

Two things that are **not** reasons to require an element:

- It would be tidier. Tidiness is not an accessibility argument.
- The demos happen to use that element. What the demos do is not a contract.

### This already has precedent

Thirteen stylesheets already qualify their key by element. The idea is not new
to the library, it was just never stated or applied consistently:

```
dialog.dialog                       a.anchor-base
.meter:is(meter)
.progress:is(progress)              img.avatar
.select:is(select)                  button.pill
.textarea:is(textarea)              input[type="file"].fileInput
.checkbox:is(input[type="checkbox"])
.range:is(input[type="range"])
.search-input:is(input[type="search"])
```

Note that these use two different syntaxes for the same thing —
`dialog.dialog` puts the element first, `.meter:is(meter)` puts the class
first. Picking one is part of the analysis, not a separate job.

### What it costs

Being opinionated is not free, and the analysis has to price it per component:

- **A consumer with a good reason to use another element is locked out.** There
  is no escape hatch in CSS short of a second class.
- **Specificity rises.** `dialog.dialog` is 0-1-1 rather than 0-1-0, so the
  consumer needs more to override us. §4.1 says a consumer must be able to
  override with one plain class of their own. An element-qualified key makes
  that harder, and that tension has to be resolved, not ignored.
- **It is a breaking change** for anyone already using the class on a `div`.

## 3. The procedure, when the order comes

Do these in order. Do not skip ahead, and do not start editing stylesheets.

1. Create `opinionated-reframing.md`.

2. In it, build a table with **one row per CSS file in `src/Styles/`** —
   all of them, including the ones that will obviously be "no". Columns:

   | File | Opinionated | Element |
   |---|---|---|

   Under each row, a `Comment:` line: what to watch out for in that file
   specifically — the native element in question, whether the current key
   already qualifies, what breaks for existing consumers, the specificity
   cost, and anything in `AGENTS.md` §8 that this file already carries.

3. **Stop.** Present the table. Wait for Oscar's order.

4. Then take **one file at a time**, on his order, in the order he gives.
   §2 of `AGENTS.md` applies unchanged throughout: propose, wait, change only
   what was agreed.

## 4. Related

- `AGENTS.md` §1 — Elements vs Compositions, which this sharpens
- `AGENTS.md` §4.1 — the key class, and the specificity budget this spends
- `AGENTS.md` §5 — the accessibility floor this is meant to serve
- `ACCESSIBILITY.md` — the full WCAG reference
