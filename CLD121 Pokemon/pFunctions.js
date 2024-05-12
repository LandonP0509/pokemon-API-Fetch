document.addEventListener('DOMContentLoaded', function() {
    const pokemonListElement = document.querySelector('.pokemon-list');
    const pokemonDetailsElement = document.querySelector('.pokemon-details');
{
     document.getElementById("pokemon-details").scrollIntoView(true);
}
  
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(data => {
        const pokemonList = data.results;
        pokemonList.forEach(pokemon => {
          const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
          const pokemonListItem = document.createElement('div');
          pokemonListItem.classList.add('pokemon-card');
          pokemonListItem.textContent = pokemonName;
          pokemonListItem.addEventListener('click', () => {
            fetchPokemonDetails(pokemon);
          });
          pokemonListElement.appendChild(pokemonListItem);
        });
      });

      const image = document.querySelector('.pokemon-details img');
      image.scrollIntoView({ behavior: 'smooth', block: 'start' });
  
    function fetchPokemonDetails(pokemon) {
      fetch(pokemon.url)
        .then(response => response.json())
        .then(data => {
          const pokemonName = data.name.charAt(0).toUpperCase() + data.name.slice(1);
          const pokemonId = data.id;
          const pokemonTypes = data.types.map(type => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)).join(', ');
          const pokemonSprite = data.sprites.front_default;
  
          const pokemonDetailsHTML = `
            <div>
              <h2>${pokemonName}</h2>
              <p>Id: ${pokemonId}</p>
              <p>Type(s): ${pokemonTypes}</p>
              <img src="${pokemonSprite}" alt="${pokemonName}">
            </div>
          `;
          pokemonDetailsElement.innerHTML = pokemonDetailsHTML;
        });
    }
  });