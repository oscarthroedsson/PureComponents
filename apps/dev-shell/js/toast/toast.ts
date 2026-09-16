import { consoleErr } from "../consoleMessage";
import { createToast } from "./createToast";
import { isTopPlacement } from "./placement";
import { attachSwipe } from "./swipe";
import type { ResolvedToastAttributes, ToastAttributes, ToastInstance, ToastTarget } from "./types";

export const CONTAINER_SELECTOR = ".pu-toast-container";

/*
Defaults for everything append() is not told.
*/
export const toastDefaults: ResolvedToastAttributes = {
  title: "",
  message: "",

  intent: "info",
  size: "md",
  role: "status",

  duration: 6000,

  dismissible: true,
  icon: true,
  swipeable: true,
};

/*
The exit transition in toast.css is 220ms. This is the safety net
for when transitionend never arrives: reduced motion, a background
tab, or a Toast taken out of the layout mid-exit.
*/
const EXIT_FALLBACK = 400;
let counter = 0;

/*
One list per container. The list is the source of truth and the
container is only ever a picture of it, drawn by render().
*/
const lists = new WeakMap<HTMLElement, ToastInstance[]>();

function getList(container: HTMLElement): ToastInstance[] {
  let list = lists.get(container);

  if (!list) {
    list = [];

    lists.set(container, list);
  }

  return list;
}

/* ----------------------------------------------------------------
   Container
   ---------------------------------------------------------------- */

/*
Containers are written in the page, never created here. A page that
wants Toasts in two corners writes two containers and picks one by
handing it, or a selector for it, to append().
*/
export function resolveContainer(target?: ToastTarget): HTMLElement | null {
  if (target instanceof HTMLElement) {
    return target;
  }

  const selector = target ?? CONTAINER_SELECTOR;

  const container = document.querySelector<HTMLElement>(selector);

  if (!container) {
    consoleErr(
      "Toast",
      `No element matches ${selector}. Add <div class="pu-toast-container" data-placement="top-right"></div> to the page.`,
    );

    return null;
  }

  if (!container.classList.contains("pu-toast-container")) {
    consoleErr("Toast", `${selector} is not a .pu-toast-container.`, container);
    return null;
  }

  return container;
}

/* ----------------------------------------------------------------
   Render
   ---------------------------------------------------------------- */

/*
Writes the list into the container, in the order the placement asks
for: the newest Toast belongs closest to the edge the container is
anchored to.

Nodes already in the right place are left alone, so rendering never
restarts an entry animation or interrupts a swipe in progress.
*/
export function render(container: HTMLElement): void {
  const list = getList(container);

  const ordered = isTopPlacement(container) ? [...list].reverse() : list;

  ordered.forEach((instance, index) => {
    if (container.children[index] !== instance.element) {
      container.insertBefore(instance.element, container.children[index] ?? null);
    }
  });
}

/* ----------------------------------------------------------------
   Attributes
   ---------------------------------------------------------------- */

function resolveAttributes(attributes: ToastAttributes): ResolvedToastAttributes {
  const intent = attributes.intent ?? toastDefaults.intent;

  return {
    title: attributes.title ?? toastDefaults.title,
    message: attributes.message ?? toastDefaults.message,

    intent,
    size: attributes.size ?? toastDefaults.size,

    /* Something gone wrong interrupts, everything else waits its turn. */
    role: attributes.role ?? (intent === "error" || intent === "warning" ? "alert" : "status"),

    duration: attributes.duration ?? toastDefaults.duration,

    dismissible: attributes.dismissible ?? toastDefaults.dismissible,
    icon: attributes.icon ?? toastDefaults.icon,
    swipeable: attributes.swipeable ?? toastDefaults.swipeable,
  };
}

/* ----------------------------------------------------------------
   append / remove
   ---------------------------------------------------------------- */

export function append(attributes: ToastAttributes = {}, target?: ToastTarget): ToastInstance | null {
  const container = resolveContainer(target);

  if (!container) {
    return null;
  }

  const resolved = resolveAttributes(attributes);

  const id = `toast-${++counter}`;

  const element = createToast(id, resolved);

  /* --- countdown ------------------------------------------------ */

  let timeout: number | null = null;
  let remaining = resolved.duration;
  let startedAt = 0;

  const pause = () => {
    if (timeout === null) {
      return;
    }

    window.clearTimeout(timeout);

    timeout = null;

    remaining -= performance.now() - startedAt;
  };

  const resume = () => {
    if (timeout !== null || remaining <= 0 || element.dataset.state === "closing") {
      return;
    }

    startedAt = performance.now();

    timeout = window.setTimeout(() => instance.remove(), remaining);
  };

  /* --- removal -------------------------------------------------- */

  const remove = () => {
    if (element.dataset.state === "closing") {
      return;
    }

    pause();

    remaining = 0;

    element.dataset.state = "closing";

    let removed = false;

    const finish = () => {
      if (removed) {
        return;
      }

      removed = true;

      element.remove();

      const list = getList(container);

      const index = list.indexOf(instance);

      if (index !== -1) {
        list.splice(index, 1);
      }

      render(container);
    };

    element.addEventListener(
      "transitionend",
      (event) => {
        if (event.target === element && event.propertyName === "opacity") {
          finish();
        }
      },
      { once: true },
    );

    window.setTimeout(finish, EXIT_FALLBACK);
  };

  const instance: ToastInstance = {
    id,
    element,
    container,
    attributes: resolved,
    remove,
    pause,
    resume,
  };

  /* --- wire it up ----------------------------------------------- */

  element.querySelector("[data-toast-dismiss]")?.addEventListener("click", remove);

  /*
   * Reading a Toast stops its countdown. Swipe pauses and resumes
   * on its own, because pointer capture breaks the enter/leave pair.
   */
  element.addEventListener("pointerenter", pause);
  element.addEventListener("pointerleave", resume);
  element.addEventListener("focusin", pause);

  element.addEventListener("focusout", (event) => {
    if (!element.contains(event.relatedTarget as Node | null)) {
      resume();
    }
  });

  getList(container).push(instance);

  render(container);

  if (resolved.swipeable) {
    attachSwipe(instance);
  }

  resume();

  return instance;
}

/*
Takes an id, the Toast element itself, or anything inside it.
*/
export function remove(target: string | HTMLElement): void {
  const element =
    typeof target === "string"
      ? document.querySelector<HTMLElement>(`[data-toast-id="${target}"]`)
      : target.closest<HTMLElement>(".pu-toast");

  if (!element) {
    return;
  }

  const container = element.closest<HTMLElement>(CONTAINER_SELECTOR);

  if (!container) {
    return;
  }

  getList(container)
    .find((instance) => instance.element === element)
    ?.remove();
}

export function removeAll(target?: ToastTarget): void {
  const container = resolveContainer(target);
  if (!container) return;

  [...getList(container)].forEach((instance) => instance.remove());
}
