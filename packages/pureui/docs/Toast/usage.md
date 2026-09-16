# Toast

A message that appears, says its piece and leaves. Something that stays on the
page until it is dealt with is an alert.

A toast is an `.pu-alert` inside a placement and motion wrapper, so everything
about the notice itself comes from the Alert docs.

## Two pieces

**The container** is markup you write once. It owns the placement.

```html
<div class="pu-toast-container" data-placement="top-right"></div>
```

**The behaviour layer** creates and removes toasts. PureUI does not ship it:
the package is the styling and the motion. The layer described below lives in
the dev shell, at `apps/dev-shell/js/toast/`, so the demo can create toasts,
and it moves to PureComponents when that package starts. Until then, build
the markup under "Toast is a wrapper around Alert" in `contribute.md` yourself.

```html
<script type="module" src="/js/toast/index.ts"></script>
```

```html
<button class="pu-btn btn-md" onclick="Toast.append({ title: 'Saved', intent: 'success' })">
  Save
</button>
```

## The container

| Attribute | Does |
|---|---|
| `data-placement="top-right"` | The default. |
| `data-placement="top-left"` | |
| `data-placement="top-center"` | |
| `data-placement="bottom-left"` | |
| `data-placement="bottom-center"` | |
| `data-placement="bottom-right"` | |
| `data-layout="stacked"` | Toasts pile up and fan out on hover. |

The container covers the whole viewport and ignores the pointer, so it takes
no space and blocks nothing. Only the toasts themselves take input.

More than one container is fine. Give each an `id` and pass it to `append`.

```html
<div class="pu-toast-container" data-placement="top-right"></div>
<div class="pu-toast-container" id="bottom-left" data-placement="bottom-left"></div>
```

## The API

Three functions, on `window.Toast` so plain HTML can reach them.

```js
Toast.append({ title: "Saved", intent: "success" });
Toast.append({ message: "Undo?" }, "#bottom-left");
Toast.remove(id);
Toast.removeAll();
```

Modules can import the same three:

```js
import { append, remove, removeAll, toastDefaults } from "/js/toast/index.ts";
```

### `append(attributes, target?)`

| Option | Type | Does |
|---|---|---|
| `title` | string | The bold first line. |
| `message` | string | The body. |
| `intent` | `info` \| `success` \| `warning` \| `error` | Colour and default role. |
| `size` | `sm` \| `md` \| `lg` | Passed to the alert. |
| `role` | `status` \| `alert` | `status` announces politely, `alert` interrupts. |
| `duration` | number | Milliseconds until it removes itself. `0` keeps it. |
| `dismissible` | boolean | Adds a close button. |
| `icon` | boolean | The intent icon. |
| `swipeable` | boolean | Can be dragged away. |

Anything left out is filled in from `Toast.defaults`.

Placement and layout are **not** options. They belong to the container the
toast is appended to.

It returns an instance:

```js
const t = Toast.append({ message: "Uploading…", duration: 0 });
t.pause();
t.resume();
t.remove();
```

## Swiping

A swipeable toast is dragged away in the direction its container sits: right
for a right-hand container, left for a left-hand one. A centred container takes
a vertical flick too — up from the top, down from the bottom — plus right.

## Variables

Set these on the container.

| Variable | Default | Controls |
|---|---|---|
| `--toast-offset` | `1rem` | Distance from the viewport edge. |
| `--toast-gap` | `0.5rem` | Space between toasts. |
| `--toast-max-width` | `28rem` | Toast width cap. |
| `--toast-enter-x` | `1.5rem` | Where a toast comes from, horizontally. |
| `--toast-enter-y` | `0` | Where it comes from, vertically. |
| `--toast-exit-x` | `1.5rem` | Where it goes. |
| `--toast-exit-y` | `0` | Where it goes. |

The enter and exit offsets are set per placement already — a left-hand
container flies in from the left without being told.

```html
<div class="pu-toast-container" data-placement="top-right"
     style="--toast-max-width: 22rem; --toast-offset: 2rem"></div>
```

## Accessibility

- `role="status"` announces politely and waits for a pause. `role="alert"`
  interrupts. The behaviour layer derives it from the intent when you do not
  pass one — `error` and `warning` interrupt, the rest are polite.
- Do not use `alert` for routine confirmations. An interruption for every
  saved form is exhausting.
- Give a toast that matters a long enough `duration`, or `0` so it stays. A
  message that vanishes in two seconds is unreadable for many people.
- A dismissible toast's close button carries an `aria-label`.
- `pause()` and `resume()` are there so a toast under the pointer or under
  focus does not disappear mid-read. The behaviour layer calls them for you.
- Swiping is a pointer gesture. Every swipeable toast must also be
  dismissible, or there is no keyboard route to closing it.
- Do not put the only copy of important information in a toast. It leaves.
- Motion is removed under `prefers-reduced-motion`.

## Examples

### Intents

```js
Toast.append({ title: "Saved", intent: "success" });
Toast.append({ title: "Check your details", intent: "warning" });
Toast.append({ title: "Upload failed", intent: "error" });
```

### One that stays until dismissed

```js
Toast.append({
  title: "Connection lost",
  message: "Retrying in the background.",
  intent: "error",
  duration: 0,
  dismissible: true,
});
```

### Into a specific container

```js
Toast.append({ message: "Copied" }, "#bottom-left");
```

### A stacked container

```html
<div class="pu-toast-container" data-placement="bottom-right" data-layout="stacked"></div>
```

Toasts pile up on top of each other and fan out into a list when the pointer
or focus reaches them.

### Changing the defaults

```js
Toast.defaults.duration = 6000;
Toast.defaults.dismissible = true;
```
