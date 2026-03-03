import { loginUser, setServerToken } from '../api/filmotekaServerApi.js';
import { openRegisterModal } from '../modalShow.js';
import { applyTranslations } from '../language.js';
import { notifications } from './notifications.js';
import { Notify } from 'notiflix';
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
    //        Notify.warning('Server is waking up... Please wait');
    let longLoadTimer: number | undefined;
    let veryLongLoadTimer: number | undefined;
    let serverAsleep: number | undefined;
    let serverAsleepLong: number | undefined;

    try {
      notifications.showLoader();

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

      const data = await loginUser(loginInput.value, passwordInput.value);
      window.clearTimeout(longLoadTimer);
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
            if (longLoadTimer !== undefined) window.clearTimeout(longLoadTimer);
            formError.textContent = 'Network Error';
          }
        }
      } else {
        formError!.textContent = error instanceof Error ? error.message : String(error);
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
