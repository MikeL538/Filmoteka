// export function populateModal(movieDetails) {
//   const modalTitle = document.querySelector('.details__title');
//   const modalImg = document.querySelector('.details__img');
//   const modalInformation = document.querySelector('.details__information-right');
//   const modalAbout = document.querySelector('.details__about-container p');

//   modalTitle.textContent = movieDetails.title;
//   const modalImgFound = movieDetails.backdrop_path
//     ? `https://image.tmdb.org/t/p/w500${encodeURIComponent(movieDetails.backdrop_path)}`
//     : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png';
//   modalImg.src = modalImgFound;
//   modalImg.alt = modalImgFound;

//   const mathRound = Math.round(movieDetails.vote_average * 10) / 10;

//   modalInformation.innerHTML = `
//     <ul class=" details__information-list">
//   <li>
//   <span><span class="details__information-rating">${mathRound}</span> /
//   ${movieDetails.vote_count}</span>
//   <span>${movieDetails.popularity}</span>
//   <span class="details__information-original-title">${movieDetails.original_title}</span>
//   <span>${movieDetails.genres.map(genre => genre.name).join(', ')}</span>
//   </li>
// </ul>
//   `;

//   modalAbout.textContent = movieDetails.overview;

//   detailsDiv.classList.add('show-element');
// }

export function populateModal(movieDetails) {
  const details = document.querySelector('.details');
  const detailsDiv = document.querySelector('.details');

  const modalTitle = document.querySelector('.details__title');
  const modalImg = document.querySelector('.details__img');
  const modalAbout = document.querySelector('.details__about-container p');

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
