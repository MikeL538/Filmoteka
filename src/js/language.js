// Translation for Fetch
// Initially set language to English
let currentLanguage = localStorage.getItem('language') || 'en-US';

// Changing language and saving it in localStorage
function changeLanguage(newLanguage) {
  currentLanguage = newLanguage;
  localStorage.setItem('language', newLanguage);
  window.location.reload();
}

const enLangButton = document.querySelector('#enLang');
const plLangButton = document.querySelector('#plLang');

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
    libraryBtnWatched: 'watcher',
    libraryBtnQueue: 'queue',
    // Modal Details
    vote: 'Rating / Votes',
    popularity: 'Popularity',
    orgTitle: 'Original Title',
    genre: 'Genre',
    btnWatched: 'add to watched',
    btnQueue: 'add to queue',
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
    btnWatched: 'dodaj do obejrzanych',
    btnQueue: 'dodaj do kolejki',
  },
};

let elementsToTranslate;

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
