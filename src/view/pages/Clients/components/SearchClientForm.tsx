import { Input } from "@/view/components/Input";
import { Button } from "@/view/components/ui/button";

export function SearchClientForm() {
  return (
    <form className="flex gap-2">
      <Input
        label="Digite o CPF do cliente"
        labelClassName="bg-primary-foreground"
      />

      <Button type="submit">Buscar</Button>
    </form>
  );
}
