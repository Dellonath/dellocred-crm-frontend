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

  const hasActiveClients =
    !!activeClientsData &&
    activeClientsData.clients.length > 0 &&
    !isFetchingActiveClients;
  const hasClientWithGovIdData =
    !!clientWithGovIdData &&
    !!clientWithGovIdData.client &&
    !isFetchingClientWithGovId;

  const shouldShowLoadingElement =
    isFetchingActiveClients || isFetchingClientWithGovId;
  const shouldShowClientData = hasActiveClients || hasClientWithGovIdData;
  const shouldShowRegisterClientForm =
    !hasActiveClients &&
    !isFetchingActiveClients &&
    !isFetchingClientWithGovId &&
    !hasClientWithGovIdData;

  return {
    activeClients: activeClientsData?.clients ?? [],
    clientWithGovIdData: clientWithGovIdData?.client,
    shouldShowLoadingElement,
    shouldShowClientData,
    shouldShowRegisterClientForm
  };
}
