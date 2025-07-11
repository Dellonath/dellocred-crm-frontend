import { httpClient } from "@/app/lib/axios";

interface GetActiveClientsParams {
  page: number;
}

export async function getActiveClients({
  page: _page
}: GetActiveClientsParams) {
  const { data } = await httpClient.get("/clients/actives");

  return {
    clients: data
  };
}
