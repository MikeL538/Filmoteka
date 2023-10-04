import axios from 'axios';
import { currentLanguage } from './language';
import { apiKey } from './fetcher';
import Notiflix from 'notiflix';

const watchedBtn = document.querySelector('.btn-watched');
const queuedBtn = document.querySelector('.btn-queued');
const detailsDivLibrary = document.querySelector('.details-library');
const detailsCloseLibrary = document.querySelector('.details-library__close-button');
const btnDeleteWatched = document.querySelector('.btn-delete-watched');
const btnDeleteQueue = document.querySelector('.btn-delete-queue');
const libraryFilmsList = document.querySelector('.library-films__list');

window.onload = function () {
  if (document.querySelector('.btn-watched')) {
    watchedBtn.click();
  }
};

// Dodawanie aktywnego przycisku (background)
if (document.querySelector('.btn-watched')) {
  queuedBtn.addEventListener('click', () => {
    watchedBtn.classList.remove('button-active');
    queuedBtn.classList.add('button-active');
    btnDeleteWatched.style.display = 'none';
    btnDeleteQueue.style.display = 'flex';
  });
}

if (document.querySelector('.btn-watched')) {
  watchedBtn.addEventListener('click', () => {
    watchedBtn.classList.add('button-active');
    queuedBtn.classList.remove('button-active');
    btnDeleteWatched.style.display = 'flex';
    btnDeleteQueue.style.display = 'none';
  });
}

export function showLibraryDetails(e) {
  const clickedMovie = e.target.closest('.library-films__list-item');
  if (!clickedMovie) {
    return;
  }

  const movieId = clickedMovie.dataset.id;
  if (!movieId) {
    console.error('No movie ID found for the clicked item.');
    return;
  }

  // Set ID for modal
  const modalElement = document.querySelector('.details-library');
  modalElement.dataset.id = movieId;

  // Funkcja aktualizacji listy filmów po ich usunięciu
  function refreshMovieList() {
    libraryFilmsList.innerHTML = '';
    const watchedList = JSON.parse(localStorage.getItem('watched')) || [];

    watchedList.forEach(movieId => {
      fetchMovieDetails(movieId);
    });

    if (queuedBtn.classList.contains('button-active')) {
      queuedBtn.click();
    }
    if (watchedBtn.classList.contains('button-active')) {
      watchedBtn.click();
    }
    setTimeout(() => {
      detailsDivLibrary.style.display = 'flex';
      closeDetails();
    }, 500);
  }

  // Obsługa zdarzenia dla przycisku usuwania z "watched"

  if (watchedBtn.classList.contains('button-active')) {
    btnDeleteWatched.addEventListener('click', () => {
      const movieId = modalElement.dataset.id;
      detailsDivLibrary.style.display = 'none';
      if (!movieId) {
        Notiflix.Notify.failure('No movie found in the watched list.');
        return;
      }

      const watchedList = JSON.parse(localStorage.getItem('watched')) || [];
      const updatedWatchedList = watchedList.filter(id => id !== movieId);
      localStorage.setItem('watched', JSON.stringify(updatedWatchedList));

      refreshMovieList();

      closeDetails();
    });
  }
  // Obsługa zdarzenia dla przycisku usuwania z "queue"

  if (queuedBtn.classList.contains('button-active')) {
    btnDeleteQueue.addEventListener('click', () => {
      const movieId = modalElement.dataset.id;
      detailsDivLibrary.style.display = 'none';
      if (!movieId) {
        Notiflix.Notify.failure('No movie found in the queued list.');
        return;
      }

      const queueList = JSON.parse(localStorage.getItem('queue')) || [];
      const updatedQueueList = queueList.filter(id => id !== movieId);
      localStorage.setItem('queue', JSON.stringify(updatedQueueList));

      refreshMovieList();
      closeDetails();
    });
  }

  document.addEventListener('click', e => {
    const modal = document.querySelector('.details-library');
    if (modal && e.target === modal) {
      closeDetails();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeDetails();
    }
  });

  if (detailsCloseLibrary) {
    detailsCloseLibrary.addEventListener('click', () => {
      closeDetails();
    });
  }

  // Zamknięcie za pomocą kliknięcia poza modalem
  document.addEventListener('click', e => {
    if (e.target.closest('.details-library')) return; // Do nothing if clicking inside the modal
    closeDetails();
  });

  fetchMovieDetails(movieId);
}

function closeDetails() {
  detailsDivLibrary.classList.remove('show-element');
}

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

      populateModal(movieDetails);
    })
    .catch(error => console.error('Error fetching movie details:', error));
}

function populateModal(movieDetails) {
  const modalTitle = document.querySelector('.details-library__title');
  const modalImg = document.querySelector('.details-library__img');
  const modalInformation = document.querySelector('.details-library__information-right');
  const modalAbout = document.querySelector('.details-library__about-container p');

  modalTitle.textContent = movieDetails.title;
  const modalImgFound = movieDetails.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${encodeURIComponent(movieDetails.backdrop_path)}`
    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png';
  modalImg.src = modalImgFound;

  const mathRound = Math.round(movieDetails.vote_average * 10) / 10;

  modalInformation.innerHTML = `
    <ul class="details-library__information-list">
      <li>
      <span><span class="details-library__information-rating">${mathRound}</span> / 
      ${movieDetails.vote_count}</span>
      <span>${movieDetails.popularity}</span>
      <span class="details-library__information-original-title">${
        movieDetails.original_title
      }</span>
      <span>${movieDetails.genres.map(genre => genre.name).join(', ')}</span>
      </li>
    </ul>
  `;

  modalAbout.textContent = movieDetails.overview;

  const detailsDiv = document.querySelector('.details-library');
  detailsDiv.classList.add('show-element');
}
