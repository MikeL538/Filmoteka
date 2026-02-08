import { Notify } from 'notiflix';
import { currentLanguage } from '../language.js';

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

const languageStrings = {
  'en-US': {
    addedToWatched: 'Added to watched',
    addedToQueue: 'Added to queue',
    alreadyInWatched: 'Movie is already in watched list',
    alreadyInQueue: 'Movie is already in queue list',
    removedFromWatched: 'Removed from watched',
    removedFromQueue: 'Removed from queue',
    notFound: 'Movie not found',
    noMoreMovies: 'No more movies',
    error: 'Something went wrong',
  },
  'pl-PL': {
    addedToWatched: 'Dodano do obejrzanych',
    addedToQueue: 'Dodano do kolejki',
    alreadyInWatched: 'Film znajduje się już na liście obejrzanych',
    alreadyInQueue: 'Film znajduje się już na liście oczekujących',
    removedFromWatched: 'Usunięto z listy obejrzanych',
    removedFromQueue: 'Usunięto z listy oczekujących',
    notFound: 'Film nie został znaleziony',
    noMoreMovies: 'Brak więcej filmów',
    error: 'Wystąpił błąd',
  },
};

export const notifications = {
  addedToWatched: () => Notify.success(languageStrings[currentLanguage].addedToWatched),
  addedToQueue: () => Notify.success(languageStrings[currentLanguage].addedToQueue),
  alreadyInWatched: () => Notify.warning(languageStrings[currentLanguage].alreadyInWatched),
  alreadyInQueue: () => Notify.warning(languageStrings[currentLanguage].alreadyInQueue),
  removedFromWatched: () => Notify.warning(languageStrings[currentLanguage].removedFromWatched),
  removedFromQueue: () => Notify.warning(languageStrings[currentLanguage].removedFromQueue),
  notFound: () => Notify.failure(languageStrings[currentLanguage].notFound),
  noMoreMovies: () => Notify.failure(languageStrings[currentLanguage].noMoreMovies),
  error: () => Notify.failure(languageStrings[currentLanguage].error),
};
