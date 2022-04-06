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
    // qsdfghjkqsdfghjhgfdqsdfghjklkjhgfdsdfghgf
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
