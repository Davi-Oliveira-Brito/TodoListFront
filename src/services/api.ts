import { API_BASE_URL, AUTH_TOKEN_COOKIE } from "@/lib/constants";
import { getClientCookie } from "@/lib/cookies";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

interface ApiFetchOptions extends RequestInit {
  auth?: boolean;
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const { auth = true, headers, ...rest } = options;

  const finalHeaders = new Headers(headers);
  if (rest.body) finalHeaders.set("Content-Type", "application/json");

  if (auth) {
    const token = getClientCookie(AUTH_TOKEN_COOKIE);
    if (token) finalHeaders.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${API_BASE_URL}${path}`, { ...rest, headers: finalHeaders });

  if (res.status === 204) return undefined as T;

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const body = isJson ? await res.json() : undefined;

  if (!res.ok) {
    const message = body?.mensagem ?? `Erro ${res.status}`;
    throw new ApiError(res.status, message);
  }

  return body as T;
}
