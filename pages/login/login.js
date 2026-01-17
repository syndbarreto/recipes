const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginErro = document.getElementById("loginErro");

let utilizadores = [];

async function carregarUtilizadores() {
  try {
    const resp = await fetch("../../data/usuarios.json");
    utilizadores = await resp.json();
  } catch (e) {
    console.error("Erro ao carregar data/usuarios.json", e);
    if (loginErro) {
      loginErro.textContent = "Erro ao carregar utilizadores.";
    }
  }
}

carregarUtilizadores();

function guardarUsuarioNaSessao(user) {
  const userSessao = {
    id: user.id,
    nome: user.nome,
    email: user.email,
    perfil: user.perfil,
  };
  sessionStorage.setItem("loggedUser", JSON.stringify(userSessao));
}

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (loginErro) loginErro.textContent = "";

    const email = emailInput.value.trim();
    const senha = passwordInput.value.trim();

    if (!email || !senha) {
      if (loginErro) loginErro.textContent = "Preencha o e-mail e a senha.";
      return;
    }

    if (!utilizadores.length) {
      await carregarUtilizadores();
    }

    const user = utilizadores.find(
      (u) => u.email === email && u.senha === senha
    );

    if (!user) {
      if (loginErro) loginErro.textContent =
        "Credenciais inválidas. Tente novamente.";
      return;
    }

    guardarUsuarioNaSessao(user);

    window.location.href = "../../index.html";
  });
}
