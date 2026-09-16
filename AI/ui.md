# PureUI

`packages/pureui/` — the only package under active development.

CSS only. A consumer links a stylesheet and uses class names. The package
ships no JavaScript and has no build step, no preprocessor and no
dependencies.

```html
<link rel="stylesheet" href="pureui/styles/main.css">
<link rel="stylesheet" href="pureui/styles/button.css">

<button class="pu-btn md">Save</button>
```

`main.css` carries the design tokens and a few global resets. It is the base
everything else builds on and must be linked first. Every other file is one
component.

## Two kinds of thing

**Elements** — CSS on a native HTML element. `.pu-btn` on `<button>`,
`.pu-badge` on `<span>`, `.pu-dialog` on `<dialog>`.

**Compositions** — patterns built by reusing element components. Pagination is
a set of `.pu-btn`s; Alert uses `.pu-btn` for its dismiss control.

Prefer a native element and its native behaviour over a div reconstruction. If
a state cannot be reached without JavaScript, it is reached through an
attribute the consumer sets.

## The library is opinionated

Where a native element exists for the job, the key class requires it. Put
`.pu-table` on a `<div>` and nothing happens — the page renders unstyled
instead of rendering wrong-but-pretty.

This is deliberate. The library cannot warn anyone at runtime, so refusing to
style the wrong element is the only enforcement it has. Full rules in
[ui-classes.md](ui-classes.md).

## Layout

```
packages/pureui/
  package.json      name: "pureui", files: ["index.css", "styles"]
  styles/
    main.css        tokens + global resets. Link first.
    button.css      one file per component
    Form/           form controls
    Menu/
    Animations/
  docs/             usage.md + contribute.md per component
```

The package ships toast's styling and motion, not its behaviour. The toast
behaviour layer lives in `apps/dev-shell/js/toast/` so the demo can create
toasts; it never ships, and it moves to PureComponents when that package
starts.

## Verifying

A CSS change is not done until it has been seen rendering.

```bash
pnpm dev
```

Check every size, every state, keyboard focus, and both stage themes. See
[pure.md](pure.md) for how the stage follows the library's scheme.
