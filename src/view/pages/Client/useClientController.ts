import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import { clientService } from "@/app/services/client";

export function useClientController() {
  const { govId } = useParams<{ govId: string }>();

  const { data, isFetching: isLoading } = useQuery({
    queryKey: ["client", govId],
    queryFn: async () =>
      clientService.getClientByGovId({
        govId: govId!
      }),
    enabled: !!govId
  });

  return {
    isLoading,
    client: data?.client
  };
}
