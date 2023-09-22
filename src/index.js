import './scss/main.scss';
import { searchMovies, trendingMovies } from './js/handler';

window.onload = trendingMovies();

const searchForm = document.querySelector('.header__nav-form');

searchForm.addEventListener('submit', searchMovies);
