import { notifications } from './notifications.js';

// ===== ADD TO WATCHED =====
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

function addToWatched(movieId: string): void {
  const list = getWatchedList();

  if (!list.includes(movieId)) {
    try {
      list.push(movieId);
      saveWatchedList(list);
      notifications.addedToWatched();
    } catch (error) {
      console.error('Error saving watched list:', error);
      notifications.error();
    }
  } else {
    notifications.alreadyInWatched();
  }
}

function removeFromWatched(movieId: string): void {
  const list = getWatchedList();

  if (list.includes(movieId)) {
    try {
      list.splice(list.indexOf(movieId), 1);
      saveWatchedList(list);
      notifications.removedFromWatched();
    } catch (error) {
      console.error('Error saving watched list:', error);
      notifications.error();
    }
  }
}

// ===== ADD TO QUEUE ======
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

function addToQueue(movieId: string): void {
  const list = getQueueList();

  if (!list.includes(movieId)) {
    try {
      list.push(movieId);
      saveQueueList(list);
      notifications.addedToQueue();
    } catch (error) {
      console.error('Error saving queue list:', error);
      notifications.error();
    }
  } else {
    notifications.alreadyInQueue();
  }
}

function removeFromQueued(movieId: string): void {
  const list = getQueueList();

  if (list.includes(movieId)) {
    try {
      list.splice(list.indexOf(movieId), 1);
      saveQueueList(list);
      notifications.removedFromQueue();
    } catch (error) {
      console.error('Error saving queue list:', error);
      notifications.error();
    }
  }
}

// ===== HANDLERS FOR BUTTONS AND THEIR BEHAVIOUR ======
export function movieListService() {
  const addWatch = document.querySelector<HTMLElement>('.btn-add-watched')!;
  const addQueue = document.querySelector<HTMLElement>('.btn-add-queue')!;

  addWatch?.addEventListener('click', () => {
    if (!getWatchedList().includes(addWatch.dataset.id!)) {
      addToWatched(addWatch.dataset.id!);
    } else {
      removeFromWatched(addWatch.dataset.id!);
    }
  });

  addQueue?.addEventListener('click', () => {
    if (!getQueueList().includes(addQueue.dataset.id!)) {
      addToQueue(addQueue.dataset.id!);
    } else {
      removeFromQueued(addQueue.dataset.id!);
    }
  });
}
