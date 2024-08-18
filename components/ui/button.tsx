import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react'

interface ButtonProps {
  label: ReactNode | string;
  secondary?: boolean;
  fullwidth?: boolean;
  large?: boolean;
  disabled?: boolean;
  outline?: boolean;
  onClick?: () => void;
  className?: string,
  border?: boolean
}

const Button = ({
  label,
  secondary,
  fullwidth,
  large,
  disabled,
  outline,
  onClick,
  className,
  border
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "bg-white rounded-full font-semibold transition hover:opacity-80 disabled:opacity-70 disabled:cursor-not-allowed",
        fullwidth ? "w-full" : "w-fit",
        secondary ? "bg-white text-black" : "bg-sky-500 text-white",
        large ? "text-xl px-5 py-3" : "text-md px-4 py-4",
        outline
          ? "bg-transparent border-slate-600 text-sky-500 hover:bg-slate-800/40"
          : "",
        border ? "border" : "",
        className
      )}
    >
      {label}
    </button >
  )
}

export default Button