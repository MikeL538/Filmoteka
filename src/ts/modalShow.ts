import { populateModal } from './ui/populateDetailsModal.js';
import { tmdbClient } from './api/tmdbApi.js';
import type { MovieDetails } from '../types and data/types.js';
import { currentLanguage } from './language.js';
import { notifications } from './ui/notifications.js';
import { rememberFocus, restoreFocus, lockBackground, getFocusable } from './a11yFocus.js';
type Modals = {
  teamButton: HTMLElement | null;
  teamBox: HTMLElement | null;
  filmsList: HTMLUListElement | null;
  modalDetails: HTMLElement | null;
  login: HTMLElement | null;
  register: HTMLElement | null;
};

const modals: Modals = {
  teamButton: document.querySelector<HTMLElement>('.modal-team'),
  teamBox: document.querySelector<HTMLElement>('.modal-team-box'),
  filmsList: document.querySelector<HTMLUListElement>('.films__list, .library-films__list'),
  modalDetails: document.querySelector<HTMLElement>('.details'),
  login: document.querySelector<HTMLElement>('.login'),
  register: document.querySelector<HTMLElement>('.register'),
};

// Fetch data for chosen film
async function fetchMovieDetails(movieId: string): Promise<MovieDetails> {
  const { data } = await tmdbClient.get<MovieDetails>(`movie/${movieId}`, {
    params: { language: currentLanguage },
  });

  if (currentLanguage === 'pl-PL' && !data.overview) {
    const { data: englishData } = await tmdbClient.get<MovieDetails>(`movie/${movieId}`, {
      params: { language: 'en-US' },
    });

    data.overview = `<i>Brak polskiego opisu</i><br>${englishData.overview}`;
  }

  return data;
}

export function openModal(openEl: HTMLElement, modal: HTMLElement) {
  if (openEl)
    openEl.addEventListener('click', () => {
      rememberFocus();
      modal.classList.remove('hidden');
    });
}
// TEAM MODAL
if (modals.teamButton && modals.teamBox) openModal(modals.teamButton, modals.teamBox);

export function openRegisterModal(): void {
  rememberFocus();

  modals.register?.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

// DETAILS
function modalShow() {
  // Details modal open (list click)
  if (!modals.filmsList) return;

  // Is modal focusable?
  if (modals.modalDetails && !modals.modalDetails.hasAttribute('tabindex')) {
    modals.modalDetails.setAttribute('tabindex', '-1');
  }

  modals.filmsList.addEventListener('click', async e => {
    // Get item id for future fetch
    const target = e.target as HTMLElement;
    const listItem = target.closest<HTMLLIElement>('.films__list-item');
    const trailerButton = document.querySelector<HTMLButtonElement>('#detailsTrailerButton');
    const movieId = listItem?.dataset.id;

    if (!listItem || !movieId) return;

    trailerButton?.setAttribute('data-id', movieId);
    // Save focus outside modal if error && show loader
    rememberFocus();
    lockBackground();
    notifications.showModalLoader();
    document.body.style.overflow = 'hidden';

    try {
      const movie = await fetchMovieDetails(movieId);
      populateModal(movie);
      modals.modalDetails?.classList.remove('hidden');

      // Focus inside modal (first focusable element or modal container)
      if (modals.modalDetails) {
        const focusables = getFocusable(modals.modalDetails);
        (focusables[0] ?? modals.modalDetails).focus();
      }
    } catch (error) {
      document.body.style.overflow = 'auto';
      restoreFocus(); // Get back focus to previous element
      console.error('Failed to fetch movie details:', error);
    } finally {
      notifications.hideLoader();
    }
  });
}

modalShow();
