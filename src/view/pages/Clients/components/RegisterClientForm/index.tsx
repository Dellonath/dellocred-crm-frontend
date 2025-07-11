import { Globe, MapPin, MessageSquareText, User } from "lucide-react";

import {
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

export function RegisterClientForm() {
  return (
    <div>
      <h2 className="text-2xl">Registar novo cliente</h2>

      <form className="mt-4 flex flex-col gap-7">
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
              labelClassName="bg-primary-foreground "
            />

            <Input label="Nome" labelClassName="bg-primary-foreground" />

            <Input label="Sobrenome" labelClassName="bg-primary-foreground" />

            <InputMask
              label="Data de nascimento"
              mask="DD/DD/DDDD"
              replacement={{
                D: /\d/
              }}
              containerClassName="w-full max-w-40"
              labelClassName="bg-primary-foreground"
            />
          </div>

          <div className="flex gap-2">
            <Select
              label="Gênero"
              options={GENDER_OPTIONS}
              labelClassName="bg-primary-foreground"
            />
            <Select
              label="Estado civil"
              options={MARTIAL_STATUS_OPTIONS}
              labelClassName="bg-primary-foreground"
            />
            <Select
              label="Nível de educação"
              options={EDUCATION_LEVEL_OPTIONS}
              labelClassName="bg-primary-foreground"
            />

            <Select
              label="Setor"
              options={CLIENT_SECTOR_OPTIONS}
              labelClassName="bg-primary-foreground"
            />
          </div>

          <div className="flex gap-2">
            <Input label="Ocupação" labelClassName="bg-primary-foreground" />

            <InputCurrency
              label="Remuneração"
              containerClassName="w-full max-w-36"
              labelClassName="bg-primary-foreground"
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
            />

            <Input label="E-mail" labelClassName="bg-primary-foreground" />
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
            />

            <Input
              label="Pais"
              containerClassName="w-full max-w-72"
              labelClassName="bg-primary-foreground"
            />

            <Input label="Cidade" labelClassName="bg-primary-foreground" />

            <Select
              label="Estado"
              options={STATES_OPTIONS}
              containerClassName="w-full max-w-48"
              labelClassName="bg-primary-foreground"
            />
          </div>

          {/* <div className="flex gap-2">
            <Input label="Cidade" labelClassName="bg-primary-foreground" />

            <Select
              label="Estado"
              options={STATES_OPTIONS}
              labelClassName="bg-primary-foreground"
            />
          </div> */}

          <div className="flex gap-2">
            <Input
              label="Rua"
              containerClassName="w-full max-w-64"
              labelClassName="bg-primary-foreground"
            />

            <Input
              label="Bairro"
              containerClassName="w-full max-w-64"
              labelClassName="bg-primary-foreground"
            />

            <InputMask
              label="Nº"
              mask="DDDDD"
              replacement={{
                D: /\d/
              }}
              containerClassName="w-full max-w-16"
              labelClassName="bg-primary-foreground"
            />
            <Input label="Complemento" labelClassName="bg-primary-foreground" />
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
            <Select
              label="Origem UTM"
              options={UTM_SOURCE_OPTIONS}
              containerClassName="w-full max-w-48"
              labelClassName="bg-primary-foreground"
            />

            <Select
              label="UTM Médio"
              options={UTM_MEDIUM_OPTIONS}
              containerClassName="w-full max-w-48"
              labelClassName="bg-primary-foreground"
            />

            <Input
              label="Campanha UTM"
              labelClassName="bg-primary-foreground"
            />

            <Input
              label="Tipo de canal"
              labelClassName="bg-primary-foreground"
            />
          </div>
        </div>

        <Button type="submit" className="ml-auto">
          Registrar
        </Button>
      </form>
    </div>
  );
}
