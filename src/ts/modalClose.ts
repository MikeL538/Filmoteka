let lastFocusedEl: HTMLElement | null = null;

const BACKGROUND_ROOT_SELECTOR = '.films__list, .library-films__list';

export function rememberFocus() {
  if (document.activeElement instanceof HTMLElement) {
    lastFocusedEl = document.activeElement;
  }
}

export function restoreFocus() {
  lastFocusedEl?.focus();
  lastFocusedEl = null;
}

export function lockBackground() {
  const root = document.querySelector<HTMLElement>(BACKGROUND_ROOT_SELECTOR);
  if (!root) return;

  const inertRoot = root as unknown as { inert?: boolean };
  if (typeof inertRoot.inert === 'boolean') {
    inertRoot.inert = true;
  } else {
    root.setAttribute('aria-hidden', 'true');
  }
}

export function unlockBackground() {
  const root = document.querySelector<HTMLElement>(BACKGROUND_ROOT_SELECTOR);
  if (!root) return;

  const inertRoot = root as unknown as { inert?: boolean };
  if (typeof inertRoot.inert === 'boolean') {
    inertRoot.inert = false;
  } else {
    root.removeAttribute('aria-hidden');
  }
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  "[tabindex]:not([tabindex='-1'])",
].join(',');

function isHTMLElement(el: Element): el is HTMLElement {
  return el instanceof HTMLElement;
}

function isVisible(el: HTMLElement) {
  // offsetParent = null for fixed, add fixed
  return el.offsetParent !== null || getComputedStyle(el).position === 'fixed';
}

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR))
    .filter(isHTMLElement)
    .filter(el => !el.hasAttribute('disabled'))
    .filter(isVisible);
}

function trapFocus(modalEl: HTMLElement, e: KeyboardEvent) {
  if (e.key !== 'Tab') return;

  const focusables = getFocusable(modalEl);

  // If nothing is focusable, focus on modal
  if (focusables.length === 0) {
    e.preventDefault();
    modalEl.focus();
    return;
  }

  const first = focusables[0]!;
  const last = focusables[focusables.length - 1]!;
  const active = document.activeElement;

  if (e.shiftKey) {
    if (active === first || active === modalEl) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (active === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

export function modalClose() {
  type Modals = {
    backdrops: NodeListOf<HTMLElement>;
    team: HTMLElement | null;
    details: HTMLElement | null;
    login: HTMLElement | null;
    register: HTMLElement | null;
  };

  const modals: Modals = {
    backdrops: document.querySelectorAll<HTMLElement>('.backdrop-modal'),
    team: document.querySelector<HTMLElement>('.modal-team-box'),
    details: document.querySelector<HTMLElement>('.details'),
    login: document.querySelector<HTMLElement>('.login'),
    register: document.querySelector<HTMLElement>('.register'),
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
