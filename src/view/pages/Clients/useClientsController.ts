import { clientService } from "@/app/services/client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

export function useClientsController() {
  const [searchParams] = useSearchParams();

  const pageSearchParam = searchParams.get("page");

  const currentPage = pageSearchParam ? Number(pageSearchParam) : 1;

  const { data: activeClientsData, isFetching: isFetchingActiveClients } =
    useQuery({
      queryKey: ["clients", "actives", currentPage],
      queryFn: () =>
        clientService.getActiveClients({
          page: currentPage
        })
    });

  return {
    activeClients: activeClientsData?.clients ?? [],
    isFetchingActiveClients
  };
}
