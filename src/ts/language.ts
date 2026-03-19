// TYPES FOR TRANSLATIONS
type Language = keyof typeof translations;
type TranslationKey = keyof (typeof translations)['en-US'];
// TRANSLATION OBJECTS
// *Translations for notifications are in ui/notifications.ts*
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

    // Home
    noMoreVidoes: 'No more videos to load',

    // Library
    btnDltWatched: 'delete from watched',
    btnDltQueued: 'delete from queue',
    emptyLibrary: 'Nothing to see here :(',

    // Login
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    password: 'Password',
    repeatPassword: 'Repeat password',
    wrongLoginOrPassword: 'Wrong login or password',
    notVerified: 'E-mail not verified',
    loginSendVerAgain: 'Send activation link again.',
    resendTooEarly: 'Too early request. You can resend verification link every 2 minutes.',
    forgotPassword: 'Forgot password',

    // Forgot password
    newPassword: 'New password',
    repeatNewPassword: 'Repeat new password',
    resetPassword: 'Reset password',

    // Register
    loginAlreadyExists: 'Login already exists',
    emailAlreadyExists: 'Email already exists',
    loginAndPasswordRequired: 'Login and password are required',
    tooManyRequests: 'Too many requests. Please try again later.',
    verifyEmail: 'Verification link sent to e-mail.',
    cancel: 'Cancel',
    verEmailFailed: 'Failed to send e-mail verification, [lack of service, log in to receive link]',
    loginTooShort: 'Login is too short',
    loginTooLong: 'Login is too long',
    passwordTooShort: 'Password is too short',
    passwordTooLong: 'Password is too long',
  },
  'pl-PL': {
    // Header
    home: 'Start',
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

    // Home
    noMoreVidoes: 'Brak kolejnych filmów do wyświetlenia',

    // Library
    btnDltWatched: 'usuń z oglądanych',
    btnDltQueued: 'usuń z kolejki',
    emptyLibrary: 'Nic tu nie ma :(',

    // Login
    login: 'Zaloguj',
    logout: 'Wyloguj',
    register: 'Zarejestruj',
    password: 'Hasło',
    repeatPassword: 'Powtórz hasło',
    wrongLoginOrPassword: 'Nieprawidłowy login lub hasło',
    notVerified: 'E-mail nie został aktywowany',
    loginSendVerAgain: 'Wyślij link aktywacyjny ponownie.',
    resendTooEarly:
      'Zbyt wczesna prośba. Ponowne wysłanie linku aktywującego jest możliwe co 2 minuty.',
    forgotPassword: 'Zapomniałem hasła',

    // Forgot password
    newPassword: 'Nowe hasło',
    repeatNewPassword: 'Powtórz nowe hasło',
    resetPassword: 'Resetuj hasło',

    // Register
    loginAlreadyExists: 'Login jest już zajęty',
    emailAlreadyExists: 'Email jest już zajęty',
    loginAndPasswordRequired: 'Login i hasło są wymagane',
    tooManyRequests: 'Zbyt wiele prób. Spróbuj ponownie później.',
    verifyEmail: 'E-mail weryfikacyjny został wysłany na e-mail.',
    cancel: 'Anuluj',
    verEmailFailed:
      'Błąd podczas wysyłania e-maila weryfikującego [brak usługi - zaloguj się aby otrzymać link]',
    loginTooShort: 'Login jest za krótki',
    loginTooLong: 'Login jest za długi',
    passwordTooShort: 'Hasło jest za krótkie',
    passwordTooLong: 'Hasło jest za długie',
  },
} as const;

const storedLanguage = localStorage.getItem('language');

export let currentLanguage: Language =
  storedLanguage === 'en-US' || storedLanguage === 'pl-PL' ? storedLanguage : 'en-US';

export function applyTranslations(): void {
  const elementsToTranslate = document.querySelectorAll<HTMLElement>('[data-translate]');
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

export function language() {
  const enLangButton = document.querySelector<HTMLElement>('#enLang')!;
  const plLangButton = document.querySelector<HTMLElement>('#plLang')!;

  const switchLanguage = (language: Language): void => {
    currentLanguage = language;
    localStorage.setItem('language', language);
    applyTranslations();

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

  applyTranslations();
  langCheck();
}
