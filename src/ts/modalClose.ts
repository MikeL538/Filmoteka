export function modalClose() {
  // ======= HIDE TEAM ==========
  const teamClose = document.querySelector<HTMLElement>('.team__modal--close');
  teamClose?.addEventListener('click', () => {
    document.querySelector<HTMLElement>('.modal-team-box')?.classList.add('hidden');
    document.body.style.overflow = 'scroll';
  });

  // ======= HIDE DETAILS ========
  const detailsClose = document.querySelector<HTMLElement>('.details__close-button');
  detailsClose?.addEventListener('click', () => {
    document.querySelector<HTMLElement>('.details')?.classList.add('hidden');
    document.body.style.overflow = 'scroll';
  });
}
