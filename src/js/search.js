import { fetchMovies, renderedMovieIds, currentPage } from './fetcher';

const searchForm = document.querySelector('.header__nav-form');
const filmsList = document.querySelector('.films__list');

function handleSearch(event) {
  event.preventDefault();
  const searchInput = document.querySelector('.header__nav-input');
  const searchQuery = searchInput.value.trim();

  renderedMovieIds.clear();
  currentPage = 1;

  filmsList.innerHTML = '';

  fetchMovies(currentPage, searchQuery);
}

searchForm.addEventListener('submit', handleSearch);
