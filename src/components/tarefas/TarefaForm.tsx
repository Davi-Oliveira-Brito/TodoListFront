"use client";

import { useState, type FormEvent } from "react";
import type { Tarefa, TarefaPayload } from "@/types/tarefa";
import { useTipoTarefas } from "@/hooks/useTipoTarefas";
import { ApiError } from "@/services/api";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

interface TarefaFormProps {
  tarefa?: Tarefa;
  onSubmit: (payload: TarefaPayload) => Promise<void>;
  onSuccess: () => void;
}

export default function TarefaForm({ tarefa, onSubmit, onSuccess }: TarefaFormProps) {
  const { tipos } = useTipoTarefas();
  const [titulo, setTitulo] = useState(tarefa?.titulo ?? "");
  const [descricao, setDescricao] = useState(tarefa?.descricao ?? "");
  const [tipoTarefaId, setTipoTarefaId] = useState(tarefa?.tipoTarefaId ?? 1);
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErro(null);
    setEnviando(true);

    try {
      await onSubmit({
        titulo,
        descricao,
        tipoTarefaId,
        concluida: tarefa?.concluida ?? false,
      });
      onSuccess();
    } catch (err) {
      setErro(err instanceof ApiError ? err.message : "Não foi possível salvar a tarefa.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input label="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
      <Input label="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
      <Select
        label="Tipo"
        value={tipoTarefaId}
        onChange={(e) => setTipoTarefaId(Number(e.target.value))}
        options={tipos.map((tipo) => ({ value: tipo.id, label: tipo.descricao }))}
      />

      {erro && <p className="text-sm text-red-600">{erro}</p>}

      <Button type="submit" disabled={enviando} className="mt-2">
        {enviando ? "Salvando..." : "Salvar"}
      </Button>
    </form>
  );
}
