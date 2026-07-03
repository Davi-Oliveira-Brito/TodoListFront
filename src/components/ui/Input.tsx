import { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, id, className, ...rest }: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={inputId}
        {...rest}
        className={`rounded-xl border border-slate-200 bg-surface px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-shadow placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 ${className ?? ""}`}
      />
    </div>
  );
}
