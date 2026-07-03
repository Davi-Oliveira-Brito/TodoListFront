export interface TipoTarefa {
  id: number; // 1 = Normal, 2 = Urgente
  nome: string;
}

export interface Tarefa {
  id: number;
  titulo: string;
  descricao?: string;
  concluida: boolean;
  tipoTarefaId: number;
  tipoTarefa?: TipoTarefa;
}

export interface TarefaPayload {
  titulo: string;
  descricao?: string;
  concluida: boolean;
  tipoTarefaId: number;
}
