# PureUI

CSS only. Stylesheets a consumer links and uses through class names. No build
step, no preprocessor, no dependency, no JavaScript runtime. This is the
package being built; the other two in the monorepo are not started.

`AI/PureUI/` holds the rules for it. A rule lives in one place, and for
anything that is PureUI's own, that place is here.

## Documents

| Read this | For |
|---|---|
| [doc-page.md](doc-page.md) | How a doc page is built: parts, section order, header actions |
| [../css-file.md](../css-file.md) | How a CSS file is built: section order, variables |
| [../ui-classes.md](../ui-classes.md) | Class rules: the key, the element requirement, sizes, states |
| [../accessibility.md](../accessibility.md) | The WCAG 2.1 AA floor, in full |
| [../ui.md](../ui.md) | What the package is and what it ships |

Four of those still sit one level up in `AI/`. They are PureUI's rules and
belong beside `doc-page.md`; moving them is a decision the owner has not made
yet, so the links point up rather than the files having been moved.

## The three surfaces

A component is not finished when its CSS is. It has three parts, and they
answer to different documents:

| Surface | Where | Ruled by |
|---|---|---|
| The stylesheet | `packages/pureui/styles/<name>.css` | [../css-file.md](../css-file.md) |
| The class vocabulary | the same file | [../ui-classes.md](../ui-classes.md) |
| The doc page | `apps/dev-shell/pages/<Name>.html` | [doc-page.md](doc-page.md) |

The doc page is not documentation about the component written afterwards. It is
where the component is seen rendering, and a CSS change is not done until it has
been. The two are written together.

## Registry

`apps/dev-shell/pages/components.js` is the one list. A component that is not
in it has no page, no navigation entry and no "requires" list. It drives:

- the start page and the component dropdown
- the required-CSS chips in each page header
- the element pills, from the `elements` field

Only `Button` declares `elements` today. The rest need it filled in per
component, read off each stylesheet's `:where()` — not guessed by a script,
which gets it wrong wherever a component's entry lists a dependency's CSS first.
