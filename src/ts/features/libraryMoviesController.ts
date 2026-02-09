import { fetchQueuedMovies, fetchWatchedMovies } from '../ui/moviesRenderer.js';
import { renderMovies } from '../ui/moviesRenderer.js';
import { currentLanguage } from '../language.js';

const buttonWatched = document.querySelector<HTMLButtonElement>('.btn-watched');
const buttonQueued = document.querySelector<HTMLButtonElement>('.btn-queued');
const filmsList = document.querySelector<HTMLUListElement>('.library-films__list')!;

async function handleWatchedClick() {
  buttonWatched?.classList.add('button-library--active');
  buttonQueued?.classList.remove('button-library--active');
  const movies = await fetchWatchedMovies(currentLanguage);
  filmsList.innerHTML = renderMovies(movies, currentLanguage);
}

async function handleQueuedClick() {
  buttonWatched?.classList.remove('button-library--active');
  buttonQueued?.classList.add('button-library--active');
  const movies = await fetchQueuedMovies(currentLanguage);
  filmsList.innerHTML = renderMovies(movies, currentLanguage);
}

export function load() {
  if (
    !buttonWatched?.classList.contains('button-library--active') ||
    !buttonQueued?.classList.contains('button-library--active')
  ) {
    handleWatchedClick();
  }
  buttonWatched?.addEventListener('click', handleWatchedClick);
  buttonQueued?.addEventListener('click', handleQueuedClick);

  document.addEventListener('languageChanged', () => {
    filmsList.innerHTML = '';
    load();
  });
}
