// Movie-modal
const detailsDiv = document.querySelector('.details');
const filmImage = document.querySelectorAll('.films__list-item > img');
const detailsDivClose = document.querySelector('.details__close-button');

filmImage.forEach(img => {
  img.addEventListener('click', () => {
    detailsDiv.classList.add('show-element');
  });
});

detailsDivClose.addEventListener('click', () => {
  detailsDiv.classList.remove('show-element');
});

function movieModal(imgs) {
  imgs.forEach(img => {
    img.addEventListener('click', () => {
      detailsDiv.classList.add('show-element');
    });
  });
}

// Loading
const list = document.querySelector('.films__list');

export function loadMovies(movies) {
  const movieList = movies
    .map(({ backdrop_path, original_title, release_date, genre_ids, vote_average }) => {
      const imagePath = backdrop_path
        ? `https://image.tmdb.org/t/p/w500${encodeURIComponent(backdrop_path)}`
        : 'no-video.3fec0c03.jpg';
      return `<li class="films__list-item">
        <img src="${imagePath}" alt="${original_title}" />
        <h2>${original_title}</h2>
        <p>${Math.round(vote_average * 10) / 10} | <span>${release_date}</span></p>
      </li>`;
    })
    // ^^^ vote_average = rating zaokrąglony do 1 po przecinku.
    .join('');

  list.insertAdjacentHTML('beforeend', movieList);

  const newFilmImages = document.querySelectorAll('.films__list-item > img');
  movieModal(newFilmImages);
}
