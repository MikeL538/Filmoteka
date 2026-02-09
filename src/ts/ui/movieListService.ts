import { notifications } from './notifications.js';
import { currentLanguage } from '../language.js';

// ===== WATCHED LIST =====
export function getWatchedList(): string[] {
  const stored = localStorage.getItem('toWatchList');
  if (!stored) return [];
  try {
    return JSON.parse(stored) as string[];
  } catch (error) {
    console.error('Error parsing watched list:', error);
    return [];
  }
}

function saveWatchedList(list: string[]): void {
  localStorage.setItem('toWatchList', JSON.stringify(list));
}

function toggleWatched(movieId: string): boolean {
  const list = getWatchedList();
  if (list.includes(movieId)) {
    list.splice(list.indexOf(movieId), 1);
    saveWatchedList(list);
    notifications.removedFromWatched();
    return true;
  } else {
    list.push(movieId);
    saveWatchedList(list);
    notifications.addedToWatched();
    return false;
  }
}

// ===== QUEUE LIST =====
export function getQueueList(): string[] {
  const stored = localStorage.getItem('queueList');
  if (!stored) return [];
  try {
    return JSON.parse(stored) as string[];
  } catch (error) {
    console.error('Error parsing queue list:', error);
    return [];
  }
}

function saveQueueList(list: string[]): void {
  localStorage.setItem('queueList', JSON.stringify(list));
}

function toggleQueue(movieId: string): boolean {
  const list = getQueueList();
  if (list.includes(movieId)) {
    list.splice(list.indexOf(movieId), 1);
    saveQueueList(list);
    notifications.removedFromQueue();
    return true;
  } else {
    list.push(movieId);
    saveQueueList(list);
    notifications.addedToQueue();
    return false;
  }
}

// ===== HANDLERS FOR BUTTONS =====
export function movieListService(currentLanguage: 'en-US' | 'pl-PL') {
  const watchedButtons = document.querySelectorAll<HTMLButtonElement>('.btn-add-watched');
  const queueButtons = document.querySelectorAll<HTMLButtonElement>('.btn-add-queue');

  watchedButtons.forEach(button => {
    button.addEventListener('click', () => {
      console.log('wrks');
      const id = button.dataset.id!;
      toggleWatched(id);
      console.log('watch');
      //   if (!getWatchedList().includes(id)) {
      //     button.classList.add('onList');
      //     button.textContent =
      //       currentLanguage === 'en-US' ? 'Remove from watched' : 'Usuń z oglądanych';
      //   } else {
      //     button.classList.remove('onList');
      //     button.textContent = currentLanguage === 'en-US' ? 'Add to watched' : 'Dodaj do oglądanych';
      //   }
      // });
      updateWatchedButtonsState(button, id);
    });

    queueButtons.forEach(button => {
      button.addEventListener('click', () => {
        const id = button.dataset.id!;
        toggleQueue(id);
        console.log('queue');
        // if (!getQueueList().includes(id)) {
        //   button.classList.add('onList');
        //   button.textContent = currentLanguage === 'en-US' ? 'Remove from queue' : 'Usuń z kolejki';
        // } else {
        //   button.classList.remove('onList');
        //   button.textContent = currentLanguage === 'en-US' ? 'Add to queue' : 'Dodaj do kolejki';
        // }
        updateQueueButtonsState(button, id);
      });
    });
  });
}

export function updateQueueButtonsState(button: HTMLButtonElement, id: string) {
  if (getQueueList().includes(id)) {
    button.classList.add('onList');
    button.textContent = currentLanguage === 'en-US' ? 'Remove from queue' : 'Usuń z kolejki';
  } else {
    button.classList.remove('onList');
    button.textContent = currentLanguage === 'en-US' ? 'Add to queue' : 'Dodaj do kolejki';
  }
}

export function updateWatchedButtonsState(button: HTMLButtonElement, id: string) {
  if (getWatchedList().includes(id)) {
    button.classList.add('onList');
    button.textContent = currentLanguage === 'en-US' ? 'Remove from watched' : 'Usuń z oglądanych';
  } else {
    button.classList.remove('onList');
    button.textContent = currentLanguage === 'en-US' ? 'Add to watched' : 'Dodaj do oglądanych';
  }
}
