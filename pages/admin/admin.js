(function () {
  const list = document.getElementById("adminList");
  const publicadasList = document.getElementById("publicadasList");
  const btnLogout = document.getElementById("btnLogout");

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

  function abrirModal(receita) {
    if (!modal) return;
    modalImage.src = receita.imagem;
    modalTitle.textContent = receita.titulo;
    modalDescricao.textContent = receita.descricao || "";
    modalTempo.textContent = `${receita.tempo} min`;
    modalDificuldade.textContent = labelDificuldade(receita.dificuldade || "medio");

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

  const user = getLoggedUser();
  if (!user) {
    window.location.href = "../login/login.html";
    return;
  }

  if (user.perfil !== "admin") {
    alert("Acesso restrito a administradores.");
    window.location.href = "../../index.html";
    return;
  }

  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      sessionStorage.removeItem("loggedUser");
      window.location.href = "../login/login.html";
    });
  }

  function renderPendentes() {
    if (!list) return;
    const pendentes = loadPendentes();
    list.innerHTML = "";

    if (!pendentes.length) {
      list.innerHTML = `
        <p style="padding:16px;">
          Não há receitas pendentes de aprovação.
        </p>
      `;
      return;
    }

    pendentes.forEach((r, index) => {
      const card = document.createElement("article");
      card.className = "recipe-card";
      card.innerHTML = `
        <div class="recipe-image">
          <img src="${r.imagem}" alt="${r.titulo}">
        </div>
        <div class="recipe-card-body">
          <h3 class="recipe-title">${r.titulo}</h3>
          <p class="recipe-meta">${r.tempo} min • ${r.tipo}</p>
          <p style="font-size:13px;color:#6b7280;">
            Criado pelo utilizador ID: ${r.autorId}
          </p>
        </div>
        <div class="recipe-actions" style="position:static;padding:0 16px 16px;display:flex;gap:8px;justify-content:flex-end;">
          <button class="btn-secondary" data-action="approve">Aprovar</button>
          <button class="btn-secondary" data-action="reject">Rejeitar</button>
        </div>
      `;

      card.addEventListener("click", (e) => {
        if (e.target.closest(".btn-secondary")) return;
        abrirModal(r);
      });

      const btnApprove = card.querySelector('[data-action="approve"]');
      const btnReject = card.querySelector('[data-action="reject"]');

      if (btnApprove) {
        btnApprove.addEventListener("click", () => {
          const pend = loadPendentes();
          const receita = pend[index];
          if (!receita) return;
          receita.aprovada = true;
          const extras = loadExtraAprovadas();
          extras.push(receita);
          saveExtraAprovadas(extras);
          pend.splice(index, 1);
          savePendentes(pend);
          alert(
            `Receita "${receita.titulo}" aprovada! Já aparece no catálogo e no perfil.`
          );
          renderPendentes();
        });
      }

      if (btnReject) {
        btnReject.addEventListener("click", () => {
          const pend = loadPendentes();
          const receita = pend[index];
          if (!receita) return;
          pend.splice(index, 1);
          savePendentes(pend);
          alert(
            `Receita "${receita.titulo}" rejeitada (simulação).`
          );
          renderPendentes();
        });
      }

      list.appendChild(card);
    });
  }

  renderPendentes();

  // ---------------- GESTÃO DE PUBLICADAS (CATÁLOGO) ----------------
  let baseReceitas = [];

  async function carregarBase() {
    try {
      const resp = await fetch("../../data/receitas.json");
      if (!resp.ok) throw new Error("Falha ao buscar receitas.json");
      baseReceitas = await resp.json();
    } catch (e) {
      console.error("Erro ao carregar receitas base no admin:", e);
      baseReceitas = [];
    }
  }

  function renderPublicadas() {
    if (!publicadasList) return;
    const extras = loadExtraAprovadas().filter((r) => r.aprovada);
    const excluidas = loadExcluidas();
    const exclSet = new Set(excluidas || []);
    const extrasIds = new Set(extras.map((r) => r.id));

    const publicadas = [...baseReceitas, ...extras].filter(
      (r) => !exclSet.has(r.id)
    );

    publicadasList.innerHTML = "";

    if (!publicadas.length) {
      publicadasList.innerHTML = `
        <p style="padding:16px;">Nenhuma receita publicada (após exclusões/pendentes).</p>
      `;
      return;
    }

    publicadas.forEach((r) => {
      const card = document.createElement("article");
      card.className = "recipe-card";
      card.innerHTML = `
        <div class="recipe-image">
          <img src="${r.imagem}" alt="${r.titulo}">
        </div>
        <div class="recipe-card-body">
          <h3 class="recipe-title">${r.titulo}</h3>
          <p class="recipe-meta">${r.tempo} min • ${r.tipo || ""}</p>
        </div>
        <div class="recipe-actions" style="position:static;padding:0 16px 16px;display:flex;gap:8px;justify-content:flex-end;">
          <button class="btn-secondary" data-action="view">Ver</button>
          <button class="btn-secondary" data-action="delete">Excluir</button>
        </div>
      `;

      card.addEventListener("click", (e) => {
        if (e.target.closest(".btn-secondary")) return;
        abrirModal(r);
      });

      const btnView = card.querySelector('[data-action="view"]');
      const btnDelete = card.querySelector('[data-action="delete"]');

      if (btnView) {
        btnView.addEventListener("click", () => abrirModal(r));
      }

      if (btnDelete) {
        btnDelete.addEventListener("click", () => {
          const confirmDel = confirm(
            `Tem a certeza que deseja excluir a receita "${r.titulo}" do site?`
          );
          if (!confirmDel) return;

          if (extrasIds.has(r.id)) {
            const atuais = loadExtraAprovadas().filter((it) => it.aprovada);
            const restantes = atuais.filter((it) => it.id !== r.id);
            const naoAprovadas = loadExtraAprovadas().filter((it) => !it.aprovada);
            saveExtraAprovadas([...naoAprovadas, ...restantes]);
          } else {
            const ids = loadExcluidas();
            if (!ids.includes(r.id)) {
              ids.push(r.id);
              saveExcluidas(ids);
            }
          }

          alert(`Receita excluída: ${r.titulo}`);
          renderPublicadas();
        });
      }

      publicadasList.appendChild(card);
    });
  }

  (async function initPublicadas() {
    await carregarBase();
    renderPublicadas();
  })();
})();