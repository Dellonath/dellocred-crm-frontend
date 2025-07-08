import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { z } from "zod";

const schema = z.object({
  govId: z
    .string()
    .min(14, "Preencha um CPF no formato correto")
    .transform((data) => data.replaceAll(".", "").replace("-", ""))
});

type FormData = z.infer<typeof schema>;

export function useSearchClientFormController() {
  const [, setSearchParams] = useSearchParams();

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    setSearchParams((prevSearchParams) => {
      prevSearchParams.delete("page");
      prevSearchParams.set("govId", data.govId);

      return prevSearchParams;
    });
  });

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting
  };
}
