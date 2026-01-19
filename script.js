// ---------------- DOM BÁSICO ----------------
const recipesGrid = document.getElementById("recipesGrid");
const recipesCount = document.getElementById("recipesCount");
const searchInput = document.getElementById("searchInput");
const tipoPrato = document.getElementById("tipoPrato");
const dificuldadeSelect = document.getElementById("dificuldade");
const tempoMaximo = document.getElementById("tempoMaximo");

// navegação
const linkCriar = document.getElementById("linkCriarReceita");
const linkPerfil = document.getElementById("linkPerfil");
const linkAdmin = document.getElementById("linkAdmin");
const btnLogout = document.getElementById("btnLogout");

// modal
const modal = document.getElementById("recipeModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescricao = document.getElementById("modalDescricao");
const modalTempo = document.getElementById("modalTempo");
const modalDificuldade = document.getElementById("modalDificuldade");
const modalIngredientes = document.getElementById("modalIngredientes");
const modalPreparo = document.getElementById("modalPreparo");

// ---------------- ESTADO ----------------
let receitasBase = [];
let receitasExtras = [];
let receitas = [];

// Lista padrão caso o fetch() falhe (ex.: aberto via file://)
const DEFAULT_RECEITAS = [
  {
    id: 1,
    titulo: "Frango Assado com Ervas",
    dificuldade: "facil",
    tempo: 60,
    tipo: "principal",
    imagem: "https://i.panelinha.com.br/i1/bk-7568-mgl7602.webp",
    descricao: "Frango assado suculento com ervas aromáticas.",
    ingredientes: [
      "1 frango inteiro",
      "2 colheres de sopa de azeite",
      "Ervas frescas (alecrim, tomilho, salsa)",
      "Sal e pimenta a gosto",
    ],
    modoPreparo: [
      "Pré-aqueça o forno a 200°C.",
      "Tempere o frango com sal, pimenta, azeite e ervas.",
      "Leve ao forno por cerca de 60 minutos ou até dourar.",
    ],
  },
  {
    id: 2,
    titulo: "Brownie de Chocolate",
    dificuldade: "medio",
    tempo: 40,
    tipo: "sobremesa",
    imagem:
      "https://feed.continente.pt/media/2xfnxmki/brownie-chocolate.jpg?anchor=center&mode=crop&width=826&height=620&rnd=133761624161770000&format=webp",
    descricao: "Brownie bem chocolatudo, fofinho por dentro.",
    ingredientes: ["200 g de chocolate", "3 ovos", "1 chávena de açúcar", "1/2 chávena de farinha"],
    modoPreparo: [
      "Derreta o chocolate.",
      "Misture com os ovos e o açúcar.",
      "Adicione a farinha e leve ao forno por 30-40 minutos.",
    ],
  },
  {
    id: 3,
    titulo: "Salada Caesar",
    dificuldade: "facil",
    tempo: 20,
    tipo: "entrada",
    imagem: "https://i.pinimg.com/736x/f9/be/a1/f9bea17b6ace81729c5183fe4793c44b.jpg",
    descricao: "Salada clássica com alface, croutons e molho Caesar.",
    ingredientes: ["1 alface romana", "Croutons", "Queijo parmesão ralado", "Molho Caesar"],
    modoPreparo: [
      "Lave e rasgue a alface.",
      "Adicione os croutons e o queijo.",
      "Regue com o molho Caesar e misture.",
    ],
  },
  {
    id: 4,
    titulo: "Francesinha",
    dificuldade: "dificil",
    tempo: 90,
    tipo: "principal",
    imagem: "https://i.pinimg.com/1200x/ec/f5/bb/ecf5bb5e272dfe053ce56d757b251b1c.jpg",
    descricao: "Sanduíche tradicional português com carnes e molho especial.",
    ingredientes: [
      "Pão de forma",
      "Bife de carne",
      "Presunto",
      "Salsicha",
      "Queijo",
      "Molho especial",
    ],
    modoPreparo: [
      "Monte o sanduíche com as carnes e o queijo.",
      "Cubra com o molho especial.",
      "Leve ao forno para gratinar o queijo.",
    ],
  },
];

// ---------------- UTILITÁRIOS DE SESSÃO (via utils.js) ----------------

// ---------------- NAVEGAÇÃO / SESSÃO ----------------
(function initSessaoENav() {
  const user = getLoggedUser();

  // se quiser obrigar login, descomentar abaixo:
  // if (!user) { window.location.href = "login.html"; return; }

  if (linkCriar) linkCriar.href = "pages/criar/criar.html";
  if (linkPerfil) linkPerfil.href = "pages/perfil/perfil.html";

  if (linkAdmin) {
    if (user && user.perfil === "admin") {
      linkAdmin.style.display = "inline-block";
    } else {
      linkAdmin.style.display = "none";
    }
  }

  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      sessionStorage.removeItem("loggedUser");
      window.location.href = "pages/login/login.html";
    });
  }
})();

// ---------------- UTIL ----------------
// labelDificuldade fornecida por utils.js

// ---------------- MODAL ----------------
function abrirModal(receita) {
  if (!modal) return;

  modalImage.src = receita.imagem;
  modalTitle.textContent = receita.titulo;
  modalDescricao.textContent = receita.descricao || "";
  modalTempo.textContent = `${receita.tempo} min`;
  modalDificuldade.textContent = labelDificuldade(receita.dificuldade);

  modalIngredientes.innerHTML = "";
  (receita.ingredientes || []).forEach((ing) => {
    const li = document.createElement("li");
    li.textContent = ing;
    modalIngredientes.appendChild(li);
  });

  modalPreparo.innerHTML = "";
  (receita.modoPreparo || []).forEach((passo) => {
    const li = document.createElement("li");
    li.textContent = passo;
    modalPreparo.appendChild(li);
  });

  modal.classList.remove("hidden");
}

function fecharModal() {
  if (!modal) return;
  modal.classList.add("hidden");
}

if (modalOverlay) modalOverlay.addEventListener("click", fecharModal);
if (modalClose) modalClose.addEventListener("click", fecharModal);

// ---------------- RENDERIZAÇÃO ----------------
function renderReceitas(lista) {
  if (!recipesGrid || !recipesCount) return;

  recipesGrid.innerHTML = "";

  lista.forEach((receita) => {
    const card = document.createElement("article");
    card.classList.add("recipe-card");

    const difLabel = labelDificuldade(receita.dificuldade);

    const favIds = getLoggedFavorites();
    const isLiked = favIds.includes(receita.id);

    card.innerHTML = `
      <div class="recipe-image">
        <img src="${receita.imagem}" alt="${receita.titulo}">
        <span class="badge ${receita.dificuldade}">${difLabel}</span>
      </div>
      <div class="recipe-card-body">
        <h3 class="recipe-title">${receita.titulo}</h3>
        <p class="recipe-meta">${receita.tempo} min • ${receita.tipo}</p>
      </div>
      <div class="recipe-actions">
        <button class="like-btn ${isLiked ? "liked" : ""}" aria-label="Favoritar"></button>
      </div>
    `;

    card.addEventListener("click", () => abrirModal(receita));

    const likeBtn = card.querySelector(".like-btn");
    if (likeBtn) {
      likeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const user = getLoggedUser();
        if (!user) {
          alert("Faça login para favoritar receitas.");
          window.location.href = "pages/login/login.html";
          return;
        }
        let favs = Array.isArray(user.favoritos) ? [...user.favoritos] : [];
        const idx = favs.indexOf(receita.id);
        if (idx >= 0) {
          favs.splice(idx, 1);
          likeBtn.classList.remove("liked");
        } else {
          favs.push(receita.id);
          likeBtn.classList.add("liked");
        }
        user.favoritos = favs;
        sessionStorage.setItem("loggedUser", JSON.stringify(user));
      });
    }

    recipesGrid.appendChild(card);
  });

  recipesCount.textContent = String(lista.length);

    if (!lista.length) {
      const empty = document.createElement("p");
      empty.className = "empty-message";
      empty.style.padding = "16px";
      empty.textContent =
        "Nenhuma receita encontrada. Se adicionou uma receita, aguarde aprovação do admin. Se nada aparece, abra pelo servidor (http://localhost) e não diretamente o ficheiro.";
      recipesGrid.appendChild(empty);
    }
}

// ---------------- FILTROS ----------------
function filtrarReceitas() {
  let filtradas = [...receitas];

  const termo = (searchInput?.value || "").toLowerCase();
  const filtroTipo = tipoPrato?.value || "";
  const filtroDif = dificuldadeSelect?.value || "";
  const filtroTempo = tempoMaximo?.value || "";

  if (termo) {
    filtradas = filtradas.filter((r) =>
      r.titulo.toLowerCase().includes(termo)
    );
  }

  if (filtroTipo) {
    filtradas = filtradas.filter((r) => r.tipo === filtroTipo);
  }

  if (filtroDif) {
    filtradas = filtradas.filter((r) => r.dificuldade === filtroDif);
  }

  if (filtroTempo) {
    const max = Number(filtroTempo);
    filtradas = filtradas.filter((r) => r.tempo <= max);
  }

  renderReceitas(filtradas);
}

// ---------------- CARREGAMENTO DAS RECEITAS ----------------
async function carregarReceitas() {
  try {
    // usa sempre data/receitas.json (pasta data)
    const resp = await fetch("data/receitas.json");
    if (!resp.ok) throw new Error("Falha ao buscar receitas.json");
    receitasBase = await resp.json();
  } catch (e) {
    console.error("Erro ao carregar data/receitas.json", e);
    // alternativa para garantir que algo aparece no catálogo
    receitasBase = DEFAULT_RECEITAS;
  }

  receitasExtras = loadExtraAprovadas().filter((r) => r.aprovada);
  receitas = [...receitasBase, ...receitasExtras];

  const excluidas = loadExcluidas();
  if (excluidas && excluidas.length) {
    receitas = receitas.filter((r) => !excluidas.includes(r.id));
  }

  filtrarReceitas();
}

// listeners de filtro
if (searchInput) searchInput.addEventListener("input", filtrarReceitas);
if (tipoPrato) tipoPrato.addEventListener("change", filtrarReceitas);
if (dificuldadeSelect)
  dificuldadeSelect.addEventListener("change", filtrarReceitas);
if (tempoMaximo) tempoMaximo.addEventListener("change", filtrarReceitas);

// init
carregarReceitas();