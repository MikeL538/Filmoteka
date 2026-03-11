import { fetchTrending, searchMovies } from '../api/moviesService.js';
import { renderMovies } from '../ui/moviesRenderer.js';
import { attachInfiniteScroll } from '../ui/scrollHandler.js';
import { attachSearch } from '../ui/searchHandler.js';
import { applyTranslations, currentLanguage } from '../language.js';
import { notifications } from '../ui/notifications.js';

export function initMoviesPage() {
  const filmsList = document.querySelector<HTMLUListElement>('.films__list')!;
  const form = document.querySelector<HTMLFormElement>('.header__nav-form')!;

  let currentPage: number = 1;
  let totalPages: number = 1;
  let query: string = '';
  let noMoreVideos: boolean = false;
  const noMore: HTMLParagraphElement = document.createElement('p');
  noMore.classList.add('no-more-videos');
  noMore.setAttribute('data-translate', 'noMoreVidoes');

  async function load() {
    if (!filmsList.children.length) {
      notifications.showLoader();
    }

    noMore.innerHTML = '';

    try {
      const response = query
        ? await searchMovies(query, currentPage, currentLanguage)
        : await fetchTrending(currentPage, currentLanguage);

      totalPages = response.total_pages ?? 1;

      filmsList.innerHTML += renderMovies(response.results, currentLanguage);
    } catch (error) {
      notifications.error();
      filmsList.innerHTML += `<li><button><p>${error}</p></button></li>`;
    } finally {
      notifications.hideLoader();
    }
  }

  attachSearch(form, newQuery => {
    query = newQuery;
    currentPage = 1;
    filmsList.innerHTML = '';
    noMoreVideos = false;
    load();
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

  load();

  // Listen to language change
  document.addEventListener('languageChanged', () => {
    currentPage = 1;
    filmsList.innerHTML = '';
    noMoreVideos = false;
    load();
  });
}
