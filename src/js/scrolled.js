const header = document.querySelector('.header');
const form = document.querySelector('.header__nav-form');
const error = document.querySelector('.header__error');
const input = document.querySelector('.header__nav-input');
const submit = document.querySelector('.header__nav-input-submit');
const loupe = document.querySelector('.header__nav-input--loupe');

let isHovered = false; 
let isScrolling = false; 

window.addEventListener('scroll', () => {
  isScrolling = true;
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
    if (isHovered) {
      showElementsWithDelay();
    }
  } else {
    header.classList.remove('scrolled');
    form.classList.remove('show');
    error.classList.remove('show');
  }
});

header.addEventListener('mouseenter', () => {
  if (header.classList.contains('scrolled')) {
    isHovered = true;
    setTimeout(() => {
      if (isHovered && !isScrolling) {
        showElementsWithDelay();
      }
    }, 500);
  }
});

header.addEventListener('mouseleave', () => {
  isHovered = false;
  form.classList.remove('show');
  error.classList.remove('show');
});

function showElementsWithDelay() {
  setTimeout(() => {
    if (isHovered && !isScrolling) {
      form.classList.add('show');
      error.classList.add('show');
    }
  }, 500);
}
