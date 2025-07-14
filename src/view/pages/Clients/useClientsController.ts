import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router";

import { clientService } from "@/app/services/client";

export function useClientsController() {
  const [shouldShowRegisterClientForm, setShouldShowRegisterClientForm] =
    useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const pageSearchParam = searchParams.get("page");
  const govIdSearchParam = searchParams.get("govId");

  const currentPage = pageSearchParam ? Number(pageSearchParam) : 1;

  const { data: clientsData, isFetching: isFetchingClients } = useQuery({
    queryKey: ["clients", currentPage, govIdSearchParam],
    queryFn: () =>
      clientService.getClients({
        govId: govIdSearchParam ?? undefined,
        page: currentPage
      })
  });

  const hasClients = !!clientsData?.clients?.length;

  const shouldShowClientData = hasClients && !isFetchingClients;
  const shouldShowEmptyView =
    !isFetchingClients &&
    !!govIdSearchParam &&
    !hasClients &&
    !shouldShowRegisterClientForm;

  const clients = clientsData?.clients || [];

  function handleOpenRegisterClientForm() {
    setShouldShowRegisterClientForm(true);
  }

  function handleCloseRegisterClientForm() {
    setShouldShowRegisterClientForm(false);

    setSearchParams((prevSearchParams) => {
      prevSearchParams.delete("govId");

      return prevSearchParams;
    });
  }

  return {
    clients,
    shouldShowLoadingElement: isFetchingClients,
    shouldShowClientData,
    shouldShowRegisterClientForm,
    shouldShowEmptyView,
    shouldShowPagination: clients.length > 10,
    handleOpenRegisterClientForm,
    handleCloseRegisterClientForm
  };
}
