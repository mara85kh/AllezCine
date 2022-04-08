<<<<<<< HEAD
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
=======
const api_key = 'api_key=9d5193a47774f74778d917ef7c2ce95f'
const base_url = 'https://api.themoviedb.org/3'
const api_url = base_url + '/discover/movie?sort_by=popularity.desc&' + api_key
const img_url = 'https://image.tmdb.org/t/p/w500'
let movie_id
let movie_vote
let movie_genre
let arrMovies = []
let arrGenre = []
let arrMovieGenre = []
let linkYT = "https://www.youtube.com/watch?v="
let linkTrailer

// Je récupère les films par popularité
getMovies(api_url)
function getMovies(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            for (i = 0; i < 20; i++) {
                arrMovies[i] = data.results[i]
            }
            carouselle(arrMovies)
        })
}

// Je récupère les genres de films possible
getGenreMovies('https://api.themoviedb.org/3/genre/movie/list?api_key=9d5193a47774f74778d917ef7c2ce95f&language=en-US')
function getGenreMovies(url) {
    fetch(url)
        .then(response => response.json())
        .then(data_genre => {
            for (i = 0; i < data_genre.genres.length; i++) {
                arrGenre[i] = data_genre.genres[i]
            }
            displayGenre(arrGenre)
        })
}
// J'affiche le genre du film choisis
function displayGenre(genre) {
    for (i = 0; i < movie_genre.length; i++) {
        for (j = 0; j < genre.length; j++) {
            if (movie_genre[i] == genre[j].id) {
                arrMovieGenre[i] = genre[j].name
            }
        }
    }
    document.getElementsByClassName('movieGenre')[0].innerHTML = arrMovieGenre.join(' - ')
}

// Je crée le carouselle avec les films nécéssaire
function carouselle(data) {
    console.log(data[0])
    //Image du film
    document.getElementsByTagName("img")[0].src = img_url + data[0].poster_path
    //Nom du film
    document.getElementsByClassName("title")[0].innerHTML = data[0].title
    //Description du film
    document.getElementsByClassName("description")[0].innerHTML = data[0].overview
    //Genre du film
    movie_genre = data[0].genre_ids
    //ID du film pour trailer
    movie_id = data[0].id
    //Vote du film
    document.getElementsByClassName("stars")[0].innerHTML =  data[0].vote_average

    findTrailer(movie_id)
}

// Trouve le trailer 
function findTrailer(id) {
    let url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=9d5193a47774f74778d917ef7c2ce95f&language=en-US`

    fetch(url)
        .then(response => response.json())
        .then(data_trailer => {
            console.log(data_trailer.results)
            for (i = 0; i < data_trailer.results.length; i++) {
                if (data_trailer.results[i].name == "Official Trailer") {
                    linkTrailer = data_trailer.results[i].key
                }
            }
            document.getElementById('trailer').addEventListener('click', () =>{
                window.open(linkYT + linkTrailer)
            })
        })

}
// les étoiles?
>>>>>>> kev
