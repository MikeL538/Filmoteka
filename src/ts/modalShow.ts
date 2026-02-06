import { populateModal } from './ui/populateDetailsModal.js';
import { tmdbClient } from './api/tmdbApi.js';
import type { MovieDetails } from '../types and data/types.js';
import { currentLanguage } from './language.js';

export function modalShow() {
  // ======= SHOW TEAM ==========
  const modalTeam = document.querySelector<HTMLElement>('.modal-team');
  modalTeam?.addEventListener('click', () => {
    document.querySelector<HTMLElement>('.modal-team-box')?.classList.remove('hidden');
  });

  // ======= SHOW MOVIE DETAILS ==========
  const modalDetails = document.querySelector<HTMLElement>('.details')!;
  const filmsList = document.querySelector<HTMLUListElement>('.films__list')!;

  async function fetchMovieDetails(movieId: string): Promise<MovieDetails> {
    const { data } = await tmdbClient.get<MovieDetails>(`movie/${movieId}`, {
      params: { language: currentLanguage },
    });

    return data;
  }

  filmsList.addEventListener('click', async e => {
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
    }
  });
}
