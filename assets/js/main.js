const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const content = document.querySelector('.content')
const moreInformation = document.querySelector('.more')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>                

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <button class="more" value="${pokemon.name}" onclick="createHTML(value)">More...</button>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function loadInformation(pokemon) {
    return `
        <div class="info">
            <h2>Pokemon</h2>
            <ul>
                ${pokemon.abilities.map((type) => `<li  ${type}">${type.ability.name}</li>`).join('')}
            </ul>
            <ul>
                ${pokemon.moves.map((type) => `<li  ${type}">${type.move.name}</li>`).join('')}
            </ul>
        </div>
    `
}

function createHTML(name) {    
    const response = requestPokemon(name)
        //.then(response => console.log(response))        
        .then(response => content.innerHTML += loadInformation(response))
        
    //const newHtml = loadInformation(response)
    //content.innerHTML += newHtml    
}

function requestPokemon(name) {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`
    return fetch(url)
    .then((response) => response.json())    
}

