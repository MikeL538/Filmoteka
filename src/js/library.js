import axios from 'axios';
import { currentLanguage } from './language';
import { apiKey } from './fetcher';

// Funkcja do usuwania filmu z listy
function removeFromList(listName, movieId) {
  const list = JSON.parse(localStorage.getItem(listName)) || [];
  const updatedList = list.filter(id => id !== movieId);
  localStorage.setItem(listName, JSON.stringify(updatedList));
}

// szczegóły filmu w modalu
function showLibraryDetails(event) {
  // ...

  // Usunięcie filmu z kolejki
  if (event.target.classList.contains('btn-remove-from-queue')) {
    const movieId = event.target.dataset.id;
    removeFromList('queue', movieId); // Usuwanie filmu z kolejki
    event.target.closest('.library-films__list-item').remove(); // Usuwanie filmu z widoku
    return;
  }

  // Usunięcie filmu z obejrzanych
  if (event.target.classList.contains('btn-remove-from-watched')) {
    const movieId = event.target.dataset.id;
    removeFromList('watched', movieId); // Usuwanie filmu z obejrzanych
    event.target.closest('.library-films__list-item').remove(); // Usuwanie filmu z widoku
    return;
  }

  // ...
}

if (document.querySelector('.library-films__list')) {
  const btnWatched = document.querySelector('.btn-watched');

  btnWatched.addEventListener('click', () => {
    const libraryFilmsList = document.querySelector('.library-films__list');
    libraryFilmsList.innerHTML = '';

    const watchedList = JSON.parse(localStorage.getItem('watched')) || [];

    function fetchMovieDetails(movieId, listName) {
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

          // Dodawanie przycisków "Remove from Queue" i "Remove from Watched"
          let buttonsHtml = '';
          if (listName === 'queue') {
            buttonsHtml = `
              <button class="btn-remove-from-queue" data-id="${movieDetails.id}">Remove from Queue</button>
            `;
          } else if (listName === 'watched') {
            buttonsHtml = `
              <button class="btn-remove-from-watched" data-id="${movieDetails.id}">Remove from Watched</button>
            `;
          }

          movieListItem.innerHTML = `
            <img src="${getMovieImagePath(movieDetails.backdrop_path)}" alt="${
            movieDetails.title
          }" />
            <h2>${movieDetails.title}</h2>
            <p>${genreNames} | <span>${movieDetails.release_date.substring(
            0,
            4,
          )}</span> <span class="films__list-item--rating">${movieDetails.vote_average}</span></p>
            ${buttonsHtml}
          `;

          libraryFilmsList.appendChild(movieListItem);

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
      fetchMovieDetails(movieId, 'watched');
    });
  });
}

if (document.querySelector('.library-films__list')) {
  const btnQueued = document.querySelector('.btn-queued');

  btnQueued.addEventListener('click', () => {
    const libraryFilmsList = document.querySelector('.library-films__list');
    libraryFilmsList.innerHTML = '';

    const queueList = JSON.parse(localStorage.getItem('queue')) || [];

    function fetchMovieDetails(movieId, listName) {
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

          // Dodawanie przycisków "Remove from Queue" i "Remove from Watched"
          let buttonsHtml = '';
          if (listName === 'queue') {
            buttonsHtml = `
              <button class="btn-remove-from-queue" data-id="${movieDetails.id}">Remove from Queue</button>
            `;
          } else if (listName === 'watched') {
            buttonsHtml = `
              <button class="btn-remove-from-watched" data-id="${movieDetails.id}">Remove from Watched</button>
            `;
          }

          movieListItem.innerHTML = `
            <img src="${getMovieImagePath(movieDetails.backdrop_path)}" alt="${
            movieDetails.title
          }" />
            <h2>${movieDetails.title}</h2>
            <p>${genreNames} | <span>${movieDetails.release_date.substring(
            0,
            4,
          )}</span> <span class="films__list-item--rating">${movieDetails.vote_average}</span></p>
            ${buttonsHtml}
          `;

          libraryFilmsList.appendChild(movieListItem);

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
      fetchMovieDetails(movieId, 'queue');
    });
  });
}
