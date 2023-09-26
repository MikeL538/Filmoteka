// import { detailsMovie } from './detailsMovie';
// import axios from 'axios';

// axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export const watchedBtn = document.querySelector('.btn-watched');
export const queueBtn = document.querySelector('.btn-queue');
export const addWatched = document.querySelector('.btn-add-watched');
export const addQueue = document.querySelector('.btn-add-queue');
export const boxWatched = document.querySelector('.watched-box');
export const boxQueue = document.querySelector('.queue-box');
export const imgNoCinema = document.querySelector('#noCinema');
console.log(watchedBtn);
console.log(queueBtn);

watchedBtn.addEventListener('click', () => {
  boxWatched.classList.remove('is-hiden');
  boxQueue.classList.add('is-hiden');
  imgNoCinema.classList.add('is-hiden');
});
queueBtn.addEventListener('click', () => {
  boxQueue.classList.remove('is-hiden');
  boxWatched.classList.add('is-hiden');
  imgNoCinema.classList.add('is-hiden');
});


// export function addingToLibrary() {
//   if (localStorage.getItem('watched') === null) {
//     localStorage.setItem('watched', '[]');
//   }
//   if (localStorage.getItem('queue') === null) {
//     localStorage.setItem('queue', '[]');
//   }
// }
