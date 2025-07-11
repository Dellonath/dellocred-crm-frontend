import {
  InputMask as BaseInputMask,
  type Replacement
} from "@react-input/mask";
import { type ComponentProps, useId } from "react";
import { twMerge } from "tailwind-merge";

import { cn } from "@/app/lib/utils";

interface InputMaskProps extends ComponentProps<"input"> {
  label: string;
  mask: string;
  replacement: string | Replacement;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
}

export function InputMask({
  label,
  mask,
  replacement,
  defaultValue,
  error,
  className,
  containerClassName,
  labelClassName,
  ...props
}: InputMaskProps) {
  const id = useId();

  return (
    <div className={cn("w-full space-y-2", containerClassName)}>
      <div className="group relative w-full">
        <label
          htmlFor={id}
          className="origin-start text-muted-foreground/70 group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium"
        >
          <span
            className={twMerge(
              "bg-background inline-flex px-2",
              labelClassName
            )}
          >
            {label}
          </span>
        </label>

        <BaseInputMask
          id={id}
          mask={mask}
          replacement={replacement}
          defaultValue={defaultValue}
          autoComplete="off"
          placeholder=" "
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
          )}
          {...props}
        />
      </div>

      {!!error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}
