const footer = document.querySelector('.footer');
const threshold = 70; // Height after which footer shows

function checkFooterVisibility() {
  if (window.scrollY > threshold) {
    footer.classList.remove('hidden');
  } else {
    footer.classList.add('hidden');
  }
}

window.addEventListener('scroll', checkFooterVisibility);

document.addEventListener('DOMContentLoaded', () => {
  checkFooterVisibility();
});
