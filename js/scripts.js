//added IIFE and new pokemonRepository
let pokemonRepository = (function () {
  let pokemonList = [];
  //Pokemon API here
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector('#modal-container');

  // ex1.8/1.10 modal function to show details of pokemon here  
  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $("modal-title");
    let modalHeader = $(".modal-header");
    
    modalTitle.empty();
    modalBody.empty();

  // elements to display pokemon details: pokemon name + front & back image + height + weight + types + abilities
    let nameElement = $("<h1>" + item.name + "</h1>");

    let imageElementFront = $('img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", item.imageUrlFront);

    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", item.imageUrlBack);

    let heightElement = $("<p>" + "height: " + item.height + "</p>");

    let weightElement = $("<p>" + "weight: " + item.weight + "</p>");

    let typesElement = $("<p>" + "types: " + item.types + "</p>");

    let abilitiesElement = $("<p>" + "abilities: " + item.abilities + "</p>");
         
    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
    
   
    modalContainer.innerHTML = ''; 
    modalContainer.appendChild(modal);    
    modalContainer.classList.add('is-visible');      
  }     
  
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  // Struggling to get modal to close when I click outside of modal...
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  
  //ex1.6, DOM interation here
  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function getAll() {
    return pokemonList;
  } 
  //from ex1.6, DOM interaction
  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  } 
  //loadList() function here, from ex1.7
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        data.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);          
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  } 
  //loadDetails() function here, from ex1.7
  function loadDetails(item) {    
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        //Here, details are added to the item
        item.imageUrlFront = details.sprites.front_default;
        item.height = details.height;                
      })
      .catch(function (e) {
        console.error(e);        
      });
  } 

  //showDetails() function, to show modal w/details of a Pokemon 
  function showDetails(item) {
    loadDetails(item).then(function () {
      showModal(item);
    });
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

//console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});

//loadList() function here, from ex1.7
pokemonRepository.loadList().then(function () {
  //Now the data is loaded
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});