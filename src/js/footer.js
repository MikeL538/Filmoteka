const footer = document.querySelector('.footer');
const threshold = 3900; // Задайте позицию, при которой футер начнет появляться

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
