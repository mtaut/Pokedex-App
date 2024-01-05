//1st iteration
/*if (pokemon.height > 20) {
  document.write('<p>', pokemon.name + 'Wow, that\'s big!;' </p>');
} else {
  document.write('<p>', pokemon.name + pokemon.height + '; </p>');
}*/

// height is shown in inches
//2nd iteration
let pokemonList = [
  { name: "Charmander", height: 24, type: ["fire"]},
  { name: "Pikachu", height: 16, type: ["electric"]},
  { name: "Jigglypuff", height: 20, type: ["fairy"]}
];

// print message if height is taller than 20 (inches)
for(let i=0; i < pokemonList.length; i++){

if (pokemonList[i].height >20) {
  document.write('<p>', pokemonList[i].name + pokemonList[i].height + ' -Wow, that\'s big!' + '</p>');
}else {
  document.write('<p>', pokemonList[i].name + pokemonList[i].height + '; </p>');
 }
}
