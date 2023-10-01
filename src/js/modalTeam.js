const openModal = document.querySelector('.open-modal-team');
const closeModal = document.querySelector('.close-modal-team');
const teamBackdrop = document.querySelector('.backdrop-modal');
const teamModal = document.querySelector('.team__modal');

openModal.addEventListener('click', openModalTeam);
closeModal.addEventListener('click', closeModalTeam);

function openModalTeam(event) {
  teamBackdrop.classList.add('team__backdrop--show');
  document.addEventListener('keydown', onEscapeClose);
  document.addEventListener('click', onBackdropClose);
  document.body.style.overflow = 'hidden';
}

function closeModalTeam(event) {
  teamBackdrop.classList.remove('team__backdrop--show');
  document.removeEventListener('keydown', onEscapeClose);
  document.body.style.overflowY = 'scroll';
}

function onEscapeClose(event) {
  if (event.code === 'Escape') {
    teamModal.classList.remove('openModalAnimationTeam');
    teamModal.classList.add('closeModalAnimationTeam');
    setTimeout(() => {
      closeModalTeam();
    }, 400);
    closeModalTeam();
  }
}

function onBackdropClose(event) {
  if (event.target === teamBackdrop) {
    teamModal.classList.remove('openModalAnimationTeam');
    teamModal.classList.add('closeModalAnimationTeam');
    setTimeout(() => {
      closeModalTeam();
    }, 400);
  }
}
