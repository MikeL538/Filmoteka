import type { MovieDetails } from '../../types and data/types.js';
import { currentLanguage } from '../language.js';
import { updateQueueButtonsState, updateWatchedButtonsState } from './movieListService.js';

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
  const btnAddWatchedList = document.querySelectorAll<HTMLButtonElement>('.btn-add-watched');
  const btnAddQueueList = document.querySelectorAll<HTMLButtonElement>('.btn-add-queue');

  btnAddWatchedList.forEach(btn => {
    btn.dataset.id = movieDetails.id.toString();
    const id = btn.dataset.id;
    updateWatchedButtonsState(btn, id);
  });
  btnAddQueueList.forEach(btn => {
    btn.dataset.id = movieDetails.id.toString();
    const id = btn.dataset.id;
    updateQueueButtonsState(btn, id);
  });
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
  modalAbout.innerHTML = movieDetails.overview ?? '';
}
