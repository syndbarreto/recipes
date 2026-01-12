// Elementos do cabeçalho
const profileFoto = document.getElementById("profileFoto");
const profileNome = document.getElementById("profileNome");
const profileBio = document.getElementById("profileBio");
const profileHandle = document.getElementById("profileHandle");

// Grids
const favoritasGrid = document.getElementById("favoritasGrid");
const criadasGrid = document.getElementById("criadasGrid");

// Mensagens de vazio
const favoritasVazio = document.getElementById("favoritasVazio");
const criadasVazio = document.getElementById("criadasVazio");

// Tabs
const tabButtons = document.querySelectorAll(".tab-btn");
const tabFavoritas = document.getElementById("tabFavoritas");
const tabCriadas = document.getElementById("tabCriadas");

let utilizadorAtual = null;
let receitas = [];

// Lê ?id=1 da URL
function obterIdDoUrl() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  return id ? Number(id) : null;
}

// Troca de abas
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

// Render perfil
function renderizarPerfil() {
  if (!utilizadorAtual) return;
  const ADMIN_IMG = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBlcmZpbHxlbnwwfHwwfHx8MA%3D%3D";
  const USER_IMG = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const isAdmin = (utilizadorAtual.perfil === "admin");
  // Tenta usar a imagem padrão por papel, com fallback para a foto do JSON
  const preferida = isAdmin ? ADMIN_IMG : USER_IMG;
  const fallback = utilizadorAtual.foto || "https://via.placeholder.com/120";
  profileFoto.onerror = () => {
    // evita loop de erro se o fallback também falhar
    if (profileFoto.src !== fallback) {
      profileFoto.src = fallback;
    }
  };
  profileFoto.src = preferida;
  profileNome.textContent = utilizadorAtual.nome;
  profileBio.textContent = (utilizadorAtual.bio && utilizadorAtual.bio.trim().length > 0)
    ? utilizadorAtual.bio.trim()
    : "Sem bio ainda";
  const handleBase =
    utilizadorAtual.username ||
    (utilizadorAtual.email
      ? utilizadorAtual.email.split("@")[0]
      : "user");
  profileHandle.textContent = "@" + handleBase;
}

// Cria card de receita para o perfil
function criarCardReceita(receita) {
  const card = document.createElement("article");
  card.classList.add("profile-recipe-card");

  card.innerHTML = `
    <img
      src="${receita.imagem}"
      alt="${receita.titulo}"
      class="profile-recipe-image"
    >
    <div class="profile-recipe-body">
      <h3 class="profile-recipe-title">${receita.titulo}</h3>
      <p class="profile-recipe-meta">
        ${receita.tempo} min • ${receita.tipo}
      </p>
    </div>
  `;

  return card;
}

function renderizarFavoritas() {
  favoritasGrid.innerHTML = "";

  const favoritasIds = utilizadorAtual.favoritos || [];
  const favoritas = receitas.filter((r) => favoritasIds.includes(r.id));

  if (!favoritas.length) {
    favoritasVazio.classList.remove("hidden");
    return;
  }

  favoritasVazio.classList.add("hidden");
  favoritas.forEach((r) => favoritasGrid.appendChild(criarCardReceita(r)));
}

function renderizarCriadas() {
  criadasGrid.innerHTML = "";

  const criadasIds = utilizadorAtual.receitasCriadas || [];
  const criadas = receitas.filter((r) => criadasIds.includes(r.id));

  if (!criadas.length) {
    criadasVazio.classList.remove("hidden");
    return;
  }

  criadasVazio.classList.add("hidden");
  criadas.forEach((r) => criadasGrid.appendChild(criarCardReceita(r)));
}

// Carrega utilizador + receitas
async function carregarDados() {
  const userId = obterIdDoUrl();
  if (!userId) {
    alert("URL inválida: use perfil.html?id=1 (por exemplo).");
    return;
  }

  try {
    const [usersResp, receitasResp] = await Promise.all([
      fetch("data/usuarios.json"),
      fetch("data/receitas.json"),
    ]);

    const utilizadores = await usersResp.json();
    receitas = await receitasResp.json();

    utilizadorAtual = utilizadores.find((u) => u.id === userId);

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