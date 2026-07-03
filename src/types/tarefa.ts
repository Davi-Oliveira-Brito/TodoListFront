export interface TipoTarefa {
  id: number;
  descricao: string;
  dataInclusao: string;
}

export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  concluida: boolean;
  dataInclusao: string;
  tipoTarefaId: number;
  tipoTarefaDescricao: string;
}

export interface TarefaPayload {
  titulo: string;
  descricao: string;
  tipoTarefaId: number;
  concluida: boolean;
}
