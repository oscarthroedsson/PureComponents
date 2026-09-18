# Avatar — contributing

## File

`packages/ui/css/styles/avatar.css`

Two keys: `.pu-avatar` and `.pu-avatar-group`.

## `.pu-avatar`

### One block serves both markups

The key sits on a container holding an `<img>`, and it sits on the `<img>`
directly. `object-fit: cover` and `object-position: center` are declared in
the base for that reason — inert on a container, exactly what is needed on an
image.

### `border-radius: inherit` on the content

```css
& :where(img, svg, video) { border-radius: inherit; }
```

This is what keeps the picture inside the shape. Without it a smooth avatar has
square picture corners inside a rounded box.

`overflow` is deliberately not used. Clipping the container would take the
group's ring with it.

### `& > picture { display: contents }`

Lets the `<img>` inside be the grid item, so it centres like any other child.

### Initials scale with the box

```css
font-size: calc(var(--avatar-size) * var(--avatar-font-scale));
```

A fraction of the box rather than a table of named font sizes. That is what
lets a consumer write `style="--avatar-size: 8rem"` and get text that still
fits.

### XS is the dense step

`avatar-xs` and `avatar-group-xs` are both `1.5rem`. The group hands that
measurement to every child through the same variables as the other sizes, so
the overlap and initials continue to scale from one source. Its group gap is
also reduced to `--spacing-25`, keeping list spacing and the expanded stack
proportional to the smaller avatar.

### Shape vocabulary

This file uses `avatar-smooth` for the middle shape. Twenty-three other
stylesheets use `smooth` for the same position in the vocabulary.

## `.pu-avatar-group`

### Size and shape are handed down

```css
& .pu-avatar {
  --avatar-size: var(--avatar-group-size);
  --avatar-radius: var(--avatar-group-radius);
}
```

Written as a rule rather than left to inheritance, because a custom property
declared on an element cannot be reached by inheriting from the parent — the
avatar's own `--avatar-size` would win.

### One variable decides every distance

```css
--avatar-group-space: var(--avatar-group-gap);
```

The gap in a list and a negative overlap in a stack. This is resting layout;
motion never rewrites it.

Which side it lands on is four more variables:

```css
--avatar-group-space-inline-start: var(--avatar-group-space);
--avatar-group-space-inline-end: 0px;
--avatar-group-space-block-start: 0px;
--avatar-group-space-block-end: 0px;
```

Reverse directions have to use the **end** margin. In `row-reverse` a negative
start margin lands past the neighbour it was meant to slide under, and the
first two avatars never overlap.

### Expand maps onto the motion contract

```css
--motion-duration: var(--avatar-group-duration);
--motion-easing: var(--avatar-group-easing);
--motion-expand-step:
  calc(var(--avatar-group-overlap) + var(--avatar-group-gap));
```

The generic `pu-motion` key owns triggers, the transition, and the choice
between overlay and reflow. Avatar only supplies the distance that changes a
compact stack into an open one. `Motion/index.css` implements the six
`expand-*` effects.

Overlay changes `translate` on direct children and keeps surrounding geometry
fixed. Reflow animates an additional row or column gap on the group, whose
resting negative margins still create the stack. The extra gap is zero at
motion progress `0`, so no expanded space is reserved.

### `--avatar-group-duration` is a bare duration

Not `--transition-medium`. That token combines duration and easing, while the
motion engine accepts them as separate variables. `toast.css` writes its
durations out for the same reason.

### Rules target `& > *`, not `.pu-avatar`

So an avatar wrapped in an `<li>`, in a link, or in an indicator is carried by
the same rules. Flex items answer to `z-index` without being positioned, which
is what makes the stacking work without `position: relative` anywhere.

Non-avatar wrappers are flex boxes with `line-height: 0`. Without that reset,
an `<li>` creates an inline line box whose descender makes the wrapper taller
than the avatar itself. Layout would then centre the wrapper correctly while
the visible avatar sat slightly above adjacent text and controls. A direct
`.pu-avatar` keeps its own `inline-grid` display.

### The stack descends from the first

Flex items paint in DOM order, so with no `z-index` the **last** avatar would
cover every one before it. The stacking level is derived instead:

```css
z-index: calc(sibling-count() - sibling-index() + 1);
```

The first child therefore receives the highest value and the last receives
`1`, regardless of how many children the group contains.

It is also what makes the pointer land where the eye says it should: a round
avatar still has square corners, and in the overlap the corner of the avatar
behind sits over the circle of the one in front. Whoever paints on top takes
the pointer too.

`sibling-index()` and `sibling-count()` are Baseline 2026. They remove the old
eight-child ceiling and the specificity added by eight `:nth-child()` rules.

`data-stack-order="last"` uses `sibling-index()` directly, so its levels rise
in DOM order instead.

### Lift always clears the stack

```css
&[data-hover="lift"] > *:is(:hover, :focus-visible, :has(:focus-visible)) {
  z-index: max(var(--avatar-group-lift-z), calc(sibling-count() + 1));
  scale: …;
  --avatar-group-ring-color: …;
  filter: drop-shadow(…);
}
```

The sibling count guarantees a value above every generated stacking level.
`--avatar-group-lift-z` remains a configurable minimum rather than imposing a
maximum supported group length. `:is()` makes the state rule outrank both
stack-order rules without repeating either layout attribute.

The avatar keeps its place in the row. It is not nudged out of line — it comes
forward, grows, and changes its ring, and the row it belongs to stays a row.

The ring colour is handed down as a custom property rather than restyled, so
it reaches the `.pu-avatar` whether the avatar is the child itself or sits
somewhere inside it.

### The stack is isolated

`isolation: isolate` creates a stacking context on the group. Its generated
z-index values therefore order avatars inside the group without competing with
surrounding page content.

`drop-shadow` and not `box-shadow`, which the ring is already using — and it
follows the silhouette, so a rounded avatar casts a round shadow.

### The ring is a `box-shadow`

Not a border, which would change the size of the square, and not an outline,
which is spoken for by the focus indicator.

## Reduced motion

The travel goes, the behaviour stays. Motion sets its duration, delay, and
stagger to `0ms`; Avatar separately zeroes the component-owned lift transition.
An expanded stack reaches its end state instantly and a lifted avatar remains
ringed.
