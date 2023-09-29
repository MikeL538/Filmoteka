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

  // function addingToLocalStorage() {

  // }

  addWatched.addEventListener('click', () => {
    const objIdWatched = { watched: [] };
    // console.log(objIdWatched);
    const newMovieId = objIdWatched.watched.includes(movieId);
    if (newMovieId === false) {
      objIdWatched.watched.push(movieId);
    }

    // console.log(objIdWatched);
    localStorage.setItem('objIdWatched', JSON.stringify(objIdWatched.watched));
    // addingToLocalStorage();
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
/////////////////Library///////////////////
// import axios from 'axios';

// axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
// axios.defaults.headers.common['Authorization'] =
//   'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjk0YzNhNWI0MDAwMDg5YWZhMWQ1YTFhZTk4YWIxZCIsInN1YiI6IjY1MGM4MmQzYjViYzIxMDEyY2M5ZmIwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gbA2ivTkeIlFgOsCG0AQU95bbBmYrPkGm6ojq4z3dKo'; // Replace with your API key

// const watchedBtn = document.querySelector('.btn-watched');
// const queueBtn = document.querySelector('.btn-queue');
// const addWatched = document.querySelector('.btn-add-watched');
// const addQueue = document.querySelector('.btn-add-queue');
// const boxWatched = document.querySelector('.watched-box');
// const boxQueue = document.querySelector('.queue-box');
// const imgNoCinema = document.querySelector('#noCinema');

// console.log(watchedBtn);
// console.log(queueBtn);
// console.log(addWatched);
// console.log(addQueue);

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

// export function addingToLocalStorage(movieID) {
//   if (localStorage.getItem('watched') === null) {
//     localStorage.setItem('watched', '[]');
//   }
//   if (localStorage.getItem('queue') === null) {
//     localStorage.setItem('queue', '[]');
//   }
//   return JSON.stringify(movieID);
// }
// const moviesWatched = JSON.parse(localStorage.getItem('watched'));
// const movieQueue = JSON.parse(localStorage.getItem('queue'));

// addWatched.addEventListener('click', () => {
//   const watchedList = JSON.parse(localStorage.getItem('watched'));
//   addingToLocalStorage();
// });
