const form = document.getElementById("criarForm");
const preview = document.getElementById("previewImagem");
const imagemInput = document.getElementById("imagem");
const salvarBtn = document.getElementById("salvarBtn");
const msg = document.getElementById("mensagemSalvar");

// utilitários são fornecidos por utils.js

// se alguém abrir a página sem login, manda para login
const user = getLoggedUser();
if (!user) {
  window.location.href = "../login/login.html";
}

// preview automático
if (imagemInput && preview) {
  imagemInput.addEventListener("input", () => {
    const url = imagemInput.value.trim();
    preview.src = url || "https://via.placeholder.com/260x200?text=Preview";
  });
}

// clique em salvar
if (salvarBtn) {
  salvarBtn.addEventListener("click", () => {
    if (!form) return;
    if (msg) {
      msg.textContent = "";
    }

    const titulo = document.getElementById("titulo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const ingredientesTxt =
      document.getElementById("ingredientes").value.trim();
    const preparoTxt = document.getElementById("preparo").value.trim();
    const tempo = document.getElementById("tempo").value;
    const tipo = document.getElementById("tipo").value;
    const imagem = imagemInput.value.trim();

    if (!titulo || !descricao || !ingredientesTxt || !preparoTxt || !tempo || !tipo) {
      if (msg) {
        msg.textContent = "Preencha todos os campos obrigatórios (incluindo a descrição).";
        msg.style.color = "red";
      }
      return;
    }

    const ingredientes = ingredientesTxt
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    const modoPreparo = preparoTxt
      .split(".")
      .map((p) => p.trim())
      .filter(Boolean);

    const novaReceita = {
      id: Date.now(),
      titulo,
      descricao,
      dificuldade: "medio",
      tempo: Number(tempo),
      tipo,
      imagem: imagem || "https://via.placeholder.com/300x200",
      ingredientes,
      modoPreparo,
      autorId: user.id,
      aprovada: user.perfil === "admin",
    };

    if (user.perfil === "admin") {
      const extras = loadExtraAprovadas();
      extras.push(novaReceita);
      saveExtraAprovadas(extras);
      alert(
        `Receita "${novaReceita.titulo}" criada e já está no catálogo (admin).`
      );
      if (msg) {
        msg.textContent = "Receita criada e aprovada (admin).";
        msg.style.color = "green";
      }
    } else {
      const pend = loadPendentes();
      pend.push(novaReceita);
      savePendentes(pend);
      alert(
        `Receita "${novaReceita.titulo}" enviada para aprovação do admin.`
      );
      if (msg) {
        msg.textContent = "Receita enviada para aprovação do admin.";
        msg.style.color = "green";
      }
    }
  });
}
