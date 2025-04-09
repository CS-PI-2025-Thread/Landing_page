function toggleMenu() {
  const menu = document.querySelector(".menu-mobile");
  menu.classList.toggle("active");
}

function closeMenu() {
  const menu = document.querySelector(".menu-mobile");
  menu.classList.remove("active");
}

function toggleContrast() {
  const htmlElement = document.documentElement;
  const currentTheme = htmlElement.getAttribute("data-theme");
  const targetTheme = currentTheme === "contrast" ? null : "contrast";

  localStorage.setItem("currentTheme", targetTheme);
  htmlElement.setAttribute("data-theme", targetTheme);
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("currentTheme")) {
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("currentTheme")
    );
  }
  const faqContainer = document.getElementById("accordion");

  fetch("json/faq.json")
    .then((response) => response.json())
    .then((data) => {
      faqContainer.innerHTML = "";
      data.forEach((item) => {
        const faqItem = document.createElement("div");
        faqItem.classList.add("accordion-item");

        const button = document.createElement("button");
        button.classList.add("accordion-header");
        button.setAttribute("aria-expanded", "false");
        button.innerHTML = `
                    <span>${item.pergunta}</span>
                    <i class="bi bi-caret-down-fill"></i>
                `;

        const body = document.createElement("div");
        body.classList.add("accordion-body");
        body.innerHTML = `<p>${item.resposta}</p>`;
        button.addEventListener("click", () => {
          const isActive = faqItem.classList.contains("active");

          if (isActive) {
            faqItem.classList.remove("active");
            body.style.maxHeight = "0";
            body.style.padding = "0 1.25rem";
            button.querySelector("i").style.transform = "rotate(0deg)";
          } else {
            faqItem.classList.add("active");
            body.style.maxHeight = body.scrollHeight + "px";
            body.style.padding = "1.25rem";
            button.querySelector("i").style.transform = "rotate(180deg)";
          }
        });
        faqItem.appendChild(button);
        faqItem.appendChild(body);
        faqContainer.appendChild(faqItem);
      });
    })
    .catch((error) => console.error("Erro ao carregar FAQ:", error));
});
