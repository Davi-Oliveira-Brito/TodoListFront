"use client";

import { createContext, useSyncExternalStore, type ReactNode } from "react";
import type { Login, Register, Usuario } from "@/types/auth";
import { login as loginRequest, register as registerRequest } from "@/services/authService";
import { isTokenExpired, usuarioFromToken } from "@/lib/jwt";
import { deleteClientCookie, getClientCookie, setClientCookie } from "@/lib/cookies";
import { AUTH_TOKEN_COOKIE } from "@/lib/constants";

const TOKEN_MAX_AGE_SECONDS = 60 * 60 * 8;

type Listener = () => void;
const listeners = new Set<Listener>();

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  listeners.forEach((listener) => listener());
}

let cachedToken: string | null = null;
let cachedUsuario: Usuario | null = null;

function getSnapshot(): Usuario | null {
  const token = getClientCookie(AUTH_TOKEN_COOKIE);

  if (token === cachedToken) {
    return cachedUsuario;
  }

  if (!token) {
    cachedToken = null;
    cachedUsuario = null;
    return null;
  }

  if (isTokenExpired(token)) {
    deleteClientCookie(AUTH_TOKEN_COOKIE);
    cachedToken = null;
    cachedUsuario = null;
    return null;
  }

  cachedToken = token;
  cachedUsuario = usuarioFromToken(token);
  return cachedUsuario;
}

function getServerSnapshot(): Usuario | null {
  return null;
}

interface AuthContextValue {
  usuario: Usuario | null;
  login: (payload: Login) => Promise<void>;
  registrar: (payload: Register) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const usuario = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  async function login(payload: Login) {
    const { token } = await loginRequest(payload);
    setClientCookie(AUTH_TOKEN_COOKIE, token, TOKEN_MAX_AGE_SECONDS);
    notify();
  }

  async function registrar(payload: Register) {
    const { token } = await registerRequest(payload);
    setClientCookie(AUTH_TOKEN_COOKIE, token, TOKEN_MAX_AGE_SECONDS);
    notify();
  }

  function logout() {
    deleteClientCookie(AUTH_TOKEN_COOKIE);
    notify();
  }

  return (
    <AuthContext.Provider value={{ usuario, login, registrar, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
