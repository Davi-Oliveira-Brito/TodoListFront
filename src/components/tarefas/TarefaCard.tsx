"use client";

import { Check, Pencil, Trash2 } from "lucide-react";
import type { Tarefa } from "@/types/tarefa";
import TipoTarefaBadge from "./TipoTarefaBadge";

interface TarefaCardProps {
  tarefa: Tarefa;
  onConcluir: (tarefa: Tarefa) => void;
  onEditar: (tarefa: Tarefa) => void;
  onExcluir: (tarefa: Tarefa) => void;
}

export default function TarefaCard({ tarefa, onConcluir, onEditar, onExcluir }: TarefaCardProps) {
  return (
    <li
      className={`flex flex-col gap-3 rounded-2xl bg-surface p-5 shadow-sm shadow-slate-200/60 transition-opacity ${
        tarefa.concluida ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <button
            onClick={() => onConcluir(tarefa)}
            aria-label={tarefa.concluida ? "Marcar como pendente" : "Concluir tarefa"}
            className={`mt-0.5 flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 transition-colors ${
              tarefa.concluida
                ? "border-primary bg-primary text-white hover:bg-primary/90"
                : "border-slate-300 text-transparent hover:border-primary"
            }`}
          >
            <Check size={13} strokeWidth={3} />
          </button>

          <div className="flex flex-col gap-1">
            <span
              className={`font-medium text-slate-900 ${tarefa.concluida ? "line-through" : ""}`}
            >
              {tarefa.titulo}
            </span>
            {tarefa.descricao && <p className="text-sm text-slate-500">{tarefa.descricao}</p>}
          </div>
        </div>

        <TipoTarefaBadge descricao={tarefa.tipoTarefaDescricao} />
      </div>

      <div className="flex justify-end gap-1 border-t border-slate-100 pt-3">
        <button
          onClick={() => onEditar(tarefa)}
          aria-label="Editar tarefa"
          className="cursor-pointer rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => onExcluir(tarefa)}
          aria-label="Excluir tarefa"
          className="cursor-pointer rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </li>
  );
}
