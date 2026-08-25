import type { ResolvedToastAttributes, ToastIntent } from "./types";

/*
Toast is a placement and motion wrapper around Alert, so this
builds exactly the markup the two stylesheets expect:

<div class="toast" data-toast-id="…">
  <div class="alert md" data-intent="success" role="status">
    <div class="alert-icon">…</div>
    <div class="alert-content">
      <h3 class="alert-title">…</h3>
      <p class="alert-message">…</p>
    </div>
    <div class="alert-actions">…</div>
  </div>
</div>
*/

const ICONS: Record<ToastIntent, string> = {
  success: '<circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path>',
  error: '<circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path>',
  warning:
    '<path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path>',
  info: '<circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path>',
};

const CLOSE_ICON = '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>';

function svg(paths: string): SVGElement {
  const element = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  element.setAttribute("viewBox", "0 0 24 24");
  element.setAttribute("fill", "none");
  element.setAttribute("stroke", "currentColor");
  element.setAttribute("stroke-width", "2");
  element.setAttribute("stroke-linecap", "round");
  element.setAttribute("stroke-linejoin", "round");
  element.setAttribute("aria-hidden", "true");

  element.innerHTML = paths;

  return element;
}

function buildIcon(intent: ToastIntent): HTMLElement {
  const icon = document.createElement("div");

  icon.className = "alert-icon";
  icon.setAttribute("aria-hidden", "true");

  icon.append(svg(ICONS[intent]));

  return icon;
}

function buildContent(attributes: ResolvedToastAttributes): HTMLElement {
  const content = document.createElement("div");

  content.className = "alert-content";

  if (attributes.title) {
    const title = document.createElement("h3");

    title.className = "alert-title";
    title.textContent = attributes.title;

    content.append(title);
  }

  if (attributes.message) {
    const message = document.createElement("p");

    message.className = "alert-message";
    message.textContent = attributes.message;

    content.append(message);
  }

  return content;
}

function buildActions(): HTMLElement {
  const actions = document.createElement("div");

  actions.className = "alert-actions";

  const button = document.createElement("button");

  button.className = "pu-btn ghost sm";
  button.type = "button";

  button.dataset.iconOnly = "true";
  button.dataset.toastDismiss = "";

  button.setAttribute("aria-label", "Dismiss notification");

  button.append(svg(CLOSE_ICON));

  actions.append(button);

  return actions;
}

export function createToast(id: string, attributes: ResolvedToastAttributes): HTMLElement {
  const toast = document.createElement("div");

  toast.className = "toast";
  toast.dataset.toastId = id;

  const alert = document.createElement("div");

  alert.className = `pu-alert ${attributes.size}`;

  alert.dataset.intent = attributes.intent;

  alert.setAttribute("role", attributes.role);
  alert.setAttribute("aria-atomic", "true");

  if (attributes.icon) {
    alert.append(buildIcon(attributes.intent));
  }

  alert.append(buildContent(attributes));

  if (attributes.dismissible) {
    alert.append(buildActions());
  }

  toast.append(alert);

  return toast;
}
