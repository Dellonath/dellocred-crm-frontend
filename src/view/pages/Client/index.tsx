import { useClientController } from "./useClientController";

export function Client() {
  const { govId } = useClientController();

  return <h2>Esse é o CPF do cliente: {govId}</h2>;
}
