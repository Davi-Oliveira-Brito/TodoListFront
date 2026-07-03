import type { TipoTarefa } from "@/types/tarefa";

interface TipoTarefaBadgeProps {
  descricao: TipoTarefa["descricao"];
}

const CORES: Record<string, string> = {
  Urgente: "bg-red-50 text-red-600",
  Normal: "bg-primary/10 text-primary",
};

export default function TipoTarefaBadge({ descricao }: TipoTarefaBadgeProps) {
  const classes = CORES[descricao] ?? CORES.Normal;

  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${classes}`}>{descricao}</span>
  );
}
