import { loginUser, setServerToken } from '../api/filmotekaServerApi.js';

export async function loginHandler() {
  const form = document.querySelector('.login__form') as HTMLFormElement | null;
  const formError = document.querySelector('.login__error') as HTMLParagraphElement | null;

  form?.addEventListener('submit', async e => {
    setTimeout(() => {}, 1000);

    e.preventDefault();

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
      if (formError) {
        formError.style.display = 'block';
        console.error(error);
        if (error instanceof Error && (error as Error).message !== 'Login failed: 401') {
          formError.textContent = (error as Error).message;
        }
      }
    }
  });
}
