import type { Client } from "@/app/entities/Client";
import { httpClient } from "@/app/lib/axios";

interface GetClientByGovIdParams {
  govId: string;
}

export async function getClientByGovId({ govId }: GetClientByGovIdParams) {
  const { data } = await httpClient.get<Client>(`/clients/${govId}`);

  console.log("data", data);

  return {
    client: data
  };
}
