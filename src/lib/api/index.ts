import { PUBLIC_BACKEND_URL } from '$env/static/public';

async function api<T>(
  customFetch: typeof fetch,
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${PUBLIC_BACKEND_URL}${endpoint}`;

  const response = await customFetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    credentials: 'include',
    ...options
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `API Error: ${response.status}`);
  }

  return response.status === 204 ? ({} as T) : response.json();
}

export async function get<T>(customFetch: typeof fetch, endpoint: string): Promise<T> {
  return api<T>(customFetch, endpoint, { method: 'GET' });
}

export async function post<T>(customFetch: typeof fetch, endpoint: string, body: any): Promise<T> {
  return api<T>(customFetch, endpoint, { method: 'POST', body: JSON.stringify(body) });
}

export async function put<T>(customFetch: typeof fetch, endpoint: string, body: any): Promise<T> {
  return api<T>(customFetch, endpoint, { method: 'PUT', body: JSON.stringify(body) });
}

export async function del<T>(customFetch: typeof fetch, endpoint: string): Promise<T> {
  return api<T>(customFetch, endpoint, { method: 'DELETE' });
}
