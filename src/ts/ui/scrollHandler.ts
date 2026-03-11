function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter(el => el.offsetParent !== null || getComputedStyle(el).position === 'fixed');
}

export function attachInfiniteScroll(
  fetchCallback: () => Promise<void>,
  focusContainer?: HTMLElement | null
): void {
  let isLoading = false;

  window.addEventListener('scroll', async () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 1000 && !isLoading) {
      isLoading = true;

      const focusablesBeforeLoad = focusContainer ? getFocusableElements(focusContainer) : [];
      const activeElement = document.activeElement;
      const shouldRestoreSequentialFocus =
        activeElement instanceof HTMLElement &&
        focusablesBeforeLoad.length > 0 &&
        activeElement === focusablesBeforeLoad[focusablesBeforeLoad.length - 1];

      await fetchCallback();

      if (focusContainer && shouldRestoreSequentialFocus) {
        const focusablesAfterLoad = getFocusableElements(focusContainer);
        const firstNewFocusable = focusablesAfterLoad[focusablesBeforeLoad.length];

        if (firstNewFocusable) {
          firstNewFocusable.focus();
        }
      }

      isLoading = false;
    }
  });
}
