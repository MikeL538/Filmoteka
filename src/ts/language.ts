// TYPES FOR TRANSLATIONS
type Language = keyof typeof translations;
type TranslationKey = keyof (typeof translations)['en-US'];
// TRANSLATION OBJECTS
const translations = {
  'en-US': {
    // Header
    home: 'Home',
    library: 'Library',
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
    login: 'Login',
  },
  'pl-PL': {
    // Header
    home: 'Strona główna',
    library: 'Biblioteka',
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
    login: 'Zaloguj',
  },
} as const;

const storedLanguage = localStorage.getItem('language');

export let currentLanguage: Language =
  storedLanguage === 'en-US' || storedLanguage === 'pl-PL' ? storedLanguage : 'en-US';

export function language() {
  const enLangButton = document.querySelector<HTMLElement>('#enLang')!;
  const plLangButton = document.querySelector<HTMLElement>('#plLang')!;

  // GET LOCAL STORED LANGUAGE

  function translateElements(): void {
    let elementsToTranslate = document.querySelectorAll<HTMLElement>('[data-translate]');
    const translationsForCurrentLanguage = translations[currentLanguage];

    elementsToTranslate.forEach(element => {
      const translationKey = element.dataset.translate as TranslationKey | undefined;

      if (!translationKey) return;

      if (element instanceof HTMLInputElement && translationKey === 'placeholder') {
        element.placeholder = translationsForCurrentLanguage[translationKey];
      } else {
        element.textContent = translationsForCurrentLanguage[translationKey];
      }
    });
  }

  const switchLanguage = (language: Language): void => {
    currentLanguage = language;
    localStorage.setItem('language', language);
    translateElements();
    // location.reload();

    document.dispatchEvent(new Event('languageChanged'));
  };

  function langCheck() {
    const isEnglish = currentLanguage === 'en-US';

    enLangButton.style.display = isEnglish ? 'none' : 'block';
    plLangButton.style.display = isEnglish ? 'block' : 'none';
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
}
