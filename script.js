// Array de receitas
const receitas = [
  {
    id: 1,
    titulo: "Frango Assado com Ervas",
    dificuldade: "facil",    // facil | medio | dificil
    tempo: 60,
    tipo: "principal",
    imagem: "https://i.panelinha.com.br/i1/bk-7568-mgl7602.webp"
  },
  {
    id: 2,
    titulo: "Brownie de Chocolate",
    dificuldade: "medio",
    tempo: 40,
    tipo: "sobremesa",
    imagem: "https://feed.continente.pt/media/2xfnxmki/brownie-chocolate.jpg?anchor=center&mode=crop&width=826&height=620&rnd=133761624161770000&format=webp"
  },
  {
    id: 3,
    titulo: "Salada Colorida de Frutas",
    dificuldade: "facil",
    tempo: 10,
    tipo: "entrada",
    imagem: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
  },
  {
    id: 4,
    titulo: "Lasanha à Bolonhesa",
    dificuldade: "dificil",
    tempo: 90,
    tipo: "principal",
    imagem: "https://images.pexels.com/photos/803963/pexels-photo-803963.jpeg"
  }
];

const recipesGrid = document.getElementById("recipesGrid");
const recipesCount = document.getElementById("recipesCount");
const searchInput = document.getElementById("searchInput");
const tipoPrato = document.getElementById("tipoPrato");
const dificuldadeSelect = document.getElementById("dificuldade");
const tempoMaximo = document.getElementById("tempoMaximo");

// mapeia para label com acento
function labelDificuldade(key) {
  if (key === "facil") return "fácil";
  if (key === "medio") return "médio";
  if (key === "dificil") return "difícil";
  return key;
}

// desenha cards
function renderReceitas(lista) {
  recipesGrid.innerHTML = "";

  lista.forEach((receita) => {
    const card = document.createElement("article");
    card.classList.add("recipe-card");

    const difLabel = labelDificuldade(receita.dificuldade);

    card.innerHTML = `
      <div class="recipe-image">
        <img src="${receita.imagem}" alt="${receita.titulo}">
        <span class="badge ${receita.dificuldade}">${difLabel}</span>
      </div>
      <div class="recipe-card-body">
        <h3 class="recipe-title">${receita.titulo}</h3>
        <p class="recipe-meta">${receita.tempo} min • ${receita.tipo}</p>
      </div>
    `;

    recipesGrid.appendChild(card);
  });

  recipesCount.textContent = lista.length;
}

// filtra
function filtrarReceitas() {
  const termo = searchInput.value.toLowerCase();
  const filtroTipo = tipoPrato.value;
  const filtroDificuldade = dificuldadeSelect.value;
  const filtroTempo = tempoMaximo.value;

  const filtradas = receitas.filter((r) => {
    const matchBusca = r.titulo.toLowerCase().includes(termo);
    const matchTipo = filtroTipo ? r.tipo === filtroTipo : true;
    const matchDif = filtroDificuldade ? r.dificuldade === filtroDificuldade : true;
    const matchTempo = filtroTempo ? r.tempo <= Number(filtroTempo) : true;

    return matchBusca && matchTipo && matchDif && matchTempo;
  });

  renderReceitas(filtradas);
}

// eventos
searchInput.addEventListener("input", filtrarReceitas);
tipoPrato.addEventListener("change", filtrarReceitas);
dificuldadeSelect.addEventListener("change", filtrarReceitas);
tempoMaximo.addEventListener("change", filtrarReceitas);

// inicial
renderReceitas(receitas);