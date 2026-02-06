import type { MovieDetails } from '../../types and data/types.js';

export function populateModal(movieDetails: MovieDetails) {
  const details = document.querySelector<HTMLElement>('.details')!;
  const modalTitle = document.querySelector<HTMLElement>('.details__title')!;
  const modalImg = document.querySelector<HTMLImageElement>('.details__img')!;
  const modalAbout = document.querySelector<HTMLParagraphElement>('.details__about--p')!;

  const votes = document.querySelector<HTMLElement>('.votes')!;
  const popularity = document.querySelector<HTMLElement>('.popularity')!;
  const orgTitle = document.querySelector<HTMLElement>('.title')!;
  const genre = details.querySelector<HTMLElement>('.genre')!;

  modalTitle.textContent = movieDetails.title;
  const modalImgFound = movieDetails.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${encodeURIComponent(movieDetails.backdrop_path)}`
    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png';
  modalImg.src = modalImgFound;
  modalImg.alt = movieDetails.title;

  const votesRound = Math.round(movieDetails.vote_average * 10) / 10;
  const popularityRound = Math.round(movieDetails.popularity);

  votes.textContent = `${votesRound} / ${movieDetails.vote_count}`;
  popularity.textContent = `${popularityRound}`;
  orgTitle.textContent = `${movieDetails.original_title}`;

  genre.textContent = movieDetails.genres.map(g => g.name).join(', ');

  modalAbout.textContent = movieDetails.overview ?? '';
}
