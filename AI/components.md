# PureComponents

`packages/components/vanilla/` — not started.

A component layer consuming PureUI. Vanilla TS first, then React, possibly
Vue. The package exists so the monorepo has a place to put it, and is
`private: true` until there is something worth publishing.

**Do not build toward it while PureUI is the active work.** The repository was
named PureComponents before the split; that name is not the current scope.

## What belongs here

Behaviour. PureUI styles things; this package makes them do something. A
component here wraps PureUI's classes and adds the state, events and lifecycle
that CSS cannot express.

Two things point at this package already:

- `apps/dev-shell/js/toast/` — a toast behaviour layer written in TS, used by
  the dev-shell demo. It is behaviour, not styling, and belongs here once this
  package starts.
- `packages/components/vanilla/types/` — typing helpers for native element
  properties.

## Boundary

PureUI stays CSS-only. Anything needing a runtime, a build step or a
dependency belongs on this side of the line, not in the stylesheets.
