import { getMyLists, getServerToken, logoutUser } from '../api/filmotekaServerApi.js';
import { applyTranslations } from '../language.js';
const navLoginLi = document.querySelector('.header__nav-login') as HTMLElement | null;

function writeListsToLocalStorage(lists: { watched: number[]; queued: number[] }) {
  localStorage.setItem('toWatchList', JSON.stringify(lists.watched.map(String)));
  localStorage.setItem('queueList', JSON.stringify(lists.queued.map(String)));
}

function logoutController() {
  navLoginLi?.addEventListener('click', e => {
    const target = e.target as HTMLElement;
    if (target.id === 'logout') {
      logoutUser();
    }
  });
}

export async function syncListsIfLoggedIn(): Promise<boolean> {
  const token = getServerToken();
  logoutController();

  if (!token) {
    if (navLoginLi)
      navLoginLi.innerHTML = `<button id="login" type="button" data-translate="login"></button>`;
    applyTranslations();
    return false;
  }

  try {
    const lists = await getMyLists();
    writeListsToLocalStorage(lists);
    if (navLoginLi)
      navLoginLi.innerHTML = `<button id="logout" type="button"  data-translate="logout"></button>`;
    applyTranslations();
    return true;
  } catch (error) {
    console.error('Backend sync failed, fallback to localStorage only:', error);
    return false;
  }
}
