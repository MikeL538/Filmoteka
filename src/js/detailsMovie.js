const titleMovie = document.querySelector('.details__title');
const img = document.querySelector('.details__img');
const detailsInfo = document.querySelector('.details__information-right');
const detailsAbout = document.querySelector('.details__about-container > p');

export function detailsMovie(details) {
  const {
    title,
    original_title,
    backdrop_path,
    vote_average,
    vote_count,
    popularity,
    genres,
    overview,
  } = details;
  const imagePath = backdrop_path
    ? `https://image.tmdb.org/t/p/w500${encodeURIComponent(backdrop_path)}`
    : 'no-video.3fec0c03.jpg';

  img.setAttribute('src', imagePath);
  img.setAttribute('alt', title);
  titleMovie.innerHTML = title;

  const mathRound = Math.round(vote_average * 10) / 10;
  const x = [];
  for (const genre of genres) {
    x.push(genre.name);
  }

  detailsInfo.innerHTML = '';
  const info = `
          <ul class="details__information-list">
            <li>
              <span><span class="details__information-rating">${mathRound}</span> / ${vote_count}</span>
              <span>${popularity}</span>
              <span>${original_title}</span>
              <span>${x.join(', ')}</span>
            </li>
          </ul>`;
  detailsInfo.innerHTML += info;

  detailsAbout.textContent = overview;
}
