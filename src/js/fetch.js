import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const options = {
  method: 'GET',
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
