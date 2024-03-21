(function () {
  const pokemonList = [];
//Pokemon API
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  

// Modal function to show details of pokemon (ex1.8 & 1.10)  
  function showModal(item) {
    const modalBody = $(".modal-body");
    const modalTitle = $(".modal-title");
    const modalHeader = $(".modal-header");
        
// Will clear existing pokemon modal
    modalBody.empty();
    modalTitle.empty();

// Elements to display pokemon details: pokemon name + front & back image + height + weight + types + abilities
    const nameElement = $("<h1>" + item.name + "</h1>");
    const imageElementFront = $('<img class="modal-img" style="width:50%">').attr("src", item.imageUrlFront);
    const imageElementBack = $('<img class="modal-img" style="width:50%">').attr("src", item.imageUrlBack);
    const heightElement = $("<p>" + "height: " + item.height + "</p>");
    const weightElement = $("<p>" + "weight: " + item.weight + "</p>");
    const typesElement = $("<p>" + "types: " + item.types + "</p>");
    const abilitiesElement = $("<p>" + "abilities: " + item.abilities + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }     
  
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

// loadList() Function (ex1.7)
function loadList() {
  return fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      json.results.forEach(function (item) {
        const pokemonDetails = {
          name: item.name,
          detailsUrl: item.url,          
          };
        add(pokemonDetails);
        console.log(pokemonDetails);          
      });
    })
    .catch(function (e) {
      console.error(e);
    });
}

// loadDetails() Function to load pokemon details (ex1.7)
  function loadDetails(pokemon) {    
    const url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
       // Here, details are added to the item
        pokemon.imageUrlFront = details.sprites.front_default;
        pokemon.imageUrlBack = details.sprites.back_default;  
        pokemon.height = details.height;
        pokemon.weight = details.weight;
        pokemon.types = details.types.map(type => type.type.name).join(', ');
        pokemon.abilities = details.abilities.map(ability => ability.ability.name).join(', ');
      })
      .catch(function (e) {
        console.error(e);        
      });
} 

// showDetails() Function to show modal w/Pokemon details
  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      showModal(pokemon);
    });
}

// Selecting modal to load Pokemon data
$('#exampleModal').on('hidden.bs.modal', function (e) {
  const modalBody = $(".modal-body");
  const modalTitle = $(".modal-title");

  modalBody.empty();
  modalTitle.empty();
});

// Loading list of Pokemon names here
loadList().then(() => {
  const pokemonList = getAll();
  pokemonList.forEach((pokemon) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item", "list-group-item-action");
    listItem.innerText = pokemon.name;
    listItem.setAttribute("data-toggle", "modal");
    listItem.setAttribute("data-target", "#exampleModal");

    // Event listener to load modal    
    listItem.addEventListener("click", () => {
      showDetails(pokemon);      
    });

    $(".list-group").append(listItem);
  });
});

return {
    add: add,
    getAll: getAll,    
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    };

})();

 /* function addListItem(pokemon) {
  const pokemonListElement = $(".pokemon-list");
  const listItem = $("li");
  const button = $("button");
  button.innerText = pokemon.name;
  button.classList.add("button-class");
  listItem.appendChild(button);
  pokemonListElement.appendChild(listItem);
  button.addEventListener("click", function (event) {
    showDetails(pokemon);
  });
}  */

//console.log(pokemonRepository.getAll());

/*pokemonRepository.getAll().forEach(function (pokemonList) {
pokemonRepository.addListItem(pokemon);
}); */

/*  modalContainer.innerHTML = ''; 
    modalContainer.appendChild(modal);    
    modalContainer.classList.add('is-visible'); 
    $('#apiUrl').modal('show');  */  

/*pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
});*/

  /*function hideModal() {
    modalContainer.classList.remove('is-visible');
  }
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });*/

  // Struggling to get modal to close when I click outside of modal...
  /*modalContainer.addEventListener('click', (e) => {
    const target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });*/
  
  
    
  
