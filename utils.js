// utils.js — utilitários compartilhados

function getLoggedUser() {
  try {
    const t = sessionStorage.getItem("loggedUser");
    return t ? JSON.parse(t) : null;
  } catch {
    return null;
  }
}

function loadPendentes() {
  try {
    return JSON.parse(sessionStorage.getItem("receitasPendentes")) || [];
  } catch {
    return [];
  }
}

function savePendentes(lista) {
  sessionStorage.setItem("receitasPendentes", JSON.stringify(lista));
}

function loadExtraAprovadas() {
  try {
    return JSON.parse(sessionStorage.getItem("receitasExtraAprovadas")) || [];
  } catch {
    return [];
  }
}

function saveExtraAprovadas(lista) {
  sessionStorage.setItem("receitasExtraAprovadas", JSON.stringify(lista));
}

function getLoggedFavorites() {
  const u = getLoggedUser();
  return (u && Array.isArray(u.favoritos)) ? u.favoritos : [];
}

function setLoggedFavorites(ids) {
  const u = getLoggedUser();
  if (!u) return;
  u.favoritos = Array.isArray(ids) ? ids : [];
  sessionStorage.setItem("loggedUser", JSON.stringify(u));
}

function loadExcluidas() {
  try {
    return JSON.parse(sessionStorage.getItem("receitasExcluidasIds")) || [];
  } catch {
    return [];
  }
}

function saveExcluidas(ids) {
  sessionStorage.setItem("receitasExcluidasIds", JSON.stringify(ids));
}

function labelDificuldade(key) {
  if (key === "facil") return "Fácil";
  if (key === "medio") return "Médio";
  if (key === "dificil") return "Difícil";
  return key || "";
}

function initMobileNav() {
  const header = document.querySelector(".header");
  const toggle = document.querySelector(".nav-toggle");
  if (!header || !toggle) return;

  const controlsId = toggle.getAttribute("aria-controls");
  const nav = controlsId ? document.getElementById(controlsId) : document.querySelector(".header-nav");
  if (!nav) return;

  const closeNav = () => {
    header.classList.remove("is-nav-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  const toggleNav = () => {
    const isOpen = header.classList.toggle("is-nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  };

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleNav();
  });

  nav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (link) closeNav();
  });

  document.addEventListener("click", (event) => {
    if (!header.classList.contains("is-nav-open")) return;
    if (header.contains(event.target)) return;
    closeNav();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeNav();
  });
}

document.addEventListener("DOMContentLoaded", initMobileNav);
