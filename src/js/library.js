// import axios from 'axios';
// import './modalDetails';
// import { showDetails } from './modalDetails';

// const watchedBtn = document.querySelector('.btn-watched');
// const queueBtn = document.querySelector('.btn-queue');
// const addWatched = document.querySelector('.btn-add-watched');
// const addQueue = document.querySelector('.btn-add-queue');
// const boxWatched = document.querySelector('.watched-box');
// const boxQueue = document.querySelector('.queue-box');
// const imgNoCinema = document.querySelector('#noCinema');

// console.log(watchedBtn);
// console.log(queueBtn);
// console.log(addWatched);
// console.log(addQueue);

// watchedBtn.addEventListener('click', () => {
//   boxWatched.classList.remove('is-hiden');
//   boxQueue.classList.add('is-hiden');
//   imgNoCinema.classList.add('is-hiden');
// });

// queueBtn.addEventListener('click', () => {
//   boxQueue.classList.remove('is-hiden');
//   boxWatched.classList.add('is-hiden');
//   imgNoCinema.classList.add('is-hiden');
// });

// addWatched.addEventListener('click', () => {
//   if (localStorage.getItem('watched') === null) {
//     localStorage.setItem('watched', '[]');
//   }
// });

// export function addingToLibrary() {
//   if (localStorage.getItem('watched') === null) {
//     localStorage.setItem('watched', '[]');
//   }
//   if (localStorage.getItem('queue') === null) {
//     localStorage.setItem('queue', '[]');
//   }
// }
// const options = {
//   method: 'POST',
//   headers: {
//     accept: 'application/json',
//     'content-type': 'application/json',
//     Authorization:
//       "Bearer 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjk0YzNhNWI0MDAwMDg5YWZhMWQ1YTFhZTk4YWIxZCIsInN1YiI6IjY1MGM4MmQzYjViYzIxMDEyY2M5ZmIwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gbA2ivTkeIlFgOsCG0AQU95bbBmYrPkGm6ojq4z3dKo'; // Replace with your API key",
//   },
// };

// fetch('https://api.themoviedb.org/3/account/null/watchlist', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));
