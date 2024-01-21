// height is shown in inches
//added IIFE and new pokemonRepository
let pokemonRepository = (function() {
let pokemonList = [
  { name: "Charmander", height: 24, type: ["fire"], category: "Dragon"},
  { name: "Pikachu", height: 16, type: ["electric"], category: "Mouse"},
  { name: "Jigglypuff", height: 20, type: ["fairy"], category: "Balloon"}
]

return {
  add: function(pokemon) {
    pokemonList.push(pokemon);
  },
  getAll: function(){
    return pokemonList;
  }
};
})();


//forEach function
pokemonList.forEach(function(pokemon){
  document.write(pokemon.name + ' is ' + pokemon.height + ' inches tall. Their pokemon type is ' + pokemon.type + '.');
});

//forLoop below here

/*for(let i=0; i < pokemonList.length; i++){

if (pokemonList[i].height >20) {
  document.write('<p>', pokemonList[i].name + pokemonList[i].height + ' -Wow, that\'s big!' + '</p>');
}else {
  document.write('<p>', pokemonList[i].name + pokemonList[i].height + '; </p>');
 }
}*/

