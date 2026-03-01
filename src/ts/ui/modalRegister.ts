import { registerUser, setServerToken } from '../api/filmotekaServerApi.js';
import { applyTranslations } from '../language.js';
export async function registerHandler() {
  const form = document.querySelector('.register__form') as HTMLFormElement | null;
  const formError = document.querySelector('.register__error') as HTMLParagraphElement | null;
  const registerErrorMap: Record<string, string> = {
    REGISTER_400: 'loginAndPasswordRequired',
    REGISTER_409: 'loginAlreadyExists',
    REGISTER_500: 'serverError',
  };

  form?.addEventListener('submit', async e => {
    e.preventDefault();
    if (formError) {
      formError.style.display = 'none';
      formError.dataset.translate = '';
      formError.textContent = '';
    }

    const loginInput = document.querySelector('.register__input') as HTMLInputElement | null;
    const passwordInput = document.querySelector(
      '.register--Password__input',
    ) as HTMLInputElement | null;

    if (!loginInput || !passwordInput) {
      console.error('Login inputs not found');
      return;
    }

    try {
      const data = await registerUser(loginInput.value, passwordInput.value);
      setServerToken(data.token);
      localStorage.setItem('toWatchList', JSON.stringify(data.lists.watched.map(String)));
      localStorage.setItem('queueList', JSON.stringify(data.lists.queued.map(String)));
      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        if (formError) {
          const key = registerErrorMap[error.message] ?? 'Server ERROR';
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
        } else {
          formError!.textContent = error instanceof Error ? error.message : String(error);
        }
      }
    }
  });
}
