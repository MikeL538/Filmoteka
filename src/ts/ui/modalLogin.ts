import { loginUser, setServerToken } from '../api/filmotekaServerApi.js';

export async function loginHandler() {
  const form = document.querySelector('.login__form') as HTMLFormElement | null;

  form?.addEventListener('submit', async e => {
    setTimeout(() => {}, 1000);
    console.log('test');
    e.preventDefault();
    console.log('test2');

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
    } catch (error) {
      console.error(error);
    }
  });
}
