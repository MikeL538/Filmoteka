import { fetchQuery, fetchTrending, fetchDetailsMovie } from './fetch';
import { loadMovies } from '../loadMovies';
import { detailsMovie } from '../detailsMovie';

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

export async function handler(id) {
  try {
    const details = await fetchDetailsMovie(id);
    await detailsMovie(details);
  } catch (err) {
    console.log(err);
  }
}
