const header = document.querySelector('.header');
const headerForm = document.querySelector('.header__nav-form');
const headerNav = document.querySelector('.header__nav');
const headerContainer = document.querySelector('.header__container');
const libraryButtons = document.querySelector('.library-btn-list');
console.log(libraryButtons);
const isScrolling = () => window.scrollY > 50;
let isLibraryButtonsHidden = false;

// Funkcja ukrywania przycisków biblioteki podczas przewijania
const hideLibraryButtons = () => {
  if (!isLibraryButtonsHidden) {
    libraryButtons.classList.add('buttons-transform');
    isLibraryButtonsHidden = true;
  }
};

// Funkcja wyświetlania przycisków biblioteki po przewinięciu na górę strony
const showLibraryButtons = () => {
  if (isLibraryButtonsHidden) {
    libraryButtons.classList.remove('buttons-transform');
    isLibraryButtonsHidden = false;
  }
};

window.addEventListener('scroll', () => {
  if (isScrolling()) {
    header.classList.add('scrolled');
    if (!header.matches(':hover')) {
      headerNav.classList.add('nav-height');
      headerContainer.classList.add('scrolled-container');
    }
    if (headerForm && !header.matches(':hover')) {
      headerForm.classList.add('form-transform');
    }
    if (libraryButtons && !header.matches(':hover')) {
      hideLibraryButtons();
    }
  } else {
    header.classList.remove('scrolled');
    headerNav.classList.remove('nav-height');
    headerContainer.classList.remove('scrolled-container');

    if (headerForm) {
      setTimeout(() => {
        headerForm.classList.remove('form-transform');
      }, 200);
    }
    if (libraryButtons && !header.matches(':hover')) {
      showLibraryButtons();
    }
  }
});

header.addEventListener('mouseenter', () => {
  console.log('Мышь наведена на хедер');
  if (isScrolling()) {
    header.classList.add('hovered');
    headerNav.classList.remove('nav-height');
    headerContainer.classList.remove('scrolled-container');

    if (headerForm) {
      setTimeout(() => {
        headerForm.classList.remove('form-transform');
      }, 200);
    }
    // Wyświetlanie przycisków po najechaniu kursorem na nagłówek
    if (libraryButtons) {
      libraryButtons.classList.remove('buttons-transform');
    }
  }
});

header.addEventListener('mouseleave', () => {
  console.log('Мышь убрана с хедера');
  if (header.classList.contains('scrolled')) {
    header.classList.remove('hovered');
    headerNav.classList.add('nav-height');
    headerContainer.classList.add('scrolled-container');

    if (headerForm) {
      setTimeout(() => {
        headerForm.classList.add('form-transform');
      }, 200);
    }
    // Ukryj przyciski po opuszczeniu nagłówka
    if (libraryButtons) {
      libraryButtons.classList.add('buttons-transform');
    }
  }
});





// const header = document.querySelector('.header');
// const headerForm = document.querySelector('.header__nav-form');
// const headerNav = document.querySelector('.header__nav');
// const headerContainer = document.querySelector('.header__container');
// const libraryButtons = document.querySelector('.library-btn-list');
// const isScrolling = () => window.scrollY > 150;

// window.addEventListener('scroll', () => {
//   if (isScrolling()) {
//     header.classList.add('scrolled');
//     if (!header.matches(':hover')) {
//       headerNav.classList.add('nav-height');
//       headerContainer.classList.add('scrolled-container');
//     }
//     if (headerForm && !header.matches(':hover')) {
//       headerForm.classList.add('form-transform');
//     }
//     if (libraryButtons && !header.matches(':hover')) {
//       libraryButtons.classList.add('buttons-transform');
//     }
//   } else {
//     header.classList.remove('scrolled');
//     headerNav.classList.remove('nav-height');
//     headerContainer.classList.remove('scrolled-container');

//     if (headerForm) {
//       setTimeout(() => {
//         headerForm.classList.remove('form-transform');
//       }, 200);
//     }
//     if (libraryButtons && !header.matches(':hover')) {
//       setTimeout(() => {
//         libraryButtons.classList.remove('buttons-transform');
//       }, 200);
//     }
//   }
// });

// header.addEventListener('mouseenter', () => {
//   if (isScrolling()) {
//     header.classList.add('hovered');
//     headerNav.classList.remove('nav-height');
//     headerContainer.classList.remove('scrolled-container');

//     if (headerForm) {
//       setTimeout(() => {
//         headerForm.classList.remove('form-transform');
//       }, 200);
//     }
//     if (libraryButtons && !header.matches(':hover')) {
//       setTimeout(() => {
//         libraryButtons.classList.remove('buttons-transform');
//       }, 200);
//     }
//   }
// });

// header.addEventListener('mouseleave', () => {
//   if (header.classList.contains('scrolled')) {
//     header.classList.remove('hovered');
//     headerNav.classList.add('nav-height');
//     headerContainer.classList.add('scrolled-container');

//     if (headerForm) {
//       setTimeout(() => {
//         headerForm.classList.add('form-transform');
//       }, 200);
//     }
//     if (libraryButtons && !header.matches(':hover')) {
//       setTimeout(() => {
//         libraryButtons.classList.add('buttons-transform');
//       }, 200);
//     }
//   }
// });
