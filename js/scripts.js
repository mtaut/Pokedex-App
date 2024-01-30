// height is shown in inches
//added IIFE and new pokemonRepository
let pokemonRepository = (function () {
let repository = [
  { 
    name: "Charmander",
    height: 24,
    type: ["fire"],
    category: "Dragon"
  },
  { 
    name: "Pikachu",
    height: 16,
    type: ["electric"],
    category: "Mouse"
  },
  { 
    name: "Jigglypuff",
    height: 20,
    type: ["fairy"],
    category: "Balloon"
  },
];

//Pokemon API here
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

function add(pokemon) {
  if (
    typeof pokemon === "object" &&
    "name" in pokemon &&
    "height" in pokemon &&
    "type" in pokemon
  ) { 
    repository.push(pokemon);
  } else {
    console.log("pokemon is not correct");
  }
}
function getAll() {
  return repository;
}

//from replit video section here (ex1.6):
function addListItem(pokemon){
  let pokemonList = document.querySelector(".pokemon-list");
  let listpokemon = document.createElement('li');
  let button = document.createElement("button");
  button.innerText = pokemon.name; 
  button.classList.add("button-class");
  listpokemon.appendChild(button);
  pokemonList.appendChild(listpokemon);

button.addEventListener("click", () => {
  showDetails(pokemon)
  console.log(event); 
 });
}
//unsure why this won't show Squirtle...
pokemonRepository.add({ name: "Squirtle", height: 20, type: ["water"] });

console.log(pokemonRepository.getAll());

//forEach function
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});

//loadList() function here
function loadList() {
  return fetch(apiUrl).then(function (response) {
    return response.json();
  }).then(function (json) {
    json.results.forEach(function (item) {
      let pokemon = {
        name: item.name,
        detailsUrl: item.url
      };
      add(pokemon);
    });
  }).catch(function (e) {
    console.error(e);
  })
}

//loadDetails() function here
function loadDetails(item) {
  let url = item.detailsUrl;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {
    //Here add the details to the item
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;
  }).catch(function (e) {
    console.error(e);
  });
}

//showDetails() function here
function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    console.log(pokemon);
  });
}

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem  
  };
})();

//loadList() function here
pokemonRepository.loadList().then(function() {
  //Now the data is loaded
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});



//forLoop below here

/*for(let i=0; i < pokemonList.length; i++){

if (pokemonList[i].height >20) {
  document.write('<p>', pokemonList[i].name + pokemonList[i].height + ' -Wow, that\'s big!' + '</p>');
}else {
  document.write('<p>', pokemonList[i].name + pokemonList[i].height + '; </p>');
 }
}*/

