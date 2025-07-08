import type { Client } from "@/app/entities/Client";

interface GetActiveClientsParams {
  govId: string;
}

export function getClientByGovId({ govId }: GetActiveClientsParams) {
  const client: Client = {
    uuid: "01198889-50c8-4464-bb3f-9ce80136fcd8",
    govId: govId,
    firstName: `Cliente 1`,
    lastName: `Sobrenome 1`,
    email: `cliente1@exemplo.com`,
    phoneNumber: `(11) 90000-0000`,
    gender: "m",
    city: `Cidade`,
    state: "sp",
    isActive: true,
    maritialStatus: "single",
    educationLevel: "primary",
    clientSector: "private",
    utmSource: "instagram",
    utmMedium: "email"
  };

  return {
    client
  };
}
