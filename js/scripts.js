// height is shown in inches
//added IIFE and new pokemonRepository
let pokemonRepository = (function() {
let pokemonRepository = [
  { name: "Charmander", height: 24, type: ["fire"], category: "Dragon"},
  { name: "Pikachu", height: 16, type: ["electric"], category: "Mouse"},
  { name: "Jigglypuff", height: 20, type: ["fairy"], category: "Balloon"}
]
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
function addListItem(pokemon){
  let pokemonList = document.querySelector(".pokemon-list");
  let listpokemon = document.createElement('li');
  let button = document.createElement("button");
  button.innerText = pokemon.name; 
  button.classList.add("button-class");
  listpokemon.appendChild(button);
  pokemonList.appendChild(listpokemon);
}
return {
  add: add,
  getAll: getAll,
  addListItem: addListItem  
  };
})();

pokemonRepository.add({ name: "Pikachu", height: 16, types: ["electric"] }); 

console.log(pokemonRepository.getAll());

//forEach function
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});

//forLoop below here

/*for(let i=0; i < pokemonList.length; i++){

if (pokemonList[i].height >20) {
  document.write('<p>', pokemonList[i].name + pokemonList[i].height + ' -Wow, that\'s big!' + '</p>');
}else {
  document.write('<p>', pokemonList[i].name + pokemonList[i].height + '; </p>');
 }
}*/

