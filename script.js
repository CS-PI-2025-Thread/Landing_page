// script.js

const avaliacoes = [
    {
      nome: "Vinicius de Oliveira",
      nota: 5,
      comentario: "Estou devidamente satisfeito com este produto. Continuem trabalhando para que não perca a qualidade, desejo a vocês muito sucesso.",
      data: "07/04/2025",
      imagem: "imagens/icone-pessoa.jpg"
    },
    {
      nome: "Carlos Mendes",
      nota: 3,
      comentario: "Gostei, mas ainda pode melhorar em alguns pontos.",
      data: "05/04/2025",
      imagem: "imagens/icone-pessoa.jpg"
    },
    {
      nome: "Bianca Souza",
      nota: 4,
      comentario: "Produto muito bom, entrega rápida.",
      data: "06/04/2025",
      imagem: "imagens/icone-pessoa.jpg"
    }
  ];
  
  const container = document.getElementById("avaliacoes-container");
  const seletorOrdenar = document.getElementById("ordenar");
  
  function renderAvaliacoes(lista) {
    container.innerHTML = "";
    lista.forEach(avaliacao => {
      const div = document.createElement("div");
      div.className = "avaliacoes";
      div.innerHTML = `
        <div class="perfil">
          <img src="${avaliacao.imagem}" alt="icone-pessoa">
          <div class="nome">${avaliacao.nome}</div>
        </div>
        <hgroup>
          <div class="avaliacao-info">
            <div class="estrelas">${"⭐".repeat(avaliacao.nota)}</div>
            <div class="data-avaliacao">${avaliacao.data}</div>
          </div>
        </hgroup>
        <p class="comentario">${avaliacao.comentario}</p>
      `;
      container.appendChild(div);
    });
  }
  
  function ordenarAvaliacoes(tipo) {
    const copia = [...avaliacoes];
    if (tipo === "crescente") {
      copia.sort((a, b) => a.nota - b.nota);
    } else {
      copia.sort((a, b) => b.nota - a.nota);
    }
    renderAvaliacoes(copia);
  }
  
  seletorOrdenar.addEventListener("change", (e) => {
    ordenarAvaliacoes(e.target.value);
  });
  
  // Inicializar com a ordenação padrão
  ordenarAvaliacoes("decrescente");
  