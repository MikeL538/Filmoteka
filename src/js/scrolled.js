const header = document.querySelector('.header');
const headerContainer = document.querySelector('.header__container');
const headerForm = document.querySelector('.header__nav-form');
const headerNav = document.querySelector('.header__nav');
const isScrolling = () => window.scrollY > 0;

window.addEventListener('scroll', () => {
  if (isScrolling()) {
    header.classList.add('scrolled');
    headerContainer.classList.add('scrolled-container');
    setTimeout(() => {
      headerNav.classList.add('nav-height');
      headerForm.classList.add('form-transform');
    }, 211);
  } else {
    header.classList.remove('scrolled');
    setTimeout(() => {
      headerNav.classList.remove('nav-height');
      headerForm.classList.remove('form-transform');
    }, 211);
  }
});

header.addEventListener('mouseenter', () => {
  if (isScrolling()) {
    header.classList.add('hovered');
    setTimeout(() => {
      headerNav.classList.remove('nav-height');
      headerForm.classList.remove('form-transform');
    }, 211);
  }
});

header.addEventListener('mouseleave', () => {
  if (header.classList.contains('scrolled')) {
    header.classList.remove('hovered');
    setTimeout(() => {
      headerNav.classList.add('nav-height');
      headerForm.classList.add('form-transform');
    }, 211);
  }
});
