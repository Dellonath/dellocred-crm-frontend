import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import { clientService } from "@/app/services/client";

export function useClientsController() {
  const [searchParams] = useSearchParams();

  const pageSearchParam = searchParams.get("page");
  const govIdSearchParam = searchParams.get("govId");

  const currentPage = pageSearchParam ? Number(pageSearchParam) : 1;

  const { data: activeClientsData, isFetching: isFetchingActiveClients } =
    useQuery({
      queryKey: ["clients", "actives", currentPage],
      queryFn: () =>
        clientService.getActiveClients({
          page: currentPage
        }),
      enabled: !govIdSearchParam
    });

  const { data: clientWithGovIdData, isFetching: isFetchingClientWithGovId } =
    useQuery({
      queryKey: ["clients", "govId", govIdSearchParam],
      queryFn: () =>
        clientService.getClientByGovId({
          govId: govIdSearchParam!
        }),
      enabled: !!govIdSearchParam
    });

  const isLoading = isFetchingActiveClients || isFetchingClientWithGovId;

  const hasActiveClients = !!activeClientsData?.clients?.length;
  const hasClientByGovId = !!clientWithGovIdData?.client;

  const shouldShowClientData =
    (govIdSearchParam ? hasClientByGovId : hasActiveClients) && !isLoading;

  const shouldShowRegisterClientForm =
    !!govIdSearchParam && !isLoading && !hasClientByGovId;
  const shouldShowEmptyView =
    !hasActiveClients && !govIdSearchParam && !isLoading;

  const clients = hasClientByGovId
    ? [clientWithGovIdData.client]
    : !govIdSearchParam
      ? (activeClientsData?.clients ?? [])
      : [];

  return {
    clients,
    shouldShowLoadingElement: isLoading,
    shouldShowClientData,
    shouldShowRegisterClientForm,
    shouldShowEmptyView,
    shouldShowPagination: clients.length > 10
  };
}
