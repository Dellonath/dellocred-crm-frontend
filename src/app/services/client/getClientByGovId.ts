import type { Client } from "@/app/entities/Client";
import { httpClient } from "@/app/lib/axios";

interface GetActiveClientsParams {
  govId: string;
}

export async function getClientByGovId({ govId }: GetActiveClientsParams) {
  const { data } = await httpClient.get<Client>(`/clients/${govId}`);

  return {
    client: data
  };
}
