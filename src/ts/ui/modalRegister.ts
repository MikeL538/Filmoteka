import { registerUser, setServerToken } from '../api/filmotekaServerApi.js';
import { applyTranslations } from '../language.js';
import { notifications } from './notifications.js';
import { Notify } from 'notiflix';
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

    let longLoadTimer: number | undefined;
    let veryLongLoadTimer: number | undefined;
    let serverAsleep: number | undefined;
    let serverAsleepLong: number | undefined;

    try {
      notifications.showLoader();
      //  tutaj jeśli czas > 3 sekundy wyslij notification.longLoad()
      longLoadTimer = window.setTimeout(() => {
        Notify.warning('Server loading...');
      }, 3000);

      veryLongLoadTimer = window.setTimeout(() => {
        Notify.warning('Still loading...');
      }, 6000);

      serverAsleep = window.setTimeout(() => {
        Notify.warning('Server waking up...');
      }, 9000);

      serverAsleepLong = window.setTimeout(() => {
        Notify.warning('Server still waking up...');
      }, 12000);

      const data = await registerUser(loginInput.value, passwordInput.value);
      window.clearTimeout(longLoadTimer);
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
    } finally {
      if (longLoadTimer !== undefined) window.clearTimeout(longLoadTimer);
      if (veryLongLoadTimer !== undefined) window.clearTimeout(veryLongLoadTimer);
      if (serverAsleep !== undefined) window.clearTimeout(serverAsleep);
      if (serverAsleepLong !== undefined) window.clearTimeout(serverAsleepLong);
      notifications.hideLoader();
    }
  });
}
