const header = document.querySelector('.header');
const headerForm = document.querySelector('.header__nav-form');
const headerNav = document.querySelector('.header__nav');
const headerContainer = document.querySelector('.header__container');
const libraryButtons = document.querySelector('.library-btn-list');
const isScrolling = () => window.scrollY > 150;

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
      libraryButtons.classList.add('buttons-transform');
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
    if (libraryButtons) {
      setTimeout(() => {
        libraryButtons.classList.remove('buttons-transform');
      }, 200);
    }
  }
});

header.addEventListener('mouseenter', () => {
  if (isScrolling()) {
    header.classList.add('hovered');
    headerNav.classList.remove('nav-height');
    headerContainer.classList.remove('scrolled-container');

    if (headerForm) {
      setTimeout(() => {
        headerForm.classList.remove('form-transform');
      }, 200);
    }
    if (libraryButtons) {
      setTimeout(() => {
        libraryButtons.classList.remove('buttons-transform');
      }, 200);
    }
  }
});

header.addEventListener('mouseleave', () => {
  if (header.classList.contains('scrolled')) {
    header.classList.remove('hovered');
    headerNav.classList.add('nav-height');
    headerContainer.classList.add('scrolled-container');

    if (headerForm) {
      setTimeout(() => {
        headerForm.classList.add('form-transform');
      }, 200);
    }
    if (libraryButtons) {
      setTimeout(() => {
        libraryButtons.classList.add('buttons-transform');
      }, 200);
    }
  }
});
