//added IIFE and new pokemonRepository
let pokemonRepository = (function () {
  let pokemonList = [];
//Pokemon API here
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

//**** REVISION FOR EXERCISE 1.6 ****
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) { 
    pokemonList.push(pokemon);
  } else {
    console.log("pokemon is not correct");
  }
}
function getAll() {
  return pokemonList;
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
function loadList() {
//uncertain of syntax and location of showLoadingMessage...  
  //showLoadingMessage("Loading now...") 
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
    console.error(e);
    //hideLoadingMessage ("Loading now...");
  })
}
//loadDetails() function here, from ex1.7
function loadDetails(item) {
//uncertain of showLoadingMessage syntax and if in the correct spot...  
  //showLoadingMessage("Loading now...");
  let url = item.detailsUrl;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {
    //Here, details are added to the item
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;
    //hideLoadingMessage ("Loading now...");
  }).catch(function (e) {
    console.error(e);
    //hideLoadingMessage ("Loading now...")
  });
}

//showDetails() function here, from ex1.7
function showDetails(item) {
  pokemonRepository.loadDetails(item).then(function () {
    console.log(item);
  });
}

return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails
  };
})();

//**** REVISION FOR EXERCISE 1.6 ****
//pokemonRepository.add({ name: "Weedle", height: 0.3, types: ["bug", "poison"] });

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});

//loadList() function here, from ex1.7
pokemonRepository.loadList().then(function() {
  //Now the data is loaded
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});


//forLoop here
/*for(let i=0; i < pokemonList.length; i++){

if (pokemonList[i].height >20) {
  document.write('<p>', pokemonList[i].name + pokemonList[i].height + ' -Wow, that\'s big!' + '</p>');
}else {
  document.write('<p>', pokemonList[i].name + pokemonList[i].height + '; </p>');
 }
}*/