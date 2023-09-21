import './scss/main.scss';
import './js/movie-block';
import { searchMovies, trendingMovies } from './js/handler';

window.onload = trendingMovies();

const searchForm = document.querySelector('.header__nav-form');

searchForm.addEventListener('submit', searchMovies);