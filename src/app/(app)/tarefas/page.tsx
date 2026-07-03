"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useTarefas } from "@/hooks/useTarefas";
import TarefaList from "@/components/tarefas/TarefaList";
import TarefaFormModal from "@/components/tarefas/TarefaFormModal";
import ConfirmModal from "@/components/ui/ConfirmModal";
import Button from "@/components/ui/Button";
import * as tarefaService from "@/services/tarefaService";
import type { Tarefa, TarefaPayload } from "@/types/tarefa";

export default function TarefasPage() {
  const { tarefas, carregando, erro, remover, definirConcluida, recarregar } = useTarefas();
  const [criando, setCriando] = useState(false);
  const [editando, setEditando] = useState<Tarefa | null>(null);
  const [excluindo, setExcluindo] = useState<Tarefa | null>(null);

  async function handleConcluir(tarefa: Tarefa) {
    const novoValor = !tarefa.concluida;
    await definirConcluida(tarefa, novoValor);

    if (novoValor) {
      toast("Tarefa concluída", {
        description: tarefa.titulo,
        action: {
          label: "Desfazer",
          onClick: () => definirConcluida(tarefa, false),
        },
      });
    }
  }

  async function handleExcluirConfirmado() {
    if (!excluindo) return;
    await remover(excluindo.id);
    setExcluindo(null);
    toast("Tarefa removida");
  }

  async function criar(payload: TarefaPayload) {
    await tarefaService.criar(payload);
    recarregar();
  }

  async function editar(payload: TarefaPayload) {
    if (!editando) return;
    await tarefaService.atualizar(editando.id, payload);
    recarregar();
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold text-slate-900">Tarefas</h1>
        <Button onClick={() => setCriando(true)} className="flex items-center gap-2">
          <Plus size={16} />
          Nova tarefa
        </Button>
      </div>

      {carregando && <p className="text-slate-500">Carregando tarefas...</p>}
      {erro && <p className="text-red-600">{erro}</p>}

      {!carregando && !erro && (
        <TarefaList
          tarefas={tarefas}
          onConcluir={handleConcluir}
          onEditar={setEditando}
          onExcluir={setExcluindo}
        />
      )}

      {criando && <TarefaFormModal onClose={() => setCriando(false)} onSubmit={criar} />}

      {editando && (
        <TarefaFormModal tarefa={editando} onClose={() => setEditando(null)} onSubmit={editar} />
      )}

      {excluindo && (
        <ConfirmModal
          title="Excluir tarefa"
          message={`Tem certeza que quer excluir "${excluindo.titulo}"? Essa ação não pode ser desfeita.`}
          confirmLabel="Excluir"
          destructive
          onConfirm={handleExcluirConfirmado}
          onClose={() => setExcluindo(null)}
        />
      )}
    </div>
  );
}
