const utilizadores = [
  {
    id: 1,
    nome: "Admin",
    email: "admin@receitas.com",
    password: "admin123",
    tipo: "admin"
  },
  {
    id: 2,
    nome: "Convidado",
    email: "user@receitas.com",
    password: "user123",
    tipo: "user"
  }
];

let utilizadorAtual = null;

function carregarUtilizador() {
  const userGuardado = localStorage.getItem("utilizadorAtual");
  if (userGuardado) {
    try {
      utilizadorAtual = JSON.parse(userGuardado);
    } catch (e) {
      utilizadorAtual = null;
    }
  }
}

function guardarUtilizador() {
  if (utilizadorAtual) {
    localStorage.setItem("utilizadorAtual", JSON.stringify(utilizadorAtual));
  } else {
    localStorage.removeItem("utilizadorAtual");
  }
}

function loginComCredenciais(email, password) {
  const user = utilizadores.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.password === password
  );

  if (!user) return false;

  utilizadorAtual = user;
  guardarUtilizador();
  window.location.href = "receitas.html"; // <— app de receitas
  return true;
}

function logout() {
  utilizadorAtual = null;
  guardarUtilizador();
  window.location.href = "index.html"; // 
}

function protegerPagina() {
  carregarUtilizador();
  if (!utilizadorAtual) {
    window.location.href = "index.html";
  }
}

function atualizarUIUsuario() {
  carregarUtilizador();

  const profileBtn = document.getElementById("profileButton");
  const logoutBtn  = document.getElementById("logoutButton");

  if (!profileBtn) return;

  if (!utilizadorAtual) {
    // NINGUÉM LOGADO
    profileBtn.textContent = "Entrar";
    profileBtn.onclick = () => {
      window.location.href = "index.html#login";
    };

    if (logoutBtn) {
      logoutBtn.style.display = "none";
      logoutBtn.onclick = null;
    }
  } else {
    // JÁ LOGADO (admin ou user)
    profileBtn.textContent = "Perfil"; // <- aqui troca o nome pelo texto "Perfil"
    profileBtn.onclick = () => {
      window.location.href = "perfil.html";
    };

    if (logoutBtn) {
      logoutBtn.style.display = "inline-flex";
      logoutBtn.onclick = () => logout();
    }
  }

  // elementos só para admin (se tiver)
  const elementosAdmin = document.querySelectorAll("[data-admin-only]");
  elementosAdmin.forEach((el) => {
    el.style.display =
      utilizadorAtual && utilizadorAtual.tipo === "admin" ? "" : "none";
  });
}