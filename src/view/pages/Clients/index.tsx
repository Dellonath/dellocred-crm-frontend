import { LoaderCircle, SearchX } from "lucide-react";
import { useEffect } from "react";

import { formatGovId } from "@/app/utils/formatGovId";
import { Pagination } from "@/view/components/Pagination";

import { ClientsTable } from "./components/ClientsTable";
import { RegisterClientForm } from "./components/RegisterClientForm";
import { SearchClientForm } from "./components/SearchClientForm";
import { useClientsController } from "./useClientsController";

export function Clients() {
  const {
    clients,
    searchedClient,
    clientNotFound,
    shouldShowClientData,
    shouldShowLoadingElement,
    shouldShowRegisterClientForm,
    shouldShowPagination,
    handleOpenRegisterClientForm,
    handleCloseRegisterClientForm,
    handleClientFound,
    handleClientNotFound
  } = useClientsController();

  useEffect(() => {
    console.log(clients);
  }, [clients]);

  const mainContent = () => {
    if (searchedClient) {
      return (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <h3 className="mb-2 font-semibold text-green-800">
            Cliente encontrado:
          </h3>
          <div className="text-green-700">
            <p>
              <strong>Nome:</strong> {searchedClient.firstName}{" "}
              {searchedClient.lastName}
            </p>
            <p>
              <strong>CPF:</strong> {formatGovId(searchedClient.govId)}
            </p>
            <p>
              <strong>Email:</strong> {searchedClient.email}
            </p>
            <p>
              <strong>Telefone:</strong> {searchedClient.phoneNumber}
            </p>
          </div>
        </div>
      );
    }

    if (clientNotFound) {
      return (
        <div className="flex h-80 flex-col items-center justify-center gap-5 px-4 py-2">
          <SearchX className="text-muted-foreground size-16" />
          <div className="space-y-1">
            <h3 className="text-muted-foreground text-xl font-bold">
              Cliente não encontrado em nosso sistema.
            </h3>
            <p className="text-muted-foreground max-w-lg text-center text-sm">
              Você pode{" "}
              <span
                role="button"
                onClick={handleOpenRegisterClientForm}
                className="cursor-pointer underline"
              >
                clicar aqui
              </span>{" "}
              para registrar um novo cliente.
            </p>
          </div>
        </div>
      );
    }

    if (shouldShowClientData) {
      return <ClientsTable clients={clients} />;
    }

    if (shouldShowPagination) {
      return <Pagination totalPages={10} />;
    }

    return null;
  };

  return (
    <main className="mx-auto mt-24 w-full max-w-7xl space-y-8 px-6">
      <h2 className="text-center text-4xl">Gerenciar clientes</h2>

      <div className="bg-primary-foreground w-full space-y-6 rounded-xl px-4 py-5">
        <SearchClientForm
          onClear={handleCloseRegisterClientForm}
          onClientFound={handleClientFound}
          onClientNotFound={handleClientNotFound}
        />

        {shouldShowLoadingElement && (
          <div className="flex h-80 items-center justify-center">
            <LoaderCircle className="size-6 animate-spin" />
          </div>
        )}

        {shouldShowRegisterClientForm && (
          <RegisterClientForm
            handleCloseRegisterClientForm={handleCloseRegisterClientForm}
          />
        )}

        {mainContent()}
      </div>
    </main>
  );
}
