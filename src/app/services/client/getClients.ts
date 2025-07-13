import type { Client } from "@/app/entities/Client";
import { httpClient } from "@/app/lib/axios";

interface GetClientsParams {
  status?: "all" | "active" | "inactive";
  govId?: string;
  page?: number;
}

export async function getClients({
  status = "all",
  govId,
  page = 1
}: GetClientsParams) {
  const { data } = await httpClient.get<Client[]>("/clients", {
    params: {
      status,
      govId,
      page
    }
  });

  return {
    clients: data
  };
}
