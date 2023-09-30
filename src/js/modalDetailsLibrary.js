import axios from 'axios';
import { currentLanguage } from './language';
import { apiKey } from './fetcher';

const deleteWatched = document.querySelector('.btn-delete-watched');
const deleteQueue = document.querySelector('.btn-delete-queue');

const detailsDiv = document.querySelector('.details');
const detailsDivLibrary = document.querySelector('.details-library');
const detailsCloseLibrary = document.querySelector('.details-library__close-button');
let clickedMovie = '';
let movieId = '';

export function showLibraryDetails(e) {
  const clickedMovie = e.target.closest('.library-films__list-item');
  if (!clickedMovie) {
    console.error('Invalid movie item clicked.');
    return;
  }

  const detailsDivLibrary = document.querySelector('.details-library'); // Przeniesione tutaj

  const movieId = clickedMovie.dataset.id;
  if (!movieId) {
    console.error('No movie ID found for the clicked item.');
    return;
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
    const modal = document.querySelector('.details-library');
    if (modal && !modal.contains(e.target)) {
      closeDetails();
    }
  });

  function closeDetails() {
    detailsDivLibrary.classList.remove('show-element');
  }

  fetchMovieDetails(movieId);
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
      <span>${movieDetails.original_title}</span>
      <span>${movieDetails.genres.map(genre => genre.name).join(', ')}</span>
      </li>
    </ul>
  `;

  modalAbout.textContent = movieDetails.overview;

  const detailsDiv = document.querySelector('.details-library');
  detailsDiv.classList.add('show-element');
}
