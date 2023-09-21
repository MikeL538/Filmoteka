const list = document.querySelector('.films__list');

export function loadMovies(movies) {
  const movie = movies.results
    .map(({ backdrop_path, original_title, release_date, genre_ids }) => {
      return `<li class="films__list-item">
   <img src="${backdrop_path}" alt="${original_title}" />
    <h2>${original_title}</h2>
   <p>${genre_ids} | <span>${release_date}</span></p>
</li>`;
    })
    .join('');

  list.insertAdjacentHTML('beforeend', movie);
}
