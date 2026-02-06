export function attachSearch(form: HTMLFormElement, callback: (query: string) => void) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const input = form.querySelector<HTMLInputElement>('input');

    if (!input) return;

    const query = input.value.trim();

    if (!query) return;

    callback(query);
  });
}
