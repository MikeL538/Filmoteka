import { fetchQuery, fetchTrending } from './fetch';
import { loadMovies } from './loadMovies';

export async function trendingMovies() {
  try {
    const movies = await fetchTrending();
    await loadMovies(movies);
  } catch (err) {
    console.log(err);
  }
}

const list = document.querySelector('.films__list');
const searchForm = document.querySelector('.header__nav-form');
const { searchInput } = searchForm.elements;

export async function searchMovies(e) {
  try {
    e.preventDefault();
    list.innerHTML='';
    const movies = fetchQuery(searchInput.value)
    await loadMovies(movies);
  } catch (err) {
    console.log(err);
  }
}
