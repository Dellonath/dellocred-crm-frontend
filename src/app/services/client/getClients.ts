import type { Client } from "@/app/entities/Client";
import { httpClient } from "@/app/lib/axios";

interface GetClientsParams {
  status?: "all" | "active" | "inactive";
  page?: number;
}

export async function getClients({
  status = "all",
  page = 1
}: GetClientsParams) {
  const { data } = await httpClient.get<{ clients: Client[] }>("/clients/actives", {
    params: {
      status,
      page
    }
  });

  return {
    clients: data.clients
  };
}
