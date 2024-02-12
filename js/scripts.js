//added IIFE and new pokemonRepository
let pokemonRepository = (function () {
  let pokemonList = [];
  //Pokemon API here
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector('#modal-container');

  // ex1.8 modal function to show details of pokemon here  
  function showModal(item) {
    let titleElement = document.createElement();
    let bodyElement = document.createElement(); 
    modalTitle.empty();
    modalBody.empty();

  // elements to display pokemon details
    let nameElement = document.createElement("<h1>" + item.name + "</h1>");
    let imageElementFront = document.createElement('<img class="modal-img" style="width: 50%">').attr("src", item.imageUrlFront);
    
    let heightElement = document.createElement("<p>" + "Height: " + item.height + "</p>");

    let modalContainer = document.createElement('#modal-container');
    modal.classList.add("modal");
    
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);
    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(heightElement);
  
    modalContainer.classList.add("is-visible");
  }     
   
  function hideModal() {
    modalContainer.classList.remove("is-visible");

    window.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        modalContainer.classList.contains("is-visible")
      ) {
        hideModal();
      }
    });
  }

  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  document.querySelector("#show-modal").addEventListener("click", () => {
    showModal();
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
    listpokemon.appendChild(button);
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

//forLoop here
/*for(let i=0; i < pokemonList.length; i++){

if (pokemonList[i].height >20) {
  document.write('<p>', pokemonList[i].name + pokemonList[i].height + ' -Wow, that\'s big!' + '</p>');
}else {
  document.write('<p>', pokemonList[i].name + pokemonList[i].height + '; </p>');
 }
}*/
