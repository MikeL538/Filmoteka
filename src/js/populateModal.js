export function populateModal(movieDetails) {
  const details = document.querySelector('.details');
  const detailsDiv = document.querySelector('.details');

  const modalTitle = document.querySelector('.details__title');
  const modalImg = document.querySelector('.details__img');
  const modalAbout = document.querySelector('.details__about--container p');

  const votes = document.querySelector('.votes');
  const popularity = document.querySelector('.popularity');
  const orgTitle = document.querySelector('.title');
  const genre = details.querySelector('.genre');

  modalTitle.textContent = movieDetails.title;
  const modalImgFound = movieDetails.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${encodeURIComponent(movieDetails.backdrop_path)}`
    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png';
  modalImg.src = modalImgFound;
  modalImg.alt = modalImgFound;

  const mathRound = Math.round(movieDetails.vote_average * 10) / 10;

  if (!genre) {
    console.error('Genre element not found in modal');
    return;
  }

  votes.textContent = `${mathRound} / ${movieDetails.vote_count}`;
  popularity.textContent = `${movieDetails.popularity}`;
  orgTitle.textContent = `${movieDetails.original_title}`;
  genre.textContent = `${movieDetails.genres.map(genre => genre.name).join(', ')}`;

  modalAbout.textContent = movieDetails.overview;

  detailsDiv.classList.add('show-element');
}
