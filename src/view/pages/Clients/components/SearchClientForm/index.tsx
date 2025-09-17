import { X } from "lucide-react";

import type { Client } from "@/app/entities/Client";
import { InputMask } from "@/view/components/InputMask";
import { Button } from "@/view/components/ui/button";

import { useSearchClientFormController } from "./useSearchClientFormController";

interface SearchClientFormProps {
  onClear: () => void;
  onClientFound: (client: Client) => void;
  onClientNotFound: () => void;
}

export function SearchClientForm({
  onClear,
  onClientFound,
  onClientNotFound
}: SearchClientFormProps) {
  const {
    register,
    handleSubmit,
    handleClearSearch,
    errors,
    isSearching,
    searchError,
    shouldShowClearButton
  } = useSearchClientFormController({
    onClear,
    onClientFound,
    onClientNotFound
  });

  return (
    <div>
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

        <Button type="submit" disabled={isSearching}>
          {isSearching ? "Buscando..." : "Buscar"}
        </Button>
      </form>

      {searchError && (
        <p className="mt-2 text-sm text-red-500">{searchError}</p>
      )}
    </div>
  );
}
