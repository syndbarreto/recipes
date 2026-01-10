// ===============================
// DADOS DAS RECEITAS (JSON FAKE)
// ===============================

const receitas = [
  {
    id: 1,
    titulo: "Pão de Queijo Tradicional",
    tipo: "café da manhã",
    tempo: 30,
    dificuldade: "facil", // "facil" | "medio" | "dificil"
    avaliacao: 5.0,
    imagem: "https://images.pexels.com/photos/4106483/pexels-photo-4106483.jpeg",
    descricaoCurta:
      "Pão de queijo crocante por fora e macio por dentro, perfeito para acompanhar um café.",
    ingredientes: [
      "500g de polvilho azedo",
      "1 xícara de leite",
      "1/2 xícara de óleo",
      "2 ovos",
      "200g de queijo minas ralado",
      "1 colher de chá de sal"
    ],
    modoPreparo: [
      "Preaqueça o forno a 180ºC.",
      "Ferva o leite com o óleo e o sal.",
      "Despeje sobre o polvilho e misture bem.",
      "Deixe amornar, adicione os ovos e o queijo.",
      "Modele bolinhas e coloque numa assadeira untada.",
      "Asse por cerca de 25 minutos ou até dourar."
    ],
    comentarios: [
      {
        autor: "Maria Silva",
        data: "05/01/2026",
        texto: "Ficou perfeito! Toda a família adorou.",
        estrelas: 5
      }
    ]
  },
  {
    id: 2,
    titulo: "Lasanha de Bolonhesa",
    tipo: "prato principal",
    tempo: 60,
    dificuldade: "medio",
    avaliacao: 4.8,
    imagem: "https://images.pexels.com/photos/803963/pexels-photo-803963.jpeg",
    descricaoCurta:
      "Lasanha clássica com molho bolonhesa e camada cremosa de queijo.",
    ingredientes: [
      "500g de massa para lasanha",
      "500g de carne moída",
      "2 xícaras de molho de tomate",
      "1 cebola picada",
      "2 dentes de alho picados",
      "300g de queijo muçarela",
      "Sal e pimenta a gosto"
    ],
    modoPreparo: [
      "Refogue cebola e alho, adicione a carne e doure bem.",
      "Junte o molho de tomate, tempere e deixe cozinhar.",
      "Monte em camadas de massa, molho e queijo.",
      "Finalize com bastante queijo por cima.",
      "Leve ao forno a 200ºC por cerca de 30 minutos."
    ],
    comentarios: [
      {
        autor: "João Pereira",
        data: "07/01/2026",
        texto: "Bem cremosa, só acrescentei mais queijo.",
        estrelas: 4
      }
    ]
  },
  {
    id: 3,
    titulo: "Brownie de Chocolate",
    tipo: "sobremesa",
    tempo: 40,
    dificuldade: "facil",
    avaliacao: 4.9,
    imagem: "https://images.pexels.com/photos/45202/chocolate-brownie-cake-sweet-45202.jpeg",
    descricaoCurta:
      "Brownie molhadinho por dentro, com aquela casquinha crocante irresistível.",
    ingredientes: [
      "200g de chocolate meio amargo",
      "150g de manteiga",
      "3 ovos",
      "1 xícara de açúcar",
      "1 xícara de farinha de trigo",
      "1 pitada de sal"
    ],
    modoPreparo: [
      "Derreta o chocolate com a manteiga.",
      "Bata os ovos com o açúcar até clarear.",
      "Misture o chocolate derretido aos ovos.",
      "Adicione a farinha e o sal, incorporando delicadamente.",
      "Coloque em forma untada e leve ao forno a 180ºC por 25 minutos."
    ],
    comentarios: [
      {
        autor: "Ana Costa",
        data: "04/01/2026",
        texto: "Muito fácil e delicioso!",
        estrelas: 5
      }
    ]
  },
  {
    id: 4,
    titulo: "Salada Colorida com Molho Cítrico",
    tipo: "entrada",
    tempo: 15,
    dificuldade: "facil",
    avaliacao: 4.6,
    imagem: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    descricaoCurta:
      "Salada leve e refrescante com legumes crocantes e molho cítrico.",
    ingredientes: [
      "Folhas verdes",
      "Tomate cereja",
      "Cenoura ralada",
      "Pepino fatiado",
      "Sumo de limão",
      "Azeite, sal e pimenta"
    ],
    modoPreparo: [
      "Lave e prepare todos os vegetais.",
      "Misture tudo numa tigela.",
      "Tempere com sumo de limão, azeite, sal e pimenta a gosto."
    ],
    comentarios: []
  },
  {
    id: 5,
    titulo: "Frango Assado com Ervas",
    tipo: "prato principal",
    tempo: 90,
    dificuldade: "medio",
    avaliacao: 4.7,
    imagem: "https://www.aromaticasvivas.com/imgs/receitas/nelson_ribeiro_frango_ervas_arom_ticas.png",
    descricaoCurta:
      "Frango assado dourado com mistura de ervas aromáticas e limão.",
    ingredientes: [
      "1 frango inteiro",
      "Ervas aromáticas a gosto",
      "2 dentes de alho",
      "Sumo de 1 limão",
      "Azeite, sal e pimenta"
    ],
    modoPreparo: [
      "Tempere o frango com as ervas, alho, limão, sal e pimenta.",
      "Deixe marinar por pelo menos 30 minutos.",
      "Leve ao forno a 200ºC até dourar e cozinhar por completo."
    ],
    comentarios: []
  },
  {
    id: 6,
    titulo: "Taça de Iogurte com Frutas",
    tipo: "sobremesa",
    tempo: 10,
    dificuldade: "facil",
    avaliacao: 4.3,
    imagem: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg",
    descricaoCurta:
      "Sobremesa rápida com camadas de iogurte, frutas frescas e granola.",
    ingredientes: [
      "Iogurte natural",
      "Frutas picadas",
      "Granola",
      "Mel a gosto"
    ],
    modoPreparo: [
      "Em um copo, faça camadas de iogurte, frutas e granola.",
      "Finalize com um fio de mel."
    ],
    comentarios: []
  }
];

// =====================
// FAVORITOS (LOCALSTORAGE)
// =====================

let receitasFavoritas = [];
const FAV_KEY = "receitasFavoritas";

(function inicializarFavoritos() {
  const favsGuardados = localStorage.getItem(FAV_KEY);
  if (favsGuardados) {
    try {
      receitasFavoritas = JSON.parse(favsGuardados);
    } catch (e) {
      receitasFavoritas = [];
    }
  }
})();

function guardarFavoritos() {
  localStorage.setItem(FAV_KEY, JSON.stringify(receitasFavoritas));
}

function toggleFavorita(id) {
  const index = receitasFavoritas.indexOf(id);
  if (index === -1) {
    receitasFavoritas.push(id);
  } else {
    receitasFavoritas.splice(index, 1);
  }
  guardarFavoritos();
}

function getReceitasFavoritas() {
  return receitas.filter((r) => receitasFavoritas.includes(r.id));
}

// =====================
// CRIAÇÃO DE CARDS
// =====================

function criarCardReceita(receita) {
  const difLabel =
    receita.dificuldade === "facil"
      ? "fácil"
      : receita.dificuldade === "medio"
      ? "médio"
      : "difícil";

  const isFavorita = receitasFavoritas.includes(receita.id);

  return `
    <article class="recipe-card" data-id="${receita.id}">
      <div class="recipe-image">
        <img src="${receita.imagem}" alt="${receita.titulo}">
        <span class="badge ${receita.dificuldade}">${difLabel}</span>
        <button class="like-btn ${isFavorita ? "liked" : ""}" data-id="${
    receita.id
  }" aria-label="Adicionar aos favoritos">
          ${isFavorita ? "♥" : "♡"}
        </button>
      </div>
      <div class="recipe-card-body">
        <h3 class="recipe-title">${receita.titulo}</h3>
        <p class="recipe-description">
          ${receita.descricaoCurta || ""}
        </p>
        <div class="recipe-footer">
          <div class="recipe-meta-item">
            <span class="meta-icon">⏱</span>
            <span>${receita.tempo} min</span>
          </div>
          <div class="recipe-meta-item">
            <span class="meta-icon">⭐</span>
            <span>${(receita.avaliacao || 5).toFixed(1)}</span>
          </div>
          <span class="recipe-tag">${receita.tipo}</span>
        </div>
      </div>
    </article>
  `;
}

// =====================
// FILTROS E PESQUISA
// =====================

function obterReceitasFiltradas() {
  const searchInput = document.getElementById("searchInput");
  const tipoSelect = document.getElementById("tipoPrato");
  const dificuldadeSelect = document.getElementById("dificuldade");
  const tempoMaxSelect = document.getElementById("tempoMaximo");

  const termo = searchInput ? searchInput.value.toLowerCase().trim() : "";
  const tipo = tipoSelect ? tipoSelect.value : "";
  const dificuldade = dificuldadeSelect ? dificuldadeSelect.value : "";
  const tempoMax = tempoMaxSelect && tempoMaxSelect.value
    ? Number(tempoMaxSelect.value)
    : null;

  return receitas.filter((r) => {
    // filtro por pesquisa (título + tipo)
    const matchPesquisa =
      !termo ||
      r.titulo.toLowerCase().includes(termo) ||
      r.tipo.toLowerCase().includes(termo);

    // filtro por tipo de prato
    const matchTipo = !tipo || r.tipo === tipo;

    // filtro por dificuldade
    const matchDificuldade = !dificuldade || r.dificuldade === dificuldade;

    // filtro por tempo máximo
    const matchTempo = !tempoMax || r.tempo <= tempoMax;

    return matchPesquisa && matchTipo && matchDificuldade && matchTempo;
  });
}

// =====================
// RENDERIZAÇÃO PRINCIPAL
// =====================

function renderRecipes(lista) {
  const grid = document.getElementById("recipesGrid");
  const countEl = document.getElementById("recipesCount");
  if (!grid) return;

  const receitasParaMostrar = lista || obterReceitasFiltradas();

  grid.innerHTML = "";
  receitasParaMostrar.forEach((receita) => {
    grid.innerHTML += criarCardReceita(receita);
  });

  if (countEl) countEl.textContent = receitasParaMostrar.length;

  ligarEventosLikes(grid);
  ligarEventosCards(grid);
}

// =====================
// EVENTOS DE LIKE E CARDS
// =====================

function ligarEventosLikes(container) {
  const likeButtons = container.querySelectorAll(".like-btn");
  likeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // não abrir modal ao clicar no coração
      const id = Number(btn.dataset.id);
      toggleFavorita(id);
      renderRecipes(); // re-render para atualizar coração
    });
  });
}

function ligarEventosCards(container) {
  const cards = container.querySelectorAll(".recipe-card");
  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".like-btn")) return; // já tratado
      const id = Number(card.dataset.id);
      abrirModalReceita(id);
    });
  });
}

// =====================
// MODAL DE RECEITA
// =====================

function abrirModalReceita(id) {
  const modal = document.getElementById("recipeModal");
  if (!modal) return;

  const receita = receitas.find((r) => r.id === id);
  if (!receita) return;

  document.getElementById("modalImage").src = receita.imagem;
  document.getElementById("modalImage").alt = receita.titulo;
  document.getElementById("modalTitle").textContent = receita.titulo;
  document.getElementById("modalDescription").textContent =
    receita.descricaoCurta || "";
  document.getElementById("modalTempo").textContent = `${receita.tempo} minutos`;

  const difLabel =
    receita.dificuldade === "facil"
      ? "Fácil"
      : receita.dificuldade === "medio"
      ? "Médio"
      : "Difícil";
  document.getElementById("modalDificuldade").textContent = difLabel;

  document.getElementById(
    "modalAvaliacao"
  ).textContent = `${(receita.avaliacao || 5).toFixed(1)} estrelas`;

  // ingredientes
  const ingList = document.getElementById("modalIngredientes");
  ingList.innerHTML = "";
  (receita.ingredientes || []).forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    ingList.appendChild(li);
  });

  // modo de preparo
  const prepList = document.getElementById("modalModoPreparo");
  prepList.innerHTML = "";
  (receita.modoPreparo || []).forEach((passo) => {
    const li = document.createElement("li");
    li.textContent = passo;
    prepList.appendChild(li);
  });

  // comentários
  const commentsContainer = document.getElementById("modalComentarios");
  commentsContainer.innerHTML = "";
  (receita.comentarios || []).forEach((c) => {
    const div = document.createElement("div");
    div.classList.add("comment-card");
    div.innerHTML = `
      <strong>${c.autor}</strong> · ${c.data} · ${"⭐".repeat(
      c.estrelas || 0
    )}<br>
      <span>${c.texto}</span>
    `;
    commentsContainer.appendChild(div);
  });

  modal.classList.remove("hidden");

  const closeBtn = document.getElementById("modalCloseBtn");
  const backdrop = modal.querySelector(".modal-backdrop");

  if (closeBtn) closeBtn.onclick = fecharModalReceita;
  if (backdrop) backdrop.onclick = fecharModalReceita;

  document.addEventListener("keydown", escListener);
}

function fecharModalReceita() {
  const modal = document.getElementById("recipeModal");
  if (!modal) return;
  modal.classList.add("hidden");
  document.removeEventListener("keydown", escListener);
}

function escListener(e) {
  if (e.key === "Escape") {
    fecharModalReceita();
  }
}

// =====================
// INICIALIZAÇÃO DA PÁGINA
// =====================

document.addEventListener("DOMContentLoaded", () => {
  // só roda em receitas.html (onde existe recipesGrid)
  const grid = document.getElementById("recipesGrid");
  if (!grid) return;

  // listeners dos filtros
  const searchInput = document.getElementById("searchInput");
  const tipoSelect = document.getElementById("tipoPrato");
  const dificuldadeSelect = document.getElementById("dificuldade");
  const tempoMaxSelect = document.getElementById("tempoMaximo");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderRecipes();
    });
  }

  [tipoSelect, dificuldadeSelect, tempoMaxSelect].forEach((select) => {
    if (select) {
      select.addEventListener("change", () => {
        renderRecipes();
      });
    }
  });

  // render inicial
  renderRecipes();
});