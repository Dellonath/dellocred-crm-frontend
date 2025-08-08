import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";

import type { UtmSource } from "@/app/entities/Client";
import { clientService } from "@/app/services/client";

const channelTypeSchema = z.union([z.literal("online"), z.literal("offline")]);

const genderSchema = z.union([z.literal("m"), z.literal("f")]);

const maritialStatusSchema = z.union([
  z.literal("single"),
  z.literal("married"),
  z.literal("divorced"),
  z.literal("windowed")
]);

const educationLevelSchema = z.union([
  z.literal("primary"),
  z.literal("secondary"),
  z.literal("high_school"),
  z.literal("bachelor"),
  z.literal("master"),
  z.literal("doctorate")
]);

const clientSectorSchema = z.union([z.literal("private"), z.literal("public")]);

const utmSourceSchema = z.union([
  z.literal("direct"),
  z.literal("email"),
  z.literal("facebook"),
  z.literal("google"),
  z.literal("imported"),
  z.literal("instagram"),
  z.literal("linkedin"),
  z.literal("newsletter"),
  z.literal("organic"),
  z.literal("other"),
  z.literal("referral"),
  z.literal("tiktok"),
  z.literal("twitter"),
  z.literal("website"),
  z.literal("whatsapp")
]);

const utmMediumSchema = z.union([
  z.literal("cpc"),
  z.literal("organic"),
  z.literal("social"),
  z.literal("email"),
  z.literal("referral")
]);

const stateSchema = z.union([
  z.literal("ac"),
  z.literal("ap"),
  z.literal("am"),
  z.literal("pa"),
  z.literal("ro"),
  z.literal("rr"),
  z.literal("to"),
  z.literal("al"),
  z.literal("ba"),
  z.literal("ce"),
  z.literal("ma"),
  z.literal("pb"),
  z.literal("pe"),
  z.literal("pi"),
  z.literal("rn"),
  z.literal("se"),
  z.literal("df"),
  z.literal("go"),
  z.literal("mt"),
  z.literal("ms"),
  z.literal("es"),
  z.literal("mg"),
  z.literal("rj"),
  z.literal("sp"),
  z.literal("pr"),
  z.literal("rs"),
  z.literal("sc")
]);

const schema = z.object({
  negotiationStatus: z.string().optional(),
  govId: z
    .string()
    .min(14, "Preencha um CPF no formato correto")
    .transform((data) => {
      const withoutChars = data.replaceAll(".", "").replace("-", "");

      return withoutChars;
    }),
  firstName: z.string().min(1).max(64),
  lastName: z.string().min(1).max(64),
  email: z.string().email().max(64),
  phoneNumber: z
    .string()
    .min(16, "Preencha um número de telefone no formato correto")
    .transform((data) => {
      const withoutChars = data
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll(" ", "")
        .replace("-", "");
      return withoutChars;
    }),
  channelType: channelTypeSchema,
  birthDate: z.string().optional(),
  gender: genderSchema.optional(),
  occupation: z.string().optional(),
  maritialStatus: maritialStatusSchema.optional(),
  educationLevel: educationLevelSchema.optional(),
  wage: z
    .string()
    .optional()
    .transform((value) => {
      const withoutChars = value
        ?.replaceAll("R$", "")
        .replaceAll(".", "")
        .replaceAll(",", "");

      return withoutChars;
    }),
  clientSector: clientSectorSchema.optional(),
  country: z.string().optional(),
  state: stateSchema.optional(),
  city: z.string().optional(),
  addressNeighborhood: z.string().optional(),
  addressStreet: z.string().optional(),
  addressNumber: z.coerce.number().optional(),
  addressComplement: z.string().optional(),
  postalCode: z.string().optional(),
  utmSource: utmSourceSchema.optional(),
  utmMedium: utmMediumSchema.optional(),
  utmCampaign: z.string().optional(),
  createdByUserUuid: z.string().optional(),
  isActive: z.boolean().optional()
});

type FormData = z.infer<typeof schema>;

export function useRegisterClientFormController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const { mutateAsync: registerClientFn } = useMutation({
    mutationFn: clientService.registerClient
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    await registerClientFn({
      client: {
        ...data,
        wage: data.wage ? Number(data.wage.replace(/\D/g, "")) : undefined,
        utmSource: data.utmSource as UtmSource
      }
    });
  });

  return {
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting
  };
}
