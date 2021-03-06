//Menu Burger
let toggle = document.querySelector(".toggle");
let body = document.querySelector("body");

toggle.addEventListener("click", function () {
  body.classList.toggle("open");
});

const API_KEY = "api_key=0100f2563e6ea612dadd979dd621baf4";
const BASE_URL = "https://api.themoviedb.org/3/";
const API_URL = BASE_URL + "discover/movie?sort_by=popularity.des&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "search/movie?" + API_KEY;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

let movie_id;
let linkYT = "https://www.youtube.com/watch?v=";
let linkTrailer = [];

getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
    });
}

//carrousel
document.body.onload = function () {
  nbr = 5;
  p = 0;
  container = document.getElementById("container");
  console.log(container);
  g = document.getElementById("g");
  console.log(g);
  d = document.getElementById("d");
  console.log(d);
  container.style.width = 800 * nbr + "px";
  for (i = 1; i <= nbr; i++) {
    img = document.createElement("img");
    img.className = "photo";
    img.src = "im" + i + ".jpg";
    img.style.width = "800px";
    container.appendChild(img);
    console.log(container.appendChild(img));
  }
  afficherMasquer();
};
g.onclick = function () {
  if (p > -nbr + 1) {
    p--;
    container.style.transform = "translate(800px)";
    container.style.transition = "all 0.5s ease";
  }
  console.log(p);

  afficherMasquer();
};
let x = 1;
d.onclick = function () {
  let nb = x * -800;
  if (p == 5) {
    afficherMasquer();
  }
  p++;
  x++;
  container.style.transform = "translate(" + nb + "px)";
  container.style.transition = "all 0.5s ease";
  console.log(nb);

  console.log(p);
};
function afficherMasquer() {
  if (p == -nbr + 1) g.style.visibility = "hidden";
  else g.style.visibility = "visible";
  if (p == 4) d.style.visibility = "hidden";
  else d.style.visibility = "visible";
}

//descriptif
function getEventOpen(a) {
  let event = document
    .getElementsByClassName("btnInfo")
    [a].addEventListener("click", () => {
      document.getElementsByClassName("overview")[a].style.transform =
        "translateY(0)";
    });
  return event;
}
function getEventClose(a) {
  let eventClose = document
    .getElementsByClassName("btnClose")
    [a].addEventListener("click", () => {
      document.getElementsByClassName("overview")[a].style.transform =
        "translateY(100%)";
    });
  return eventClose;
}
function trailer(linkTrailer, a) {
  document
    .getElementsByClassName("trailer")
    [a].addEventListener("click", () => {
      window.open(linkYT + linkTrailer);
    });
}
function findTrailer(id, a) {
  let url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=9d5193a47774f74778d917ef7c2ce95f&language=en-US`;

  fetch(url)
    .then((response) => response.json())
    .then((data_trailer) => {
      for (i = 0; i < data_trailer.results.length; i++) {
        if (data_trailer.results[i].type == "Trailer") {
          linkTrailer = data_trailer.results[i].key;
        }
      }
      trailer(linkTrailer, a);
    });
}
//afficher les films
function showMovies(data) {
  let a = 0;
  main.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview, id } = movie;
    const movieE1 = document.createElement("div");
    movieE1.classList.add("movie", a);
    movieE1.innerHTML = `
            <img src="${IMG_URL + poster_path}" alt="${title}">
            
            <div class="movie-info">
                <h3>${title}</h3>
                <button class="btnInfo ${a}">Info</button>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">

            <h3>Overview</h3>
            <button class="btnClose">X</button>
            <button class="trailer ${id}">trailer</button>
            ${overview}
        </div>

        `;

    main.appendChild(movieE1);

    getEventOpen(a);
    getEventClose(a);
    findTrailer(id, a);

    a++;
  });
}

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(searchURL + "&query=" + searchTerm);
  } else {
    getMovies(API_URL);
  }
});
