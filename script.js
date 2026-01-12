let receitas = [];
let currentUser = {
  id: 1,
  nome: "Usuário Demo",
  perfil: "usuario",
  favoritos: [] // ids de receitas
};

const recipesGrid = document.getElementById("recipesGrid");
const recipesCount = document.getElementById("recipesCount");
const searchInput = document.getElementById("searchInput");
const tipoPrato = document.getElementById("tipoPrato");
const dificuldadeSelect = document.getElementById("dificuldade");
const tempoMaximo = document.getElementById("tempoMaximo");

// elementos da modal
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
const modalRating = document.getElementById("modalRating");
const modalComentario = document.getElementById("modalComentario");
const modalEnviarFeedback = document.getElementById("modalEnviarFeedback");

// mapeia para label com acento
function labelDificuldade(key) {
  if (key === "facil") return "Fácil";
  if (key === "medio") return "Médio";
  if (key === "dificil") return "Difícil";
  return key;
}

// --- Utilizador ativo e Navbar ---
function obterUserIdAtivo() {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = Number(params.get("id"));
  if (Number.isFinite(fromUrl) && fromUrl > 0) {
    try { localStorage.setItem("userId", String(fromUrl)); } catch {}
    return fromUrl;
  }
  const fromStorage = Number(localStorage.getItem("userId"));
  if (Number.isFinite(fromStorage) && fromStorage > 0) return fromStorage;
  return 1;
}

async function carregarUsuarioAtual() {
  const uid = obterUserIdAtivo();
  try {
    const resp = await fetch("data/usuarios.json");
    const usuarios = await resp.json();
    const found = usuarios.find((u) => u.id === uid);
    if (found) currentUser = found;
  } catch (e) {
    console.warn("Falha ao carregar usuarios.json; usando usuário demo", e);
  }
  configurarNavbarPorPerfil();
}

function configurarNavbarPorPerfil() {
  const headerNav = document.querySelector(".header-nav");
  const linkPerfil = document.getElementById("linkPerfil");
  if (linkPerfil) {
    linkPerfil.href = `perfil.html?id=${encodeURIComponent(currentUser.id)}`;
  }
  // Remove link de gestão anterior, se existir
  const prev = document.getElementById("linkGerirReceitas");
  if (prev && prev.parentElement) prev.parentElement.removeChild(prev);

  if (currentUser.perfil === "admin" && headerNav) {
    const manage = document.createElement("a");
    manage.className = "nav-link";
    manage.id = "linkGerirReceitas";
    manage.href = "admin.html";
    manage.textContent = "Gerir receitas";
    headerNav.appendChild(manage);
  }
}

// desenha cards
function renderReceitas(lista) {
  recipesGrid.innerHTML = "";

  lista.forEach((receita) => {
    const card = document.createElement("article");
    card.classList.add("recipe-card");

    const difLabel = labelDificuldade(receita.dificuldade);
    const isFavorito =
      currentUser && currentUser.favoritos.includes(receita.id);

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
        <button class="like-btn ${isFavorito ? "liked" : ""}" aria-label="Favorito">
          &#10084;
        </button>
      </div>
    `;

    // clique no card abre modal
    card.addEventListener("click", (e) => {
      // se clicou no botão de like, não abre a modal
      if (e.target.closest(".like-btn")) return;
      abrirModal(receita);
    });

    // clique no coração
    const likeBtn = card.querySelector(".like-btn");
    likeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorito(receita.id);
    });

    recipesGrid.appendChild(card);
  });

  recipesCount.textContent = lista.length;
}

// filtra
function filtrarReceitas() {
  const termo = searchInput.value.toLowerCase();
  const filtroTipo = tipoPrato.value;
  const filtroDificuldade = dificuldadeSelect.value;
  const filtroTempo = tempoMaximo.value;

  const filtradas = receitas.filter((r) => {
    const matchBusca = r.titulo.toLowerCase().includes(termo);
    const matchTipo = filtroTipo ? r.tipo === filtroTipo : true;
    const matchDif = filtroDificuldade
      ? r.dificuldade === filtroDificuldade
      : true;
    const matchTempo = filtroTempo ? r.tempo <= Number(filtroTempo) : true;

    return matchBusca && matchTipo && matchDif && matchTempo;
  });

  renderReceitas(filtradas);
}

// like / favoritos (simulação sem localStorage)
function toggleFavorito(receitaId) {
  if (!currentUser) return;

  const idx = currentUser.favoritos.indexOf(receitaId);
  if (idx === -1) {
    currentUser.favoritos.push(receitaId);
  } else {
    currentUser.favoritos.splice(idx, 1);
  }

  // re-render com estado atualizado
  filtrarReceitas();
}

// modal
function abrirModal(receita) {
  modalImage.src = receita.imagem;
  modalImage.alt = receita.titulo;
  modalTitle.textContent = receita.titulo;
  modalDescricao.textContent = receita.descricao || "";
  modalTempo.textContent = `${receita.tempo} minutos`;
  modalDificuldade.textContent = labelDificuldade(receita.dificuldade);

  modalIngredientes.innerHTML = "";
  (receita.ingredientes || []).forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    modalIngredientes.appendChild(li);
  });

  modalPreparo.innerHTML = "";
  (receita.modoPreparo || []).forEach((passo) => {
    const li = document.createElement("li");
    li.textContent = passo;
    modalPreparo.appendChild(li);
  });

  modalRating.value = "";
  modalComentario.value = "";

  modal.classList.remove("hidden");
}

function fecharModal() {
  modal.classList.add("hidden");
}

modalOverlay.addEventListener("click", fecharModal);
modalClose.addEventListener("click", fecharModal);

modalEnviarFeedback.addEventListener("click", () => {
  const nota = modalRating.value;
  const comentario = modalComentario.value.trim();

  if (!nota && !comentario) {
    alert("Dê uma nota e/ou escreva um comentário.");
    return;
  }

  // aqui é só simulação: poderias guardar num array em memória se quiser
  alert("Obrigado pelo feedback!");
  fecharModal();
});

// eventos dos filtros
searchInput.addEventListener("input", filtrarReceitas);
tipoPrato.addEventListener("change", filtrarReceitas);
dificuldadeSelect.addEventListener("change", filtrarReceitas);
tempoMaximo.addEventListener("change", filtrarReceitas);

// carregar receitas do JSON
async function carregarReceitas() {
  try {
    const resp = await fetch("data/receitas.json");
    receitas = await resp.json();
    renderReceitas(receitas);
  } catch (e) {
    console.error("Erro ao carregar receitas.json, usando fallback:", e);
    // se der erro, você pode colocar aqui um array fallback de receitas
  }
}

// inicialização
(async function init() {
  await carregarUsuarioAtual();
  await carregarReceitas();
})();

// logout: clear user and redirect to first page (index)
const btnLogout = document.getElementById("btnLogout");
if (btnLogout) {
  btnLogout.addEventListener("click", () => {
    try {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("userId");
    } catch {}
    currentUser = null;
    window.location.href = "login.html";
  });
}

// Perfil link é configurado em configurarNavbarPorPerfil()