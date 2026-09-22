const grid = document.getElementById('pokemonGrid');
const status = document.getElementById('status');
const searchInput = document.getElementById('searchInput');
const typeFilter = document.getElementById('typeFilter');

let allPokemon = [];

async function fetchPokemonList() {
  try {
    status.innerText = "LOADING DATA...";
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
    if (!res.ok) throw new Error("API Offline");
    const data = await res.json();
    
    const detailPromises = data.results.map(p => fetch(p.url).then(r => r.json()));
    allPokemon = await Promise.all(detailPromises);

    status.innerText = "";
    renderPokemon(allPokemon);
  } catch (err) {
    status.innerText = "ERROR: FAILED TO FETCH DATA.";
    console.error(err);
  }
}

function renderPokemon(list) {
  grid.innerHTML = "";
  if (list.length === 0) {
    status.innerText = "NO POKÉMON FOUND.";
    return;
  }
  status.innerText = "";

  list.forEach(p => {
    const typesHtml = p.types.map(t => `<span class="type-badge">${t.type.name}</span>`).join('');
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.sprites.front_default || ''}" alt="${p.name}">
      <h3>#${p.id} ${p.name}</h3>
      <div>${typesHtml}</div>
    `;
    grid.appendChild(card);
  });
}

function filterData() {
  const query = searchInput.value.toLowerCase().trim();
  const selectedType = typeFilter.value;

  const filtered = allPokemon.filter(p => {
    const matchesNameOrId = p.name.includes(query) || p.id.toString() === query;
    const matchesType = selectedType === 'all' || p.types.some(t => t.type.name === selectedType);
    return matchesNameOrId && matchesType;
  });

  renderPokemon(filtered);
}

searchInput.addEventListener('input', filterData);
typeFilter.addEventListener('change', filterData);

fetchPokemonList();