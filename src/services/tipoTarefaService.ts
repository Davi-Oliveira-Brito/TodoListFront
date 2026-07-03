import { apiFetch } from "./api";
import type { TipoTarefa } from "@/types/tarefa";

export function listar(): Promise<TipoTarefa[]> {
  return apiFetch<TipoTarefa[]>("/api/TipoTarefas", { auth: false });
}

export function buscarPorId(id: number): Promise<TipoTarefa> {
  return apiFetch<TipoTarefa>(`/api/TipoTarefas/${id}`, { auth: false });
}
