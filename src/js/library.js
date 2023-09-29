import './fetcher';
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

watchedBtn.addEventListener('click', () => {
  boxWatched.classList.remove('is-hiden');
  boxQueue.classList.add('is-hiden');
  imgNoCinema.classList.add('is-hiden');
  const idFromLS = localStorage.getItem('objIdWatched');
  const watchedList = JSON.parse(idFromLS);
  console.log(watchedList);
  //   fetchMovieDetails(watchedList);
  populateModal(watchedList);
});

// // queueBtn.addEventListener('click', () => {
// //   boxQueue.classList.remove('is-hiden');
// //   boxWatched.classList.add('is-hiden');
// //   imgNoCinema.classList.add('is-hiden');
// // });

// export function addingToLocalStorage(movieID) {
//   if (localStorage.getItem('watched') === null) {
//     localStorage.setItem('watched', '[]');
//   }
//   if (localStorage.getItem('queue') === null) {
//     localStorage.setItem('queue', '[]');
//   }
//   return JSON.stringify(movieID);
// }
// const moviesWatched = JSON.parse(localStorage.getItem('watched'));
// const movieQueue = JSON.parse(localStorage.getItem('queue'));

// addWatched.addEventListener('click', () => {
//   const watchedList = JSON.parse(localStorage.getItem('watched'));
//   addingToLocalStorage();
// });
