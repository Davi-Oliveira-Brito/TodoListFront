import type { Usuario } from "@/types/auth";

const CLAIM_ID = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
const CLAIM_NOME = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
const CLAIM_EMAIL = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";

interface JwtPayload {
  [CLAIM_ID]: string;
  [CLAIM_NOME]: string;
  [CLAIM_EMAIL]: string;
  exp: number;
}

function decodeJwtPayload(token: string): JwtPayload {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  const json = new TextDecoder("utf-8").decode(bytes);
  return JSON.parse(json);
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeJwtPayload(token);
  return Date.now() >= payload.exp * 1000;
}

export function usuarioFromToken(token: string): Usuario {
  const payload = decodeJwtPayload(token);
  return {
    id: payload[CLAIM_ID],
    nome: payload[CLAIM_NOME],
    email: payload[CLAIM_EMAIL],
  };
}
