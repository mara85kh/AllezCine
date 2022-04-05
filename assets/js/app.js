console.log('essai fetch')
const api_key = 'api_key=9d5193a47774f74778d917ef7c2ce95f'
const base_url = 'https://api.themoviedb.org/3'
const api_url = base_url + '/discover/movie?sort_by=popularity.desc&' + api_key
const img_urm = 'https://image.tmdb.org/t/p/w500'
let arrMovies = []

getMovies(api_url)

function getMovies(url) {

    fetch(url)
        .then(response => response.json())
        .then(data => {
            for (i = 0; i < 20; i++) {
                arrMovies[i] = data.results[0]
            }
        })
        
}

console.log(arrMovies)


// title / genres (array) / overview (description)
//  vote_average / videos (array)
