"use client";

import Modal from "@/components/ui/Modal";
import TarefaForm from "./TarefaForm";
import type { Tarefa, TarefaPayload } from "@/types/tarefa";

interface TarefaFormModalProps {
  tarefa?: Tarefa;
  onClose: () => void;
  onSubmit: (payload: TarefaPayload) => Promise<void>;
}

export default function TarefaFormModal({ tarefa, onClose, onSubmit }: TarefaFormModalProps) {
  return (
    <Modal title={tarefa ? "Editar tarefa" : "Nova tarefa"} onClose={onClose}>
      <TarefaForm tarefa={tarefa} onSubmit={onSubmit} onSuccess={onClose} />
    </Modal>
  );
}
