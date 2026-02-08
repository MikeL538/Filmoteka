import type { MovieDetails } from '../../types and data/types.js';
import { getWatchedList, getQueueList } from '../ui/movieListService.js';
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

  const votes = document.querySelector<HTMLElement>('.votes')!;
  const popularity = document.querySelector<HTMLElement>('.popularity')!;
  const orgTitle = document.querySelector<HTMLElement>('.title')!;
  const genre = details.querySelector<HTMLElement>('.genre')!;

  // ===== BUTTONS =====
  const btnAddWatchedList = document.querySelectorAll<HTMLElement>('.btn-add-watched');
  const btnAddQueueList = document.querySelectorAll<HTMLElement>('.btn-add-queue');

  // Add the movie id to all buttons
  btnAddWatchedList.forEach(btn => (btn.dataset.id = movieDetails.id.toString()));
  btnAddQueueList.forEach(btn => (btn.dataset.id = movieDetails.id.toString()));

  // Updates button text and classes based on watched/queue list status
  function updateButtonClasses() {
    const isWatched = getWatchedList().includes(movieDetails.id.toString());
    const isQueued = getQueueList().includes(movieDetails.id.toString());

    btnAddWatchedList.forEach((btn, e) => {
      if (isWatched) {
        btn.classList.add('onList');
        btn.textContent = currentLanguage === 'en-US' ? 'Remove from watched' : 'Usuń z oglądanych';
      } else {
        btn.classList.remove('onList');
        btn.textContent = currentLanguage === 'en-US' ? 'Add to watched' : 'Dodaj do oglądanych';
      }
    });

    btnAddQueueList.forEach(btn => {
      console.log('2');
      if (isQueued) {
        btn.classList.add('onList');
        btn.textContent = currentLanguage === 'en-US' ? 'Remove from queue' : 'Usuń z kolejki';
      } else {
        btn.classList.remove('onList');
        btn.textContent = currentLanguage === 'en-US' ? 'Add to queue' : 'Dodaj do kolejki';
      }
    });
  }

  // Initial update
  updateButtonClasses();

  // Attach event listeners
  btnAddWatchedList.forEach(btn => btn.addEventListener('click', updateButtonClasses));
  btnAddQueueList.forEach(btn => btn.addEventListener('click', updateButtonClasses));

  // ===== MODAL CONTENT =====
  modalTitle.textContent = movieDetails.title;

  const modalImgFound = movieDetails.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${encodeURIComponent(movieDetails.backdrop_path)}`
    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png';
  modalImg.src = modalImgFound;
  modalImg.alt = movieDetails.title;

  votes.textContent = `${Math.round(movieDetails.vote_average * 10) / 10} / ${movieDetails.vote_count}`;
  popularity.textContent = `${Math.round(movieDetails.popularity)}`;
  orgTitle.textContent = movieDetails.original_title;
  genre.textContent = movieDetails.genres.map(g => g.name).join(', ');
  modalAbout.textContent = movieDetails.overview ?? '';
}
