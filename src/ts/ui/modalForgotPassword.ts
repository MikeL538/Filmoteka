import { forgotPassword } from '../api/filmovieServerApi.js';
import { closeModal } from '../modalClose.js';

export async function forgotPasswordHandler() {
  const form = document.querySelector('.forgot-password__form') as HTMLFormElement | null;
  const formError = document.querySelector(
    '.forgot-password__error',
  ) as HTMLParagraphElement | null;

  form?.addEventListener('submit', async e => {
    e.preventDefault();
    if (formError) {
      formError.style.display = 'none';
      formError.dataset.translate = '';
      formError.textContent = '';
    }

    const emailInput = document.querySelector('#forgot-passwordEmail') as HTMLInputElement | null;

    try {
      await forgotPassword(emailInput!.value);

      closeModal();
    } catch (error) {
      if (error instanceof Error) {
        if (formError) {
          // formError.dataset.translate = key;
          formError.style.display = 'block';
          formError.innerHTML = error.message;
        }
      }
    }
  });
}
