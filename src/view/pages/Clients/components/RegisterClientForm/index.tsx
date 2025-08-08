import { Globe, MapPin, MessageSquareText, User } from "lucide-react";
import { Controller } from "react-hook-form";

import {
  CHANNEL_TYPE_OPTIONS,
  CLIENT_SECTOR_OPTIONS,
  EDUCATION_LEVEL_OPTIONS,
  GENDER_OPTIONS,
  MARTIAL_STATUS_OPTIONS,
  STATES_OPTIONS,
  UTM_MEDIUM_OPTIONS,
  UTM_SOURCE_OPTIONS
} from "@/app/config/constants";
import { Input } from "@/view/components/Input";
import { InputCurrency } from "@/view/components/InputCurrency";
import { InputMask } from "@/view/components/InputMask";
import { Select } from "@/view/components/Select";
import { Button } from "@/view/components/ui/button";

import { useRegisterClientFormController } from "./useRegisterClientFormController";

interface RegisterClientFormProps {
  handleCloseRegisterClientForm: () => void;
}

export function RegisterClientForm({
  handleCloseRegisterClientForm
}: RegisterClientFormProps) {
  const { register, handleSubmit, control, errors, isSubmitting } =
    useRegisterClientFormController({
      handleCloseRegisterClientForm
    });

  return (
    <div>
      <h2 className="text-2xl">Registar novo cliente</h2>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-7">
        {/* Dados pessoais */}
        <div className="space-y-4">
          <div className="mb-3 flex items-center gap-2">
            <User className="text-muted-foreground size-6" />
            <h3 className="text-muted-foreground text-lg">
              Informações Pessoais
            </h3>
          </div>

          <div className="flex gap-2">
            <InputMask
              label="CPF"
              mask="DDD.DDD.DDD-DD"
              replacement={{
                D: /\d/
              }}
              containerClassName="w-full max-w-36"
              labelClassName="bg-primary-foreground"
              error={errors.govId?.message}
              {...register("govId")}
            />

            <Input
              label="Nome"
              labelClassName="bg-primary-foreground"
              error={errors.firstName?.message}
              {...register("firstName")}
            />

            <Input
              label="Sobrenome"
              labelClassName="bg-primary-foreground"
              error={errors.lastName?.message}
              {...register("lastName")}
            />

            <InputMask
              label="Data de nascimento"
              mask="DD/DD/DDDD"
              replacement={{
                D: /\d/
              }}
              containerClassName="w-full max-w-40"
              labelClassName="bg-primary-foreground"
              error={errors.birthDate?.message}
              {...register("birthDate")}
            />
          </div>

          <div className="flex gap-2">
            <Controller
              control={control}
              name="gender"
              defaultValue="m"
              render={({ field: { onChange } }) => (
                <Select
                  label="Gênero"
                  options={GENDER_OPTIONS}
                  onValueChange={onChange}
                  error={errors.gender?.message}
                  labelClassName="bg-primary-foreground"
                />
              )}
            />

            <Select
              label="Estado civil"
              options={MARTIAL_STATUS_OPTIONS}
              labelClassName="bg-primary-foreground"
            />

            <Controller
              control={control}
              name="educationLevel"
              render={({ field: { onChange } }) => (
                <Select
                  label="Nível de educação"
                  options={EDUCATION_LEVEL_OPTIONS}
                  onValueChange={onChange}
                  error={errors.educationLevel?.message}
                  labelClassName="bg-primary-foreground"
                />
              )}
            />

            <Controller
              control={control}
              name="clientSector"
              render={({ field: { onChange } }) => (
                <Select
                  label="Setor"
                  options={CLIENT_SECTOR_OPTIONS}
                  onValueChange={onChange}
                  error={errors.clientSector?.message}
                  labelClassName="bg-primary-foreground"
                />
              )}
            />
          </div>

          <div className="flex gap-2">
            <Input
              label="Ocupação"
              labelClassName="bg-primary-foreground"
              error={errors.occupation?.message}
              {...register("occupation")}
            />

            <Controller
              control={control}
              name="wage"
              render={({ field: { value, onChange } }) => (
                <InputCurrency
                  label="Remuneração"
                  value={value}
                  onChange={onChange}
                  containerClassName="w-full max-w-36"
                  labelClassName="bg-primary-foreground"
                  error={errors.wage?.message}
                />
              )}
            />
          </div>
        </div>

        {/* Contato */}
        <div className="space-y-4">
          <div className="mb-3 flex items-center gap-2">
            <MessageSquareText className="text-muted-foreground size-6" />

            <h3 className="text-muted-foreground text-lg">Contato</h3>
          </div>

          <div className="flex gap-2">
            <InputMask
              label="Telefone"
              mask="(DD) D DDDD-DDDD"
              replacement={{
                D: /\d/
              }}
              labelClassName="bg-primary-foreground"
              error={errors.phoneNumber?.message}
              {...register("phoneNumber")}
            />

            <Input
              label="E-mail"
              labelClassName="bg-primary-foreground"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>
        </div>

        {/* Endereço */}
        <div className="space-y-4">
          <div className="mb-3 flex items-center gap-2">
            <MapPin className="text-muted-foreground size-6" />
            <h3 className="text-muted-foreground text-lg">Endereço</h3>
          </div>

          <div className="flex gap-2">
            <InputMask
              label="CEP"
              mask="DDDDD-DDD"
              replacement={{
                D: /\d/
              }}
              containerClassName="w-full max-w-36"
              labelClassName="bg-primary-foreground"
              error={errors.postalCode?.message}
              {...register("postalCode")}
            />

            <Input
              label="Pais"
              containerClassName="w-full max-w-72"
              labelClassName="bg-primary-foreground"
              error={errors.country?.message}
              {...register("country")}
            />

            <Input
              label="Cidade"
              labelClassName="bg-primary-foreground"
              error={errors.city?.message}
              {...register("city")}
            />

            <Controller
              control={control}
              name="state"
              render={({ field: { onChange } }) => (
                <Select
                  label="Estado"
                  options={STATES_OPTIONS}
                  onValueChange={onChange}
                  error={errors.state?.message}
                  containerClassName="w-full max-w-48"
                  labelClassName="bg-primary-foreground"
                />
              )}
            />
          </div>

          <div className="flex gap-2">
            <Input
              label="Rua"
              containerClassName="w-full max-w-64"
              labelClassName="bg-primary-foreground"
              error={errors.addressStreet?.message}
              {...register("addressStreet")}
            />

            <Input
              label="Bairro"
              containerClassName="w-full max-w-64"
              labelClassName="bg-primary-foreground"
              error={errors.addressNeighborhood?.message}
              {...register("addressNeighborhood")}
            />

            <InputMask
              label="Nº"
              mask="DDDDD"
              replacement={{
                D: /\d/
              }}
              containerClassName="w-full max-w-16"
              labelClassName="bg-primary-foreground"
              error={errors.addressNumber?.message}
              {...register("addressNumber")}
            />

            <Input
              label="Complemento"
              labelClassName="bg-primary-foreground"
              error={errors.addressComplement?.message}
              {...register("addressComplement")}
            />
          </div>
        </div>

        {/* Origem e Marketing */}
        <div className="space-y-4">
          <div className="mb-3 flex items-center gap-2">
            <Globe className="text-muted-foreground size-6" />
            <h3 className="text-muted-foreground text-lg">
              Origem e Marketing
            </h3>
          </div>

          <div className="flex gap-2">
            <Controller
              control={control}
              name="utmSource"
              render={({ field: { onChange } }) => (
                <Select
                  label="Origem UTM"
                  options={UTM_SOURCE_OPTIONS}
                  onValueChange={onChange}
                  error={errors.utmSource?.message}
                  containerClassName="w-full max-w-48"
                  labelClassName="bg-primary-foreground"
                />
              )}
            />

            <Controller
              control={control}
              name="utmMedium"
              render={({ field: { onChange } }) => (
                <Select
                  label="UTM Médio"
                  options={UTM_MEDIUM_OPTIONS}
                  onValueChange={onChange}
                  error={errors.utmMedium?.message}
                  containerClassName="w-full max-w-48"
                  labelClassName="bg-primary-foreground"
                />
              )}
            />

            <Input
              label="Campanha UTM"
              labelClassName="bg-primary-foreground"
            />

            <Controller
              control={control}
              name="channelType"
              render={({ field: { onChange } }) => (
                <Select
                  label="Tipo de canal"
                  options={CHANNEL_TYPE_OPTIONS}
                  onValueChange={onChange}
                  error={errors.channelType?.message}
                  containerClassName="w-full max-w-48"
                  labelClassName="bg-primary-foreground"
                />
              )}
            />
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting} className="ml-auto">
          Registrar
        </Button>
      </form>
    </div>
  );
}
