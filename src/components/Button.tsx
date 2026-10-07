import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const VARIANTS: Record<Variant, string> = {
  primary: "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700",
  secondary: "bg-white text-slate-700 ring-1 ring-inset ring-slate-300 hover:bg-slate-50",
  danger: "bg-red-600 text-white shadow-sm hover:bg-red-700",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
};

function Button({ variant = "primary", type = "button", className = "", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-11 items-center whitespace-nowrap justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  );
}

export default Button;
