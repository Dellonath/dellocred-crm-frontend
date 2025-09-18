import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { Client } from "@/app/entities/Client";
import { clientService } from "@/app/services/client";

const schema = z.object({
  govId: z
    .string()
    .min(14, "Preencha um CPF no formato correto")
    .transform((data) => data.replaceAll(".", "").replace("-", ""))
});

type FormData = z.infer<typeof schema>;

interface UseSearchClientFormControllerProps {
  onClear: () => void;
  onClientFound: (client: Client) => void;
  onClientNotFound: () => void;
}

export function useSearchClientFormController({
  onClear,
  onClientFound,
  onClientNotFound
}: UseSearchClientFormControllerProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const {
    register,
    setValue,
    watch,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    setIsSearching(true);
    setSearchError(null);

    try {
      const result = await clientService.getClientByGovId({
        govId: data.govId
      });
      onClientFound(result.client);
    } catch (error) {
      onClientNotFound();
      console.error("Erro ao buscar cliente:", error);
    } finally {
      setIsSearching(false);
    }
  });

  function handleClearSearch() {
    setValue("govId", "");
    setSearchError(null);
    onClear();
  }

  const shouldShowClearButton = watch("govId")?.length > 0;

  return {
    register,
    handleSubmit,
    handleClearSearch,
    errors,
    isSearching,
    searchError,
    shouldShowClearButton
  };
}
