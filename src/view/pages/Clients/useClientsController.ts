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

  return {
    activeClients: activeClientsData?.clients ?? [],
    isFetchingActiveClients,
    clientWithGovIdData: clientWithGovIdData?.client,
    isFetchingClientWithGovId
  };
}
