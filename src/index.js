import './scss/main.scss';
import { searchMovies, trendingMovies } from './js/handler';
import './js/library';
window.onload = trendingMovies();

const searchForm = document.querySelector('.header__nav-form');

searchForm.addEventListener('submit', searchMovies);
