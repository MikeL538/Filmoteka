import { fetchMovies, renderedMovieIds, setCurrentPage } from './fetcher';

const searchForm = document.querySelector('.header__nav-form');
const filmsList = document.querySelector('.films__list');

function handleSearch(event) {
  event.preventDefault();
  const searchInput = document.querySelector('.header__nav-input');
  const searchQuery = searchInput.value.trim();

  renderedMovieIds.clear();
  setCurrentPage(1);

  filmsList.innerHTML = '';

  fetchMovies(setCurrentPage, searchQuery);
}

searchForm.addEventListener('submit', handleSearch);
