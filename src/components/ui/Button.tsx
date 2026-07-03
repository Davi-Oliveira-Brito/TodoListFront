import { type ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
};

const VARIANTS: Record<string, string> = {
  primary: "bg-primary text-white hover:bg-primary/90 focus-visible:ring-primary/30",
  ghost: "bg-transparent text-slate-600 hover:bg-slate-100 focus-visible:ring-slate-300",
  danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-300",
};

export default function Button({ className, variant = "primary", ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${className ?? ""}`}
    />
  );
}
