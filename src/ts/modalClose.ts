export function modalClose() {
  // ======= MODALS ========
  type Modals = {
    backdrops: NodeListOf<HTMLElement> | null;
    team: HTMLElement | null;
    details: HTMLElement | null;
    login: HTMLElement | null;
  };

  const modals: Modals = {
    backdrops: document.querySelectorAll<HTMLElement>('.backdrop-modal'),
    team: document.querySelector<HTMLElement>('.modal-team-box'),
    details: document.querySelector<HTMLElement>('.details'),
    login: document.querySelector<HTMLElement>('.login'),
  };

  // ======= GLOBAL BACKDROP-MODAL ========
  modals.backdrops?.forEach(backdrop => {
    backdrop.addEventListener('click', e => {
      if (e.target === backdrop) {
        modals.team?.classList.add('hidden');
        modals.details?.classList.add('hidden');
        modals.login?.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
    });
  });

  // ======= ESCAPE KEY ========
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      modals.details?.classList.add('hidden');
      modals.team?.classList.add('hidden');
      modals.login?.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  });

  // ======= HIDE BY X BUTTON TEAM ==========
  const teamClose = document.querySelector<HTMLElement>('.team__modal--close');

  teamClose?.addEventListener('click', () => {
    modals.team?.classList.add('hidden');
    document.body.style.overflow = 'auto';
  });

  // ======= HIDE BY X BUTTON DETAILS ========
  const detailsClose = document.querySelector<HTMLElement>('.details__close-button');

  detailsClose?.addEventListener('click', () => {
    modals.details?.classList.add('hidden');
    document.body.style.overflow = 'auto';
  });
}
