import { InputMask } from "@/view/components/InputMask";
import { Button } from "@/view/components/ui/button";

import { useSearchClientFormController } from "./useSearchClientFormController";

interface SearchClientFormProps {
  onSearch: () => void;
}

export function SearchClientForm({ onSearch }: SearchClientFormProps) {
  const { register, handleSubmit, errors, isSubmitting } =
    useSearchClientFormController({
      onSearch
    });

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
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

      <Button type="submit" disabled={isSubmitting}>
        Buscar
      </Button>
    </form>
  );
}
