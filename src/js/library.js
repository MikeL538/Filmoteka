import { fetchMovies } from './fetcher';
import { fetchMovieDetails, populateModal } from './modalDetails';
const watchedBtn = document.querySelector('.btn-watched');
const queueBtn = document.querySelector('.btn-queue');
const addWatched = document.querySelector('.btn-add-watched');
const addQueue = document.querySelector('.btn-add-queue');
const boxWatched = document.querySelector('.watched-box');
const boxQueue = document.querySelector('.queue-box');
const imgNoCinema = document.querySelector('#noCinema');

// console.log(watchedBtn);
// console.log(queueBtn);
// console.log(addWatched);
// console.log(addQueue);
// axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
// axios.defaults.headers.common['Authorization'] =
//   'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjk0YzNhNWI0MDAwMDg5YWZhMWQ1YTFhZTk4YWIxZCIsInN1YiI6IjY1MGM4MmQzYjViYzIxMDEyY2M5ZmIwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gbA2ivTkeIlFgOsCG0AQU95bbBmYrPkGm6ojq4z3dKo';


watchedBtn.addEventListener('click', () => {
  boxWatched.classList.remove('is-hiden');
  boxQueue.classList.add('is-hiden');
  imgNoCinema.classList.add('is-hiden');
  const idFromLS = localStorage.getItem('watched');
  const watchedList = JSON.parse(idFromLS);
  //   console.log(watchedList);
  //   fetchMovies(watchedList);
  fetchMovieDetails(watchedList);
  //   populateModal(movieDetails);
});

queueBtn.addEventListener('click', () => {
  boxQueue.classList.remove('is-hiden');
  boxWatched.classList.add('is-hiden');
  imgNoCinema.classList.add('is-hiden');
  const queueFromLS = localStorage.getItem('queue');
  const queueList = JSON.parse(queueFromLS);
  fetchMovieDetails(queueList);
});
