import type { Movie } from '../../types and data/types.js';
import { getGenreName } from '../../types and data/genres.js';

export function renderMovies(movies: Movie[], language: 'en-US' | 'pl-PL'): string {
  return movies
    .map(movie => {
      const roundedVoteAverage = Math.round(movie.vote_average * 10) / 10;
      const genreNames = movie.genre_ids.map(genreId => getGenreName(genreId, language));
      const imagePath = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/w500${encodeURIComponent(movie.backdrop_path)}`
        : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png';

      return `<li class="films__list-item" data-id="${movie.id}">
       <img src="${imagePath}" alt="${movie.title}" />
        <h2>${movie.title}</h2>
        <p>${genreNames.slice(0, 2).join(', ')} | <span>${movie.release_date.substring(0, 4)}</span>
        <span class="films__list-item--rating">${roundedVoteAverage}</span></p>
      </li>`;
    })
    .join('');
}
