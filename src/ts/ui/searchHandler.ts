export function attachSearch(form: HTMLFormElement, callback: (query: string) => void) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const query = form.textContent;
    callback(query);
  });
}
