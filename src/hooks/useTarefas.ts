"use client";

import { useEffect, useState } from "react";
import * as tarefaService from "@/services/tarefaService";
import { ApiError } from "@/services/api";
import type { Tarefa } from "@/types/tarefa";

export function useTarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [versao, setVersao] = useState(0);

  useEffect(() => {
    tarefaService
      .listar()
      .then((dados) => {
        setTarefas(dados);
        setCarregando(false);
      })
      .catch((err) => {
        setErro(err instanceof ApiError ? err.message : "Não foi possível carregar as tarefas.");
        setCarregando(false);
      });
  }, [versao]);

  function recarregar() {
    setVersao((v) => v + 1);
  }

  async function remover(id: number) {
    try {
      await tarefaService.remover(id);
      recarregar();
    } catch (err) {
      setErro(err instanceof ApiError ? err.message : "Não foi possível remover a tarefa.");
    }
  }

  async function definirConcluida(tarefa: Tarefa, concluida: boolean) {
    await tarefaService.atualizar(tarefa.id, {
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      tipoTarefaId: tarefa.tipoTarefaId,
      concluida,
    });
    recarregar();
  }

  return { tarefas, carregando, erro, remover, definirConcluida, recarregar };
}
