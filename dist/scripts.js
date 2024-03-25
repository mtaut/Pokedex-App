!(function () {
  let t = [];
  function e() {
    return t;
  }
  function n(t) {
    let e = $(".pokemon-list"),
      n = $("li"),
      a = $("button");
    (a.innerText = t.name),
      a.classList.add("button-class"),
      n.appendChild(a),
      e.appendChild(n),
      a.addEventListener("click", function (e) {
        i(t);
      });
  }
  function i(t) {
    (function t(e) {
      let n = e.detailsUrl;
      return fetch(n)
        .then(function (t) {
          return t.json();
        })
        .then(function (t) {
          (e.imageUrlFront = t.sprites.front_default),
            (e.imageUrlBack = t.sprites.back_default),
            (e.height = t.height),
            (e.weight = t.weight),
            (e.types = t.types.map((t) => t.type.name).join(", ")),
            (e.abilities = t.abilities.map((t) => t.ability.name).join(", "));
        })
        .catch(function (t) {
          console.error(t);
        });
    })(t).then(() => {
      !(function t(e) {
        let n = $(".modal-body"),
          i = $(".modal-title");
        $(".modal-header"), n.empty(), i.empty();
        let a = $("<h1>" + e.name + "</h1>"),
          l = $('<img class="modal-img" style="width:50%">').attr(
            "src",
            e.imageUrlFront
          ),
          o = $('<img class="modal-img" style="width:50%">').attr(
            "src",
            e.imageUrlBack
          ),
          p = $("<p>height: " + e.height + "</p>"),
          r = $("<p>weight: " + e.weight + "</p>"),
          s = $("<p>types: " + e.types + "</p>"),
          d = $("<p>abilities: " + e.abilities + "</p>");
        i.append(a),
          n.append(l),
          n.append(o),
          n.append(p),
          n.append(r),
          n.append(s),
          n.append(d);
      })(t);
    });
  }
  $("#exampleModal").on("hidden.bs.modal", function (t) {
    let e = $(".modal-body"),
      n = $(".modal-title");
    e.empty(), n.empty();
  }),
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
      .then(function (t) {
        return t.json();
      })
      .then(function (e) {
        e.results.forEach(function (e) {
          var n;
          let i = { name: e.name, detailsUrl: e.url };
          "object" == typeof (n = i) && "name" in n
            ? t.push(n)
            : console.log("Pokemon is not correct"),
            console.log(i);
        });
      })
      .catch(function (t) {
        console.error(t);
      })
      .then(() => {
        t.forEach((t) => {
          let e = document.createElement("li");
          e.classList.add("list-group-item", "list-group-item-action"),
            e.classList.add("btn", "btn-primary"),
            (e.style.marginTop = "5px"),
            (e.innerText = t.name),
            e.setAttribute("data-toggle", "modal"),
            e.setAttribute("data-target", "#exampleModal"),
            e.addEventListener("click", () => {
              i(t);
            }),
            $(".list-group").append(e);
        });
      });
})();
