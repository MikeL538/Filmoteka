let lastFocusedEl: HTMLElement | null = null;

const BACKGROUND_ROOT_SELECTOR = '.films__list, .library-films__list';
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

export function trapFocus(modalEl: HTMLElement, e: KeyboardEvent) {
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

export function rememberFocus() {
  if (document.activeElement instanceof HTMLElement) {
    lastFocusedEl = document.activeElement;
  }
}

export function restoreFocus() {
  lastFocusedEl?.focus();
  lastFocusedEl = null;
}

export function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR))
    .filter(isHTMLElement)
    .filter(el => !el.hasAttribute('disabled'))
    .filter(isVisible);
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
