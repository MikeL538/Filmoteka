import { fetchMoviesByGenre, fetchTrending, searchMovies } from '../api/moviesService.js';
import { renderMovies } from '../ui/moviesRenderer.js';
import { attachInfiniteScroll } from '../ui/scrollHandler.js';
import { attachSearch } from '../ui/searchHandler.js';
import { applyTranslations, currentLanguage } from '../language.js';
import { notifications } from '../ui/notifications.js';
import {
  categoryHandler,
  filterMoviesByCategory,
  getSelectedCategory,
  populateCategorySelect,
} from '../ui/categoryHandler.js';
import type { Movie } from '../../types and data/types.js';

export function initMoviesPage() {
  const filmsList = document.querySelector<HTMLUListElement>('.films__list')!;
  const form = document.querySelector<HTMLFormElement>('.header__nav-form')!;
  const categorySelect = document.querySelector<HTMLSelectElement>('#categorySelect');

  let currentPage: number = 1;
  let totalPages: number = 1;
  let query: string = '';
  let noMoreVideos: boolean = false;
  let requestVersion: number = 0;
  let loadedMovies: Movie[] = [];
  const noMore: HTMLParagraphElement = document.createElement('p');
  noMore.classList.add('no-more-videos');
  noMore.setAttribute('data-translate', 'noMoreVidoes');

  function renderCurrentMovies() {
    filmsList.innerHTML = renderMovies(filterMoviesByCategory(loadedMovies), currentLanguage);
  }

  function resetAndLoad() {
    requestVersion++;
    currentPage = 1;
    loadedMovies = [];
    filmsList.innerHTML = '';
    noMoreVideos = false;
    void load(requestVersion);
  }

  populateCategorySelect(currentLanguage);

  async function load(version = requestVersion) {
    if (!filmsList.children.length) {
      notifications.showLoader();
    }

    noMore.innerHTML = '';

    try {
      const selectedCategory = getSelectedCategory();
      const response = query
        ? await searchMovies(query, currentPage, currentLanguage)
        : selectedCategory === 'all'
          ? await fetchTrending(currentPage, currentLanguage)
          : await fetchMoviesByGenre(selectedCategory, currentPage, currentLanguage);

      if (version !== requestVersion) {
        return;
      }

      totalPages = response.total_pages ?? 1;
      loadedMovies =
        currentPage === 1 ? response.results : [...loadedMovies, ...response.results];
      renderCurrentMovies();
    } catch (error) {
      if (version !== requestVersion) {
        return;
      }

      notifications.error();
      filmsList.innerHTML += `<li><button><p>${error}</p></button></li>`;
    } finally {
      if (version === requestVersion) {
        notifications.hideLoader();
      }
    }
  }

  attachSearch(form, newQuery => {
    query = newQuery;
    resetAndLoad();
  });

  categoryHandler(() => {
    resetAndLoad();
  });

  attachInfiniteScroll(async () => {
    if (noMoreVideos) return;

    if (currentPage >= totalPages) {
      noMoreVideos = true;
      notifications.noMoreMovies();

      // noMore.innerHTML = `No more videos to load`;
      filmsList.after(noMore);
      applyTranslations();
      return;
    }

    currentPage++;
    await load();
  }, filmsList);

  resetAndLoad();

  // Listen to language change
  document.addEventListener('languageChanged', () => {
    populateCategorySelect(currentLanguage, categorySelect?.value);
    resetAndLoad();
  });
}
