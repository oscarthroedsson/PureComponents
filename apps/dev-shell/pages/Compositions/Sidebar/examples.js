/* Sidebar example registry. Keep this file metadata-only: the viewer loads
   each source when its section approaches the viewport. */

window.PC_SIDEBAR_EXAMPLES = [
  {
    id: "expandable-icon-rail",
    title: "Expandable icon rail",
    description: "An icon-only sidebar with tooltips and mutually exclusive detail panels, powered entirely by native HTML.",
    html: "./Sidebar/examples/icon-rail.html",
    styles: [
      "/pureui/styles/main.css",
      "/pureui/styles/button.css",
      "/pureui/styles/tooltip.css",
      "/pureui/styles/menu.css",
      "/pureui/styles/navigation.css",
      "/pureui/styles/Layout/box.css",
      "/pureui/styles/Layout/layout.css",
      "/pureui/styles/card.css",
      "/pureui/styles/collapsible.css",
      "/pureui/styles/badge.css",
      "./Sidebar/examples/icon-rail.css",
    ],
    height: 760,
  },
  {
    id: "workspace-sidebar",
    title: "Workspace sidebar",
    description: "A complete workspace navigation with actions, nested sections, counts, storage and an account row.",
    module: "./Sidebar/examples/workspace.js",
    height: 690,
  },
  {
    id: "compact-sidebar",
    title: "Compact sidebar",
    description: "A smaller project navigation that keeps the same menu vocabulary at a denser scale.",
    module: "./Sidebar/examples/compact.js",
    height: 500,
  },
];
