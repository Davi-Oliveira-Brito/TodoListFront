"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Check, ChevronDown } from "lucide-react";

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  label: string;
  id?: string;
  className?: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
}

export default function Select({ label, options, id, className, value, onChange }: SelectProps) {
  const selectId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((option) => String(option.value) === String(value));

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  function selectOption(optionValue: string | number) {
    setOpen(false);
    onChange({ target: { value: String(optionValue) } } as ChangeEvent<HTMLSelectElement>);
  }

  return (
    <div className="flex flex-col gap-1.5" ref={containerRef}>
      <label id={`${selectId}-label`} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          id={selectId}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={`${selectId}-label`}
          onClick={() => setOpen((prev) => !prev)}
          className={`flex w-full items-center justify-between rounded-xl border border-slate-200 bg-surface px-3.5 py-2.5 text-left text-sm text-slate-900 outline-none transition-shadow cursor-pointer hover:border-slate-300 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 ${className ?? ""}`}
        >
          <span>{selected?.label ?? ""}</span>
          <ChevronDown
            className={`size-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <ul
            role="listbox"
            aria-labelledby={`${selectId}-label`}
            className="absolute z-10 mt-1.5 w-full overflow-hidden rounded-xl border border-slate-200 bg-surface py-1 shadow-lg shadow-slate-900/5"
          >
            {options.map((option) => {
              const isSelected = String(option.value) === String(value);
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => selectOption(option.value)}
                    className={`flex w-full items-center justify-between px-3.5 py-2 text-left text-sm transition-colors cursor-pointer hover:bg-slate-50 ${
                      isSelected ? "text-primary font-medium" : "text-slate-700"
                    }`}
                  >
                    {option.label}
                    {isSelected && <Check className="size-4" />}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
