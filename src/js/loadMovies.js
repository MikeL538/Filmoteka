// Movie-modal
import { handler } from './handler';
const detailsDiv = document.querySelector('.details');
const filmImage = document.querySelectorAll('.films__list-item > img');
const detailsDivClose = document.querySelector('.details__close-button');
const moviesEl = document.querySelector('.films');

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
      const id = img.dataset.id;
      handler(id);
    });
  });
}

// Loading
const list = document.querySelector('.films__list');

export function loadMovies(movies) {
  const movieList = movies
    .map(({ id, backdrop_path, title, release_date, genre_ids }) => {
      const imagePath = backdrop_path
        ? `https://image.tmdb.org/t/p/w500${encodeURIComponent(backdrop_path)}`
        : 'no-video.3fec0c03.jpg';
      return `<li class="films__list-item">
        <img src="${imagePath}" alt="${title}" data-id="${id}"/>
        <h2>${title}</h2>
        <p>${genre_ids} | <span>${release_date}</span></p>
      </li>`;
    })
    // ^^^ vote_average = rating zaokrąglony do 1 po przecinku.
    .join('');

  list.insertAdjacentHTML('beforeend', movieList);

  const newFilmImages = document.querySelectorAll('.films__list-item > img');
  movieModal(newFilmImages);
}
