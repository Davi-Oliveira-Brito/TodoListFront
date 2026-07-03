import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-24 text-center">
      <div className="flex flex-col gap-4">
        <h1 className="font-display text-4xl font-semibold text-slate-900 sm:text-5xl">
          Organize suas tarefas com clareza
        </h1>
        <p className="mx-auto max-w-md text-slate-600">
          Um jeito simples de acompanhar o que precisa ser feito, priorizar o que é urgente e
          nunca perder nada de vista.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/login">
          <Button>Entrar</Button>
        </Link>
        <Link href="/register">
          <Button variant="ghost">Criar conta</Button>
        </Link>
      </div>
    </main>
  );
}
