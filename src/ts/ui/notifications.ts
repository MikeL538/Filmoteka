import { Notify } from 'notiflix';

Notify.init({
  width: '200px',
  position: 'left-top',
  distance: '8px',
  opacity: 0.9,
  timeout: 2000,
  clickToClose: true,
  borderRadius: '10px',
  cssAnimationStyle: 'zoom',
  fontSize: '0.85rem',
});

export const notifications = {
  addedToWatched: () => Notify.success('Added to watched'),
  addedToQueue: () => Notify.success('Added to queue'),

  alreadyInWatched: () => Notify.warning('Movie is already in watched list'),
  alreadyInQueue: () => Notify.warning('Movie is already in queue list'),

  removedFromWatched: () => Notify.warning('Removed from watched'),
  removedFromQueue: () => Notify.warning('Removed from queue'),

  notFound: () => Notify.failure('Movie not found'),
  noMoreMovies: () => Notify.failure('No more movies'),

  error: () => Notify.failure('Something went wrong'),
};
