const accordionHeaders = document.querySelectorAll(".accordion-header");
accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const accordionItem = header.parentElement;
      const accordionActive = accordionItem.classList.contains("active");
  
      accordionActive ? accordionItem.classList.remove("active") : accordionItem.classList.add("active");
    })
  })
