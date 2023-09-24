import InfiniteScroll from 'infinite-scroll';
import Notiflix from 'notiflix';
import { fetchQuery } from './fetch';
import { loadMovies } from './loadMovies';

const moviesContainer = document.querySelector('.films__list');
let isLoading = false;
let currentPage = 1;
let totalPages = 1;

async function fetchSearchResults() {
  console.log('Fetching page:', currentPage);
  if (isLoading || currentPage > totalPages) return;

  isLoading = true;

  try {
    const response = await fetchQuery(currentPage); 
    console.log('Request URL:', `search/movie?query=&page=${currentPage}`);
    const movies = response && response.results;

    if (movies) {
      console.log('Loading movies:', movies);
      loadMovies(movies);
      currentPage++;
      totalPages = response.total_pages;

      if (currentPage > totalPages) {
        Notiflix.Notify.info('Less than 20 movies loaded.');
      }
    } else {
      Notiflix.Notify.info('No more movies to load.'); 
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  isLoading = false;
}

let infScroll = new InfiniteScroll(moviesContainer, {
  path: function () {
    return `trending/movie/day?page=${currentPage}`;
  },
  append: '.films__list-item',
});

infScroll.on('load', function () {
  console.log('InfScrolling');
  fetchSearchResults();
});

function handleSearchInputChange() {
  currentPage = 1;
  totalPages = 1;
  moviesContainer.innerHTML = '';
  fetchSearchResults();
  console.log('Loaded page:', currentPage);
}

const searchInput = document.querySelector('.header__nav-input');
searchInput.addEventListener('input', handleSearchInputChange); 