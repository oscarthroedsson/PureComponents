export function checkSectionHeadings() {
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const hasHeading = section.querySelector("h1, h2, h3, h4, h5, h6");
    console.log("hasHeading", hasHeading);
    if (!hasHeading) {
      console.log("error");
      const errorMessage = `Warning: A <section> element must contain a heading (h1-h6).`;
      console.error("error", errorMessage, section);
      console.info("info", errorMessage, section);
      console.debug("debug", errorMessage, section);
      console.trace("trace", errorMessage, section);
      console.assert(false, errorMessage, section);
      console.dir(section);
    }
  });
}

document.addEventListener("DOMContentLoaded", checkSectionHeadings);
