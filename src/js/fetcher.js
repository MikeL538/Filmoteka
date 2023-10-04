import axios from 'axios';
import { showDetails } from './modalDetails';
import { currentLanguage } from './language';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  distance: '100px',
  clickToClose: true,
  pauseOnHover: false,
});

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjk0YzNhNWI0MDAwMDg5YWZhMWQ1YTFhZTk4YWIxZCIsInN1YiI6IjY1MGM4MmQzYjViYzIxMDEyY2M5ZmIwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gbA2ivTkeIlFgOsCG0AQU95bbBmYrPkGm6ojq4z3dKo';

let currentPage = 1;
let isLoading = false;
let noMoreMoviesLogged = false;
let movieItems = [];
let scrolled = false;

// Genres ID to genre name + translation
const genresData = {
  genres: [
    {
      id: 28,
      name: 'Action',
      namePl: 'Akcja',
    },
    {
      id: 12,
      name: 'Adventure',
      namePl: 'Przygoda',
    },
    {
      id: 16,
      name: 'Animation',
      namePl: 'Animacja',
    },
    {
      id: 35,
      name: 'Comedy',
      namePl: 'Komedia',
    },
    {
      id: 80,
      name: 'Crime',
      namePl: 'Kryminał',
    },
    {
      id: 99,
      name: 'Documentary',
      namePl: 'Dokument',
    },
    {
      id: 18,
      name: 'Drama',
      namePl: 'Dramat',
    },
    {
      id: 10751,
      name: 'Family',
      namePl: 'Familijny',
    },
    {
      id: 14,
      name: 'Fantasy',
      namePl: 'Fantasy',
    },
    {
      id: 36,
      name: 'History',
      namePl: 'Historyczny',
    },
    {
      id: 27,
      name: 'Horror',
      namePl: 'Horror',
    },
    {
      id: 10402,
      name: 'Music',
      namePl: 'Muzyczny',
    },
    {
      id: 9648,
      name: 'Mystery',
      namePl: 'Tajemniczy',
    },
    {
      id: 10749,
      name: 'Romance',
      namePl: 'Romans',
    },
    {
      id: 878,
      name: 'Science Fiction',
      namePl: 'Science Fiction',
    },
    {
      id: 10770,
      name: 'TV Movie',
      namePl: 'Film telewizyjny',
    },
    {
      id: 53,
      name: 'Thriller',
      namePl: 'Romans',
    },
    {
      id: 10752,
      name: 'War',
      namePl: 'Wojenny',
    },
    {
      id: 37,
      name: 'Western',
      namePl: 'Western',
    },
  ],
};
const renderedMovieIds = new Set();
const filmsList = document.querySelector('.films__list');

export const apiKey =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjk0YzNhNWI0MDAwMDg5YWZhMWQ1YTFhZTk4YWIxZCIsInN1YiI6IjY1MGM4MmQzYjViYzIxMDEyY2M5ZmIwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gbA2ivTkeIlFgOsCG0AQU95bbBmYrPkGm6ojq4z3dKo';

// Encoding genreId to become clear genre name e.g. 28 => "Action"
function getGenreNameById(genreId) {
  const genre = genresData.genres.find(genre => genre.id === genreId);
  if (currentLanguage === 'pl-PL') {
    return genre ? genre.namePl : 'Nieznany gatunek';
  } else {
    return genre ? genre.name : 'Unknown Genre';
  }
}

// Downloading DATA and generate films list + scroll
if (document.querySelector('.films__list')) {
  function fetchMovies(page, searchQuery = '') {
    const trendingMoviesUrl = searchQuery ? 'search/movie' : 'trending/movie/day';
    const params = {
      api_key: apiKey,
      language: currentLanguage,
      page: page,
      query: searchQuery, // Added for search
    };

    axios
      .get(trendingMoviesUrl, { params })
      .then(response => {
        const movies = response.data.results;

        setTimeout(() => {
          if (movies.length === 0 && !scrolled) {
            noMoreMoviesLogged = true;
            Notiflix.Notify.failure('Search result not successful. Enter the correct movie name.');
          }
        }, 100);

        const movieList = movies
          .filter(movie => !renderedMovieIds.has(movie.id))
          .map(({ id, backdrop_path, title, release_date, genre_ids, vote_average }) => {
            const imagePath = backdrop_path
              ? `https://image.tmdb.org/t/p/w500${encodeURIComponent(backdrop_path)}`
              : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png';
            const roundedVoteAverage = Math.round(vote_average * 10) / 10;

            renderedMovieIds.add(id);
            const genreNames = genre_ids.map(genreId => getGenreNameById(genreId));

            if (currentLanguage === 'pl-PL') {
              return `<li class="films__list-item" data-id="${id}">
          <img src="${imagePath}" alt="${title}" />
          <h2>${title}</h2>
          <p>${genreNames.slice(0, 2).join(', ')}  | <span>${release_date.substring(
                0,
                4,
              )}  </span><span class="films__list-item--rating">${roundedVoteAverage}</span></p>
        </li>`;
            } else {
              return `<li class="films__list-item" data-id="${id}">
          <img src="${imagePath}" alt="${title}" />
          <h2>${title}</h2>
          <p>${genreNames.slice(0, 2).join(', ')}  |  <span>${release_date.substring(
                0,
                4,
              )}  </span><span class="films__list-item--rating">${roundedVoteAverage}</span></p>
        </li>`;
            }
          })
          .join('');

        filmsList.innerHTML += movieList;

        isLoading = false;

        movieItems = document.querySelectorAll('.films__list-item');
        movieItems.forEach(item => {
          item.addEventListener('click', showDetails);
        });

        filmsList.addEventListener('click', showDetails);
      })
      .catch(error => console.error('Error fetching movies:', error));
  }

  fetchMovies(currentPage);

  const searchForm = document.querySelector('.header__nav-form');
  const searchInput = document.querySelector('.header__nav-input');
  let searchQuery = '';

  function handleSearch(event) {
    noMoreMoviesLogged = false;
    scrolled = false;
    event.preventDefault();
    searchQuery = searchInput.value.trim();

    renderedMovieIds.clear();
    currentPage = 1;

    filmsList.innerHTML = '';

    // if (currentMoviesLength === 0) {
    //   noMoreMoviesLogged = true;
    //   Notiflix.Notify.failure('Search result not successful. Enter the correct movie name.');
    // }

    fetchMovies(currentPage, searchQuery);
  }

  searchForm.addEventListener('submit', handleSearch);

  function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    scrolled = true;
    if (noMoreMoviesLogged) {
      return;
    }

    if (scrollTop + clientHeight >= scrollHeight - 700 && !isLoading) {
      isLoading = true;
      currentPage++;

      fetchMovies(currentPage, searchQuery);

      if (renderedMovieIds.size < 20) {
        noMoreMoviesLogged = true;
        Notiflix.Notify.info('No more movies to load :(');
      }
    }
  }

  window.addEventListener('scroll', handleScroll);
}
