//added IIFE and new pokemonRepository
// **** REVISION FOR EXERCISE 1.6 ****
let pokemonRepository = (function () {
let repository = [
  {
    name: "Bulbasaur",
    height: 0.7,
    types: ["grass", "poison"]
  },
  {                                               
    name: "Charizard",
    height: 1.7,
    types: ["fire", "flying"]
  },
  {
    name: "Pikachu",
    height: 0.4,
    types: ["electric"]
  },
  {
    name: "Squirtle",
    height: 0.5,
    types: ["water"]
  }
];
//Pokemon API here
//let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

//**** REVISION FOR EXERCISE 1.6 ****
function add(pokemon) {
  if (
    typeof pokemon === "object" &&
    "name" in pokemon &&
    "height" in pokemon &&
    "types" in pokemon
  ) { 
    repository.push(pokemon);
  } else {
    console.log("pokemon is not correct");
  }
}
function getAll() {
  return repository;
}
//from ex1.6
function addListItem(pokemon){
  let pokemonList = document.querySelector(".pokemon-list");
  let listpokemon = document.createElement('li');
  let button = document.createElement("button");
  button.innerText = pokemon.name; 
  button.classList.add("button-class");
  listpokemon.appendChild(button);
  pokemonList.appendChild(listpokemon);
  button.addEventListener("click", function(event) {
  showDetails(pokemon); 
 });
}
//loadList() function here, from ex1.7
/*function loadList() {
//uncertain of syntax and location of showLoadingMessage...  
  function showLoadingMessage() {
    ('Loading now...');
  };
  return fetch(apiUrl).then(function (response) {
    return response.json();
  }).then(function (json) {
    json.results.forEach(function (item) {
      let pokemon = {
        name: item.name,
        detailsUrl: item.url       
      };function hideLoadingMessage () {
        };
      add(pokemon);
      console.log(pokemon);
    });
  }).catch(function (e) {
    console.error(e);function hideLoadingMessage () {
      };
  })
}*/
//loadDetails() function here, from ex1.7
/*function loadDetails(item) {
//uncertain of showLoadingMessage syntax and if in the correct spot...  
  function showLoadingMessage() {
    ('Loading now...');
  };
  let url = item.detailsUrl;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {
    //Here, details are added to the item
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;
    function hideLoadingMessage () {
    };
  }).catch(function (e) {
    console.error(e); function hideLoadingMessage () {
    };
  });
}*/

//showDetails() function here, from ex1.7
/*function showDetails(item) {
  pokemonRepository.loadDetails(item).then(function () {
    console.log(item);
  });
}*/

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  //loadList: loadList,
  //loadDetails: loadDetails,
  //showDetails: showDetails
  };
})();

//**** REVISION FOR EXERCISE 1.6 ****
pokemonRepository.add({ name: "Weedle", height: 0.3, types: ["bug", "poison"] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});

//loadList() function here, from ex1.7
/*pokemonRepository.loadList().then(function() {
  //Now the data is loaded
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});*/


//forLoop here
/*for(let i=0; i < pokemonList.length; i++){

if (pokemonList[i].height >20) {
  document.write('<p>', pokemonList[i].name + pokemonList[i].height + ' -Wow, that\'s big!' + '</p>');
}else {
  document.write('<p>', pokemonList[i].name + pokemonList[i].height + '; </p>');
 }
}*/