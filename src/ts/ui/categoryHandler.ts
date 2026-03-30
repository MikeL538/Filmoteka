import type { Movie } from '../../types and data/types.js';
import { genresMap } from '../../types and data/genres.js';

export function getSelectedCategory(): number | 'all' {
  const select = document.querySelector<HTMLSelectElement>('#categorySelect');
  const selectedValue = select?.value ?? 'all';

  if (selectedValue === 'all' || selectedValue === '1') {
    return 'all';
  }

  const parsedValue = Number(selectedValue);

  return Number.isFinite(parsedValue) ? parsedValue : 'all';
}

export function filterMoviesByCategory(movies: Movie[]): Movie[] {
  const selectedCategory = getSelectedCategory();

  if (selectedCategory === 'all') {
    return movies;
  }

  return movies.filter(movie => movie.genre_ids.includes(selectedCategory));
}

export function populateCategorySelect(
  language: 'en-US' | 'pl-PL',
  selectedValue?: string,
) {
  const select = document.querySelector<HTMLSelectElement>('#categorySelect');

  if (!select) return;

  const previousValue = selectedValue ?? select.value ?? 'all';
  const allLabel = language === 'pl-PL' ? 'Wszystkie' : 'All';
  const options = [`<option value="all">${allLabel}</option>`];

  genresMap.forEach((genre, id) => {
    const label = language === 'pl-PL' ? genre.pl : genre.en;
    options.push(`<option value="${id}">${label}</option>`);
  });

  select.innerHTML = options.join('');
  select.value = options.some(option => option.includes(`value="${previousValue}"`))
    ? previousValue
    : 'all';
}

export function categoryHandler(onChange: () => void) {
  const select = document.querySelector<HTMLSelectElement>('#categorySelect');

  if (!select) return;

  select.addEventListener('change', onChange);
}
