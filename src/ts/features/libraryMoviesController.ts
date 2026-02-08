import { fetchQueuedMovies } from '../ui/moviesRenderer.js';
import { renderMovies } from '../ui/moviesRenderer.js';
import { currentLanguage } from '../language.js';

const filmsList = document.querySelector<HTMLUListElement>('.library-films__list')!;

export async function load() {
  const movies = await fetchQueuedMovies(currentLanguage);

  filmsList.innerHTML = renderMovies(movies, currentLanguage);
}
