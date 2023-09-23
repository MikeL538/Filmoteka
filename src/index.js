import './scss/main.scss';
import { searchMovies, trendingMovies } from './js/handler';
import './js/scroll.js';

window.onload = trendingMovies();

const searchForm = document.querySelector('.header__nav-form');

searchForm.addEventListener('submit', searchMovies);
