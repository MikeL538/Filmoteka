const header = document.querySelector('.header');
const headerForm = document.querySelector('.header__nav-form');
const headerNav = document.querySelector('.header__nav');
const headerContainer = document.querySelector('.header__container');
const isScrolling = () => window.scrollY > 0;

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
