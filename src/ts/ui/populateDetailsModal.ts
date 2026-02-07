import type { MovieDetails } from '../../types and data/types.js';
import { getWatchedList } from '../ui/movieListService.js';
import { getQueueList } from '../ui/movieListService.js';
import { currentLanguage } from '../language.js';

/**
 * Populate the modal with the movie details
 * @param {MovieDetails} movieDetails - The movie details to populate the modal with
 */
export function populateModal(movieDetails: MovieDetails) {
  const details = document.querySelector<HTMLElement>('.details')!;
  const modalTitle = document.querySelector<HTMLElement>('.details__title')!;
  const modalImg = document.querySelector<HTMLImageElement>('.details__img')!;
  const modalAbout = document.querySelector<HTMLParagraphElement>('.details__about--p')!;
  const btnAddWatched = document.querySelector<HTMLElement>('.btn-add-watched')!;
  const btnAddQueue = document.querySelector<HTMLElement>('.btn-add-queue')!;

  const votes = document.querySelector<HTMLElement>('.votes')!;
  const popularity = document.querySelector<HTMLElement>('.popularity')!;
  const orgTitle = document.querySelector<HTMLElement>('.title')!;
  const genre = details.querySelector<HTMLElement>('.genre')!;

  // Add the movie id to the buttons
  btnAddWatched.dataset.id = movieDetails.id.toString();
  btnAddQueue.dataset.id = movieDetails.id.toString();

  // Updates button text and classes based on watched/queue list status
  function updateButtonClasses() {
    // CHECK IF THE MOVIE IS IN THE WATCHED LIST
    if (getWatchedList().includes(movieDetails.id.toString())) {
      btnAddWatched.classList.add('onList');

      currentLanguage === 'en-US'
        ? (btnAddWatched.textContent = 'Remove from watched')
        : (btnAddWatched.textContent = 'Usuń z oglądanych');
    } else {
      btnAddWatched.classList.remove('onList');

      currentLanguage === 'en-US'
        ? (btnAddWatched.textContent = 'Add to watched')
        : (btnAddWatched.textContent = 'Dodaj do oglądanych');
    }
    // QUEUE
    if (getQueueList().includes(movieDetails.id.toString())) {
      btnAddQueue.classList.add('onList');

      currentLanguage === 'en-US'
        ? (btnAddQueue.textContent = 'Remove from queue')
        : (btnAddQueue.textContent = 'Usuń z kolejki');
    } else {
      btnAddQueue.classList.remove('onList');

      currentLanguage === 'en-US'
        ? (btnAddQueue.textContent = 'Add to queue')
        : (btnAddQueue.textContent = 'Dodaj do kolejki');
    }
  }
  updateButtonClasses();
  btnAddWatched.addEventListener('click', updateButtonClasses);
  btnAddQueue.addEventListener('click', updateButtonClasses);

  // Set the modal title
  modalTitle.textContent = movieDetails.title;

  // Set the modal image
  const modalImgFound = movieDetails.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${encodeURIComponent(movieDetails.backdrop_path)}`
    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png';
  modalImg.src = modalImgFound;
  modalImg.alt = movieDetails.title;

  // Set the votes and popularity
  const votesRound = Math.round(movieDetails.vote_average * 10) / 10;
  const popularityRound = Math.round(movieDetails.popularity);

  votes.textContent = `${votesRound} / ${movieDetails.vote_count}`;
  popularity.textContent = `${popularityRound}`;

  // Set the original title
  orgTitle.textContent = `${movieDetails.original_title}`;

  // Set the genres
  genre.textContent = movieDetails.genres.map(g => g.name).join(', ');

  // Set the overview
  modalAbout.textContent = movieDetails.overview ?? '';
}
