import { useId } from "react";
import { twMerge } from "tailwind-merge";

import { cn } from "@/app/lib/utils";

import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";

interface SelectProps {
  label: string;
  options: {
    label: string;
    value: string;
  }[];
  defaultValue?: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  onValueChange?: (value: string) => void;
}

export function Select({
  label,
  options,
  defaultValue,
  error,
  containerClassName,
  labelClassName,
  onValueChange
}: SelectProps) {
  const id = useId();

  return (
    <div className={cn("group relative w-full", containerClassName)}>
      <label
        htmlFor={id}
        className={twMerge(
          "bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50",
          labelClassName
        )}
      >
        {label}
      </label>

      <ShadcnSelect defaultValue={defaultValue} onValueChange={onValueChange}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder="Selecione uma opção" />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadcnSelect>

      {!!error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}
