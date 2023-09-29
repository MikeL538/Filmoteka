import axios from 'axios';
import { currentLanguage } from './language';

// const watchedBtn = document.querySelector('.btn-watched');
// const queueBtn = document.querySelector('.btn-queue');
const addWatched = document.querySelector('.btn-add-watched');
const addQueue = document.querySelector('.btn-add-queue');
// const boxWatched = document.querySelector('.watched-box');
// const boxQueue = document.querySelector('.queue-box');
// const imgNoCinema = document.querySelector('#noCinema');

const detailsDiv = document.querySelector('.details');
const detailsClose = document.querySelector('.details__close-button');
const filmsList = document.querySelector('.films__list');
const apiKey =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjk0YzNhNWI0MDAwMDg5YWZhMWQ1YTFhZTk4YWIxZCIsInN1YiI6IjY1MGM4MmQzYjViYzIxMDEyY2M5ZmIwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gbA2ivTkeIlFgOsCG0AQU95bbBmYrPkGm6ojq4z3dKo'; // Replace with your API key

export function showDetails(e) {
  const clickedMovie = e.target.closest('.films__list-item');
  if (!clickedMovie) {
    console.error('Invalid movie item clicked.');
    return;
  }
  detailsDiv.classList.add('show-element');

  const movieId = clickedMovie.dataset.id;
  if (!movieId) {
    console.error('No movie ID found for the clicked item.');
    return;
  }

  // Open / close Modal with Escape key and closed button:
  function closeDetailsByClickOutside() {
    const modal = document.querySelector('.details');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  document.addEventListener('click', e => {
    const modal = document.querySelector('.details');
    if (modal && e.target === modal) {
      closeDetails();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeDetails();
    }
  });

  // Zamknięcie za pomocą kliknięcia poza modal
  document.addEventListener('click', e => {
    const modal = document.querySelector('.details');
    if (modal && !modal.contains(e.target)) {
      closeDetails();
    }
  });

  function closeDetails() {
    detailsDiv.classList.remove('show-element');
  }

  //////////////Library////////////////////

  function addingWatchedToLocalStorage(movieId) {
    let watchedList = localStorage.getItem('watched');

    if (watchedList) {
      try {
        watchedList = JSON.parse(watchedList);
      } catch (error) {
        // If parsing fails, treat it as an empty array
        watchedList = [];
      }
    } else {
      watchedList = [];
    }

    if (!watchedList.includes(movieId)) {
      watchedList.push(movieId);
    }

    localStorage.setItem('watched', JSON.stringify(watchedList));
    console.log(watchedList);
  }

  addWatched.addEventListener('click', () => {
    // const watchedList = JSON.parse(localStorage.getItem('watched'));
    addingWatchedToLocalStorage(movieId);
  });
  function addingQueueToLocalStorage(movieId) {
    let queueList = localStorage.getItem('queue');

    if (queueList) {
      try {
        queueList = JSON.parse(queueList);
      } catch (error) {
        // If parsing fails, treat it as an empty array
        queueList = [];
      }
    } else {
      queueList = [];
    }

    if (!queueList.includes(movieId)) {
      queueList.push(movieId);
    }

    localStorage.setItem('queue', JSON.stringify(queueList));
    console.log(queueList);
  }

  addWatched.addEventListener('click', () => {
    addingQueueToLocalStorage(movieId);
  });
  addQueue.addEventListener('click', () => {
    addingQueueToLocalStorage(movieId);
  });
  ///////////////////////////////////////////////////
  fetchMovieDetails(movieId);
}

// filmsList.addEventListener('click', showDetails);

detailsClose.addEventListener('click', () => {
  detailsDiv.classList.remove('show-element');
});

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
    <ul class="details__information-list">
      <li>
      <span><span class="details__information-rating">${mathRound}</span> / 
      ${movieDetails.vote_count}</span>
      <span>${movieDetails.popularity}</span>
      <span>${movieDetails.original_title}</span>
      <span>${movieDetails.genres.map(genre => genre.name).join(', ')}</span>
      </li>
    </ul>
  `;

  modalAbout.textContent = movieDetails.overview;

  const detailsDiv = document.querySelector('.details');
  detailsDiv.classList.add('show-element');
}
