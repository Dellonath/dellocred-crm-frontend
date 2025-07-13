import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

import { clientService } from "@/app/services/client";

export function useClientsController() {
  const [searchParams] = useSearchParams();

  const pageSearchParam = searchParams.get("page");
  const govIdSearchParam = searchParams.get("govId");

  const currentPage = pageSearchParam ? Number(pageSearchParam) : 1;

  const { data: clientsData, isFetching: isFetchingClients } = useQuery({
    queryKey: ["clients", currentPage, govIdSearchParam],
    queryFn: () =>
      clientService.getClients({
        page: currentPage
      }),
    enabled: !govIdSearchParam
  });

  const hasClients = !!clientsData?.clients?.length;

  const shouldShowClientData = hasClients && !isFetchingClients;
  const shouldShowEmptyView =
    !isFetchingClients && !!govIdSearchParam && !hasClients;
  const shouldShowRegisterClientForm =
    !!govIdSearchParam && !isFetchingClients && !shouldShowEmptyView;

  const clients = clientsData?.clients || [];

  return {
    clients,
    shouldShowLoadingElement: isFetchingClients,
    shouldShowClientData,
    shouldShowRegisterClientForm,
    shouldShowEmptyView,
    shouldShowPagination: clients.length > 10
  };
}
