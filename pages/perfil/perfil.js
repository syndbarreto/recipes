const profileFoto = document.getElementById("profileFoto");
const profileNome = document.getElementById("profileNome");
const profileBio = document.getElementById("profileBio");
const profileHandle = document.getElementById("profileHandle");

const favoritasGrid = document.getElementById("favoritasGrid");
const criadasGrid = document.getElementById("criadasGrid");

const favoritasVazio = document.getElementById("favoritasVazio");
const criadasVazio = document.getElementById("criadasVazio");

const tabButtons = document.querySelectorAll(".tab-btn");
const tabFavoritas = document.getElementById("tabFavoritas");
const tabCriadas = document.getElementById("tabCriadas");

const btnLogout = document.getElementById("btnLogout");

let utilizadorAtual = null;
let receitas = [];

// utilitários são fornecidos por utils.js

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const tab = btn.dataset.tab;
    if (tab === "favoritas") {
      tabFavoritas.classList.add("active");
      tabCriadas.classList.remove("active");
    } else {
      tabCriadas.classList.add("active");
      tabFavoritas.classList.remove("active");
    }
  });
});

function renderizarPerfil() {
  if (!utilizadorAtual) return;

  const ADMIN_IMG =
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const USER_IMG =
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const isAdmin = utilizadorAtual.perfil === "admin";
  const preferida = isAdmin ? ADMIN_IMG : USER_IMG;

  const fallback = "https://via.placeholder.com/120?text=User";
  profileFoto.onerror = () => {
    if (profileFoto.src !== fallback) {
      profileFoto.src = fallback;
    }
  };
  profileFoto.src = preferida;

  profileNome.textContent = utilizadorAtual.nome || "Utilizador";
  profileBio.textContent =
    (utilizadorAtual.bio && utilizadorAtual.bio.trim()) || "Sem bio ainda";

  const handleBase =
    utilizadorAtual.username ||
    (utilizadorAtual.email ? utilizadorAtual.email.split("@")[0] : "");
  profileHandle.textContent = handleBase ? "@" + handleBase : "";
}

function criarCardReceita(r) {
  const card = document.createElement("article");
  card.className = "profile-recipe-card";
  card.innerHTML = `
    <img src="${r.imagem}" alt="${r.titulo}" class="profile-recipe-image" />
    <div class="profile-recipe-body">
      <h3 class="profile-recipe-title">${r.titulo}</h3>
      <p class="profile-recipe-meta">
        ${r.tempo} min • ${r.tipo} • ${labelDificuldade(r.dificuldade)}
      </p>
    </div>
  `;
  return card;
}

function renderizarFavoritas() {
  favoritasGrid.innerHTML = "";
  favoritasVazio.classList.add("hidden");

  const favIds = utilizadorAtual.favoritos || [];
  const favoritas = receitas.filter((r) => favIds.includes(r.id));

  if (!favoritas.length) {
    favoritasVazio.classList.remove("hidden");
    return;
  }

  favoritas.forEach((r) => favoritasGrid.appendChild(criarCardReceita(r)));
}

function renderizarCriadas() {
  criadasGrid.innerHTML = "";
  criadasVazio.classList.add("hidden");

  const criadasIdsBase = utilizadorAtual.receitasCriadas || [];
  const criadasBase = receitas.filter((r) => criadasIdsBase.includes(r.id));

  const criadasExtras = receitas.filter(
    (r) =>
      r.autorId === utilizadorAtual.id &&
      (r.aprovada === true || r.aprovada === undefined)
  );

  const todasCriadas = [...criadasBase, ...criadasExtras];

  if (!todasCriadas.length) {
    criadasVazio.classList.remove("hidden");
    return;
  }

  todasCriadas.forEach((r) => criadasGrid.appendChild(criarCardReceita(r)));
}

async function carregarDados() {
  const logged = getLoggedUser();
  if (!logged) {
    alert("Faça login para ver o perfil.");
    window.location.href = "../login/login.html";
    return;
  }

  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      sessionStorage.removeItem("loggedUser");
      window.location.href = "../login/login.html";
    });
  }

  try {
    const [usersResp, receitasResp] = await Promise.all([
      fetch("../../data/usuarios.json"),
      fetch("../../data/receitas.json"),
    ]);

    const utilizadores = await usersResp.json();
    receitas = await receitasResp.json();

    const extras = loadExtraAprovadas().filter((r) => r.aprovada);
    if (extras.length) {
      receitas = [...receitas, ...extras];
    }

    const excluidas = loadExcluidas();
    if (excluidas && excluidas.length) {
      receitas = receitas.filter((r) => !excluidas.includes(r.id));
    }

    utilizadorAtual = utilizadores.find((u) => u.id === logged.id);

    // Se houver favoritos atualizados na sessão, priorizar sobre o JSON estático
    const loggedSess = getLoggedUser();
    if (loggedSess && loggedSess.id === logged.id) {
      if (Array.isArray(loggedSess.favoritos)) {
        utilizadorAtual.favoritos = loggedSess.favoritos;
      }
    }

    if (!utilizadorAtual) {
      alert("Utilizador não encontrado no JSON.");
      return;
    }

    renderizarPerfil();
    renderizarFavoritas();
    renderizarCriadas();
  } catch (e) {
    console.error("Erro ao carregar dados do perfil:", e);
    alert("Não foi possível carregar os dados do perfil.");
  }
}

carregarDados();
