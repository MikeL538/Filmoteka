import { registerUser } from '../api/filmovieServerApi.js';
import { applyTranslations } from '../language.js';
import { closeModal } from '../modalClose.js';
import { notifications } from './notifications.js';
import { Notify } from 'notiflix';

let serverLoadWarning1: number | undefined;
let serverLoadWarning2: number | undefined;
let serverLoadWarning3: number | undefined;
let serverLoadWarning4: number | undefined;
let serverLoadWarning5: number | undefined;

const registerErrorMap: Record<string, string> = {
  REGISTER_400: 'loginAndPasswordRequired',
  LOGIN_ALREADY_EXISTS: 'loginAlreadyExists',
  EMAIL_ALREADY_EXISTS: 'emailAlreadyExists',
  REGISTER_500: 'serverError',
  VERIFICATION_EMAIL_FAILED: 'verEmailFailed',
};

function serverWakingUpInfo() {
  notifications.showLoader();
  // NOTIFY ABOUT LOADING
  serverLoadWarning1 = window.setTimeout(() => {
    Notify.warning('Server loading...');
  }, 5000);
  serverLoadWarning2 = window.setTimeout(() => {
    Notify.warning('Still loading...');
  }, 10000);
  serverLoadWarning3 = window.setTimeout(() => {
    Notify.warning('Server waking up...');
  }, 15000);
  serverLoadWarning4 = window.setTimeout(() => {
    Notify.warning('Server still waking up...');
  }, 20000);
  serverLoadWarning5 = window.setTimeout(() => {
    Notify.warning('Waking up might take even minutes...');
  }, 24000);
}

function clearServerWakingUpInfo() {
  if (serverLoadWarning1 !== undefined) window.clearTimeout(serverLoadWarning1);
  if (serverLoadWarning2 !== undefined) window.clearTimeout(serverLoadWarning2);
  if (serverLoadWarning3 !== undefined) window.clearTimeout(serverLoadWarning3);
  if (serverLoadWarning4 !== undefined) window.clearTimeout(serverLoadWarning4);
  if (serverLoadWarning5 !== undefined) window.clearTimeout(serverLoadWarning5);
  notifications.hideLoader();
}

export async function registerHandler() {
  const form = document.querySelector('.register__form') as HTMLFormElement | null;
  const formError = document.querySelector('.register__error') as HTMLParagraphElement | null;

  form?.addEventListener('submit', async e => {
    e.preventDefault();
    if (formError) {
      formError.style.display = 'none';
      formError.dataset.translate = '';
      formError.textContent = '';
    }

    const loginInput = document.querySelector('#registerLogin') as HTMLInputElement | null;
    const passwordInput = document.querySelector('#registerPassword') as HTMLInputElement | null;
    const repeatPasswordInput = document.querySelector(
      '#registerRepeatPassword',
    ) as HTMLInputElement | null;
    const email = document.querySelector('#registerEmail') as HTMLInputElement | null;

    if (passwordInput?.value !== repeatPasswordInput?.value && formError) {
      formError.style.display = 'block';
      formError.textContent = 'Passwords are different.';
      applyTranslations();
      return;
    }

    try {
      serverWakingUpInfo();

      await registerUser(loginInput!.value, passwordInput!.value, email!.value);

      clearServerWakingUpInfo();
      // setServerToken(data.token);
      closeModal();
      // localStorage.setItem('toWatchList', JSON.stringify(data.lists.watched.map(String)));
      // localStorage.setItem('queueList', JSON.stringify(data.lists.queued.map(String)));
      // window.location.reload();
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
      clearServerWakingUpInfo();
    }
  });
}
