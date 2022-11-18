const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const content = document.querySelector('.modal-content')
const modalContainer = document.getElementById("myModal")
const moreInformation = document.querySelector('.more')
const span = document.getElementsByClassName("close")[0]
const modal = document.querySelector('.modal')

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
            <h2>${pokemon.name.toUpperCase()}</h2>
            <h3>HABILIDADES</h3>
            <ul class="abilities">
                ${pokemon.abilities.map((type) => `<li  ${type}">${type.ability.name}</li>`).join('')}
            </ul>
            <h3>MOVIMENTOS</h3>
            <ul class="moves">
                ${pokemon.moves.map((type) => `<li  ${type}">${type.move.name}</li>`).join('')}
            </ul>
           
            <div class="images">                       
            <img class="image" src=${pokemon.sprites.back_default}>            
            <img class="image" src=${pokemon.sprites.front_default}>            
                       
            </div>
        </div>
        
    `
}

function createHTML(name) {    
    const response = requestPokemon(name)  
        //.then(response => console.log(response))           
        .then(response => {
            content.innerHTML += loadInformation(response)
            modal.classList.add(response.types[0].type.name)
        })        
    
    modalContainer.style.display = "block";
}

function requestPokemon(name) {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`
    return fetch(url)
    .then((response) => response.json())    
}

span.onclick = function() {
    modalContainer.style.display = "none";
    content.innerHTML = ''
    modal.className = 'modal'
}
