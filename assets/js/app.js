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
const searchURL = BASE_URL + "/search/movie?" + API_KEY;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
getMovies(API_URL);

//caroussel
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

//repertoire de film
function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
    });
}

function showMovies(data) {
  main.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieE1 = document.createElement("div");
    movieE1.classList.add("movie");
    movieE1.innerHTML = `
            <img src="${IMG_URL + poster_path}" alt="${title}">
            
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">

            <h3>Overview</h3>
            ${overview}
        </div>
        
        `;

    main.appendChild(movieE1);
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

  const searchTerm = searc.value;

  if (searchTerm) {
    getMovies(searchURL + "&query=" + searchTerm);
  } else {
    getMovies(API_URL);
  }
});
