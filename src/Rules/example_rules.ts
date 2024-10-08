export function checkSectionHeadings() {
  // Get all sections in the document
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    // Kontrollera om det finns någon heading (h1-h6) i section
    const hasHeading = section.querySelector("h1, h2, h3, h4, h5, h6");

    if (!hasHeading) {
      console.error("Warning: A <section> element must contain a heading (h1-h6).", section);
    }
  });
}

//  runs when the DOM is ready
document.addEventListener("DOMContentLoaded", checkSectionHeadings);
