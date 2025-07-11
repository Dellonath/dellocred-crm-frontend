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
  containerClassName?: string;
  labelClassName?: string;
}

export function Select({
  label,
  options,
  containerClassName,
  labelClassName
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

      <ShadcnSelect>
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder="Selecione uma opção" />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectContent>
      </ShadcnSelect>
    </div>
  );
}
