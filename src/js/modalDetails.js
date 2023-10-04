import axios from 'axios';
import { currentLanguage } from './language';
import { apiKey } from './fetcher';
import Notiflix from 'notiflix';

const addWatched = document.querySelector('.btn-add-watched');
const addQueue = document.querySelector('.btn-add-queue');
const detailsDiv = document.querySelector('.details');
const detailsClose = document.querySelector('.details__close-button');
let clickedMovie = '';
let movieId = '';

// modal-details function
export function showDetails(e) {
  clickedMovie = e.target.closest('.films__list-item');
  if (!clickedMovie) {
    return;
  }
  detailsDiv.classList.add('show-element');
  document.body.style.overflow = 'hidden';

  movieId = clickedMovie.dataset.id;
  if (!movieId) {
    console.error('No movie ID found for the clicked item.');
    return;
  }

  fetchMovieDetails(movieId);
}

// Closing modal
document.addEventListener('click', e => {
  const modal = document.querySelector('.details');
  if (modal && e.target === modal) {
    closeDetails();
    document.body.style.overflowY = 'scroll';
  }
});

if (document.querySelector('.details')) {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeDetails();
      document.body.style.overflowY = 'scroll';
    }
  });
}

if (detailsClose) {
  detailsClose.addEventListener('click', () => {
    closeDetails();
    document.body.style.overflowY = 'scroll';
  });
}

// Closing by clicking outside the modal
function closeDetails() {
  detailsDiv.classList.remove('show-element');
}

document.addEventListener('click', e => {
  const modal = document.querySelector('.details');
  if (modal && !modal.contains(e.target)) {
    closeDetails();
  }
});

if (document.querySelector('.details')) {
  function closeDetails() {
    detailsDiv.classList.remove('show-element');
  }
}

// Local storage add to watched
function addingWatchedToLocalStorageWatched(movieId) {
  let watchedList = localStorage.getItem('watched');

  if (watchedList) {
    try {
      watchedList = JSON.parse(watchedList);
    } catch (error) {
      watchedList = [];
    }
  } else {
    watchedList = [];
  }

  if (!watchedList.includes(movieId)) {
    watchedList.push(movieId);
    localStorage.setItem('watched', JSON.stringify(watchedList));
    Notiflix.Notify.success('Film added to watched!');
  } else {
    Notiflix.Notify.failure('Movie is already in watched list.');
  }
}

// Local storage add to queued
function addingQueueToLocalStorageQueue(movieId) {
  let queueList = localStorage.getItem('queue');

  if (queueList) {
    try {
      queueList = JSON.parse(queueList);
    } catch (error) {
      console.error('Error parsing queue list:', error);
      queueList = [];
    }
  } else {
    queueList = [];
  }

  if (!queueList.includes(movieId)) {
    queueList.push(movieId);
    localStorage.setItem('queue', JSON.stringify(queueList));
    Notiflix.Notify.success('Movie added to queue!');
  } else {
    Notiflix.Notify.failure('Movie is already in queue list.');
  }
}

if (addWatched) {
  addWatched.addEventListener('click', () => {
    addingWatchedToLocalStorageWatched(movieId);
  });
  addQueue.addEventListener('click', () => {
    addingQueueToLocalStorageQueue(movieId);
  });
}

// Downloading DATA
export function fetchMovieDetails(movieId) {
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

// Generating modal from downloaded DATA
export function populateModal(movieDetails) {
  const modalTitle = document.querySelector('.details__title');
  const modalImg = document.querySelector('.details__img');
  const modalInformation = document.querySelector('.details__information-right');
  const modalAbout = document.querySelector('.details__about-container p');

  modalTitle.textContent = movieDetails.title;
  const modalImgFound = movieDetails.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${encodeURIComponent(movieDetails.backdrop_path)}`
    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png';
  modalImg.src = modalImgFound;

  const mathRound = Math.round(movieDetails.vote_average * 10) / 10;

  modalInformation.innerHTML = `
    <ul class=" details__information-list">
      <li>
      <span><span class="details__information-rating">${mathRound}</span> / 
      ${movieDetails.vote_count}</span>
      <span>${movieDetails.popularity}</span>
      <span class="details__information-original-title">${movieDetails.original_title}</span>
      <span>${movieDetails.genres.map(genre => genre.name).join(', ')}</span>
      </li>
    </ul>
  `;

  modalAbout.textContent = movieDetails.overview;

  detailsDiv.classList.add('show-element');
}
