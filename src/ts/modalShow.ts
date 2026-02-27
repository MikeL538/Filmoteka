import { populateModal } from './ui/populateDetailsModal.js';
import { tmdbClient } from './api/tmdbApi.js';
import type { MovieDetails } from '../types and data/types.js';
import { currentLanguage } from './language.js';
import { notifications } from './ui/notifications.js';
type Modals = {
  team: HTMLElement | null;
  filmsList: HTMLElement | null;
  modalDetails: HTMLElement | null;
  // modalLogin: HTMLElement | null;
  // modalRegister: HTMLElement | null;
};

const modals: Modals = {
  team: document.querySelector<HTMLElement>('.modal-team'),
  filmsList: document.querySelector<HTMLUListElement>('.films__list, .library-films__list'),
  modalDetails: document.querySelector<HTMLElement>('.details'),
  // modalLogin: document.querySelector<HTMLElement>('#login'),
  // modalRegister: document.querySelector<HTMLElement>('#register'),
};

export function modalShow() {
  // ======= MODALS ========

  // ======= SHOW TEAM ==========
  modals.team?.addEventListener('click', () => {
    document.querySelector<HTMLElement>('.modal-team-box')?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });

  // ======= SHOW MOVIE DETAILS ==========
  if (!modals.filmsList) return;

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

  modals.filmsList.addEventListener('click', async e => {
    const target = e.target as HTMLElement;
    const listItem = target.closest<HTMLLIElement>('.films__list-item');
    const movieId = listItem?.dataset.id;

    if (!listItem || !movieId) return;

    notifications.showModalLoader();
    document.body.style.overflow = 'hidden';

    try {
      const movie = await fetchMovieDetails(movieId);
      populateModal(movie);

      modals.modalDetails?.classList.remove('hidden');
    } catch (error) {
      document.body.style.overflow = 'auto';
      console.error('Failed to fetch movie details:', error);
    } finally {
      notifications.hideLoader();
    }
  });
}

// ======= SHOW LOGIN ==========
export function openLoginModal(): void {
  document.querySelector<HTMLElement>('.login')?.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

// ======= SHOW REGISTER MODAL (INSIDE LOGIN) ==========
export function openRegisterModal(): void {
  document.querySelector<HTMLElement>('.register')?.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
