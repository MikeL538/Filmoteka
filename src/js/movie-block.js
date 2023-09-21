const detailsDiv = document.querySelector('.details');
const filmImage = document.querySelectorAll('.films__list-item > img');
const detailsDivClose = document.querySelector('.details__close-button');

filmImage.forEach(img => {
  img.addEventListener('click', () => {
    detailsDiv.classList.add('show-element');
  });
});

detailsDivClose.addEventListener('click', () => {
  detailsDiv.classList.remove('show-element');
});
