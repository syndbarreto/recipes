document.addEventListener("DOMContentLoaded", () => {
  // 1. Preencher informações do utilizador
  carregarUtilizador(); // vem do auth.js

  const nameEl = document.getElementById("profileName");
  const emailEl = document.getElementById("profileEmail");
  const roleEl = document.getElementById("profileRole");

  if (utilizadorAtual) {
    nameEl.textContent = utilizadorAtual.nome;
    emailEl.textContent = utilizadorAtual.email;
    roleEl.textContent =
      utilizadorAtual.tipo === "admin" ? "Administrador" : "Utilizador";
  } else {
    // em teoria nem devia cair aqui porque protegerPagina() já redireciona
    nameEl.textContent = "—";
    emailEl.textContent = "—";
    roleEl.textContent = "—";
  }

  // 2. Renderizar receitas favoritas
  renderizarFavoritosPerfil();
});

function renderizarFavoritosPerfil() {
  const grid = document.getElementById("favoritesGrid");
  const emptyMessage = document.getElementById("noFavoritesMessage");
  if (!grid) return;

  // garantir que a variável existe
  if (typeof receitasFavoritas === "undefined") {
    window.receitasFavoritas = [];
  }

  // carregar do localStorage
  const favsGuardados = localStorage.getItem("receitasFavoritas");
  if (favsGuardados) {
    try {
      receitasFavoritas = JSON.parse(favsGuardados);
    } catch (e) {
      receitasFavoritas = [];
    }
  }

  // usar função auxiliar vinda do script.js
  const favoritas =
    typeof getReceitasFavoritas === "function"
      ? getReceitasFavoritas()
      : [];

  grid.innerHTML = "";

  if (!favoritas.length) {
    if (emptyMessage) emptyMessage.style.display = "block";
    return;
  } else if (emptyMessage) {
    emptyMessage.style.display = "none";
  }

  // criar os cards com o mesmo visual da página de receitas
  favoritas.forEach((receita) => {
    grid.innerHTML += criarCardReceita(receita);
  });

  // like no perfil também remove dos favoritos
  if (typeof ligarEventosLikes === "function") {
    ligarEventosLikes(grid);
  }

  // clicar no card abre o modal de detalhes (se existir)
  if (typeof ligarEventosCards === "function") {
    ligarEventosCards(grid);
  }
}