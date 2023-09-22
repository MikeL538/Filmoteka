import { fetchQuery, fetchTrending } from './fetch';
import { loadMovies } from './loadMovies';

export async function trendingMovies() {
  try {
    const response = await fetchTrending();
    const movies = response && response.results;
    if (movies) {
      await loadMovies(movies);
    } else {
      console.log('No trending movies found.');
    }
  } catch (err) {
    console.log(err);
  }
}

const list = document.querySelector('.films__list');
const searchInput = document.querySelector('.header__nav-input');

export async function searchMovies(e) {
  try {
    e.preventDefault();
    list.innerHTML = '';
    const searchInputValue = searchInput.value;
    if (searchInputValue) {
      const movies = await fetchQuery(searchInputValue);
      if (movies && movies.results) {
        await loadMovies(movies.results);
      } else {
        console.log('No movies found.');
      }
    } else {
      console.log('Please enter a search query.');
    }
  } catch (err) {
    console.log(err);
  }
}
