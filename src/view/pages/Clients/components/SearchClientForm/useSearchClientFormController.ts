import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  govId: z.string().min(14, "Preencha um CPF no formato correto")
});

type FormData = z.infer<typeof schema>;

export function useSearchClientFormController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    console.log("ENVIOU => ", data);
  });

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting
  };
}
