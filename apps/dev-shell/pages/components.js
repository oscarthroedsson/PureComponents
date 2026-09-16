/* ============================================================
   COMPONENT REGISTRY  (dev tooling — not part of the library)

   One entry per component. This drives:
     - the start page navigation
     - the component <select> in every page header
     - the "required CSS" list shown on each page
     - the element pills in the page header

   `elements` lists the native elements the component's key is allowed
   to sit on, taken from the :where() in its stylesheet. Each becomes a
   pill linking to that element on MDN. An element and its type are
   written "input/checkbox", which is also how MDN's paths are shaped.
   A component whose key is a look rather than an element declares none.

   Adding a component? Add it here, then create pages/<file>.
   ============================================================ */

window.PC_COMPONENTS = [
  // ---------- Basics ----------
  { id: "Motion", title: "Motion", group: "Basics", file: "Motion.html", css: ["Animations/index.css", "button.css"] },
  { id: "Separator", title: "Separator", group: "Basics", file: "Separator.html", css: ["separator.css", "button.css", "badge.css", "Layout/box.css", "Layout/layout.css"], elements: ["hr"] },
  { id: "Box", title: "Box", group: "Basics", file: "Box.html", css: ["Layout/box.css"] },
  { id: "Overflow", title: "Overflow", group: "Basics", file: "Overflow.html", css: ["a-tag.css", "list.css", "card.css", "overflow.css"] },
  {
    id: "Layout",
    title: "Layout",
    group: "Basics",
    file: "Layout.html",
    css: ["button.css", "Form/input/input.css", "Menu/menu.css", "card.css", "avatar.css", "badge.css", "Layout/box.css", "Layout/layout.css"],
  },
  {
    id: "Behavior",
    title: "Behavior",
    group: "Basics",
    file: "Behavior.html",
    css: ["button.css", "Form/input/input.css", "list.css", "badge.css", "Layout/box.css", "Layout/layout.css", "Layout/behavior.css"],
  },

  // ---------- Core interactive ----------
  { id: "Button",     title: "Button",      group: "Core interactive", file: "Button.html",     css: ["button.css"], elements: ["button", "a", "label", "summary"] },
  { id: "Dialog",     title: "Dialog",      group: "Core interactive", file: "Dialog.html",     css: ["dialog.css", "button.css"] },
  { id: "Tooltip",    title: "Tooltip",     group: "Core interactive", file: "Tooltip.html",    css: ["tooltip.css", "button.css"] },
  { id: "Menu",       title: "Menu",        group: "Core interactive", file: "Menu.html",       css: ["Menu/menu.css"] },
  { id: "Navigation", title: "Navigation",  group: "Core interactive", file: "Navigation.html", css: ["nav.css"] },
  { id: "Tabs",       title: "Tabs",        group: "Core interactive", file: "Tabs.html",       css: ["tabs.css"], elements: ["fieldset", "div"] },
  { id: "SkipLinks",  title: "Skip Links",  group: "Core interactive", file: "SkipLinks.html",  css: ["skip-links.css"] },

  // ---------- Form ----------
  { id: "Form/Form",     title: "Form",     group: "Form", file: "Form/Form.html",     css: ["Form/form.css", "Form/fieldset.css", "Form/field.css", "Form/input/input.css", "button.css"] },
  { id: "Form/Field",    title: "Field",    group: "Form", file: "Form/Field.html",    css: ["Form/form.css", "Form/field.css", "Form/label.css", "Form/input/input.css"] },
  { id: "Form/Fieldset", title: "Fieldset", group: "Form", file: "Form/Fieldset.html", css: ["Form/form.css", "Form/fieldset.css", "Form/field.css", "Form/input/input.css"] },
  { id: "Form/Input",    title: "Input",    group: "Form", file: "Form/Input.html",    css: ["Form/form.css", "Form/field.css", "Form/input/input.css"] },
  { id: "Form/Label",    title: "Label",    group: "Form", file: "Form/Label.html",    css: ["Form/form.css", "Form/fieldset.css", "Form/field.css", "Form/label.css", "Form/input/input.css", "Form/checkbox.css"] },
  { id: "Form/Textarea", title: "Textarea", group: "Form", file: "Form/Textarea.html", css: ["Form/form.css", "Form/field.css", "Form/label.css", "Form/textarea.css", "Form/input/input.css"] },
  { id: "Form/Checkbox", title: "Checkbox", group: "Form", file: "Form/Checkbox.html", css: ["Form/form.css", "Form/fieldset.css", "Form/field.css", "Form/label.css", "Form/checkbox.css"] },
  { id: "Form/Radio", title: "Radio", group: "Form", file: "Form/Radio.html", css: ["Form/form.css", "Form/fieldset.css", "Form/field.css", "Form/label.css", "Form/radio.css", "Form/checkbox.css"] },
  { id: "Form/Range", title: "Range", group: "Form", file: "Form/Range.html", css: ["Form/form.css", "Form/field.css", "Form/label.css", "Form/range.css", "Form/input/input.css"] },
  { id: "Form/Select", title: "Select", group: "Form", file: "Form/Select.html", css: ["Form/form.css", "Form/field.css", "Form/label.css", "Form/select.css", "Form/input/input.css"] },
  { id: "Form/File", title: "File", group: "Form", file: "Form/File.html", css: ["Form/form.css", "Form/field.css", "Form/label.css", "Form/input/file.css", "Form/input/input.css", "button.css"] },

  // ---------- Feedback ----------
  { id: "Alert",    title: "Alert",    group: "Feedback", file: "Alert.html",    css: ["alert.css"] },
  { id: "Toast",    title: "Toast",    group: "Feedback", file: "Toast.html",    css: ["toast.css"] },
  { id: "Progress", title: "Progress", group: "Feedback", file: "Progress.html", css: ["progress.css"] },
  { id: "Meter",    title: "Meter",    group: "Feedback", file: "Meter.html",    css: ["meter.css"] },
  { id: "Loading",  title: "Loading",  group: "Feedback", file: "Loading.html",  css: ["loading.css"] },

  // ---------- Data display ----------
  { id: "Table",       title: "Table",       group: "Data display", file: "Table.html",       css: ["table.css"] },
  { id: "List",        title: "List",        group: "Data display", file: "List.html",        css: ["list.css"] },
  { id: "Card",        title: "Card",        group: "Data display", file: "Card.html",        css: ["card.css", "button.css"] },
  { id: "Pagination",  title: "Pagination",  group: "Data display", file: "Pagination.html",  css: ["button.css", "pagination.css"] },
  { id: "Breadcrumbs", title: "Breadcrumbs", group: "Data display", file: "Breadcrumbs.html", css: ["breadcrumbs.css"] },

  // ---------- Content ----------
  { id: "Collapsible", title: "Collapsible", group: "Content", file: "Collapsible.html", css: ["collapsible.css"] },
  // Accordion is a composition: it groups collapsibles and adds nothing they already do.
  { id: "Accordion",   title: "Accordion",   group: "Content", file: "Accordion.html",   css: ["collapsible.css", "accordion.css"] },
  { id: "Avatar",    title: "Avatar",    group: "Content", file: "Avatar.html",    css: ["Animations/index.css", "avatar.css"] },
  // Badge demos put a badge inside a .btn, so the page links button.css too.
  { id: "Badge",     title: "Badge",     group: "Content", file: "Badge.html",     css: ["badge.css", "button.css"] },
  { id: "Pill",      title: "Pill",      group: "Content", file: "Pill.html",      css: ["pill.css", "badge.css"] },
  { id: "Audio",     title: "Audio",     group: "Content", file: "Audio.html",     css: ["audio.css"] },
  { id: "ATag",      title: "Link (a)",  group: "Content", file: "ATag.html",      css: ["a-tag.css"] },
];

/* Pages that are not components but belong in the navigation.
   `docs: null` = no Documentation folder, so the page shows no docs links. */
window.PC_PAGES = [
  { id: "Tokens", title: "Design tokens", group: "Basics", file: "Tokens.html", css: [] },
  {
    id: "Experiments/ButtonSizing",
    title: "Button sizing",
    group: "Experiments",
    file: "Experiments/ButtonSizing.html",
    css: [],
    docs: null,
  },
  {
    id: "Experiments/ButtonNative",
    title: "Button: native surface",
    group: "Experiments",
    file: "Experiments/ButtonNative.html",
    css: [],
    docs: null,
  },
  {
    id: "Experiments/ButtonLoading",
    title: "Button: loading & skeleton",
    group: "Experiments",
    file: "Experiments/ButtonLoading.html",
    css: [],
    docs: null,
  },
  {
    id: "Experiments/MediaControlsProbe",
    title: "Media controls probe",
    group: "Experiments",
    file: "Experiments/MediaControlsProbe.html",
    css: [],
    docs: null,
  },
];
