import { fetchTrending, searchMovies } from '../api/moviesService.js';
import { renderMovies } from '../ui/moviesRenderer.js';
import { attachInfiniteScroll } from '../ui/scrollHandler.js';
import { attachSearch } from '../ui/searchHandler.js';

const filmsList = document.querySelector<HTMLUListElement>('.films__list')!;
const form = document.querySelector<HTMLFormElement>('.header__nav-form')!;

export function initMoviesPage() {
  let currentPage = 0;
  let query = '';

  async function load() {
    currentPage++;
    const movies = query
      ? await searchMovies(query, currentPage, 'en-US')
      : await fetchTrending(currentPage, 'en-US');

    filmsList.innerHTML += renderMovies(movies, 'en-US');
  }

  attachSearch(form, newQuery => {
    query = newQuery;
    currentPage = 1;
    load();
  });

  attachInfiniteScroll({
    fetchCallback: (page: number) => load(),
    currentPage,
    searchQuery: query,
  });

  load();
}
