export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="w-full max-w-sm rounded-2xl bg-surface p-8 shadow-sm shadow-slate-200/60">
        {children}
      </div>
    </div>
  );
}
