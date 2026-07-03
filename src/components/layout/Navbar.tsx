"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { usuario, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-surface px-6 py-4 sm:px-10">
      <span className="font-display text-lg font-semibold text-slate-900">TodoList</span>
      {usuario && (
        <div className="flex items-center gap-4 text-sm">
          <span className="text-slate-600">{usuario.nome}</span>
          <button
            onClick={handleLogout}
            className="flex cursor-pointer items-center gap-1.5 font-medium text-slate-500 transition-colors hover:text-primary"
          >
            <LogOut size={15} />
            Sair
          </button>
        </div>
      )}
    </header>
  );
}
