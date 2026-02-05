const header = document.querySelector('.header');
const headerForm = document.querySelector('.header__nav-form');
const headerNav = document.querySelector('.header__nav');
const headerContainer = document.querySelector('.header__container');
const libraryButtons = document.querySelector('.header--library__btn--container');
const isScrolling = () => window.scrollY > 70;

window.addEventListener('scroll', () => {
  if (isScrolling()) {
    if (!header.matches(':hover')) {
      header.classList.add('scrolled');
      headerContainer.classList.add('scrolled-container');
      if (headerForm) headerNav.classList.add('nav-height');
      if (libraryButtons) headerNav.classList.add('nav-height-library');
      if (headerForm) headerForm.classList.add('form-transform');
      if (libraryButtons) libraryButtons.classList.add('buttons-transform');
    }
  } else {
    header.classList.remove('scrolled');

    headerContainer.classList.remove('scrolled-container');
    if (headerForm) headerNav.classList.remove('nav-height');
    if (libraryButtons) headerNav.classList.remove('nav-height-library');
    if (headerForm) headerForm.classList.remove('form-transform');
    if (libraryButtons) libraryButtons.classList.remove('buttons-transform');
  }
});

header.addEventListener('mouseenter', () => {
  if (isScrolling()) {
    header.classList.add('hovered');
    // headerNav.classList.remove('nav-height');
    headerContainer.classList.remove('scrolled-container');
    if (headerForm) headerNav.classList.add('nav-height');
    if (libraryButtons) headerNav.classList.add('nav-height-library');

    if (headerForm) {
      headerForm.classList.remove('form-transform');
    }
    if (libraryButtons) {
      libraryButtons.classList.remove('buttons-transform');
    }
  }
});

header.addEventListener('mouseleave', () => {
  if (isScrolling()) {
    header.classList.remove('hovered');
    header.classList.add('scrolled');

    // headerNav.classList.add('nav-height');
    headerContainer.classList.add('scrolled-container');
    if (headerForm) headerForm.classList.remove('form-transform');
    if (libraryButtons) libraryButtons.classList.remove('buttons-transform');

    if (headerForm) {
      headerForm.classList.add('form-transform');
    }

    if (libraryButtons) {
      libraryButtons.classList.add('buttons-transform');
    }

    // if (headerForm) {
    //   setTimeout(() => {
    //     headerForm.classList.add('form-transform');
    //   }, 200);
    // }
    // if (libraryButtons) {
    //   setTimeout(() => {
    //     libraryButtons.classList.add('buttons-transform');
    //   }, 200);
    // }
  }
});
