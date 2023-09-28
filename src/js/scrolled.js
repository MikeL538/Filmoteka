const header = document.querySelector('.header');
const headerContainer = document.querySelector('.header__container');
const headerNav = document.querySelector('.header__nav');
const headerNavContainer = document.querySelector('.header__nav-container');
const form = document.querySelector('.header__nav-form');
const error = document.querySelector('.header__error');
const input = document.querySelector('.header__nav-input');
const submit = document.querySelector('.header__nav-input-submit');
const loupe = document.querySelector('.header__nav-input--loupe');

let isHovered = false;
let isScrolling = false;

window.addEventListener('scroll', () => {
  isScrolling = true;
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
    headerNavContainer.classList.add('scrolled-nav-container');
    headerContainer.classList.add('scrolled-container');
    headerNav.classList.add('scrolled-container');
    if (isHovered) {
      showElementsWithDelay();
    }
  } else {
    header.classList.remove('scrolled');
    headerNavContainer.classList.remove('scrolled-nav-container');
    form.classList.remove('show');
    error.classList.remove('show');
    headerContainer.classList.remove('scrolled-container');
    headerNav.classList.remove('scrolled-container');
  }
});

header.addEventListener('mouseenter', () => {
  if (header.classList.contains('scrolled')) {
    isHovered = true;
    setTimeout(() => {
      if (isHovered && !isScrolling) {
        showElementsWithDelay();
        header.classList.remove('scrolled');
        headerNavContainer.classList.remove('scrolled-nav-container');
        form.classList.remove('show');
        error.classList.remove('show');
        headerContainer.classList.remove('scrolled-container');
        headerNav.classList.remove('scrolled-container');
      }
    }, 500);
  }
});

header.addEventListener('mouseleave', () => {
  isHovered = false;
  form.classList.remove('show');
  error.classList.remove('show');
  if (header.classList.contains('scrolled')) {
  }
});

function showElementsWithDelay() {
  setTimeout(() => {
    if (isHovered && !isScrolling) {
      form.classList.add('show');
      error.classList.add('show');
    }
  }, 500);
}
