// модуль scroll.js
import { fetchQuery, fetchTrending, page } from './fetch';
import { loadMovies } from './loadMovies';

const list = document.querySelector('.films__list');
const loader = document.querySelector('.loader');
const searchInput = document.querySelector('.header__nav-input');
let totalPages = 0;

let currentPage = 1;
let queryType = 'trending';

// funkcja pokazująca lub ukrywająca wskaźnik obciążenia
function toggleLoader(visible) {
  loader.style.display = visible ? 'block' : 'none';
}

// funkcja do odbierania danych z serwera i przesyłania ich na stronę
async function getData(page) {
    try {
      toggleLoader(true);
      const fragment = document.createDocumentFragment();
      const data =
        queryType === 'trending'
          ? await fetchTrending(page)
          : await fetchQuery(searchInput.value, page);
      // pobiera tablicę filmów i całkowitą liczbę stron z odpowiedzi serwera
      const movies = data && data.results;
      totalPages = data && data.total_pages;
      toggleLoader(false);
      if (movies) {
        await loadMovies(movies, fragment);
        list.appendChild(fragment);
        currentPage++;
      } else {
        console.log('No movies found.');
      }
    } catch (err) {
      console.log(err);
    }
  }
  
// aby sprawdzić pozycję przewijania i w razie potrzeby wywołać funkcję getData.
function checkScroll() {
  // pobiera wysokość okna przeglądarki, wysokość dokumentu i pozycję przewijania
  const windowHeight = window.innerHeight;
  const documentHeight = document.body.offsetHeight;
  const scrollTop = window.pageYOffset;
  // jeśli użytkownik przewinął dokument do końca i jest więcej stron z danymi
  if (scrollTop + windowHeight >= documentHeight - 100 && currentPage <= totalPages) {
    // wywołanie funkcji getData z bieżącym numerem strony
    getData(currentPage);
  }
}

// funkcja resetowania przewijania przy nowym wyszukiwaniu
function resetScroll() {
  currentPage = 1;
  queryType = 'search';
}

window.addEventListener('scroll', checkScroll);

export { resetScroll };


  