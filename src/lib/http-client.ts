type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  cookie?: string;
  params?: Record<string, string | number | boolean | undefined | null>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

function buildUrlWithParams(
  url: string,
  params?: RequestOptions["params"]
): string {
  if (!params) return url;
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null
    )
  );
  if (Object.keys(filteredParams).length === 0) return url;
  const queryString = new URLSearchParams(
    filteredParams as Record<string, string>
  ).toString();
  return `${url}?${queryString}`;
}

async function fetchApi<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T | null> {
  const {
    method = "GET",
    headers = {},
    body,
    params,
    cache = "no-store",
    next,
  } = options;

  const fullUrl = buildUrlWithParams(`${url}`, params);

  try {
    const response = await fetch(fullUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
      cache,
      next,
    });

    if (!response.ok) {
      let errorMessage = response.statusText;

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        try {
          const textError = await response.text();
          if (textError) errorMessage = textError;
        } catch {}
      }

      const error = new Error(
        `API Error (${response.status}): ${errorMessage}`
      );

      throw error;
    }

    try {
      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.startsWith("API Error")) {
        throw error;
      }

      const networkError = new Error(
        `Network Error: Failed to connect to ${fullUrl}. ${error.message}`
      );

      throw networkError;
    }

    throw error;
  }
}

export const api = {
  get<T>(url: string, options?: RequestOptions): Promise<T | null> {
    return fetchApi<T>(url, { ...options, method: "GET" });
  },
  post<T>(
    url: string,
    body?: any,
    options?: RequestOptions
  ): Promise<T | null> {
    return fetchApi<T>(url, { ...options, method: "POST", body });
  },
  put<T>(url: string, body?: any, options?: RequestOptions): Promise<T | null> {
    return fetchApi<T>(url, { ...options, method: "PUT", body });
  },
  patch<T>(
    url: string,
    body?: any,
    options?: RequestOptions
  ): Promise<T | null> {
    return fetchApi<T>(url, { ...options, method: "PATCH", body });
  },
  delete<T>(url: string, options?: RequestOptions): Promise<T | null> {
    return fetchApi<T>(url, { ...options, method: "DELETE" });
  },
};
