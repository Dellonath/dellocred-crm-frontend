import type { Client } from "@/app/entities/Client";

import { ClientsTable } from "./components/ClientsTable";
import { SearchClientForm } from "./components/SearchClientForm";

const items: Client[] = Array.from({ length: 15 }, (_, i) => ({
  id: i.toString(),
  cpf: `000.000.000-0${i + 1}`.padStart(14, "0"),
  name: `Cliente ${i + 1}`,
  email: `cliente${i + 1}@exemplo.com`,
  phone: `(11) 90000-00${(i + 1).toString().padStart(2, "0")}`,
  gender: i % 2 === 0 ? "M" : "F",
  address: `Rua Exemplo, ${i + 1}`,
  status: i % 3 === 0 ? "Inactive" : "Active"
}));

export function Clients() {
  return (
    <main className="mx-auto mt-24 w-7xl space-y-8">
      <h2 className="text-center text-4xl">Gerenciar clientes</h2>

      <div className="bg-primary-foreground w-full space-y-4 rounded-xl px-4 py-5">
        <SearchClientForm />

        <ClientsTable items={items} />
      </div>
    </main>
  );
}
