import axios from "axios";

type HTTP_METHOD = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";

interface API_OPTIONS<T> {
  method: HTTP_METHOD;
  headers?: Record<string, string>;
  body?: T;
  signal?: AbortSignal;
}

interface API_RESPONSE<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface API_ERROR {
  message: string;
  status: number;
}

export async function API<Req, Res = Req>(
  endpoint: string,
  options: API_OPTIONS<Req>
): Promise<API_RESPONSE<Res>> {
  try {
    const res = await axios(`${endpoint}`, {
      method: options.method,
      headers: {
        ...options.headers,
      },
      data: options.body,
      signal: options.signal,
    });
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    const err = error as API_ERROR;

    return {
      success: false,
      error: err.message,
    };
  }
}
