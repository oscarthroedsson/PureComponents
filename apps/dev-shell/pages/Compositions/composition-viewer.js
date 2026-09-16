/* ============================================================
   COMPOSITION VIEWER  (dev tooling — not part of the library)

   A composition page is a vertical feed. Each entry owns one
   Example/Code viewer and loads its source only when it nears
   the viewport. The preview runs in an iframe so removing it also
   removes that composition's DOM and stylesheets.
   ============================================================ */

(function () {
  "use strict";

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (key) {
      var value = attrs[key];
      if (key === "text") node.textContent = value;
      else if (key === "class") node.className = value;
      else node.setAttribute(key, value);
    });
    (children || []).forEach(function (child) {
      node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    });
    return node;
  }

  function currentScheme() {
    return document.documentElement.getAttribute("data-scheme") || "light";
  }

  function stylesheetLinks(styles) {
    return (styles || [])
      .map(function (href) {
        return '<link rel="stylesheet" href="' + href.replace(/&/g, "&amp;").replace(/"/g, "&quot;") + '">';
      })
      .join("");
  }

  function previewDocument(example) {
    return (
      "<!doctype html>" +
      '<html lang="en" data-scheme="' +
      currentScheme() +
      '"><head><meta charset="UTF-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
      stylesheetLinks(example.styles) +
      '</head><body class="pu-box box-xl box-sharp" data-layout="top-start">' +
      example.markup +
      "</body></html>"
    );
  }

  function placeholder(text) {
    return el("div", { class: "pc-composition-placeholder", text: text });
  }

  function moduleUrl(path) {
    return new URL(path, document.baseURI).href;
  }

  function mount(root, options) {
    var examples = options.examples || [];
    var states = [];
    var observer;

    root.classList.add("pc-composition-feed");

    if (!examples.length) {
      root.appendChild(el("p", { class: "pc-empty", text: "No composition examples yet." }));
      return { destroy: function () {} };
    }

    function setView(state, view) {
      state.view = view;
      state.exampleTab.setAttribute("aria-selected", view === "example" ? "true" : "false");
      state.codeTab.setAttribute("aria-selected", view === "code" ? "true" : "false");
      state.panel.setAttribute("aria-labelledby", view === "example" ? state.exampleTab.id : state.codeTab.id);
      if (state.near) render(state);
    }

    function load(state) {
      if (state.module) return Promise.resolve(state.module);
      if (state.loading) return state.loading;

      state.section.dataset.state = "loading";
      state.panel.setAttribute("aria-busy", "true");
      state.panel.replaceChildren(placeholder("Loading example…"));

      state.loading = (state.item.html
        ? fetch(moduleUrl(state.item.html)).then(function (response) {
            if (!response.ok) throw new Error("Could not load composition HTML.");
            return response.text().then(function (markup) {
              return {
                markup: markup,
                styles: state.item.styles || [],
              };
            });
          })
        : import(/* @vite-ignore */ moduleUrl(state.item.module)).then(function (loaded) {
            return loaded.default || loaded;
          }))
        .then(function (example) {
          if (!example || typeof example.markup !== "string") {
            throw new Error("Composition examples must provide a markup string.");
          }
          state.module = example;
          state.loading = null;
          return example;
        })
        .catch(function (error) {
          state.loading = null;
          state.error = error;
          throw error;
        });

      return state.loading;
    }

    function renderExample(state) {
      var iframe = el("iframe", {
        class: "pc-composition-iframe",
        title: state.item.title + " example",
        loading: "lazy",
      });
      iframe.srcdoc = previewDocument(state.module);
      state.panel.replaceChildren(iframe);
      state.iframe = iframe;
    }

    function renderCode(state) {
      var copy = el("button", { type: "button", text: "Copy" });
      var toolbar = el("div", { class: "pc-composition-code-toolbar" }, [
        el("span", { text: "HTML" }),
        copy,
      ]);
      var code = el("code", { text: state.module.markup });
      var pre = el("pre", { class: "pc-composition-code" }, [code]);

      copy.addEventListener("click", function () {
        navigator.clipboard.writeText(state.module.markup).then(
          function () {
            copy.textContent = "Copied";
            setTimeout(function () {
              copy.textContent = "Copy";
            }, 1200);
          },
          function () {
            copy.textContent = "Failed";
            setTimeout(function () {
              copy.textContent = "Copy";
            }, 1200);
          },
        );
      });

      state.panel.replaceChildren(toolbar, pre);
      state.iframe = null;
    }

    function render(state) {
      state.panel.setAttribute("aria-busy", "true");
      load(state).then(
        function () {
          if (!state.near) return;
          if (state.view === "code") renderCode(state);
          else renderExample(state);
          state.panel.setAttribute("aria-busy", "false");
          state.section.dataset.state = "mounted";
        },
        function () {
          if (!state.near) return;
          state.panel.setAttribute("aria-busy", "false");
          state.panel.replaceChildren(
            el("p", {
              class: "pc-composition-error",
              text: "This example could not be loaded. Check its module path and export.",
            }),
          );
          state.section.dataset.state = "error";
        },
      );
    }

    function unmount(state) {
      state.iframe = null;
      state.panel.setAttribute("aria-busy", "false");
      state.panel.replaceChildren(placeholder("This example will reload when you scroll back."));
      state.section.dataset.state = "idle";
    }

    examples.forEach(function (item, index) {
      var id = item.id || "composition-" + (index + 1);
      var titleId = id + "-title";
      var panelId = id + "-panel";
      var exampleTabId = id + "-example-tab";
      var codeTabId = id + "-code-tab";

      var heading = el("h3", { id: titleId }, [
        el("a", { class: "pc-anchor", href: "#" + id, text: item.title }),
      ]);
      var intro = el("div", { class: "pc-composition-entry-head" }, [heading]);
      if (item.description) intro.appendChild(el("p", { text: item.description }));

      var exampleTab = el("button", {
        type: "button",
        role: "tab",
        id: exampleTabId,
        "aria-controls": panelId,
        "aria-selected": "true",
        text: "Example",
      });
      var codeTab = el("button", {
        type: "button",
        role: "tab",
        id: codeTabId,
        "aria-controls": panelId,
        "aria-selected": "false",
        text: "Code",
      });
      var tabs = el("div", {
        class: "pc-composition-view-tabs",
        role: "tablist",
        "aria-label": item.title + " views",
      }, [exampleTab, codeTab]);
      var panel = el("div", {
        class: "pc-composition-view-panel",
        id: panelId,
        role: "tabpanel",
        "aria-labelledby": exampleTabId,
        "aria-busy": "false",
      }, [placeholder("Loads when this example approaches the viewport.")]);
      var viewer = el("div", { class: "pc-composition-viewer" }, [tabs, panel]);
      var section = el("section", {
        class: "pc-composition-entry",
        id: id,
        "aria-labelledby": titleId,
        "data-state": "idle",
      }, [intro, viewer]);
      section.style.setProperty("--pc-composition-height", (item.height || 560) + "px");

      var state = {
        item: item,
        section: section,
        panel: panel,
        exampleTab: exampleTab,
        codeTab: codeTab,
        view: "example",
        near: false,
        loading: null,
        module: null,
        iframe: null,
      };

      exampleTab.addEventListener("click", function () {
        setView(state, "example");
      });
      codeTab.addEventListener("click", function () {
        setView(state, "code");
      });
      tabs.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Home" && event.key !== "End") return;
        event.preventDefault();
        var next = event.key === "ArrowLeft" || event.key === "End" ? codeTab : exampleTab;
        if (event.key === "ArrowRight") next = event.target === exampleTab ? codeTab : exampleTab;
        if (event.key === "ArrowLeft") next = event.target === codeTab ? exampleTab : codeTab;
        next.focus();
        next.click();
      });

      states.push(state);
      root.appendChild(section);
    });

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            var state = states.find(function (candidate) {
              return candidate.section === entry.target;
            });
            if (!state) return;
            state.near = entry.isIntersecting;
            if (state.near) render(state);
            else unmount(state);
          });
        },
        { rootMargin: "240px 0px" },
      );
      states.forEach(function (state) {
        observer.observe(state.section);
      });
    } else {
      states.forEach(function (state) {
        state.near = true;
        render(state);
      });
    }

    var themeObserver = new MutationObserver(function () {
      states.forEach(function (state) {
        if (state.iframe && state.iframe.contentDocument) {
          state.iframe.contentDocument.documentElement.setAttribute("data-scheme", currentScheme());
        }
      });
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-scheme"] });

    return {
      destroy: function () {
        if (observer) observer.disconnect();
        themeObserver.disconnect();
        states.forEach(unmount);
      },
    };
  }

  window.PCCompositionViewer = { mount: mount };
})();
