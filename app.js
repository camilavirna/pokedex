const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}` //Função de obter os dados dos pokemons através da api

const generatePokemonPromises = () => Array(150).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then(Response => Response.json())) //Foi criado um array com os 150 pokemons linkado com a url da api

const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name) 

    accumulator += `
            <li class="card ${elementTypes[0]}">
                <img class="card-image" alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" />
                <h2 class="card-title"> ${id}. ${name} </h2>
                 <p class="card-subtitle"> ${elementTypes.join(' | ')}</p> 
            </li>  
        `
    return accumulator
}, '') //Contém as informações de cada pokemon, seu nome, seu tipo de elemento, etc (todas as info que deve ter nos cards).

const isertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons  
}

const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises) // promises: Uma promise é um objeto que representa o sucesso ou a falha de uma operação assíncrona.
    .then(generateHTML)
    .then(isertPokemonsIntoPage)
