import { unlockBackground, restoreFocus, trapFocus } from './a11yFocus.js';

type Modals = {
  backdrops: NodeListOf<HTMLElement>;
  team: HTMLElement | null;
  details: HTMLElement | null;
  login: HTMLElement | null;
  register: HTMLElement | null;
  trailer: HTMLElement | null;
  player: HTMLIFrameElement | null;
};

type Buttons = {
  loginCloseButton: HTMLButtonElement | null;
  registerCloseButton: HTMLButtonElement | null;
  registerCloseButtonX: HTMLButtonElement | null;
  teamCloseButton: HTMLButtonElement | null;
  detailsCloseButton: HTMLButtonElement | null;
  trailerModalClose: HTMLButtonElement | null;
};

const modals: Modals = {
  backdrops: document.querySelectorAll<HTMLElement>('.backdrop-modal'),
  team: document.querySelector<HTMLElement>('.modal-team-box'),
  details: document.querySelector<HTMLElement>('.details'),
  login: document.querySelector<HTMLElement>('.login'),
  register: document.querySelector<HTMLElement>('.register'),
  trailer: document.querySelector<HTMLElement>('#trailer'),
  player: document.querySelector<HTMLIFrameElement>('#trailerPlayer'),
};

const buttons: Buttons = {
  loginCloseButton: document.querySelector<HTMLButtonElement>('#loginCloseButton'),
  registerCloseButton: document.querySelector<HTMLButtonElement>('#registerCancel'),
  registerCloseButtonX: document.querySelector<HTMLButtonElement>('#registerCloseButton'),
  teamCloseButton: document.querySelector<HTMLButtonElement>('.team__modal--close'),
  detailsCloseButton: document.querySelector<HTMLButtonElement>('#detailsModalClose'),
  trailerModalClose: document.querySelector<HTMLButtonElement>('#trailerModalClose'),
};

// Close with button
buttons.loginCloseButton?.addEventListener('click', closeModal);
buttons.registerCloseButton?.addEventListener('click', closeModal);
buttons.registerCloseButtonX?.addEventListener('click', closeModal);
buttons.teamCloseButton?.addEventListener('click', closeModal);
buttons.detailsCloseButton?.addEventListener('click', closeModal);
buttons.trailerModalClose?.addEventListener('click', closeModal);

function closeModal() {
  // Close only trailer modal if opened
  if (modals.trailer && !modals.trailer?.classList.contains('hidden')) {
    modals.trailer?.classList.add('hidden');
    if (modals.player) modals.player.src = '';

    restoreFocus();
    return;
  }

  // Close only register modal
  if (modals.register && !modals.register?.classList.contains('hidden')) {
    modals.register?.classList.add('hidden');

    restoreFocus();
    return;
  }

  modals.team?.classList.add('hidden');
  modals.details?.classList.add('hidden');
  modals.login?.classList.add('hidden');

  document.body.style.overflow = 'auto';

  unlockBackground();
  restoreFocus();
}

export function modalClose() {
  // Is modal focusable?
  if (modals.details && !modals.details.hasAttribute('tabindex')) {
    modals.details.setAttribute('tabindex', '-1');
  }

  // Hide modal on backdrop click
  modals.backdrops.forEach(backdrop => {
    backdrop.addEventListener('click', e => {
      if (e.target === backdrop) closeModal();
    });
  });

  // Escape + focus trap
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal();
      return;
    }

    // Focus trap only if details is open
    if (!modals.details) return;
    if (modals.details.classList.contains('hidden')) return;

    trapFocus(modals.details, e);
  });
}
