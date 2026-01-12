const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginErro = document.getElementById("loginErro");

let utilizadores = [];

// Carregar utilizadores a partir do JSON
async function carregarUtilizadores() {
  try {
    const resp = await fetch("data/usuarios.json"); // garante que o ficheiro está dentro da pasta "data"
    utilizadores = await resp.json();
  } catch (e) {
    console.error("Erro ao carregar usuarios.json", e);
    loginErro.textContent = "Não foi possível carregar os utilizadores.";
  }
}

carregarUtilizadores();

// Handler do submit do formulário
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  loginErro.textContent = "";

  const email = emailInput.value.trim();
  const senha = passwordInput.value.trim();

  if (!email || !senha) {
    loginErro.textContent = "Preencha o e-mail e a senha.";
    return;
  }

  // procurar utilizador no array vindo do JSON
  const user = utilizadores.find(
    (u) => u.email === email && u.senha === senha
  );

  if (!user) {
    loginErro.textContent = "Credenciais inválidas. Tente novamente.";
    return;
  }

  // login "fake": redireciona com query string
  const params = new URLSearchParams();
  params.set("perfil", user.perfil); // "usuario" ou "admin"
  params.set("nome", user.nome);
  params.set("id", user.id);

  window.location.href = `index.html?${params.toString()}`;
});