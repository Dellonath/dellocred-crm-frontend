import { useClientController } from "./useClientController";

export function Client() {
  const { client } = useClientController();

  return <pre>{JSON.stringify(client, null, 2)}</pre>;
}
