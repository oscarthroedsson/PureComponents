/* ============================================================
   COMPOSITION REGISTRY  (dev tooling — not part of the library)

   A composition is a whole interface part built out of PureUI —
   a sidebar, a shell, a settings pane. It is not a component: it
   ships no CSS of its own into the library, and it exists to
   answer one question. Does the vocabulary we have carry
   something this big without new classes being invented for it?

   These entries are pushed onto the dev shell's own registry at
   runtime rather than written into pages/components.js, so this
   whole section stands on its own and nothing outside this folder
   had to change to make it exist.

   Adding a composition? Add it here, then create the page beside
   this file.
   ============================================================ */

(function () {
  "use strict";

  window.PC_COMPOSITIONS = [
    {
      id: "Compositions/Email",
      title: "Email workspace",
      group: "Compositions",
      file: "Compositions/Email.html",
      css: [
        "button.css",
        "avatar.css",
        "tooltip.css",
        "dialog.css",
        "menu.css",
        "Form/input.css",
        "progress.css",
      ],
      docs: null,
      blurb: "A four-column visual inbox with connected accounts, folders, mail filtering and native dialogs.",
    },
    {
      id: "Compositions/Login",
      title: "Login",
      group: "Compositions",
      file: "Compositions/Login.html",
      css: [
        "card.css",
        "button.css",
        "a-tag.css",
        "Form/form.css",
        "Form/field.css",
        "Form/label.css",
        "Form/input.css",
        "Layout/box.css",
      ],
      docs: null,
      blurb: "A sign-in card rebuilt from a shadcn/ui screenshot with no CSS of its own.",
    },
    {
      id: "Compositions/Sidebar",
      title: "Sidebar",
      group: "Compositions",
      file: "Compositions/Sidebar.html",
      css: [
        "menu.css",
        "Layout/box.css",
        "button.css",
        "badge.css",
        "avatar.css",
        "meter.css",
        "Form/input.css",
      ],
      /* No Documentation folder: a composition documents itself on
         its own page. `docs: null` is what stops the shell linking
         a usage.md and a contribute.md that do not exist. */
      docs: null,
      blurb: "Scrollable sidebar compositions with lazy Example and Code viewers.",
    },
    {
      id: "Compositions/Testimonials",
      title: "Testimonials",
      group: "Compositions",
      file: "Compositions/Testimonials.html",
      css: ["card.css", "avatar.css", "Layout/box.css"],
      docs: null,
      blurb: "A marketing testimonial wall; the page adds the grid and nothing else.",
    },
    {
      id: "Compositions/Pricing",
      title: "Pricing",
      group: "Compositions",
      file: "Compositions/Pricing.html",
      css: ["table.css", "button.css", "tabs.css", "tooltip.css", "Layout/box.css"],
      docs: null,
      blurb: "A plan comparison built as a real table, with disabled actions.",
    },
  ];

  window.PC_PAGES = (window.PC_PAGES || []).concat(window.PC_COMPOSITIONS);
})();
