import type { Client } from "@/app/entities/Client";
import { httpClient } from "@/app/lib/axios";

interface RegisterClientParams {
  client: Omit<Client, "uuid">;
}

export async function registerClient({ client }: RegisterClientParams) {
  await httpClient.post<void>("/clients", {
    ...client
  });
}
