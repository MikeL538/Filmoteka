import { applyTranslations } from '../language.js';
import { resetPassword } from '../api/filmovieServerApi.js';

function getErrorMessage(code: string) {
  switch (code) {
    case 'TOKEN_REQUIRED':
      return 'Missing reset token.';
    case 'INVALID_TOKEN':
      return 'Invalid reset link.';
    case 'TOKEN_EXPIRED':
      return 'Reset link expired.';
    case 'PASSWORD_REQUIRED':
      return 'Password is required.';
    case 'PASSWORD_TOO_SHORT':
      return 'Password must have at least 6 characters.';
    default:
      return code;
  }
}

export function setupResetPasswordPage() {
  applyTranslations();

  const form = document.querySelector<HTMLFormElement>('.change-password__form');
  const passwordInput = document.querySelector<HTMLInputElement>('#change-passwordPassword');
  const repeatPasswordInput = document.querySelector<HTMLInputElement>(
    '#change-passwordRepeatPassword',
  );
  const errorElement = document.querySelector<HTMLParagraphElement>('.change-password__error');
  const successElement = document.querySelector<HTMLParagraphElement>('.change-password__success');
  const closeLink = document.querySelector<HTMLAnchorElement>('#change-passwordCancel');

  if (!form || !passwordInput || !repeatPasswordInput || !errorElement || !successElement) {
    return;
  }

  const token = new URLSearchParams(window.location.search).get('token');

  if (!token) {
    errorElement.style.display = 'block';
    errorElement.textContent = getErrorMessage('TOKEN_REQUIRED');
    form.querySelectorAll('input, button').forEach(element => {
      (element as HTMLInputElement | HTMLButtonElement).disabled = true;
    });
    if (closeLink) closeLink.href = './index.html';
    return;
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();

    errorElement.style.display = 'none';
    errorElement.textContent = '';
    successElement.style.display = 'none';
    successElement.textContent = '';

    const password = passwordInput.value.trim();
    const repeatedPassword = repeatPasswordInput.value.trim();

    if (password !== repeatedPassword) {
      errorElement.style.display = 'block';
      errorElement.textContent = 'Passwords do not match.';
      return;
    }

    try {
      await resetPassword(token, password);

      successElement.style.display = 'block';
      successElement.textContent = 'Password changed. You can log in now.';
      form.reset();
      window.setTimeout(() => {
        window.location.href = './index.html';
      }, 1800);
    } catch (error) {
      errorElement.style.display = 'block';
      errorElement.textContent =
        error instanceof Error ? getErrorMessage(error.message) : 'Password reset failed.';
    }
  });
}
