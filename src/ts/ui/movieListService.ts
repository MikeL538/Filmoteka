import { notifications } from './notifications.js';

import { populateModal } from './populateDetailsModal.js';

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

function toggleWatched(movieId: string): void {
  const list = getWatchedList();
  if (list.includes(movieId)) {
    list.splice(list.indexOf(movieId), 1);
    saveWatchedList(list);
    notifications.removedFromWatched();
  } else {
    list.push(movieId);
    saveWatchedList(list);
    notifications.addedToWatched();
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

function toggleQueue(movieId: string): void {
  const list = getQueueList();
  if (list.includes(movieId)) {
    list.splice(list.indexOf(movieId), 1);
    saveQueueList(list);
    notifications.removedFromQueue();
  } else {
    list.push(movieId);
    saveQueueList(list);
    notifications.addedToQueue();
  }
}

// ===== HANDLERS FOR BUTTONS =====
export function movieListService() {
  const watchedButtons = document.querySelectorAll<HTMLElement>('.btn-add-watched');
  const queueButtons = document.querySelectorAll<HTMLElement>('.btn-add-queue');

  watchedButtons.forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.id!;
      toggleWatched(id);
    });
  });

  queueButtons.forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.id!;
      toggleQueue(id);
    });
  });
}
