import type { Tarefa } from "@/types/tarefa";
import TarefaCard from "./TarefaCard";

interface TarefaListProps {
  tarefas: Tarefa[];
  onConcluir: (tarefa: Tarefa) => void;
  onEditar: (tarefa: Tarefa) => void;
  onExcluir: (tarefa: Tarefa) => void;
}

export default function TarefaList({ tarefas, onConcluir, onEditar, onExcluir }: TarefaListProps) {
  if (tarefas.length === 0) {
    return <p className="text-slate-500">Nenhuma tarefa ainda.</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tarefas.map((tarefa) => (
        <TarefaCard
          key={tarefa.id}
          tarefa={tarefa}
          onConcluir={onConcluir}
          onEditar={onEditar}
          onExcluir={onExcluir}
        />
      ))}
    </ul>
  );
}
