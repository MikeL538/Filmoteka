import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjk0YzNhNWI0MDAwMDg5YWZhMWQ1YTFhZTk4YWIxZCIsInN1YiI6IjY1MGM4MmQzYjViYzIxMDEyY2M5ZmIwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gbA2ivTkeIlFgOsCG0AQU95bbBmYrPkGm6ojq4z3dKo',
  },
};

//  Funkcja do zapisu i odczytru wyboru języka z localStorage  //
function saveLanguageToLocalStorage(language) {
  localStorage.setItem('selectedLanguage', language);
}

function loadLanguageFromLocalStorage() {
  const selectedLanguage = localStorage.getItem('selectedLanguage');
  return selectedLanguage || 'en-US';
}

let selectedLanguage = loadLanguageFromLocalStorage();

export async function fetchTrending() {
  try {
    const trending = await axios.get(`trending/movie/day?language=${selectedLanguage}`, options);
    return trending.data;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchQuery(searchInput) {
  try {
    const search = await axios.get(
      `search/movie?query=${encodeURIComponent(searchInput)}&language=${selectedLanguage}`,
      options,
    );
    return search.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function fetchDetailsMovie(id) {
  try {
    const details = await axios.get(`movie/${id}?language=${selectedLanguage}`, options);
    return details.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

//  Funkcja do zmiany języka za pomocą przycisków  //

function changeLanguageTo(language) {
  selectedLanguage = language;

  saveLanguageToLocalStorage(language);

  location.reload(); // Odświerzanie strony po zmianie języka
}

const enLangButton = document.querySelector('#enLang');
const plLangButton = document.querySelector('#plLang');

enLangButton.addEventListener('click', () => changeLanguageTo('en'));
plLangButton.addEventListener('click', () => changeLanguageTo('pl'));
