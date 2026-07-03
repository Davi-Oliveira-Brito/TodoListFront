import { apiFetch } from "./api";
import type { Tarefa, TarefaPayload } from "@/types/tarefa";

export function listar(): Promise<Tarefa[]> {
  return apiFetch<Tarefa[]>("/api/Tarefas");
}

export function buscarPorId(id: number): Promise<Tarefa> {
  return apiFetch<Tarefa>(`/api/Tarefas/${id}`);
}

export function criar(payload: TarefaPayload): Promise<Tarefa> {
  return apiFetch<Tarefa>("/api/Tarefas", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function atualizar(id: number, payload: TarefaPayload): Promise<Tarefa> {
  return apiFetch<Tarefa>(`/api/Tarefas/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function remover(id: number): Promise<void> {
  return apiFetch<void>(`/api/Tarefas/${id}`, { method: "DELETE" });
}
