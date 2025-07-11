import { type ComponentProps, useId } from "react";

import { cn } from "@/app/lib/utils";

import { Input as ShadcnInput } from "./ui/input";

interface InputProps extends ComponentProps<"input"> {
  label: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
}

export function Input({
  label,
  className,
  error,
  containerClassName,
  labelClassName,
  ...props
}: InputProps) {
  const id = useId();

  return (
    <div className={cn("w-full space-y-2", containerClassName)}>
      <div className="group relative w-full">
        <label
          htmlFor={id}
          className="origin-start text-muted-foreground/70 group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:text-foreground absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium"
        >
          <span
            className={cn("bg-background inline-flex px-2", labelClassName)}
          >
            {label}
          </span>
        </label>

        <ShadcnInput id={id} placeholder=" " className={className} {...props} />
      </div>

      {!!error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}
