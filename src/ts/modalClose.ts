import { unlockBackground, restoreFocus, trapFocus } from './a11yFocus.js';

export function modalClose() {
  type Modals = {
    backdrops: NodeListOf<HTMLElement>;
    team: HTMLElement | null;
    details: HTMLElement | null;
    login: HTMLElement | null;
    register: HTMLElement | null;
    trailer: HTMLElement | null;
    player: HTMLIFrameElement | null;
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

  // Is modal focusable?
  if (modals.details && !modals.details.hasAttribute('tabindex')) {
    modals.details.setAttribute('tabindex', '-1');
  }

  function closeAll() {
    modals.team?.classList.add('hidden');
    modals.details?.classList.add('hidden');
    modals.login?.classList.add('hidden');
    modals.register?.classList.add('hidden');
    modals.trailer?.classList.add('hidden');
    modals.player!.src = '';

    document.body.style.overflow = 'auto';

    unlockBackground();
    restoreFocus();
  }

  // Backdrop click
  modals.backdrops.forEach(backdrop => {
    backdrop.addEventListener('click', e => {
      if (e.target === backdrop) closeAll();
    });
  });

  // Close with button
  function hideOnlyThisModal(closeButton: HTMLElement | null, displayedModal: HTMLElement | null) {
    closeButton?.addEventListener('click', () => {
      displayedModal?.classList.add('hidden');
    });
  }

  const loginCloseButton = document.querySelector<HTMLElement>('#loginCloseButton');
  const registerCloseButton = document.querySelector<HTMLElement>('#registerCancel');
  const registerCloseButtonX = document.querySelector<HTMLElement>('#registerCloseButton');

  hideOnlyThisModal(registerCloseButton, modals.register);
  hideOnlyThisModal(registerCloseButtonX, modals.register);
  hideOnlyThisModal(loginCloseButton, modals.login);

  // Escape + focus trap
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeAll();
      return;
    }

    // Focus trap only if details is open
    if (!modals.details) return;
    if (modals.details.classList.contains('hidden')) return;

    trapFocus(modals.details, e);
  });

  // Close buttons
  const teamClose = document.querySelector<HTMLElement>('.team__modal--close');
  teamClose?.addEventListener('click', closeAll);

  const detailsClose = document.querySelector<HTMLElement>('.details__close-button');
  detailsClose?.addEventListener('click', closeAll);
}
