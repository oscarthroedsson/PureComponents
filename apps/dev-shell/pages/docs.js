/* ============================================================
   PURECOMPONENTS — DEV SHELL RUNTIME

   Dev tooling only. The library itself stays CSS-only; nothing in
   this file ships with it. It exists so a component page can be
   written as nothing but its demos:

     <section class="pc-demo" data-title="Sizes">
       <template>
         <button class="pu-btn btn-sm">Small</button>
       </template>
     </section>

   ...and this script turns that into an editable code pane plus a
   live preview, a table of contents, and the shared page chrome.
   ============================================================ */

(function () {
  "use strict";

  var STORE = "pc-docs-prefs";

  /* ---------------------------------------------------------
     Preferences (theme, stage background, stage width, outline)
     --------------------------------------------------------- */

  var PREFS = {
    mode: "auto", // auto | light | dark   — chrome, stage and library together
    width: "full", // full | 768 | 375      — the preview width
    outline: "off", // off | on             — outline every element
  };

  function loadPrefs() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORE) || "{}");
      for (var k in PREFS) if (saved[k]) PREFS[k] = saved[k];
    } catch (e) {
      /* corrupt or unavailable storage — defaults are fine */
    }
    applyPrefs();
  }

  function savePrefs() {
    try {
      localStorage.setItem(STORE, JSON.stringify(PREFS));
    } catch (e) {
      /* private mode — prefs just won't persist */
    }
  }

  /* One mode, not two. The chrome, the stage and the library all follow it, so
     what the stage shows is what a real page would look like. "auto" resolves
     against the OS here rather than being handed to the library, because the
     library pins color-scheme and only reads data-scheme. */
  function resolvedMode() {
    if (PREFS.mode !== "auto") return PREFS.mode;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyPrefs() {
    var root = document.documentElement;
    var mode = resolvedMode();
    if (PREFS.mode === "auto") root.removeAttribute("data-pc-theme");
    else root.setAttribute("data-pc-theme", PREFS.mode);
    root.setAttribute("data-pc-stage", mode);
    root.setAttribute("data-scheme", mode);
    root.setAttribute("data-pc-outline", PREFS.outline);
    root.style.setProperty("--pc-stage-width", PREFS.width === "full" ? "none" : PREFS.width + "px");
  }

  /* ---------------------------------------------------------
     Small helpers
     --------------------------------------------------------- */

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs)
      for (var k in attrs) {
        if (attrs[k] === null || attrs[k] === false) continue;
        if (k === "text") node.textContent = attrs[k];
        else node.setAttribute(k, attrs[k]);
      }
    (children || []).forEach(function (c) {
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function slug(s) {
    return String(s)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  /* Strip the indentation the markup carries from its position in the
     HTML file, so the editor starts at column zero. */
  function dedent(src) {
    var lines = src.replace(/\t/g, "  ").split("\n");
    while (lines.length && !lines[0].trim()) lines.shift();
    while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
    var indent = lines.reduce(function (min, line) {
      if (!line.trim()) return min;
      var m = line.match(/^ */)[0].length;
      return m < min ? m : min;
    }, Infinity);
    if (!isFinite(indent)) indent = 0;
    return lines
      .map(function (l) {
        return l.slice(indent);
      })
      .join("\n");
  }

  function allEntries() {
    return (window.PC_COMPONENTS || []).concat(window.PC_PAGES || []);
  }

  /* ---------------------------------------------------------
     The example sections a component page may have, in the only
     order they may appear in. See AI/PureUI/doc-page.md.

     Everything a component does that none of these names covers goes
     under "Other", where the page is free to use its own headings.
     This check only warns: it is a hint while authoring, never
     something that stops a page from rendering.
     --------------------------------------------------------- */

  var SECTION_ORDER = [
    "API",
    "Default",
    "Sizes",
    "Forms",
    "Variants",
    "Emphasis",
    "States",
    "Behavior",
    "Custom/Override",
    "Other",
    "Compositions",
  ];

  function checkSectionOrder(sections) {
    var seen = [];
    var afterOther = false;
    var afterCompositions = false;
    sections.forEach(function (s) {
      var title = s.dataset.title || "";
      if (afterCompositions) return; // Composition names are free below the divider
      if (afterOther && title !== "Compositions") return; // Other owns its free-form region
      var at = SECTION_ORDER.indexOf(title);
      if (at === -1) {
        console.warn(
          "[dev-shell] section " +
            JSON.stringify(title) +
            " is not one of: " +
            SECTION_ORDER.join(", ") +
            ". Put it under Other.",
        );
        return;
      }
      if (title === "Other") afterOther = true;
      if (title === "Compositions") afterCompositions = true;
      if (seen.length && at < seen[seen.length - 1]) {
        console.warn(
          "[dev-shell] section " + JSON.stringify(title) + " comes before a section that should precede it.",
        );
      }
      seen.push(at);
    });
  }

  /* ---------------------------------------------------------
     One element pill: <button>, <input type="checkbox">, …
     linking to that element's page on MDN.

     A spec is either an element name ("button") or an element and its
     type ("input/checkbox"), which is also how MDN paths are shaped.
     --------------------------------------------------------- */

  var MDN = "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/";

  function elementPill(spec) {
    var parts = String(spec).split("/");
    var label = parts.length > 1 ? "<" + parts[0] + ' type="' + parts[1] + '">' : "<" + parts[0] + ">";
    return el("a", {
      class: "pc-cat pc-cat-info pc-element",
      href: MDN + spec,
      target: "_blank",
      rel: "noreferrer",
      title: label + " on MDN",
      text: label,
    });
  }

  /* ---------------------------------------------------------
     Top bar
     --------------------------------------------------------- */

  function segmented(label, key, options) {
    var seg = el("div", { class: "pc-seg", role: "group", "aria-label": label });
    seg.appendChild(el("span", { class: "pc-seg-label", text: label }));
    options.forEach(function (opt) {
      var btn = el("button", {
        type: "button",
        text: opt.label,
        "aria-pressed": PREFS[key] === opt.value ? "true" : "false",
      });
      btn.addEventListener("click", function () {
        PREFS[key] = opt.value;
        applyPrefs();
        savePrefs();
        Array.prototype.forEach.call(seg.querySelectorAll("button"), function (b) {
          b.setAttribute("aria-pressed", b === btn ? "true" : "false");
        });
      });
      seg.appendChild(btn);
    });
    return seg;
  }

  function buildTopbar(current, up, homeHref) {
    var bar = el("header", { class: "pc-topbar" });
    var inner = el("div", { class: "pc-topbar-inner" });
    var root = homeHref.replace(/index\.html$/, "");
    var currentPage = document.body.dataset.page || "";
    if (current) currentPage = current.id.indexOf("Compositions/") === 0 ? "compositions" : "elements";

    inner.appendChild(el("a", { class: "pc-home", href: homeHref, text: "Pure" }));

    var sectionNav = el("nav", { class: "pc-section-nav", "aria-label": "Library sections" });
    [
      { id: "elements", label: "Elements", href: root + "pages/Elements/index.html" },
      { id: "compositions", label: "Compositions", href: root + "pages/Compositions/index.html" },
      { id: "demos", label: "Demos", href: root + "pages/Demos/index.html" },
    ].forEach(function (item) {
      var attrs = { href: item.href, text: item.label };
      if (currentPage === item.id) attrs["aria-current"] = "page";
      sectionNav.appendChild(el("a", attrs));
    });
    inner.appendChild(sectionNav);

    if (current) {
      var select = el("select", { class: "pc-select", "aria-label": "Go to library page" });
      var groups = {};
      allEntries().forEach(function (c) {
        (groups[c.group] = groups[c.group] || []).push(c);
      });
      Object.keys(groups).forEach(function (name) {
        var og = el("optgroup", { label: name });
        groups[name].forEach(function (c) {
          var opt = el("option", { value: up + c.file, text: c.title });
          if (c.id === current.id) opt.selected = true;
          og.appendChild(opt);
        });
        select.appendChild(og);
      });
      select.addEventListener("change", function () {
        window.location.href = select.value;
      });
      inner.appendChild(select);
    }

    var controls = el("div", { class: "pc-controls" });
    controls.appendChild(
      segmented("Mode", "mode", [
        { value: "auto", label: "Auto" },
        { value: "light", label: "Light" },
        { value: "dark", label: "Dark" },
      ]),
    );
    controls.appendChild(
      segmented("Width", "width", [
        { value: "full", label: "Full" },
        { value: "768", label: "768" },
        { value: "375", label: "375" },
      ]),
    );
    controls.appendChild(
      segmented("Outline", "outline", [
        { value: "off", label: "Off" },
        { value: "on", label: "On" },
      ]),
    );
    inner.appendChild(controls);

    bar.appendChild(inner);
    return bar;
  }

  /* ---------------------------------------------------------
     One demo: editable source on the left, live result on the right
     --------------------------------------------------------- */

  function buildDemo(section, index, isComposition) {
    var template = section.querySelector("template");
    if (!template) return null;

    var title = section.dataset.title || "Example " + (index + 1);
    var id = section.id || slug(title);
    section.id = id;

    var source = dedent(template.innerHTML);
    var noteEl = section.querySelector("p.pc-note");
    var note = noteEl ? noteEl.innerHTML : section.dataset.note || "";

    /* Actions belong to the shell, not to the example, so they are authored
       outside the <template> and lifted into the Result head below. Keeping
       them out of the template is what stops them leaking into the code pane:
       the markup a reader copies stays the markup a consumer would write. */
    var actionsEl = section.querySelector(".pc-demo-actions");

    section.textContent = "";
    section.classList.add("pc-demo");
    if (isComposition) section.classList.add("pc-composition-demo");

    section.appendChild(el("h2", {}, [el("a", { class: "pc-anchor", href: "#" + id, text: title })]));
    if (note) {
      var p = el("p", { class: "pc-note" });
      p.innerHTML = note; // authored in the page itself, may contain <code>
      section.appendChild(p);
    }

    var split = el("div", { class: "pc-split" });
    if (isComposition) split.classList.add("pc-composition-switcher");

    /* --- code pane --- */
    var codePane = el("div", { class: "pc-pane pc-pane-code" });
    var codeHead = el("div", { class: "pc-pane-head" }, ["HTML"]);
    var dirty = el("span", { class: "pc-dirty", hidden: "", text: "edited" });
    codeHead.appendChild(dirty);

    var actions = el("div", { class: "pc-pane-actions" });
    var resetBtn = el("button", { type: "button", text: "Reset", hidden: "" });
    var copyBtn = el("button", { type: "button", text: "Copy" });
    actions.appendChild(resetBtn);
    actions.appendChild(copyBtn);
    codeHead.appendChild(actions);

    var editor = el("textarea", {
      class: "pc-editor",
      spellcheck: "false",
      "aria-label": title + " — HTML source, editable",
    });
    editor.value = source;

    codePane.appendChild(codeHead);
    codePane.appendChild(editor);

    /* --- preview pane --- */
    var previewPane = el("div", { class: "pc-pane pc-pane-preview" });
    var previewHead = el("div", { class: "pc-pane-head" }, ["Result"]);
    previewPane.appendChild(previewHead);
    var stage = el("div", { class: "pc-stage" });
    var stageInner = el("div", { class: "pc-stage-inner" });
    /* Per-demo layout hint, e.g. a column stack or the min-height a
       popover needs in order not to be clipped. */
    if (section.dataset.stageStyle) stageInner.setAttribute("style", section.dataset.stageStyle);
    stage.appendChild(stageInner);
    previewPane.appendChild(stage);

    /* Each action names a handler in the page's own PC_ACTIONS map and is
       called with the live preview root. The stage is re-rendered on every
       keystroke in the code pane, so the handler is given the element and
       never holds on to what is inside it. */
    if (actionsEl) {
      actionsEl.hidden = false;
      actionsEl.classList.add("pc-pane-actions");
      Array.prototype.forEach.call(actionsEl.querySelectorAll("[data-pc-action]"), function (btn) {
        var name = btn.getAttribute("data-pc-action");
        btn.addEventListener("click", function () {
          var fn = (window.PC_ACTIONS || {})[name];
          if (typeof fn !== "function") {
            console.warn("[dev-shell] no PC_ACTIONS handler named " + JSON.stringify(name));
            return;
          }
          fn(stageInner, btn);
        });
      });
      previewHead.appendChild(actionsEl);
    }

    if (isComposition) {
      var uiPaneId = "pc-" + id + "-ui";
      var htmlPaneId = "pc-" + id + "-html";
      var uiTab = el("button", {
        type: "button",
        role: "tab",
        id: uiPaneId + "-tab",
        "aria-controls": uiPaneId,
        "aria-selected": "true",
        text: "UI",
      });
      var htmlTab = el("button", {
        type: "button",
        role: "tab",
        id: htmlPaneId + "-tab",
        "aria-controls": htmlPaneId,
        "aria-selected": "false",
        text: "HTML",
      });
      var tabs = el("div", { class: "pc-composition-tabs", role: "tablist", "aria-label": title + " views" }, [
        uiTab,
        htmlTab,
      ]);

      previewPane.id = uiPaneId;
      previewPane.setAttribute("role", "tabpanel");
      previewPane.setAttribute("aria-labelledby", uiTab.id);
      codePane.id = htmlPaneId;
      codePane.setAttribute("role", "tabpanel");
      codePane.setAttribute("aria-labelledby", htmlTab.id);
      codePane.hidden = true;

      function showCompositionPane(view) {
        var showUI = view === "ui";
        previewPane.hidden = !showUI;
        codePane.hidden = showUI;
        uiTab.setAttribute("aria-selected", showUI ? "true" : "false");
        htmlTab.setAttribute("aria-selected", showUI ? "false" : "true");
        if (!showUI) requestAnimationFrame(autosize);
      }

      uiTab.addEventListener("click", function () {
        showCompositionPane("ui");
      });
      htmlTab.addEventListener("click", function () {
        showCompositionPane("html");
      });

      split.appendChild(tabs);
      split.appendChild(previewPane);
      split.appendChild(codePane);
    } else {
      split.appendChild(codePane);
      split.appendChild(previewPane);
    }
    section.appendChild(split);

    /* Grow to fit the source rather than setting a height outright: the panes
       sit in a grid row, so leaving `height` alone lets the code pane stretch
       to match a tall preview, while min-height keeps the source fully visible
       when the two are stacked. */
    function autosize() {
      if (!editor.clientWidth) return; // not laid out yet — nothing to measure
      editor.style.minHeight = "0px";
      editor.style.minHeight = Math.min(editor.scrollHeight + 2, 420) + "px";
    }
    /* Line wrapping — and so the needed height — changes with the pane width,
       so the shell re-runs this on resize. */
    editor.pcAutosize = autosize;

    function render() {
      stageInner.innerHTML = editor.value;
      /* If markup was typed but nothing survived parsing, say so rather
         than leaving an empty box that looks like a broken component. */
      var broken = editor.value.trim() !== "" && stageInner.childNodes.length === 0;
      editor.setAttribute("aria-invalid", broken ? "true" : "false");
      var changed = editor.value !== source;
      dirty.hidden = !changed;
      resetBtn.hidden = !changed;
    }

    editor.addEventListener("input", function () {
      autosize();
      render();
    });

    resetBtn.addEventListener("click", function () {
      editor.value = source;
      autosize();
      render();
      editor.focus();
    });

    copyBtn.addEventListener("click", function () {
      navigator.clipboard.writeText(editor.value).then(
        function () {
          copyBtn.textContent = "Copied";
          setTimeout(function () {
            copyBtn.textContent = "Copy";
          }, 1200);
        },
        function () {
          copyBtn.textContent = "Failed";
          setTimeout(function () {
            copyBtn.textContent = "Copy";
          }, 1200);
        },
      );
    });

    render();
    /* autosize() needs a laid-out element, so the caller runs it once the
       whole page is in the document. */

    return { id: id, title: title, section: section };
  }

  /* ---------------------------------------------------------
     One reference section: prose and tables, no live example
     --------------------------------------------------------- */

  function buildDoc(section, index) {
    var title = section.dataset.title || "Reference";
    var id = section.id || slug(title);
    section.id = id;

    /* Authored in the page, so it may hold any markup — tables, code. */
    var body = section.innerHTML;

    section.textContent = "";
    section.appendChild(el("h2", {}, [el("a", { class: "pc-anchor", href: "#" + id, text: title })]));

    var wrap = el("div", { class: "pc-doc-body" });
    wrap.innerHTML = body;
    section.appendChild(wrap);

    return { id: id, title: title, section: section };
  }

  /* ---------------------------------------------------------
     Table of contents + hash tracking
     --------------------------------------------------------- */

  function buildToc(demos) {
    var toc = el("nav", { class: "pc-toc", "aria-label": "Sections on this page" });
    toc.appendChild(el("h2", { text: "Sections" }));
    var list = el("ol");
    demos.forEach(function (d) {
      var a = el("a", { href: "#" + d.id, text: d.title });
      d.link = a;
      list.appendChild(el("li", {}, [a]));
    });
    toc.appendChild(list);
    return toc;
  }

  /* Keeps location.hash pointing at whatever section is on screen, so a
     reload drops you back where you were instead of at the top. */
  function trackSections(demos) {
    if (!demos.length) return;

    var current = null;
    var pending = null;

    /* The section whose top has most recently passed the reading line just
       under the sticky top bar; the first section while still above it. */
    function activeSection() {
      var line = 120;
      var best = demos[0];
      for (var i = 0; i < demos.length; i++) {
        if (demos[i].section.getBoundingClientRect().top <= line) best = demos[i];
      }
      /* At the very bottom the last section may never cross the line. */
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) best = demos[demos.length - 1];
      return best;
    }

    function update() {
      pending = null;
      var active = activeSection();
      if (!active || active.id === current) return;
      current = active.id;
      demos.forEach(function (d) {
        if (d.link) d.link.setAttribute("aria-current", d.id === current ? "true" : "false");
      });
      history.replaceState(null, "", "#" + current);
    }

    function schedule() {
      if (pending) return;
      pending = setTimeout(update, 120);
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
  }

  /* The page is assembled after load, so the browser's own jump-to-hash
     has already run against an empty document. Redo it. */
  function restoreHash() {
    var hash = window.location.hash.slice(1);
    if (!hash) return;
    var target = document.getElementById(decodeURIComponent(hash));
    if (!target) return;

    function jump() {
      target.scrollIntoView();
    }
    requestAnimationFrame(jump);
    /* Fonts and images finish later and shift everything below them, so
       land on the section a second time once the page has fully loaded. */
    if (document.readyState !== "complete") window.addEventListener("load", jump, { once: true });
  }

  /* ---------------------------------------------------------
     Page types
     --------------------------------------------------------- */

  function initComponentPage() {
    var id = document.body.dataset.component;
    var entry = allEntries().find(function (c) {
      return c.id === id;
    });
    if (!entry) {
      console.warn('[pc-docs] "' + id + '" is not in pages/components.js — add it there.');
      entry = { id: id, title: id, file: id + ".html", css: [], group: "" };
    }

    var up = "../".repeat(entry.file.split("/").length - 1);
    var sections = Array.prototype.slice.call(document.querySelectorAll("section.pc-demo, section.pc-doc"));
    checkSectionOrder(sections);

    var inCompositions = false;
    var demos = sections
      .map(function (section, i) {
        if (section.classList.contains("pc-doc")) {
          var doc = buildDoc(section, i);
          if (section.dataset.title === "Compositions") {
            inCompositions = true;
            section.classList.add("pc-compositions-divider");
          }
          return doc;
        }
        return buildDemo(section, i, inCompositions);
      })
      .filter(function (d) {
        return d;
      });

    /* --- page header --- */
    var head = el("header", { class: "pc-page-head" });
    head.appendChild(el("h1", { text: entry.title }));
    var lede = document.querySelector("meta[name='pc-description']");
    if (lede) head.appendChild(el("p", { class: "pc-lede", text: lede.content }));

    /* The native elements the key is allowed to sit on. A component whose
       key is elementless (a look, not an element) declares none, and the
       row is left out rather than shown empty. */
    if (entry.elements && entry.elements.length) {
      var els = el("div", { class: "pc-elements" });
      els.appendChild(el("span", { class: "pc-meta-label", text: "Elements" }));
      entry.elements.forEach(function (spec) {
        els.appendChild(elementPill(spec));
      });
      head.appendChild(els);
    }

    if (entry.css && entry.css.length) {
      var meta = el("div", { class: "pc-meta" });
      meta.appendChild(el("span", { class: "pc-meta-label", text: "Requires" }));
      meta.appendChild(el("span", { class: "pc-chip", text: "main.css" }));
      entry.css.forEach(function (c) {
        meta.appendChild(el("span", { class: "pc-chip", text: c }));
      });
      head.appendChild(meta);
    }

    /* docs: null means the entry has no Documentation folder (experiments). */
    if (entry.docs !== null) {
      var docsPath = up + "../src/Documentation/" + (entry.docs || entry.id) + "/";
      head.appendChild(
        el("nav", { class: "pc-docs-links" }, [
          el("a", { href: docsPath + "usage.md", text: "usage.md" }),
          el("a", { href: docsPath + "contribute.md", text: "contribute.md" }),
        ]),
      );
    }

    /* --- assemble --- */
    var content = el("main", { class: "pc-content", id: "pc-content" });
    content.appendChild(head);
    demos.forEach(function (d) {
      content.appendChild(d.section);
    });
    content.appendChild(
      el("footer", { class: "pc-footer" }, [
        el("p", { text: "Edit any HTML pane to try variants live. Nothing here is saved to disk." }),
      ]),
    );

    var layout = el("div", { class: "pc-layout" });
    layout.appendChild(buildToc(demos));
    layout.appendChild(content);

    document.body.textContent = "";
    document.body.appendChild(el("a", { class: "pc-skip", href: "#pc-content", text: "Skip to content" }));
    document.body.appendChild(buildTopbar(entry, up, up + "../index.html"));
    document.body.appendChild(layout);

    document.body.classList.add("pc-ready");

    function sizeEditors() {
      Array.prototype.forEach.call(document.querySelectorAll(".pc-editor"), function (t) {
        if (t.pcAutosize) t.pcAutosize();
      });
    }
    sizeEditors();
    /* Web fonts change the line box and therefore the height. */
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(sizeEditors);

    var resizeTimer = null;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(sizeEditors, 150);
    });

    trackSections(demos);
    restoreHash();
  }

  /* Generic page with the same chrome and section behaviour as a component
     page, but with content supplied by the caller. Used by Tokens.html. */
  function buildPage(opts) {
    var content = el("main", { class: "pc-content", id: "pc-content" });
    var head = el("header", { class: "pc-page-head" });
    head.appendChild(el("h1", { text: opts.title }));
    if (opts.lede) head.appendChild(el("p", { class: "pc-lede", text: opts.lede }));
    content.appendChild(head);

    var demos = opts.sections.map(function (s) {
      var section = el("section", { class: "pc-demo", id: s.id });
      section.appendChild(el("h2", {}, [el("a", { class: "pc-anchor", href: "#" + s.id, text: s.title })]));
      if (s.note) {
        var p = el("p", { class: "pc-note" });
        p.innerHTML = s.note;
        section.appendChild(p);
      }
      section.appendChild(s.node);
      content.appendChild(section);
      return { id: s.id, title: s.title, section: section };
    });

    var layout = el("div", { class: "pc-layout" });
    layout.appendChild(buildToc(demos));
    layout.appendChild(content);

    document.body.textContent = "";
    document.body.appendChild(el("a", { class: "pc-skip", href: "#pc-content", text: "Skip to content" }));
    document.body.appendChild(buildTopbar(null, "", opts.homeHref || "../index.html"));
    document.body.appendChild(layout);
    document.body.classList.add("pc-ready");

    trackSections(demos);
    restoreHash();
  }

  function buildElementIndex() {
    var groups = {};
    var order = [];
    (window.PC_COMPONENTS || []).forEach(function (c) {
      if (!groups[c.group]) {
        groups[c.group] = [];
        order.push(c.group);
      }
      groups[c.group].push(c);
    });

    var wrap = el("main", { class: "pc-home-layout", id: "pc-content" });
    var hero = el("header", { class: "pc-hero" });
    hero.appendChild(el("p", { class: "pc-eyebrow", text: "PureUI library" }));
    hero.appendChild(el("h1", { text: "Elements" }));
    hero.appendChild(
      el("p", {
        text:
          "CSS-only building blocks. Every page shows the element's variants and states " +
          "with an editable HTML pane next to a live preview.",
      }),
    );
    wrap.appendChild(hero);

    var filterWrap = el("div", { class: "pc-filter" });
    var input = el("input", { type: "search", placeholder: "Filter elements…", "aria-label": "Filter elements" });
    var count = el("span", { class: "pc-filter-count" });
    filterWrap.appendChild(input);
    filterWrap.appendChild(count);
    wrap.appendChild(filterWrap);

    var items = [];
    order.forEach(function (name) {
      var group = el("section", { class: "pc-group" });
      group.appendChild(el("h2", { text: name }));
      var ul = el("ul");
      groups[name].forEach(function (c) {
        var li = el("li", {}, [el("a", { href: "../" + c.file }, [c.title, el("code", { text: c.id })])]);
        ul.appendChild(li);
        items.push({ li: li, group: group, text: (c.title + " " + c.id).toLowerCase() });
      });
      group.appendChild(ul);
      wrap.appendChild(group);
    });

    var empty = el("p", { class: "pc-empty", hidden: "", text: "No element matches that." });
    wrap.appendChild(empty);

    wrap.appendChild(
      el("footer", { class: "pc-footer" }, [
        el("p", {}, [
          "Built for development, not for publishing. ",
          el("a", { href: "../../../../AI/accessibility.md", text: "Accessibility guidelines" }),
          " · ",
          el("a", { href: "../README.md", text: "README" }),
        ]),
      ]),
    );

    function applyFilter() {
      var q = input.value.trim().toLowerCase();
      var shown = 0;
      items.forEach(function (i) {
        var hit = !q || i.text.indexOf(q) !== -1;
        i.li.hidden = !hit;
        if (hit) shown++;
      });
      Array.prototype.forEach.call(wrap.querySelectorAll(".pc-group"), function (g) {
        g.hidden = !Array.prototype.some.call(g.querySelectorAll("li"), function (li) {
          return !li.hidden;
        });
      });
      empty.hidden = shown !== 0;
      count.textContent = shown + " of " + items.length + " elements";
    }

    input.addEventListener("input", applyFilter);
    applyFilter();

    document.body.textContent = "";
    document.body.appendChild(el("a", { class: "pc-skip", href: "#pc-content", text: "Skip to content" }));
    document.body.appendChild(buildTopbar(null, "", "../../index.html"));
    document.body.appendChild(wrap);
    document.body.classList.add("pc-ready");
    input.focus();
  }

  function initHome() {
    var elementCount = (window.PC_COMPONENTS || []).length;
    var compositionCount = (window.PC_COMPOSITIONS || []).length;
    var demoCount = (window.PC_DEMOS || []).length;

    var wrap = el("main", { class: "pc-home-layout pc-library-home", id: "pc-content" });
    var hero = el("header", { class: "pc-hero" });
    hero.appendChild(el("p", { class: "pc-eyebrow", text: "Development library" }));
    hero.appendChild(el("h1", { text: "Pure" }));
    hero.appendChild(
      el("p", {
        text: "Explore the individual building blocks, see them assembled into interface parts, or open complete demos.",
      }),
    );
    wrap.appendChild(hero);

    var sections = el("ul", { class: "pc-section-grid" });
    [
      {
        title: "Elements",
        href: "pages/Elements/index.html",
        count: elementCount,
        noun: "element",
        blurb: "The CSS-only building blocks, with every variant, state and editable example in one place.",
      },
      {
        title: "Compositions",
        href: "pages/Compositions/index.html",
        count: compositionCount,
        noun: "composition",
        blurb: "Interface parts assembled from elements to test how the library holds together in real layouts.",
      },
      {
        title: "Demos",
        href: "pages/Demos/index.html",
        count: demoCount,
        noun: "demo",
        blurb: "Complete experiences built to test PureUI and show what it can do beyond isolated examples.",
      },
    ].forEach(function (section) {
      var label = section.count + " " + section.noun + (section.count === 1 ? "" : "s");
      sections.appendChild(
        el("li", {}, [
          el("a", { class: "pc-section-card", href: section.href }, [
            el("span", { class: "pc-section-card-count", text: label }),
            el("span", { class: "pc-section-card-title", text: section.title }),
            el("span", { class: "pc-section-card-blurb", text: section.blurb }),
            el("span", { class: "pc-section-card-link", text: "Explore " + section.title + " →" }),
          ]),
        ]),
      );
    });
    wrap.appendChild(sections);

    wrap.appendChild(
      el("footer", { class: "pc-footer" }, [
        el("p", {}, [
          "Built for development, not for publishing. ",
          el("a", { href: "../../AI/accessibility.md", text: "Accessibility guidelines" }),
          " · ",
          el("a", { href: "pages/README.md", text: "README" }),
        ]),
      ]),
    );

    document.body.textContent = "";
    document.body.appendChild(el("a", { class: "pc-skip", href: "#pc-content", text: "Skip to content" }));
    document.body.appendChild(buildTopbar(null, "", "index.html"));
    document.body.appendChild(wrap);
    document.body.classList.add("pc-ready");
  }

  /* ---------------------------------------------------------
     Boot
     --------------------------------------------------------- */

  function boot() {
    loadPrefs();
    if (document.body.dataset.page === "home") initHome();
    else if (document.body.dataset.page === "elements") buildElementIndex();
    else if (document.body.dataset.component) initComponentPage();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
      if (PREFS.mode === "auto") applyPrefs();
    });
  }

  window.PCDocs = { el: el, slug: slug, dedent: dedent, buildPage: buildPage, prefs: PREFS };
})();
