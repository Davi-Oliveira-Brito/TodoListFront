"use client";

import { useEffect, useState } from "react";
import * as tipoTarefaService from "@/services/tipoTarefaService";
import type { TipoTarefa } from "@/types/tarefa";

export function useTipoTarefas() {
  const [tipos, setTipos] = useState<TipoTarefa[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    tipoTarefaService.listar().then((dados) => {
      setTipos(dados);
      setCarregando(false);
    });
  }, []);

  return { tipos, carregando };
}
