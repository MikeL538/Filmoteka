const header = document.querySelector('.header');
const headerForm = document.querySelector('.header__nav-form');
const headerNav = document.querySelector('.header__nav');
const headerContainer = document.querySelector('.header__container');
const isScrolling = () => window.scrollY > 200;

const getCurrentPage = () => {
  const currentPage = window.location.pathname;
  return currentPage;
};

const currentPage = getCurrentPage();
const libraryBtnList = document.querySelector('.library-btn-list');

const handleLibraryPage = () => {
  const watchedBtn = document.querySelector('.library-btn.btn-watched');
  const queueBtn = document.querySelector('.library-btn.btn-queue');

  if (watchedBtn) {
    watchedBtn.remove();
  }

  if (queueBtn) {
    queueBtn.remove();
  }
};

window.addEventListener('scroll', () => {
  if (isScrolling()) {
    header.classList.add('scrolled');
    headerNav.classList.add('nav-height');
    headerContainer.classList.add('scrolled-container');
    if (document.querySelector('.header__nav-form')) {
      headerForm.classList.add('form-transform');
    }
  } else {
    header.classList.remove('scrolled');
    headerNav.classList.remove('nav-height');

    setTimeout(() => {
      if (document.querySelector('.header__nav-form')) {
        headerForm.classList.remove('form-transform');
      }
    }, 100);
  }
});

header.addEventListener('mouseenter', () => {
  if (isScrolling()) {
    header.classList.add('hovered');
    headerNav.classList.remove('nav-height');

    setTimeout(() => {
      if (document.querySelector('.header__nav-form')) {
        headerForm.classList.remove('form-transform');
      }
    }, 100);
  }
});

header.addEventListener('mouseleave', () => {
  if (header.classList.contains('scrolled')) {
    header.classList.remove('hovered');
    headerNav.classList.add('nav-height');

    setTimeout(() => {
      if (document.querySelector('.header__nav-form')) {
        headerForm.classList.add('form-transform');
      }
    }, 100);
  }
});

if (isScrolling()) {
  if (currentPage === '/index.html') {
  } else if (currentPage === '/my-library.html') {
  }
}



// const header = document.querySelector('.header');
// const headerForm = document.querySelector('.header__nav-form');
// const headerNav = document.querySelector('.header__nav');
// const headerContainer = document.querySelector('.header__container');
// const isScrolling = () => window.scrollY > 200;
// const libraryBtnList = document.querySelector('.library-btn-list');

// // Функция для определения текущей страницы
// const getCurrentPage = () => {
//   // Возможно, вам придется адаптировать это под ваш URL-адрес
//   const currentPage = window.location.pathname;
//   return currentPage;
// };


// window.addEventListener('scroll', () => {
//   if (isScrolling()) {
//     header.classList.add('scrolled');
//     headerNav.classList.add('nav-height');
//     headerContainer.classList.add('scrolled-container');
//     if (document.querySelector('.header__nav-form')) {
//       headerForm.classList.add('form-transform');
//     }
//   } else {
//     header.classList.remove('scrolled');
//     headerNav.classList.remove('nav-height');

//     setTimeout(() => {
//       if (document.querySelector('.header__nav-form')) {
//         headerForm.classList.remove('form-transform');
//       }
//     }, 100);
//   }
// });

// header.addEventListener('mouseenter', () => {
//   if (isScrolling()) {
//     header.classList.add('hovered');
//     headerNav.classList.remove('nav-height');

//     setTimeout(() => {
//       if (document.querySelector('.header__nav-form')) {
//         headerForm.classList.remove('form-transform');
//       }
//     }, 100);
//   }
// });

// header.addEventListener('mouseleave', () => {
//   if (header.classList.contains('scrolled')) {
//     header.classList.remove('hovered');
//     headerNav.classList.add('nav-height');

//     setTimeout(() => {
//       if (document.querySelector('.header__nav-form')) {
//         headerForm.classList.add('form-transform');
//       }
//     }, 100);
//   }
// });

// // Дополнительная логика для скрытия/показа элементов на разных страницах
// const currentPage = getCurrentPage();

// if (isScrolling()) {
//   // Логика для скрывания/показа элементов при прокрутке
//   if (currentPage === '/index.html') {
//     // Для страницы индекса
//     // ... ваш код скрытия/показа элементов ...
//   } else if (currentPage === '/my-library.html') {
//     // Для страницы библиотеки
//     if (libraryBtnList) {
//       libraryBtnList.style.display = 'none'; // Скрываем элемент с классом library-btn-list
//     }
//   }
// }

// // Можете добавить аналогичную логику для других страниц