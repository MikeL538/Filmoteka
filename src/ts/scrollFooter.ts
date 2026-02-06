export function scrollFooter() {
  const footer = document.querySelector<HTMLElement>('.footer')!;
  const isScrolling = (): boolean => window.scrollY > 70;

  function setScrollState() {
    if (isScrolling()) footer.classList.remove('hidden');
    else footer.classList.add('hidden');
  }

  window.addEventListener('scroll', () => {
    setScrollState();
  });
}
