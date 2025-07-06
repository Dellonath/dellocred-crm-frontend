import { InputMask } from "@/view/components/InputMask";
import { Button } from "@/view/components/ui/button";

export function SearchClientForm() {
  return (
    <form className="flex gap-2">
      <InputMask
        label="Digite o CPF do cliente"
        mask="999.999.999-99"
        replacement={{
          9: /\d/
        }}
        labelClassName="bg-primary-foreground"
      />

      <Button type="submit">Buscar</Button>
    </form>
  );
}
