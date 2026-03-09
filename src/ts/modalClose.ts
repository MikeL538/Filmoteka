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
  login: HTMLButtonElement | null;
  register: HTMLButtonElement | null;
  registerX: HTMLButtonElement | null;
  team: HTMLButtonElement | null;
  details: HTMLButtonElement | null;
  trailer: HTMLButtonElement | null;
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
  login: document.querySelector<HTMLButtonElement>('#loginCloseButton'),
  register: document.querySelector<HTMLButtonElement>('#registerCancel'),
  registerX: document.querySelector<HTMLButtonElement>('#registerCloseButton'),
  team: document.querySelector<HTMLButtonElement>('.team__modal--close'),
  details: document.querySelector<HTMLButtonElement>('#detailsModalClose'),
  trailer: document.querySelector<HTMLButtonElement>('#trailerModalClose'),
};

// Close with button
buttons.login?.addEventListener('click', closeModal);
buttons.register?.addEventListener('click', closeModal);
buttons.registerX?.addEventListener('click', closeModal);
buttons.team?.addEventListener('click', closeModal);
buttons.details?.addEventListener('click', closeModal);
buttons.trailer?.addEventListener('click', closeModal);

export function closeModal() {
  // Close only trailer modal if opened
  if (!modals.trailer?.classList.contains('hidden')) {
    modals.trailer?.classList.add('hidden');
    if (modals.player) modals.player.src = '';

    restoreFocus();
    return;
  }

  // Close only register modal
  if (!modals.register?.classList.contains('hidden')) {
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
