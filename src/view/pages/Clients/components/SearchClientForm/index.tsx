import { X } from "lucide-react";

import { InputMask } from "@/view/components/InputMask";
import { Button } from "@/view/components/ui/button";

import { useSearchClientFormController } from "./useSearchClientFormController";

interface SearchClientFormProps {
  onSearch: () => void;
  onClear: () => void;
}

export function SearchClientForm({ onSearch, onClear }: SearchClientFormProps) {
  const {
    register,
    handleSubmit,
    handleClearSearch,
    errors,
    isSubmitting,
    shouldShowClearButton
  } = useSearchClientFormController({
    onSearch,
    onClear
  });

  return (
    <form onSubmit={handleSubmit} className="relative flex gap-2">
      <InputMask
        label="Digite o CPF do cliente"
        mask="DDD.DDD.DDD-DD"
        replacement={{
          D: /\d/
        }}
        error={errors.govId?.message}
        labelClassName="bg-primary-foreground"
        {...register("govId")}
      />

      {shouldShowClearButton && (
        <Button
          type="button"
          variant="ghost"
          onClick={handleClearSearch}
          className="hover:bg-primary-foreground absolute top-1.5 right-21 h-6"
        >
          <X className="size-4" />
        </Button>
      )}

      <Button type="submit" disabled={isSubmitting}>
        Buscar
      </Button>
    </form>
  );
}
