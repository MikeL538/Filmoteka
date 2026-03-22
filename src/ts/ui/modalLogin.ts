import { loginUser, setServerToken, resendVerificationEmail } from '../api/filmovieServerApi.js';
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
    LOGIN_403: 'notVerified',
    LOGIN_429: 'tooManyRequests',
    RESEND_TOO_EARLY: 'resendTooEarly',
    LOGIN_500: 'serverError',
  };

  let serverLoadWarning1: number | undefined;
  let serverLoadWarning2: number | undefined;
  let serverLoadWarning3: number | undefined;
  let serverLoadWarning4: number | undefined;
  let serverLoadWarning5: number | undefined;

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

  document.addEventListener('click', e => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('login__btn--register')) {
      openRegisterModal();
    }
  });

  form?.addEventListener('submit', async e => {
    e.preventDefault();
    if (formError) {
      formError.textContent = '';
      formError.style.color = 'red';
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
      serverWakingUpInfo();

      const data = await loginUser(loginInput.value, passwordInput.value);

      clearServerWakingUpInfo();
      setServerToken(data.token);

      const loginFormat =
        loginInput.value.charAt(0).toUpperCase() + loginInput.value.slice(1).toLowerCase();

      localStorage.setItem('toWatchList', JSON.stringify(data.lists.watched.map(String)));
      localStorage.setItem('queueList', JSON.stringify(data.lists.queued.map(String)));
      // RELOAD ON PURPOSE
      sessionStorage.setItem('welcomeUserLogin', loginFormat);
      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        if (formError) {
          const key = loginErrorMap[error.message] ?? 'Server ERROR';
          formError.innerHTML += `<p data-translate='${key}'></p>\n`;

          if (key === 'notVerified') {
            formError.innerHTML += `<button id="loginSendVerAgain" type="button" data-translate="loginSendVerAgain">Send activation link again.</button>`;
            const verifySendAgainButton = document.querySelector('#loginSendVerAgain');

            verifySendAgainButton?.addEventListener('click', async () => {
              try {
                formError.innerHTML = '';
                await resendVerificationEmail(loginInput.value);
              } catch (error) {
                formError.innerHTML += `<p data-translate='${loginErrorMap['RESEND_TOO_EARLY']}'></p>\n`;
                applyTranslations();
                console.log(error);
              }
            });
          }
          applyTranslations();

          console.error(error);

          // SHOW ERROR IF NETWORKERROR
          const isNetworkError =
            error instanceof TypeError &&
            /NetworkError|Failed to fetch|Load failed/i.test(error.message);
          if (isNetworkError) {
            clearServerWakingUpInfo();
            formError.textContent = 'Network Error';
          }
        }
      } else {
        formError!.textContent = error instanceof Error ? error.message : String(error);
      }
    } finally {
      // IF LOADED => CLEAR TIMERS FOR NOTIFICTIONS
      clearServerWakingUpInfo();
    }
  });
}
