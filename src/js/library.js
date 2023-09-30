import axios from 'axios';
import { currentLanguage } from './language';
import { apiKey } from './fetcher';

// Button watched = watched list
if (document.querySelector('.library-films__list')) {
  const btnWatched = document.querySelector('.btn-watched');

  btnWatched.addEventListener('click', () => {
    const libraryFilmsList = document.querySelector('.library-films__list');
    libraryFilmsList.innerHTML = '';

    const watchedList = JSON.parse(localStorage.getItem('watched')) || [];
    const queueList = JSON.parse(localStorage.getItem('queue')) || [];

    function fetchMovieDetails(movieId) {
      const movieDetailsUrl = `movie/${movieId}`;

      axios
        .get(movieDetailsUrl, {
          params: {
            api_key: apiKey,
            language: currentLanguage,
          },
        })
        .then(response => {
          const movieDetails = response.data;
          const genreNames = movieDetails.genres.map(genre => genre.name).join(', ');

          const movieListItem = document.createElement('li');
          movieListItem.classList.add('library-films__list-item');
          movieListItem.dataset.id = movieDetails.id;
          movieListItem.innerHTML = `
            <img src="${getMovieImagePath(movieDetails.backdrop_path)}" alt="${
            movieDetails.title
          }" />
            <h2>${movieDetails.title}</h2>
            <p>${genreNames} | <span>${movieDetails.release_date.substring(
            0,
            4,
          )}</span> <span class="films__list-item--rating">${movieDetails.vote_average}</span></p>
          `;

          libraryFilmsList.appendChild(movieListItem);
        })
        .catch(error => console.error('Error fetching movie details:', error));
    }

    function getMovieImagePath(path) {
      return path
        ? `https://image.tmdb.org/t/p/w500${encodeURIComponent(path)}`
        : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png';
    }

    watchedList.forEach(movieId => {
      fetchMovieDetails(movieId);
    });
  });
}

// Button queued = queued list
if (document.querySelector('.library-films__list')) {
  const btnQueued = document.querySelector('.btn-queue');

  btnQueued.addEventListener('click', () => {
    const libraryFilmsList = document.querySelector('.library-films__list');
    libraryFilmsList.innerHTML = '';

    const queueList = JSON.parse(localStorage.getItem('queue')) || [];

    function fetchMovieDetails(movieId) {
      const movieDetailsUrl = `movie/${movieId}`;

      axios
        .get(movieDetailsUrl, {
          params: {
            api_key: apiKey,
            language: currentLanguage,
          },
        })
        .then(response => {
          const movieDetails = response.data;
          const genreNames = movieDetails.genres.map(genre => genre.name).join(', ');

          const movieListItem = document.createElement('li');
          movieListItem.classList.add('library-films__list-item');
          movieListItem.dataset.id = movieDetails.id;
          movieListItem.innerHTML = `
            <img src="${getMovieImagePath(movieDetails.backdrop_path)}" alt="${
            movieDetails.title
          }" />
            <h2>${movieDetails.title}</h2>
            <p>${genreNames} | <span>${movieDetails.release_date.substring(
            0,
            4,
          )}</span> <span class="films__list-item--rating">${movieDetails.vote_average}</span></p>
          `;

          libraryFilmsList.appendChild(movieListItem);
        })
        .catch(error => console.error('Error fetching movie details:', error));
    }

    function getMovieImagePath(path) {
      return path
        ? `https://image.tmdb.org/t/p/w500${encodeURIComponent(path)}`
        : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png';
    }

    queueList.forEach(movieId => {
      fetchMovieDetails(movieId);
    });
  });
}