// модуль scroll.js
import { fetchQuery, fetchTrending, page } from './fetch';
import { loadMovies } from './loadMovies';

// выбираем элементы интерфейса
const list = document.querySelector('.films__list');
const loader = document.querySelector('.loader');
const searchInput = document.querySelector('.header__nav-input');
let totalPages = 0;

// объявляем переменные для хранения текущей страницы и типа запроса
let currentPage = 1;
let queryType = 'trending';

// функция для показа или скрытия индикатора загрузки
function toggleLoader(visible) {
  loader.style.display = visible ? 'block' : 'none';
}

// функция для получения данных с сервера и загрузки их на страницу
async function getData(page) {
    try {
      // показываем индикатор загрузки
      toggleLoader(true);
      // создаем фрагмент для добавления новых фильмов
      const fragment = document.createDocumentFragment();
      // определяем, какой тип запроса нужно сделать: по трендам или по поиску
      const data =
        queryType === 'trending'
          ? await fetchTrending(page)
          : await fetchQuery(searchInput.value, page);
      // получаем массив фильмов и общее количество страниц из ответа сервера
      const movies = data && data.results;
      totalPages = data && data.total_pages;
      // скрываем индикатор загрузки
      toggleLoader(false);
      // загружаем фильмы во фрагмент
      if (movies) {
        await loadMovies(movies, fragment);
        // добавляем фрагмент к списку фильмов
        list.appendChild(fragment);
        // увеличиваем номер текущей страницы на единицу
        currentPage++;
      } else {
        console.log('No movies found.');
      }
    } catch (err) {
      console.log(err);
    }
  }
  

// функция для проверки положения прокрутки и вызова функции getData при необходимости
function checkScroll() {
  // получаем высоту окна браузера, высоту документа и положение прокрутки
  const windowHeight = window.innerHeight;
  const documentHeight = document.body.offsetHeight;
  const scrollTop = window.pageYOffset;
  // если пользователь прокрутил страницу близко к концу документа и есть еще страницы с данными
  if (scrollTop + windowHeight >= documentHeight - 100 && currentPage <= totalPages) {
    // вызываем функцию getData с номером текущей страницы
    getData(currentPage);
  }
}

// функция для сброса прокрутки при новом поиске
function resetScroll() {
  // устанавливаем номер текущей страницы в единицу
  currentPage = 1;
  // устанавливаем тип запроса в поиск
  queryType = 'search';
}

// добавляем обработчик события scroll к окну браузера
window.addEventListener('scroll', checkScroll);

// экспортируем функцию для сброса прокрутки
export { resetScroll };


  