import { getClientByGovId } from "./getClientByGovId";
import { getClients } from "./getClients";
import { registerClient } from "./registerClient";

export const clientService = {
  getClients,
  getClientByGovId,
  registerClient
};
