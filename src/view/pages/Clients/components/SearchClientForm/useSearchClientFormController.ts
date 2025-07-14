import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { z } from "zod";

import { formatGovId } from "@/app/utils/formatGovId";

const schema = z.object({
  govId: z
    .string()
    .min(14, "Preencha um CPF no formato correto")
    .transform((data) => data.replaceAll(".", "").replace("-", ""))
});

type FormData = z.infer<typeof schema>;

interface UseSearchClientFormControllerProps {
  onClear: () => void;
}

export function useSearchClientFormController({
  onClear
}: UseSearchClientFormControllerProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const govIdSearchParam = searchParams.get("govId");

  const {
    register,
    reset,
    watch,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    defaultValues: {
      govId: govIdSearchParam ? formatGovId(govIdSearchParam) : undefined
    },
    resolver: zodResolver(schema)
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    setSearchParams((prevSearchParams) => {
      prevSearchParams.delete("page");
      prevSearchParams.set("govId", data.govId);

      return prevSearchParams;
    });
  });

  function handleClearSearch() {
    reset();
    onClear();
  }

  const shouldShowClearButton = watch("govId")?.length > 0;

  return {
    register,
    handleSubmit,
    handleClearSearch,
    errors,
    isSubmitting,
    shouldShowClearButton
  };
}
