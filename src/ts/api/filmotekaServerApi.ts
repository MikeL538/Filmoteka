declare const process: {
  env: {
    PARCEL_API_BASE_URL?: string;
    NODE_ENV?: string;
  };
};

type ListName = 'watched' | 'queued';

export type UserLists = {
  watched: number[];
  queued: number[];
};

type LoginResponse = {
  token: string;
  user: { login: string };
  lists: UserLists;
};
const API_BASE_URL = process.env.PARCEL_API_BASE_URL || 'http://localhost:3000';

const TOKEN_KEY = 'filmoteka_server_token';

export function getServerToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setServerToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export async function loginUser(login: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password }),
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.status}`);
  }

  return (await response.json()) as LoginResponse;
}

export async function logoutUser(): Promise<void> {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem('toWatchList');
  localStorage.removeItem('queueList');

  window.location.reload();
}

export async function getMyLists(): Promise<UserLists> {
  const token = getServerToken();
  if (!token) throw new Error('No token');

  const response = await fetch(`${API_BASE_URL}/api/users/me/lists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Fetch lists failed: ${response.status}`);
  }

  return (await response.json()) as UserLists;
}

export async function saveMyList(listName: ListName, movieIds: string[]): Promise<UserLists> {
  const token = getServerToken();
  if (!token) throw new Error('No token');
  if (!token) return { watched: [], queued: [] }; // not in dev mode

  const normalizedIds = movieIds.map(id => Number(id)).filter(id => Number.isFinite(id));

  const response = await fetch(`${API_BASE_URL}/api/users/me/lists/${listName}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ movieIds: normalizedIds }),
  });

  if (!response.ok) {
    throw new Error(`Save list failed: ${response.status}`);
  }

  return (await response.json()) as UserLists;
}

export async function registerUser(login: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password }),
  });

  if (!response.ok) {
    throw new Error(`Register failed: ${response.status}`);
  }

  return (await response.json()) as LoginResponse;
}
