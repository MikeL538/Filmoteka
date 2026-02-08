import { fetchTrending, searchMovies } from '../api/moviesService.js';
import { renderMovies } from '../ui/moviesRenderer.js';
import { attachInfiniteScroll } from '../ui/scrollHandler.js';
import { attachSearch } from '../ui/searchHandler.js';
import { currentLanguage } from '../language.js';
import { notifications } from '../ui/notifications.js';

const filmsList = document.querySelector<HTMLUListElement>('.films__list')!;
const form = document.querySelector<HTMLFormElement>('.header__nav-form')!;

export function initMoviesPage() {
  let currentPage = 1;
  let query = '';

  async function load() {
    const movies = query
      ? await searchMovies(query, currentPage, currentLanguage)
      : await fetchTrending(currentPage, currentLanguage);

    filmsList.innerHTML += renderMovies(movies, currentLanguage);
  }

  attachSearch(form, newQuery => {
    query = newQuery;
    currentPage = 1;
    filmsList.innerHTML = '';
    load();
  });

  attachInfiniteScroll(async () => {
    currentPage++;
    if (currentPage.valueOf.length > 20) notifications.noMoreMovies();
    await load();
  });

  load();

  document.addEventListener('languageChanged', () => {
    currentPage = 1;
    filmsList.innerHTML = '';
    load();
  });
}
