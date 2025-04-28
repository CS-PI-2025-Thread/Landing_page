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
  })
  document.addEventListener("DOMContentLoaded", () => {
    let reviews = [];
    let reviewsVisible = 5;
    const reviewsPerPage = 5;
  
    // Carregar avaliações do arquivo JSON
    function loadReviews() {
      fetch("avaliacoes.json") // Alterar para o caminho correto do seu arquivo JSON
        .then(response => response.json())
        .then(data => {
          reviews = data;
          renderReviews();
        })
        .catch(error => console.error("Erro ao carregar avaliações:", error));
    }
  
    // Função para renderizar as avaliações
    function renderReviews() {
      const container = document.getElementById("reviewsContainer");
      container.innerHTML = "";
  
      const filteredReviews = applyFiltersAndSort(reviews);
      const endIndex = Math.min(reviewsVisible, filteredReviews.length);
  
      for (let i = 0; i < endIndex; i++) {
        const review = filteredReviews[i];
        const div = document.createElement("div");
        div.classList.add("review-card");
  
        div.innerHTML = `
            <div class="reviewer-name">${review.nome}</div>
            <div class="review-rating">${"⭐".repeat(review.nota)}</div>
            <div class="review-comment">${review.comentario}</div>
            ${review.imagem ? `<img src="${review.imagem}" alt="Imagem de perfil" />` : ""}
        `;
  
        container.appendChild(div);
      }
  
      const btnLoadMore = document.getElementById("btnLoadMoreReviews");
      btnLoadMore.style.display = reviewsVisible < filteredReviews.length ? "block" : "none";
    }
  
    // Função para aplicar filtros e ordenação
    function applyFiltersAndSort(reviewsList) {
      let filteredReviews = [...reviews];
  
      const sortSelect = document.getElementById("sortReviews");
      const filterSelect = document.getElementById("filterByRating");
  
      const selectedRating = filterSelect.value;
      if (selectedRating !== "todas") {
        filteredReviews = filteredReviews.filter(review => review.nota == selectedRating);
      }
  
      const selectedSort = sortSelect.value;
      if (selectedSort === "crescente") {
        filteredReviews.sort((a, b) => a.nota - b.nota);
      } else {
        filteredReviews.sort((a, b) => b.nota - a.nota);
      }
  
      return filteredReviews;
    }
  
    // Event listener para o botão "Ver mais"
    document.getElementById("btnLoadMoreReviews").addEventListener("click", () => {
      reviewsVisible += reviewsPerPage;
      renderReviews();
    });
  
    // Event listeners para filtros e ordenação
    document.getElementById("sortReviews").addEventListener("change", renderReviews);
    document.getElementById("filterByRating").addEventListener("change", renderReviews);
  
    // Função para lidar com a seleção das estrelas
    const ratingStars = document.getElementById("ratingStars");
    const ratingValue = document.getElementById("ratingValue");
  
    ratingStars.addEventListener("click", (event) => {
      if (event.target.classList.contains("star")) {
        const selectedRating = parseInt(event.target.getAttribute("data-value"));
        ratingValue.value = selectedRating;  // Atualiza o valor da nota no campo oculto
        updateStarSelection(selectedRating); // Atualiza as estrelas visuais
      }
    });
  
    // Função para atualizar a visualização das estrelas
    function updateStarSelection(selectedRating) {
      const stars = ratingStars.querySelectorAll(".star");
      stars.forEach(star => {
        const starValue = parseInt(star.getAttribute("data-value"));
        if (starValue <= selectedRating) {
          star.classList.add("selected");
        } else {
          star.classList.remove("selected");
        }
      });
    }
  
    // Função para enviar uma nova avaliação
    const formReview = document.getElementById("formReview");
    formReview.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const newReview = {
        nome: document.getElementById("reviewerName").value,
        nota: parseInt(ratingValue.value),
        comentario: document.getElementById("reviewComment").value,
        imagem: document.getElementById("reviewImage").value || "img/default.png",
        data: new Date().toLocaleDateString("pt-BR")
      };
  
      reviews.unshift(newReview); // Adicionar no início da lista
      renderReviews(); // Re-renderizar a lista de avaliações
  
      formReview.reset(); // Limpar o formulário
      updateStarSelection(0); // Limpar as estrelas selecionadas
    });
  
    loadReviews();
  });
  