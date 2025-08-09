import type { MouseEvent } from "react";
import { useNavigate } from "react-router";

import { formatGovId } from "@/app/utils/formatGovId";

export function useClientsTableController() {
  const navigate = useNavigate();

  function handleNavigateToClient(govId: string) {
    navigate(`/client/${govId}`);
  }

  function handleCopyGovId(
    event: MouseEvent<HTMLButtonElement>,
    govId: string
  ) {
    event.stopPropagation();

    navigator.clipboard.writeText(formatGovId(govId));
  }

  return {
    handleNavigateToClient,
    handleCopyGovId
  };
}
