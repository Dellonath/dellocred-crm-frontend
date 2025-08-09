import { LoaderCircle } from "lucide-react";

import { useClientController } from "./useClientController";

export function Client() {
  const { isLoading, client } = useClientController();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoaderCircle className="size-6 animate-spin" />
      </div>
    );
  }

  return <pre>{JSON.stringify(client, null, 2)}</pre>;
}
