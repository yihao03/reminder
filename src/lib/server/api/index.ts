import { BACKEND_URL, BACKEND_API_ROUTE } from '$env/static/private';
import { error } from '@sveltejs/kit';
import { getResponseMessages } from './utils';

export interface StatusMessage {
  content: string;
  type: StatusMessageType;
}

export enum StatusMessageType {
  ERROR = 1,
  WARNING = 2,
  INFORMATION = 3,
  SUCCESS = 4,
}

/**
 * Describes the shape of the JSON response from API endpoints.
 */
export interface ApiResponse<D> {
  data: D;
  messages: StatusMessage[];
}

const DEFAULT_API_RESPONSE: ApiResponse<any> = Object.freeze({
  data: {},
  messages: [
    {
      content: "Request failed. Please check your Internet connection.",
      type: StatusMessageType.ERROR,
    },
  ],
});


async function api<T>(
  customFetch: typeof fetch,
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${BACKEND_URL}${BACKEND_API_ROUTE}${endpoint}`;

  try {
    const response = await customFetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      credentials: 'include',
      ...options
    });

    let resData: ApiResponse<T>
    try {
      resData = await response.json();
    } catch (error) {
      console.error(`[API] Failed to parse JSON response from ${endpoint}:`, error);
      return DEFAULT_API_RESPONSE;
    }

    if (!response.ok) {
      console.error(
        `[API] ${response.status} ${endpoint} : ${getResponseMessages(resData)}`,
      );
      error(response.status)
    }

    return response.status === 204
      ? { data: {} as T, messages: [] }
      : resData;
  } catch (error) {
    console.error(`[API] Network error for ${endpoint}:`, error);
    throw error;
  }
}

export async function get<T>(customFetch: typeof fetch, endpoint: string): Promise<ApiResponse<T>> {
  return api<T>(customFetch, endpoint, { method: 'GET' });
}

export async function post<T>(customFetch: typeof fetch, endpoint: string, body: any): Promise<ApiResponse<T>> {
  return api<T>(customFetch, endpoint, { method: 'POST', body: JSON.stringify(body) });
}

export async function put<T>(customFetch: typeof fetch, endpoint: string, body: any): Promise<ApiResponse<T>> {
  return api<T>(customFetch, endpoint, { method: 'PUT', body: JSON.stringify(body) });
}

export async function del<T>(customFetch: typeof fetch, endpoint: string): Promise<ApiResponse<T>> {
  return api<T>(customFetch, endpoint, { method: 'DELETE' });
}
