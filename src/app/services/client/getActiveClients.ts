import type { Client } from "@/app/entities/Client";
import { httpClient } from "@/app/lib/axios";

interface GetActiveClientsParams {
  page: number;
}

export async function getActiveClients({
  page: _page
}: GetActiveClientsParams) {
  const { data } = await httpClient.get<Client[]>("/clients/actives");

  return {
    clients: data
  };
}
