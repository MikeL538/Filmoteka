import { loginUser, setServerToken } from '../api/filmotekaServerApi.js';
import { openRegisterModal } from '../modalShow.js';
import { applyTranslations } from '../language.js';
export async function loginHandler() {
  const form = document.querySelector('.login__form') as HTMLFormElement | null;
  const formError = document.querySelector('.login__error') as HTMLParagraphElement | null;
  const loginErrorMap: Record<string, string> = {
    LOGIN_400: 'loginAndPasswordRequired',
    LOGIN_401: 'wrongLoginOrPassword',
    LOGIN_429: 'tooManyRequests',
    LOGIN_500: 'serverError',
  };

  document.addEventListener('click', e => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('login__btn--register')) {
      openRegisterModal();
    }
  });

  form?.addEventListener('submit', async e => {
    e.preventDefault();
    if (formError) {
      formError.style.display = 'none';
      formError.dataset.translate = '';
      formError.textContent = '';
    }

    const loginInput = document.querySelector('.login__input') as HTMLInputElement | null;
    const passwordInput = document.querySelector(
      '.login--Password__input',
    ) as HTMLInputElement | null;

    if (!loginInput || !passwordInput) {
      console.error('Login inputs not found');
      return;
    }

    try {
      const data = await loginUser(loginInput.value, passwordInput.value);
      setServerToken(data.token);
      localStorage.setItem('toWatchList', JSON.stringify(data.lists.watched.map(String)));
      localStorage.setItem('queueList', JSON.stringify(data.lists.queued.map(String)));
      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        if (formError) {
          const key = loginErrorMap[error.message] ?? 'Server ERROR';
          formError.dataset.translate = key;
          formError.style.display = 'block';
          applyTranslations();
          console.error(error);
          const isNetworkError =
            error instanceof TypeError &&
            /NetworkError|Failed to fetch|Load failed/i.test(error.message);

          if (isNetworkError) {
            formError.textContent = 'Network Error';
          }
        }
      } else {
        formError!.textContent = error instanceof Error ? error.message : String(error);
      }
    }
  });
}

// Bad request 400
// if (error instanceof Error && (error as Error).message === 'LOGIN_400') {
//   formError.dataset.translate = 'loginAndPasswordRequired';
//   applyTranslations();
//   return;
// }
// // Login or Password is required 401
// if (error instanceof Error && (error as Error).message === 'LOGIN_401') {
//   formError.dataset.translate = 'wrongLoginOrPassword';
//   applyTranslations();
//   return;
// }
// // Too many requests 429
// if (error instanceof Error && (error as Error).message === 'LOGIN_429') {
//   formError.dataset.translate = 'tooManyRequests';
//   applyTranslations();
//   return;
// }
// // Server error 500
// if (error instanceof Error && (error as Error).message === 'LOGIN_500') {
//   formError.textContent = 'SERVER_ERROR';
//   applyTranslations();
//   return;
// }
