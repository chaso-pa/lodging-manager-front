const getApiBaseUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error('Missing NEXT_PUBLIC_API_BASE_URL');
  }

  return baseUrl.replace(/\/+$/, '');
};

const buildHeaders = (token?: string, initHeaders?: HeadersInit) => {
  const headers = new Headers(initHeaders ?? {});

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
};

export const apiFetch = async <T>(path: string, options: RequestInit = {}, token?: string): Promise<T> => {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;

  const headers = buildHeaders(token, options.headers);
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url, {
    ...options,
    headers,
    cache: 'no-store'
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`
    );
  }

  return (await response.json()) as T;
};
