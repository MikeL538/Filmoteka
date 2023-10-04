import axios from 'axios';
import { currentLanguage } from './language';
import { apiKey } from './fetcher';
import { showLibraryDetails } from './modalDetailsLibrary';

//elementu filmu
function createMovieListItem(movieDetails) {
  const movieListItem = document.createElement('li');
  // obsluga zdarzenia kliknięcia do elementu filmu
  movieListItem.addEventListener('click', () => {
    showLibraryDetails(movieDetails);
  });

  return movieListItem;
}

// wyświetlanie listy filmów
function displayMovieList(movieList) {
  const libraryFilmsList = document.querySelector('.library-films__list');
  libraryFilmsList.innerHTML = '';

  // movieList.forEach(movieId => {
  //   fetchMovieDetails(movieId)
  //     .then(movieDetails => {
  //       const movieListItem = createMovieListItem(movieDetails);
  //       libraryFilmsList.appendChild(movieListItem);
  //     })
  //     .catch(error => console.error('Error fetching movie details:', error));
  // });
}

// obsługa "Watched"
const btnWatched = document.querySelector('.btn-watched');
if (btnWatched) {
  btnWatched.addEventListener('click', () => {
    const watchedList = JSON.parse(localStorage.getItem('watched')) || [];
    displayMovieList(watchedList);
  });
}

// obsługa "Queued"
const btnQueued = document.querySelector('.btn-queued');
if (btnQueued) {
  btnQueued.addEventListener('click', () => {
    const queueList = JSON.parse(localStorage.getItem('queue')) || [];
    displayMovieList(queueList);
  });
}

// Button watched = watched list
if (document.querySelector('.library-films__list')) {
  const btnWatched = document.querySelector('.btn-watched');

  btnWatched.addEventListener('click', () => {
    const libraryFilmsList = document.querySelector('.library-films__list');
    libraryFilmsList.innerHTML = '';

    const watchedList = JSON.parse(localStorage.getItem('watched')) || [];

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
          const genreNames = movieDetails.genres
            .map(genre => genre.name)
            .slice(0, 2)
            .join(', ');

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
          )}</span> <span class="films__list-item--rating">${
            Math.round(movieDetails.vote_average * 10) / 10
          }</span></p>
          `;

          // sprawdzam czy film już istnieje na liście
          const existingMovie = libraryFilmsList.querySelector(`[data-id="${movieDetails.id}"]`);
          if (!existingMovie) {
            // jeśli nie, dodaj go
            libraryFilmsList.appendChild(movieListItem);
          }

          movieListItem.addEventListener('click', showLibraryDetails);
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
  const btnQueued = document.querySelector('.btn-queued');

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
          const genreNames = movieDetails.genres
            .map(genre => genre.name)
            .slice(0, 2)
            .join(', ');

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
          )}</span> <span class="films__list-item--rating">${
            Math.round(movieDetails.vote_average * 10) / 10
          }</span></p>
          `;

          // sprawdzam czy film już istnieje na liście
          const existingMovie = libraryFilmsList.querySelector(`[data-id="${movieDetails.id}"]`);
          if (!existingMovie) {
            // jeśli nie, dodaj go
            libraryFilmsList.appendChild(movieListItem);
          }

          movieListItem.addEventListener('click', showLibraryDetails);
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
