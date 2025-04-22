
let avaliacoes = [];
let avaliacoesVisiveis = 0;
const porPagina = 5;
const btnVerMais = document.getElementById("btn-ver-mais-comentarios");

fetch('avaliacoes.json') 
  .then(res => res.ok ? res.text() : Promise.reject('Erro ao carregar'))
  .then(texto => {
    avaliacoes = JSON.parse(texto);
    aplicarFiltros(); // inicia com todas já filtradas/ordenadas
  })
  .catch(err => {
    console.error('Erro ao carregar avaliações:', err);
  });


  const container = document.getElementById("avaliacoes-container");
  const seletorOrdenar = document.getElementById("ordenar");
  const seletorFiltroNota = document.getElementById("filtroNota");

  // Renderiza as avaliações
  function renderAvaliacoes(lista) {
    container.innerHTML = "";
    const fim = Math.min(avaliacoesVisiveis, lista.length);
  
    for (let i = 0; i < fim; i++) {
      const avaliacao = lista[i];
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
  ${precisaVerMais ? '<button class="btn-ver-mais">Ver mais</button>' : ''}
`;

  
      container.appendChild(div);
    }
  
    // Ver mais dentro do comentário
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
    
    // Mostrar ou ocultar o botão global
    btnVerMais.style.display = avaliacoesVisiveis < lista.length ? "inline-block" : "none";
  }
  
  


  // Aplica filtro + ordenação
  function aplicarFiltros() {
    let lista = [...avaliacoes];
  
    const filtro = seletorFiltroNota.value;
    const ordenacao = seletorOrdenar.value;
  
    if (filtro !== "todas") {
      const notaFiltrada = parseInt(filtro);
      lista = lista.filter(a => a.nota === notaFiltrada);
    }
  
    if (ordenacao === "crescente") {
      lista.sort((a, b) => a.nota - b.nota);
    } else {
      lista.sort((a, b) => b.nota - a.nota);
    }
  
    avaliacoesVisiveis = porPagina;
    renderAvaliacoes(lista);
  
    // Botão "ver mais comentários"
    btnVerMais.onclick = () => {
      avaliacoesVisiveis += porPagina;
      renderAvaliacoes(lista);
    };
  }
  
  // Eventos
  seletorOrdenar.addEventListener("change", aplicarFiltros);
  seletorFiltroNota.addEventListener("change", aplicarFiltros);

  // Iniciar com todas
  aplicarFiltros();

const form = document.getElementById("form-avaliacao");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const novaAvaliacao = {
        nome: document.getElementById("nome").value,
        nota: parseInt(document.getElementById("nota").value),
        comentario: document.getElementById("comentario").value,
        imagem: document.getElementById("imagem").value || "img/default.png",
        data: new Date().toLocaleDateString('pt-BR')
    };

    // Adiciona ao início da lista
    avaliacoes.unshift(novaAvaliacao);
    aplicarFiltros();

    // Limpa o formulário
    form.reset();
});
