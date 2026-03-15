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

type ApiErrorResponse = {
  code?: string;
  message?: string;
  activationLink?: string;
};

type ApiMessageResponse = {
  code?: string;
  message?: string;
};

type ApiError = Error & {
  code?: string;
  activationLink?: string | undefined;
};

const isLocalhost =
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

const API_BASE_URL = isLocalhost ? 'http://localhost:3000' : 'https://filmovie-server.onrender.com';
const TOKEN_KEY = 'filmovie_server_token';

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
    let errorPayload: ApiErrorResponse | null = null;

    try {
      errorPayload = (await response.json()) as ApiErrorResponse;
    } catch {
      errorPayload = null;
    }

    const error = new Error(errorPayload?.code ?? `LOGIN_${response.status}`) as ApiError;
    error.code = errorPayload?.code ?? `LOGIN_${response.status}`;

    if (errorPayload?.activationLink) {
      error.activationLink = errorPayload.activationLink;
    }

    throw error;
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

export async function registerUser(login: string, password: string, email: string) {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password, email }),
  });

  if (!response.ok) {
    let errorPayload: ApiErrorResponse | null = null;

    try {
      errorPayload = (await response.json()) as ApiErrorResponse;
    } catch {
      errorPayload = null;
    }

    throw new Error(errorPayload?.code ?? `REGISTER_${response.status}`);
  }

  return (await response.json()) as LoginResponse;
}

export async function forgotPassword(email: string) {
  const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    let errorPayload: ApiErrorResponse | null = null;

    try {
      errorPayload = (await response.json()) as ApiErrorResponse;
    } catch {
      errorPayload = null;
    }

    throw new Error(errorPayload?.code ?? `REGISTER_${response.status}`);
  }

  return (await response.json()) as ApiMessageResponse;
}

export async function resetPassword(token: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password }),
  });

  if (!response.ok) {
    let errorPayload: ApiErrorResponse | null = null;

    try {
      errorPayload = (await response.json()) as ApiErrorResponse;
    } catch {
      errorPayload = null;
    }

    throw new Error(errorPayload?.code ?? `RESET_PASSWORD_${response.status}`);
  }

  return (await response.json()) as ApiMessageResponse;
}
