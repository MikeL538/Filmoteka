import { populateModal } from './ui/populateDetailsModal.js';
import { tmdbClient } from './api/tmdbApi.js';
import type { MovieDetails } from '../types and data/types.js';
import { currentLanguage } from './language.js';
import { notifications } from './ui/notifications.js';
import { rememberFocus, restoreFocus, lockBackground, getFocusable } from './a11yFocus.js';
type Modals = {
  team: HTMLElement | null;
  filmsList: HTMLUListElement | null;
  modalDetails: HTMLElement | null;
  login: HTMLElement | null;
  register: HTMLElement | null;
};

type Buttons = {
  team: HTMLButtonElement | null;
  // login: HTMLButtonElement | null;
  register: HTMLButtonElement | null;
};

const modals: Modals = {
  team: document.querySelector<HTMLElement>('.modal-team-box'),
  filmsList: document.querySelector<HTMLUListElement>('.films__list, .library-films__list'),
  modalDetails: document.querySelector<HTMLElement>('.details'),
  login: document.querySelector<HTMLElement>('.login'),
  register: document.querySelector<HTMLElement>('.register'),
};

const buttons: Buttons = {
  team: document.querySelector<HTMLButtonElement>('.modal-team'),
  // login: document.querySelector<HTMLButtonElement>('#headerLoginButton'),
  register: document.querySelector<HTMLButtonElement>('#loginButtonRegister'),
};

const navLoginLi = document.querySelector('.header__nav-login') as HTMLElement | null;

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

export function openModal(modal: HTMLElement | null) {
  if (!modal) return;

  rememberFocus();
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  const focusables = getFocusable(modal);
  (focusables[0] ?? modal).focus();
}

if (buttons.team) buttons.team.addEventListener('click', () => openModal(modals.team));
if (buttons.register) buttons.register.addEventListener('click', () => openModal(modals.register));

// Login modal opener (dynamic render)
navLoginLi?.addEventListener('click', e => {
  const target = e.target as HTMLElement;

  if (target.id === 'headerLoginButton') {
    openModal(modals.login);
  }
});

export function openRegisterModal(): void {
  openModal(modals.register);
}

// DETAILS
function setupDetailsModal() {
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

setupDetailsModal();
