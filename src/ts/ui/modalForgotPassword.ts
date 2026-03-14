import { forgotPassword } from '../api/filmovieServerApi.js';
import { closeModal } from '../modalClose.js';
import { applyTranslations } from '../language.js';

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

    const loginInput = document.querySelector('#forgot-passwordLogin') as HTMLInputElement | null;
    const emailInput = document.querySelector('#forgot-passwordEmail') as HTMLInputElement | null;
    const passwordInput = document.querySelector(
      '#forgot-passwordPassword',
    ) as HTMLInputElement | null;
    const repeatPasswordInput = document.querySelector(
      '#forgot-passwordRepeatPassword',
    ) as HTMLInputElement | null;

    if (passwordInput?.value !== repeatPasswordInput?.value && formError) {
      formError.style.display = 'block';
      formError.textContent = 'Passwords are different.';
      applyTranslations();
      return;
    }

    try {
      await forgotPassword(loginInput!.value, emailInput!.value, passwordInput!.value);

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
