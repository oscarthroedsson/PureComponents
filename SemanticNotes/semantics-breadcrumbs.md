# Semantics — Breadcrumbs

Status: **parked**. Noted, not attacked. Do not act on this file unless asked.

## The problem

`breadcrumbs.css` sets `list-style: none` on the `<ol>`, which is what removes
the `1. 2. 3.` markers. That part is wanted — a breadcrumb trail is ordered, so
`<ol>` is the correct element, but the numbers are noise on screen.

WebKit couples two things that are not the same thing. When `list-style: none`
is applied, Safari/VoiceOver stops treating the element as a list at all: it
announces neither "list, 3 items" nor "item 2 of 3", and reads the crumbs as
three loose pieces of text. What is lost is not the numbers — it is that the
crumbs form a path with a beginning and an end. Chrome and Firefox keep the
semantics; this is WebKit only.

## The fix, and why it is not applied

Writing the role back in markup restores it, without bringing the markers back
and without changing anything for Chrome or Firefox:

```html
<ol class="breadcrumbs" role="list">
```

It is the role `<ol>` already carries. We only say it out loud so WebKit does
not optimise it away.

It is not a Breadcrumbs decision, which is why it is parked here. `list.css`,
`pagination.css`, `nav.css` and `Menu/` all set `list-style: none` and all lose
the same thing. Either `role="list"` is documented everywhere or nowhere —
otherwise whether a consumer's menu sounds like a list comes down to which
component they happened to pick. That sweep is Oscar's call.

## What was decided for now

- The library-wide sweep waits.
- Breadcrumbs documents `role="list"` in its own usage docs and demo page, so
  the markup we hand a consumer is correct even while the rest waits.

## Affected files, when the sweep happens

- `src/Styles/breadcrumbs.css`
- `src/Styles/list.css`
- `src/Styles/pagination.css`
- `src/Styles/nav.css`
- `src/Styles/Menu/menu.css`
