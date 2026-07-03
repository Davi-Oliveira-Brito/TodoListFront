"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { ApiError } from "@/services/api";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErro(null);
    setEnviando(true);

    try {
      await login({ email, senha });
      router.push("/tarefas");
    } catch (err) {
      setErro(err instanceof ApiError ? err.message : "Não foi possível entrar.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <h1 className="font-display text-2xl font-semibold text-slate-900">Entrar</h1>

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="Senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />

      {erro && <p className="text-sm text-red-600">{erro}</p>}

      <Button type="submit" disabled={enviando}>
        {enviando ? "Entrando..." : "Entrar"}
      </Button>

      <p className="text-sm text-slate-600">
        Não tem conta?{" "}
        <Link href="/register" className="font-medium text-primary hover:underline">
          Cadastre-se
        </Link>
      </p>
    </form>
  );
}
