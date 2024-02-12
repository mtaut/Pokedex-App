//added IIFE and new pokemonRepository
let pokemonRepository = (function () {
  let pokemonList = [];
//Pokemon API here
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

// ex1.8 modal. Function to show details of pokemon here
  function showModal(item) {
    modalContainer.innerHTML = '';
  
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innderText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1'); 
    titleElement.innerText = title;
  
    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contenElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible')
  }

    function hideModal() {
      modalContainer.classList.remove('is-visible');

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      } 
    });
   }

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });
  
  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal();
  });

  

//ex1.6, DOM interation here
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
//from ex1.6, DOM interaction
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
  //showLoadingMessage("Loading now...");
  return fetch(apiUrl).then(function (response) {
    return response.json();
  }).then(function (json) {
    json.results.forEach(function (item) {
      let pokemon = {
        name: item.name,
        detailsUrl: item.url       
      };
      //hideLoadingMessage ("Loading now...");
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
    //hideLoadingMessage ("Loading now...");
  });
}

//showDetails() function, to show modal w/details of a Pokemon
function showDetails(item) {
  pokemonRepository.loadDetails(item).then(function () {
    showModal(item);
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