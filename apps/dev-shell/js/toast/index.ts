/*
Toast — behavior layer.

Write the container once, anywhere in the page. It owns the
placement, covers the viewport, ignores the pointer and takes up no
space while it is empty:

  <div class="pu-toast-container" data-placement="top-right"></div>

Load this file once:

  <script type="module" src="/js/toast/index.ts"></script>

Then it is three functions, on window.Toast so plain HTML can reach
them:

  <button onclick="Toast.append({ title: 'Saved', intent: 'success' })">
    Save
  </button>

  Toast.append({ message: 'Undo?' }, '#bottom-left');   pick a container
  Toast.remove(toast.id);                               one toast
  Toast.removeAll();                                    the lot

append() takes the Toast's attributes as an object and fills the
rest in from toastDefaults: title, message, intent, size, role,
duration, dismissible, icon, swipeable.

Modules can import the same three functions instead:

  import { append } from "/js/toast/index.ts";

Every Toast can be swiped away in the direction its container sits:
right for a right-hand container, left for a left-hand one, and for
a centered one up from the top or down from the bottom, plus right.
*/
import { append, remove, removeAll, toastDefaults } from "./toast";
export { append, remove, removeAll, toastDefaults };
export type { ToastAttributes, ToastInstance, ToastIntent, ToastPlacement, ToastRole, ToastSize } from "./types";

/*
Inline handlers are resolved against the global scope, not against
the module that imported them, so plain HTML needs a name to call.
*/
declare global {
  interface Window {
    Toast: {
      append: typeof append;
      remove: typeof remove;
      removeAll: typeof removeAll;
      defaults: typeof toastDefaults;
    };
  }
}

window.Toast = {
  append,
  remove,
  removeAll,
  defaults: toastDefaults,
};
