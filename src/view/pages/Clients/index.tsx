import { Pagination } from "@/view/components/Pagination";

import { ClientsTable } from "./components/ClientsTable";
import { SearchClientForm } from "./components/SearchClientForm";
import { useClientsController } from "./useClientsController";

export function Clients() {
  const { activeClients } = useClientsController();

  return (
    <main className="mx-auto mt-24 w-full max-w-7xl space-y-8 px-6">
      <h2 className="text-center text-4xl">Gerenciar clientes</h2>

      <div className="bg-primary-foreground w-full space-y-4 rounded-xl px-4 py-5">
        <SearchClientForm />

        <ClientsTable items={activeClients} />

        <Pagination totalPages={10} />
      </div>
    </main>
  );
}
