import axios from 'axios';
import './modalDetails';
import { showDetails } from './modalDetails';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjk0YzNhNWI0MDAwMDg5YWZhMWQ1YTFhZTk4YWIxZCIsInN1YiI6IjY1MGM4MmQzYjViYzIxMDEyY2M5ZmIwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gbA2ivTkeIlFgOsCG0AQU95bbBmYrPkGm6ojq4z3dKo'; // Replace with your API key

let currentPage = 1;

let isLoading = false;
const renderedMovieIds = new Set();
const filmsList = document.querySelector('.films__list');
const genresData = {
  genres: [
    {
      id: 28,
      name: 'Action',
    },
    {
      id: 12,
      name: 'Adventure',
    },
    {
      id: 16,
      name: 'Animation',
    },
    {
      id: 35,
      name: 'Comedy',
    },
    {
      id: 80,
      name: 'Crime',
    },
    {
      id: 99,
      name: 'Documentary',
    },
    {
      id: 18,
      name: 'Drama',
    },
    {
      id: 10751,
      name: 'Family',
    },
    {
      id: 14,
      name: 'Fantasy',
    },
    {
      id: 36,
      name: 'History',
    },
    {
      id: 27,
      name: 'Horror',
    },
    {
      id: 10402,
      name: 'Music',
    },
    {
      id: 9648,
      name: 'Mystery',
    },
    {
      id: 10749,
      name: 'Romance',
    },
    {
      id: 878,
      name: 'Science Fiction',
    },
    {
      id: 10770,
      name: 'TV Movie',
    },
    {
      id: 53,
      name: 'Thriller',
    },
    {
      id: 10752,
      name: 'War',
    },
    {
      id: 37,
      name: 'Western',
    },
  ],
};

const apiKey =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjk0YzNhNWI0MDAwMDg5YWZhMWQ1YTFhZTk4YWIxZCIsInN1YiI6IjY1MGM4MmQzYjViYzIxMDEyY2M5ZmIwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gbA2ivTkeIlFgOsCG0AQU95bbBmYrPkGm6ojq4z3dKo'; // Replace with your API key

// Decrypting the genre of the movie by ID
function getGenreNameById(genreId) {
  const genre = genresData.genres.find(genre => genre.id === genreId);
  return genre ? genre.name : 'Unknown Genre';
}

function fetchMovies(page, searchQuery = '') {
  const trendingMoviesUrl = searchQuery ? 'search/movie' : 'trending/movie/day';
  const params = {
    api_key: apiKey,
    language: 'en-US',
    page: page,
    query: searchQuery, // Added for search
  };

  axios
    .get(trendingMoviesUrl, { params })
    .then(response => {
      const movies = response.data.results;

      const movieList = movies
        .filter(movie => !renderedMovieIds.has(movie.id))
        .map(({ id, backdrop_path, title, release_date, genre_ids, vote_average }) => {
          const imagePath = backdrop_path
            ? `https://image.tmdb.org/t/p/w500${encodeURIComponent(backdrop_path)}`
            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png';
          const roundedVoteAverage = Math.round(vote_average * 10) / 10;

          renderedMovieIds.add(id);
          const genreNames = genre_ids.map(genreId => getGenreNameById(genreId));

          return `<li class="films__list-item" data-id="${id}">
          <img src="${imagePath}" alt="${title}" />
          <h2>${title}</h2>
          <p>${genreNames.join(', ')} | <span>${release_date}</span></p>
          <p>Rating: ${roundedVoteAverage}</p>
        </li>`;
        })
        .join('');

      filmsList.innerHTML += movieList;

      isLoading = false;

      const movieItems = document.querySelectorAll('.films__list-item');
      movieItems.forEach(item => {
        item.addEventListener('click', showDetails);
      });

      filmsList.addEventListener('click', showDetails);
    })
    .catch(error => console.error('Error fetching movies:', error));
}

const searchForm = document.querySelector('.header__nav-form');

function handleSearch(event) {
  event.preventDefault();
  const searchInput = document.querySelector('.header__nav-input');
  const searchQuery = searchInput.value.trim();

  renderedMovieIds.clear();
  currentPage = 1;

  filmsList.innerHTML = '';

  fetchMovies(currentPage, searchQuery);
}

searchForm.addEventListener('submit', handleSearch);

function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 700 && !isLoading) {
    isLoading = true;
    currentPage++;
    fetchMovies(currentPage);
  }
}

window.addEventListener('scroll', handleScroll);

fetchMovies(currentPage);
// import { detailsMovie } from './detailsMovie';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

//-----------------LIBRARY//////////

export const watchedBtn = document.querySelector('.btn-watched');
export const queueBtn = document.querySelector('.btn-queue');
export const addWatched = document.querySelector('.btn-add-watched');
export const addQueue = document.querySelector('.btn-add-queue');
export const boxWatched = document.querySelector('.watched-box');
export const boxQueue = document.querySelector('.queue-box');
export const imgNoCinema = document.querySelector('#noCinema');
console.log(watchedBtn);
console.log(queueBtn);

// watchedBtn.addEventListener('click', () => {
//   boxWatched.classList.remove('is-hiden');
//   boxQueue.classList.add('is-hiden');
//   imgNoCinema.classList.add('is-hiden');
// });
// queueBtn.addEventListener('click', () => {
//   boxQueue.classList.remove('is-hiden');
//   boxWatched.classList.add('is-hiden');
//   imgNoCinema.classList.add('is-hiden');
// });

// export function addingToLibrary() {
//   if (localStorage.getItem('watched') === null) {
//     localStorage.setItem('watched', '[]');
//   }
//   if (localStorage.getItem('queue') === null) {
//     localStorage.setItem('queue', '[]');
//   }
// }
function addToLibrary() {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjk0YzNhNWI0MDAwMDg5YWZhMWQ1YTFhZTk4YWIxZCIsInN1YiI6IjY1MGM4MmQzYjViYzIxMDEyY2M5ZmIwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gbA2ivTkeIlFgOsCG0AQU95bbBmYrPkGm6ojq4z3dKo',
    },
  };

  fetch('https://api.themoviedb.org/3/account/null/watchlist', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}
addWatched.addEventListener('click', () => {
  addToLibrary();
});
