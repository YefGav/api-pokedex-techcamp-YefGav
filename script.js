const poke_container = document.getElementById('poke-container');
const pokemon_count = 150;
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
};

const getBackground = type => colors[type];

const createPokemonCard = ({ name, sprites, id, types }) => {
    const pokemonName = document.createElement('div');
    pokemonName.classList.add('pokemon');

    const poke_type = types[0].type.name;
    const color = getBackground(poke_type);
    pokemonName.style.backgroundColor = color;

    const formattedNumber = String(id).padStart(3, '0');
    const imgUrl = sprites.other['official-artwork'].front_default;

    pokemonName.innerHTML = `
        <div class="img-container">
            <img src="${imgUrl}" alt="${name}">
        </div>
        <div class="info">
            <span class="number">#${formattedNumber}</span>
            <h3 class="name">${name.charAt(0).toUpperCase() + name.slice(1)}</h3>
            <small class="type">Type: <span>${poke_type}</span></small>
        </div>
    `;

    poke_container.appendChild(pokemonName);
};

const getPokemonData = async id => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch Pokémon with ID ${id}`);
        const data = await res.json();
        createPokemonCard(data);
    } catch (error) {
        console.error(error);
    }
};

const fetchAllPokemons = async () => {
    for (let i = 1; i <= pokemon_count; i++) {
        await getPokemonData(i);
    }
};

fetchAllPokemons();
