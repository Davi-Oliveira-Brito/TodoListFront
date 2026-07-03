import { apiFetch } from "./api";
import type { AuthResponse, Login, Register } from "@/types/auth";

export function register(payload: Register): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/api/Auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
    auth: false,
  });
}

export function login(payload: Login): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/api/Auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
    auth: false,
  });
}
