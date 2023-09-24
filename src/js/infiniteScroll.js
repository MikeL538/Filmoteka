import InfiniteScroll from 'infinite-scroll'; // Importuje moduł do obsługi nieskończonego przewijania.
import Notiflix from 'notiflix';
import { fetchQuery } from './fetch';
import { loadMovies } from './loadMovies';

const moviesContainer = document.querySelector('.films__list');
let isLoading = false; // Flaga informująca o tym, czy trwa ładowanie danych.
let pageNumber = 1;

async function fetchSearchResults() {
  console.log('Fetching...'); // Info czy pobierają się filmy
  if (isLoading) return; // Sprawdza, czy trwa już ładowanie innych danych.

  isLoading = true; // Ustawia flagę na true, oznaczając rozpoczęcie ładowania.

  try {
    const response = await fetchQuery(pageNumber); // Pobiera wyniki wyszukiwania za pomocą funkcji fetchQuery.
    const movies = response && response.results; // Sprawdza, czy są wyniki wyszukiwania.

    if (movies) {
      loadMovies(movies); // Ładuje filmy do kontenera, jeśli są dostępne.
      pageNumber++;
      if (movies.length < 20) {
        Notiflix.Notify.info('No more movies to load.'); // Wyświetla komunikat o braku kolejnych filmów. Coś tu nie działa, console.log też nie łapie.
      }
    } else {
      Notiflix.Notify.info('No more movies to load.'); // Wyświetla komunikat o braku kolejnych filmów. Coś tu nie działa, console.log też nie łapie.
    }
  } catch (error) {
    console.log('Error: ' + error);
  }

  isLoading = false; // Ustawia flagę na false, sygnalizując zakończenie ładowania.
}

let infScroll = new InfiniteScroll(moviesContainer, {
  path() {
    return `search/movie?query=&page=${pageNumber}`; // Ustawia ścieżkę do pobrania kolejnych wyników w nieskończonym przewijaniu.
  },
  append: '.films__list-item', // Określa elementy do dodania podczas ładowania kolejnych wyników.
});

infScroll.on('load', function () {
  console.log('InfScrolling'); // Info czy inf scroll działa.
  fetchSearchResults(); // Wywołuje funkcję pobierania kolejnych wyników.
});

function handleSearchInputChange() {
  pageNumber = 1; // Resetuje numer strony na 1.
  moviesContainer.innerHTML = ''; // Czyści kontener filmów.

  fetchSearchResults(); // Wywołuje funkcję pobierania wyników dla nowego zapytania.
}

const searchInput = document.querySelector('.header__nav-input'); // Pobiera pole wprowadzania zapytania.
searchInput.addEventListener('submit', handleSearchInputChange); // Dodaje nasłuchiwanie na zmiany w polu wprowadzania zapytania.```
