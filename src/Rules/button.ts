import { consoleErr } from "../Helpers/consoleMessage";

(() => {
  const buttons = document.querySelectorAll(".btn[iconOnly]");
  buttons.forEach((btn) => {
    btn.childNodes.forEach((childNode) => {
      console.log("childNode", childNode);
      // ignore white-spaces
      if (childNode.nodeType === Node.TEXT_NODE) {
        const trimmed = childNode.textContent?.trim();
        if (!trimmed) return;
      }

      if (!["span", "i", "svg", "img"].includes((childNode as HTMLElement).nodeName.toLocaleLowerCase().trim())) {
        console.log("childNode", childNode);
        consoleErr("IconOnly", "You should not have any text content inside the button to align the icon center");
      }
    });
  });
})();
