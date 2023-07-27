import React, { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from "../utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  errorMessage,
  ...props
}, ref) => {
  return (
    <div className="flex flex-col gap-[2px]">
      <input
        ref={ref}
        {...props}
        className={cn(
          "border rounded-md border-slate-300 outline-none px-3 py-2 leading-4 text-xs",
          !!errorMessage && 'border-red-600'
        )}
      />
      {!!errorMessage && (
        <div className="text-red-600 text-xs">{errorMessage}</div>
      )}
    </div>
  )
});
