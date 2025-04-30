import { elementLocalName } from "../Utils/Constant/tagNameConstant";
import { consoleErr, consoleInfo } from "./consoleMessage";

(function () {
  console.log("hej");
  const parentElement = document.querySelectorAll(".breadcrumbs");

  parentElement.forEach((element) => {
    if (element.localName !== (elementLocalName.ul || elementLocalName.ol)) {
      consoleErr(
        "Breadcrumbs",
        `When using breadcrumbs you should use UL or OL as a the parent. We found: ${element.localName}`
      );
    }

    // check children:
    Object.entries(element.children).forEach(([key, child]) => {
      if (child.localName !== elementLocalName.li) {
        consoleErr("Breadcrumbs - li is not a child", `Parent should be OL or UL and children should be li`);
      }

      /*
      children(li) to ul/ol should not have aria-current attr
      on its self becuase of stuling puposes.. 
      */
      if (child.ariaCurrent) {
        consoleInfo(
          "aria-current",
          "aria-current should be set on one of the children to the li element, not on the li for styling purposes"
        );
      }
    });
  });
  console.log("parentElement: ", parentElement);
})();
