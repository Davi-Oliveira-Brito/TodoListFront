export interface Register {
  nome: string;
  email: string;
  senha: string;
}

export interface Login {
  email: string;
  senha: string;
}

export interface AuthResponse {
  token: string;
  nome: string;
  email: string;
}

export interface AuthErrorResponse {
  mensagem: string;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
}
