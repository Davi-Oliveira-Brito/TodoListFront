"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { ApiError } from "@/services/api";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function RegisterForm() {
  const { registrar } = useAuth();
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErro(null);
    setEnviando(true);

    try {
      await registrar({ nome, email, senha });
      router.push("/tarefas");
    } catch (err) {
      setErro(err instanceof ApiError ? err.message : "Não foi possível cadastrar.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <h1 className="font-display text-2xl font-semibold text-slate-900">Criar conta</h1>

      <Input label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
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
        minLength={6}
      />

      {erro && <p className="text-sm text-red-600">{erro}</p>}

      <Button type="submit" disabled={enviando}>
        {enviando ? "Cadastrando..." : "Cadastrar"}
      </Button>

      <p className="text-sm text-slate-600">
        Já tem conta?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Entrar
        </Link>
      </p>
    </form>
  );
}
