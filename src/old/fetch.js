import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const options = {
  method: 'GET',
  language: 'en-US',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjk0YzNhNWI0MDAwMDg5YWZhMWQ1YTFhZTk4YWIxZCIsInN1YiI6IjY1MGM4MmQzYjViYzIxMDEyY2M5ZmIwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gbA2ivTkeIlFgOsCG0AQU95bbBmYrPkGm6ojq4z3dKo',
  },
};

export async function fetchTrending() {
  try {
    const trending = await axios.get('trending/movie/day', options);
    return trending.data;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchQuery(searchInput) {
  try {
    const search = await axios.get(
      `search/movie?query=${encodeURIComponent(searchInput)}`,
      options,
    );
    return search.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function fetchDetailsMovie(id) {
  try {
    const details = await axios.get(`movie/${id}`, options);
    return details.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Modal Details
import { handler } from './handler';
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
      const id = img.dataset.id;
      handler(id);
    });
  });
}
