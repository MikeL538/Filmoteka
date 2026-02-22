import { populateModal } from './ui/populateDetailsModal.js';
import { tmdbClient } from './api/tmdbApi.js';
import type { MovieDetails } from '../types and data/types.js';
import { currentLanguage } from './language.js';
import { notifications } from './ui/notifications.js';

export function modalShow() {
  // ======= SHOW TEAM ==========
  const modalTeam = document.querySelector<HTMLElement>('.modal-team');
  modalTeam?.addEventListener('click', () => {
    document.querySelector<HTMLElement>('.modal-team-box')?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });

  // ======= SHOW MOVIE DETAILS ==========
  const filmsList = document.querySelector<HTMLUListElement>('.films__list, .library-films__list');
  if (!filmsList) return;
  const modalDetails = document.querySelector<HTMLElement>('.details')!;
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

  filmsList.addEventListener('click', async e => {
    notifications.showModalLoader();
    document.body.style.overflow = 'hidden';
    const target = e.target as HTMLElement;
    const listItem = target.closest<HTMLLIElement>('.films__list-item');

    if (!listItem) return;

    const movieId = listItem.dataset.id;
    if (!movieId) return;

    try {
      const movie = await fetchMovieDetails(movieId);
      populateModal(movie);

      modalDetails.classList.remove('hidden');
    } catch (error) {
      console.error('Failed to fetch movie details:', error);
    } finally {
      notifications.hideLoader();
    }
  });

  // ======= SHOW LOGIN ==========
  const modalLogin = document.querySelector<HTMLElement>('.header__nav-login');

  modalLogin?.addEventListener('click', () => {
    document.querySelector<HTMLElement>('.login')?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });
}
