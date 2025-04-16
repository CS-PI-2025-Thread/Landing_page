const avaliacoes = [
  {
    nome: "Vinicius de Oliveira",
    nota: 5,
    comentario: "Excelente trabalho!",
    data: "07/04/2025",
    imagem: "imagens/icone-pessoa.jpg"
  },
  {
    nome: "Carlos Mendes",
    nota: 3,
    comentario: "Bom, mas pode melhorar.",
    data: "05/04/2025",
    imagem: "imagens/icone-pessoa.jpg"
  },
  {
    nome: "Bianca Souza",
    nota: 4,
    comentario: "Gostei bastante do serviço!Gostei bastante do serviço!Gostei bastante do serviço!Gostei bastante do serviço!Gostei bastante do serviço!Gostei bastante do serviço!Gostei bastante do serviço!Gostei bastante do serviço!Gostei bastante do serviço!Gostei bastante do serviço!Gostei bastante do serviço!Gostei bastante do serviço!Gostei bastante do serviço!Gostei bastante do serviço!Gostei bastante do serviço!Gostei bastante do serviço!Gostei bastante do serviço!Gostei bastante do serviço!Gostei bastante do serviço!Gostei bastante do serviço!Gostei bastante do serviço!Gostei bastante do serviço!Gostei bastante do serviço!Gostei bastante do serviço!Gostei bastante do serviço!Gostei bastante do serviço!Gostei bastante do serviço!Gostei bastante do serviço!",
    data: "06/04/2025",
    imagem: "imagens/icone-pessoa.jpg"
  }
];

const container = document.getElementById("avaliacoes-container");
const seletorOrdenar = document.getElementById("ordenar");
const seletorFiltroNota = document.getElementById("filtroNota");

// Renderiza as avaliações
function renderAvaliacoes(lista) {
  container.innerHTML = "";
  lista.forEach(avaliacao => {
    const div = document.createElement("div");
    div.className = "avaliacao-card";

    const comentarioCurto = avaliacao.comentario.length > 100
      ? avaliacao.comentario.slice(0, 100) + "..."
      : avaliacao.comentario;

    const precisaVerMais = avaliacao.comentario.length > 100;

    div.innerHTML = `
      <div class="perfil">
        <img src="${avaliacao.imagem}" alt="icone-pessoa">
        <div class="nome">${avaliacao.nome}</div>
      </div>
      <div class="avaliacao-info">
        <div class="estrelas">${"⭐".repeat(avaliacao.nota)}</div>
        <div class="data-avaliacao">${avaliacao.data}</div>
      </div>
      <p class="comentario" data-completo="${avaliacao.comentario}">
        ${comentarioCurto}
      </p>
      ${precisaVerMais ? `<button class="btn-ver-mais">Ver mais</button>` : ""}
    `;

    container.appendChild(div);
  });

  // Adiciona funcionalidade ao botão "Ver mais"
  document.querySelectorAll(".btn-ver-mais").forEach(botao => {
    botao.addEventListener("click", () => {
      const p = botao.previousElementSibling;
      const textoCompleto = p.getAttribute("data-completo");

      if (botao.innerText === "Ver mais") {
        p.innerText = textoCompleto;
        botao.innerText = "Ver menos";
      } else {
        p.innerText = textoCompleto.slice(0, 100) + "...";
        botao.innerText = "Ver mais";
      }
    });
  });
}


// Aplica filtro + ordenação
function aplicarFiltros() {
  let lista = [...avaliacoes];

  const filtro = seletorFiltroNota.value;
  const ordenacao = seletorOrdenar.value;

  // Filtro
  if (filtro !== "todas") {
    const notaFiltrada = parseInt(filtro);
    lista = lista.filter(a => a.nota === notaFiltrada);
  }

  // Ordenação
  if (ordenacao === "crescente") {
    lista.sort((a, b) => a.nota - b.nota);
  } else {
    lista.sort((a, b) => b.nota - a.nota);
  }

  renderAvaliacoes(lista);
}

// Eventos
seletorOrdenar.addEventListener("change", aplicarFiltros);
seletorFiltroNota.addEventListener("change", aplicarFiltros);

// Iniciar com todas
aplicarFiltros();
