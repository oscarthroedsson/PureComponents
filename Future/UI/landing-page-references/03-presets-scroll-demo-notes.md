# Pure/UI landing page — presets scroll demo

Reference image: `03-presets-scroll-demo-reference.png`

## Purpose

Show that Pure/UI ships with thoughtful presets while remaining highly customizable. The visitor should understand the system by watching a real component change as its markup is typed.

The section itself stays visually quiet. It contains only:

- the rendered component;
- the matching code editor;
- a soft blurred elevation shadow behind the component.

Do not add category navigation, scroll counters, arrows, timelines, explanatory labels, motion diagrams, or separate marketing copy around the demo.

## Layout

- Use the same max-width, zinc background, dot texture, system typography, spacing rhythm, and radii as the landing-page header.
- Desktop split: rendered component `2fr`, code editor `1fr`.
- Center the component in the left stage with generous whitespace.
- Keep the code editor dark (`zinc-950`) with a restrained border and shadow.
- Marketing text belongs inside the active component. It is not a separate text column.
- The component shadow is a low-opacity neutral blur with a faint primary-purple tint. It should read as elevation, never as neon or a glow effect.

## Scroll model

- Give the full story enough scroll distance for each state to be understood; approximately one viewport per meaningful state is a useful starting point.
- Keep the two-column demo sticky while the visitor moves through the story.
- Synchronize each code edit with the visible component change.
- The code caret may remain visible. Do not expose controls or animation explanations.
- Preserve the stage dimensions so component resizing does not move the surrounding page.

## Preset sequence within a component

1. **Key** — type the component key, for example `.pu-alert`. The component resolves from a neutral placeholder into the correct Pure/UI component.
2. **Shape** — show the smooth default, replace it with the component's `*-sharp` preset, then `*-rounded`. Animate border radius and related spacing smoothly.
3. **Size** — replace `*-sm` with `*-md`, then `*-lg`. The docs call medium the default preset; use the explicit `*-md` class in the demo so the change remains clear in code.
4. **Variant or intent** — change a meaningful component preset or attribute, such as `data-intent="info"` to `success`, `warning`, or `error` for an Alert.
5. **Next component** — transition the current component out, replace the markup, and introduce the next representative component.

The class name and rendered result must change together. Avoid decorative movement that is not caused by the code being shown.

## Component and category rotation

Cover every real Pure/UI category over the full scroll sequence without rendering a category navigation bar:

1. Core interactive — Button or Tabs
2. Form — Field
3. Feedback — Alert
4. Data display — Card
5. Content — Accordion
6. Basics — Box or design tokens

Choose a representative component whose own markup can carry the current section message. Keep the message concise and place it inside the component's real content parts.

Examples:

- Alert: “Beautiful defaults. The base styling is already in place. Add your signature.”
- Card: a title, body, and action demonstrating size, shape, and elevation presets.
- Accordion: each summary can introduce one opinionated behavior or preset.
- Field: label, input, hint, and validation demonstrate the required semantic structure.

## Motion behavior

- Component changes may combine a small position shift, scale change, border-radius morph, and content crossfade.
- Keep movement calm and spring-like. The component should feel responsive, not elastic or theatrical.
- Type or replace only the code tokens that cause the current visual change.
- Use opacity only for content replacement; preserve readable text during stable states.
- The blurred shadow follows size and position with slightly slower easing to reinforce the floating effect.

## Code presentation

- Show real Pure/UI markup and class names from the package documentation.
- Keep the editor to one-third of the desktop width.
- Use SF Mono or the existing project mono stack.
- Syntax colors come from the Pure/UI palette: primary purple for tags, secondary cyan for classes, accent yellow for attributes, zinc for text.
- No annotations, badges, legends, code-review notes, tabs, progress labels, or fake editor functionality.
- A minimal filename and three small window dots are acceptable.

## Responsive behavior

- Desktop: `2fr 1fr` split.
- Tablet: keep both panes visible if the code remains readable; a `3fr 2fr` split is acceptable.
- Mobile: stack the component above the code. Shorten the scroll story and use discrete state changes instead of keeping a long two-pane sticky scene.

## Accessibility and motion preferences

- Respect `prefers-reduced-motion: reduce`: remove scroll-linked interpolation and use immediate state changes or short crossfades.
- Do not make understanding depend on motion alone; the stable component and visible code must communicate each state.
- Keep the demonstrated markup semantically correct and keyboard accessible.
- Maintain contrast in both the rendered component and code editor.

## Visual constraints

- Match the header typography exactly; do not introduce a display or condensed font.
- No mascot in this section.
- No paint strokes, arrows, category rail, scroll progress, floating pills, ghost components, glow borders, or explanatory chrome.
- The final feeling should be calm, precise, customizable, and effortless.
