// Translation for Fetch
// Initially set language to English
export let currentLanguage = localStorage.getItem('language') || 'en-US';

// Changing language and saving it in localStorage
function changeLanguage(newLanguage) {
  currentLanguage = newLanguage;
  localStorage.setItem('language', newLanguage);
  window.location.reload();
}

const enLangButton = document.querySelector('#enLang');
const plLangButton = document.querySelector('#plLang');
let elementsToTranslate;

plLangButton.addEventListener('click', e => changeLanguage('pl-PL'));
enLangButton.addEventListener('click', e => changeLanguage('en-US'));

// Translation for HTML
const translations = {
  'en-US': {
    // Header
    home: 'Home',
    library: 'My library',
    language: 'Language',
    placeholder: 'Movie search',
    error: 'Search result not successful. Enter the correct movie name.',
    libraryBtnWatched: 'watched',
    libraryBtnQueue: 'queue',
    // Modal Details
    vote: 'Rating / Votes',
    popularity: 'Popularity',
    orgTitle: 'Original Title',
    genre: 'Genre',
    about: 'About',
    btnWatched: 'add to watched',
    btnQueue: 'add to queue',
    // Library
    btnDltWatched: 'delete from watched',
    btnDltQueued: 'delete from queue',
  },
  'pl-PL': {
    // Header
    home: 'Strona główna',
    library: 'Moja biblioteka',
    language: 'Język',
    placeholder: 'Wyszukaj film',
    error: 'Wyszukiwanie nie powiodło się. Wprowadź prawidłową nazwę filmu.',
    libraryBtnWatched: 'obejrzane',
    libraryBtnQueue: 'kolejka',
    // Modal Details
    vote: 'Ocena / Głosów',
    popularity: 'Popularność',
    orgTitle: 'Oryginalny tytuł',
    genre: 'Kategoria',
    about: 'Opis',
    btnWatched: 'dodaj do obejrzanych',
    btnQueue: 'dodaj do kolejki',
    // Library
    btnDltWatched: 'usuń z oglądanych',
    btnDltQueued: 'usuń z kolejki',
  },
};

// [data-translate] elements to translate
function translateElements() {
  elementsToTranslate = document.querySelectorAll('[data-translate]');

  const translationsForCurrentLanguage = translations[currentLanguage] || translations['en'];

  elementsToTranslate.forEach(element => {
    const translationKey = element.dataset.translate;

    if (element.tagName === 'INPUT' && translationKey === 'placeholder') {
      element.placeholder = translationsForCurrentLanguage[translationKey];
    } else {
      element.textContent = translationsForCurrentLanguage[translationKey];
    }
  });
}

const switchLanguage = language => {
  currentLanguage = language;
  localStorage.setItem('language', language);
  translateElements();
};

function langCheck() {
  if (currentLanguage === 'en-US') {
    enLangButton.style.display = 'none';
    plLangButton.style.display = 'block';
  }

  if (currentLanguage === 'pl-PL') {
    plLangButton.style.display = 'none';
    enLangButton.style.display = 'block';
  }
}

plLangButton.addEventListener('click', () => {
  if (currentLanguage !== 'pl-PL') {
    switchLanguage('pl-PL');
    langCheck();
  }
});

enLangButton.addEventListener('click', () => {
  if (currentLanguage !== 'en-US') {
    switchLanguage('en-US');
    langCheck();
  }
});

translateElements();
langCheck();
