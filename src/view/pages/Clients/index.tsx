import { LoaderCircle, SearchX } from "lucide-react";

import { Pagination } from "@/view/components/Pagination";

import { ClientsTable } from "./components/ClientsTable";
import { RegisterClientForm } from "./components/RegisterClientForm";
import { SearchClientForm } from "./components/SearchClientForm";
import { useClientsController } from "./useClientsController";

export function Clients() {
  const {
    clients,
    shouldShowClientData,
    shouldShowLoadingElement,
    shouldShowRegisterClientForm,
    shouldShowEmptyView,
    shouldShowPagination
  } = useClientsController();

  return (
    <main className="mx-auto mt-24 w-full max-w-7xl space-y-8 px-6">
      <h2 className="text-center text-4xl">Gerenciar clientes</h2>

      <div className="bg-primary-foreground w-full space-y-6 rounded-xl px-4 py-5">
        <SearchClientForm />

        {shouldShowLoadingElement && (
          <div className="flex h-80 items-center justify-center">
            <LoaderCircle className="size-6 animate-spin" />
          </div>
        )}

        {shouldShowEmptyView && (
          <div className="flex h-80 flex-col items-center justify-center gap-5 px-4 py-2">
            <SearchX className="text-muted-foreground size-16" />

            <div className="space-y-1">
              <h3 className="text-muted-foreground text-xl font-bold">
                Nenhum cliente ativo foi encontrado em nosso sistema.
              </h3>

              <p className="text-muted-foreground max-w-lg text-center text-sm">
                Você pode tentar buscar por <strong>CPF</strong> ou{" "}
                <span
                  role="button"
                  onClick={() => alert("FOI!")}
                  className="cursor-pointer underline"
                >
                  clicar aqui
                </span>{" "}
                para registrar um novo cliente.
              </p>
            </div>
          </div>
        )}

        {shouldShowRegisterClientForm && <RegisterClientForm />}

        {shouldShowClientData && <ClientsTable items={clients} />}

        {shouldShowPagination && <Pagination totalPages={10} />}
      </div>
    </main>
  );
}
