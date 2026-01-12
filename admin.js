// Admin recipe management (demo)
(async function () {
  const list = document.getElementById('adminList');
  const linkPerfil = document.getElementById('linkPerfil');
  const params = new URLSearchParams(window.location.search);
  const stored = Number(localStorage.getItem('userId'));
  const uid = Number.isFinite(stored) && stored > 0 ? stored : Number(params.get('id')) || 2;
  if (linkPerfil) linkPerfil.href = `perfil.html?id=${encodeURIComponent(uid)}`;

  try {
    const resp = await fetch('data/receitas.json');
    const receitas = await resp.json();
    list.innerHTML = '';
    receitas.forEach((r) => {
      const card = document.createElement('article');
      card.className = 'recipe-card';
      card.innerHTML = `
        <div class="recipe-image"><img src="${r.imagem}" alt="${r.titulo}"></div>
        <div class="recipe-card-body">
          <h3 class="recipe-title">${r.titulo}</h3>
          <p class="recipe-meta">${r.tempo} min • ${r.tipo}</p>
        </div>
        <div class="recipe-actions" style="position:static; padding: 0 16px 16px; display:flex; gap:8px; justify-content:flex-end;">
          <button class="btn-secondary" data-action="approve">Aprovar</button>
          <button class="btn-secondary" data-action="add">Adicionar</button>
          <button class="btn-secondary" data-action="delete">Apagar</button>
        </div>
      `;
      card.querySelectorAll('button').forEach((b) => {
        b.addEventListener('click', (e) => {
          e.stopPropagation();
          const action = b.dataset.action;
          alert(`(Demo) ${action.toUpperCase()} — ${r.titulo}`);
        });
      });
      list.appendChild(card);
    });
  } catch (e) {
    console.error('Erro ao carregar receitas.json', e);
  }

  const btnLogout = document.getElementById('btnLogout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      try {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('userId');
      } catch {}
      window.location.href = 'login.html';
    });
  }
})();
