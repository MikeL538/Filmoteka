import { getMyLists, getServerToken } from '../api/filmotekaServerApi.js';

function writeListsToLocalStorage(lists: { watched: number[]; queued: number[] }) {
  localStorage.setItem('toWatchList', JSON.stringify(lists.watched.map(String)));
  localStorage.setItem('queueList', JSON.stringify(lists.queued.map(String)));
}

export async function syncListsIfLoggedIn(): Promise<boolean> {
  const token = getServerToken();

  if (!token) {
    return false;
  }

  try {
    const lists = await getMyLists();
    writeListsToLocalStorage(lists);
    return true;
  } catch (error) {
    console.error('Backend sync failed, fallback to localStorage only:', error);
    return false;
  }
}
