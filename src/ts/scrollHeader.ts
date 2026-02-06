export function scrollHeader() {
  const header = document.querySelector<HTMLElement>('.header')!;
  const headerNav = document.querySelector<HTMLElement>('.header__nav')!;
  const headerContainer = document.querySelector<HTMLElement>('.header__container')!;
  const headerForm = document.querySelector<HTMLFormElement>('.header__nav-form');
  const headerLibraryButtons = document.querySelector<HTMLElement>(
    '.header--library__btn--container',
  );

  const isScrolling = (): boolean => window.scrollY > 70;

  function applyScrollState() {
    header.classList.add('scrolled');
    headerContainer.classList.add('scrolled-container');

    if (headerForm) {
      headerNav.classList.add('nav-height');
      headerForm.classList.add('form-transform');
    }

    if (headerLibraryButtons) {
      headerNav.classList.add('nav-height-library');
      headerLibraryButtons.classList.add('buttons-transform');
    }
  }

  function removeScrollState() {
    header.classList.remove('scrolled');
    headerContainer.classList.remove('scrolled-container');

    if (headerForm) {
      headerNav.classList.remove('nav-height');
      headerForm.classList.remove('form-transform');
    }

    if (headerLibraryButtons) {
      headerNav.classList.remove('nav-height-library');
      headerLibraryButtons.classList.remove('buttons-transform');
    }
  }

  window.addEventListener('scroll', () => {
    if (isScrolling() && !header.matches(':hover')) {
      applyScrollState();
    } else if (!isScrolling()) {
      removeScrollState();
    }
  });

  header.addEventListener('mouseenter', () => {
    if (!isScrolling()) return;

    header.classList.add('hovered');
    headerContainer.classList.remove('scrolled-container');

    if (headerForm) {
      headerNav.classList.remove('nav-height');
      headerForm.classList.remove('form-transform');
    }

    if (headerLibraryButtons) {
      headerNav.classList.remove('nav-height-library');
      headerLibraryButtons.classList.remove('buttons-transform');
    }
  });

  header.addEventListener('mouseleave', () => {
    if (!isScrolling()) return;

    header.classList.remove('hovered');
    applyScrollState();
  });
}
