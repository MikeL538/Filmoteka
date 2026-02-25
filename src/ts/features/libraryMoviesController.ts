import { fetchQueuedMovies, fetchWatchedMovies } from '../ui/moviesRenderer.js';
import { renderMovies } from '../ui/moviesRenderer.js';
import { currentLanguage } from '../language.js';
import { notifications } from '../ui/notifications.js';

const buttonWatched = document.querySelector<HTMLButtonElement>('.btn-watched');
const buttonQueued = document.querySelector<HTMLButtonElement>('.btn-queued');
const filmsList = document.querySelector<HTMLUListElement>('.library-films__list')!;
let isInitialized = false;

async function handleWatchedClick() {
  buttonWatched?.classList.add('button-library--active');
  buttonQueued?.classList.remove('button-library--active');

  notifications.showLoader();

  try {
    const movies = await fetchWatchedMovies(currentLanguage);
    filmsList.innerHTML = renderMovies(movies, currentLanguage);
  } catch (error) {
    notifications.error();
  } finally {
    notifications.hideLoader();
  }
}

async function handleQueuedClick() {
  buttonWatched?.classList.remove('button-library--active');
  buttonQueued?.classList.add('button-library--active');
  notifications.showLoader();

  try {
    const movies = await fetchQueuedMovies(currentLanguage);
    filmsList.innerHTML = renderMovies(movies, currentLanguage);
  } catch (error) {
    notifications.error();
  } finally {
    notifications.hideLoader();
  }
}

async function renderActiveTab() {
  if (buttonQueued?.classList.contains('button-library--active')) {
    await handleQueuedClick();
    return;
  }

  await handleWatchedClick();
}

export function load() {
  if (!isInitialized) {
    buttonWatched?.addEventListener('click', () => {
      void handleWatchedClick();
    });

    buttonQueued?.addEventListener('click', () => {
      void handleQueuedClick();
    });

    document.addEventListener('languageChanged', () => {
      void renderActiveTab();
    });

    isInitialized = true;
  }

  void renderActiveTab();
}
