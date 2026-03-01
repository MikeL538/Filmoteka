// modalShow.ts
import { populateModal } from './ui/populateDetailsModal.js';
import { tmdbClient } from './api/tmdbApi.js';
import type { MovieDetails } from '../types and data/types.js';
import { currentLanguage } from './language.js';
import { notifications } from './ui/notifications.js';
import { rememberFocus, restoreFocus, lockBackground } from './modalClose.js';

type Modals = {
  team: HTMLElement | null;
  filmsList: HTMLUListElement | null;
  modalDetails: HTMLElement | null;
};

const modals: Modals = {
  team: document.querySelector<HTMLElement>('.modal-team'),
  filmsList: document.querySelector<HTMLUListElement>('.films__list, .library-films__list'),
  modalDetails: document.querySelector<HTMLElement>('.details'),
};

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  "[tabindex]:not([tabindex='-1'])",
].join(',');

function isHTMLElement(el: Element): el is HTMLElement {
  return el instanceof HTMLElement;
}

function isVisible(el: HTMLElement) {
  return el.offsetParent !== null || getComputedStyle(el).position === 'fixed';
}

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR))
    .filter(isHTMLElement)
    .filter(el => !el.hasAttribute('disabled'))
    .filter(isVisible);
}

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

export function modalShow() {
  // Team modal open
  modals.team?.addEventListener('click', () => {
    rememberFocus();

    document.querySelector<HTMLElement>('.modal-team-box')?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });

  // Details modal open (list click)
  if (!modals.filmsList) return;

  // Is modal focusable?
  if (modals.modalDetails && !modals.modalDetails.hasAttribute('tabindex')) {
    modals.modalDetails.setAttribute('tabindex', '-1');
  }

  modals.filmsList.addEventListener('click', async e => {
    const target = e.target as HTMLElement;
    const listItem = target.closest<HTMLLIElement>('.films__list-item');
    const movieId = listItem?.dataset.id;

    if (!listItem || !movieId) return;

    rememberFocus();
    lockBackground();

    notifications.showModalLoader();
    document.body.style.overflow = 'hidden';

    try {
      const movie = await fetchMovieDetails(movieId);
      populateModal(movie);

      // show modal
      modals.modalDetails?.classList.remove('hidden');

      // focus inside modal (first focusable or modal container)
      if (modals.modalDetails) {
        const focusables = getFocusable(modals.modalDetails);
        (focusables[0] ?? modals.modalDetails).focus();
      }
    } catch (error) {
      document.body.style.overflow = 'auto';
      restoreFocus(); // Get back focus
      console.error('Failed to fetch movie details:', error);
    } finally {
      notifications.hideLoader();
    }
  });
}

// Login/Register
export function openLoginModal(): void {
  rememberFocus();
  document.querySelector<HTMLElement>('.login')?.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

export function openRegisterModal(): void {
  rememberFocus();
  document.querySelector<HTMLElement>('.register')?.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
