import axios from "axios";

interface GetAddressByPostalCodeParams {
  postalCode: string;
}

interface GetAddressByPostalCodeResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export async function getAddressByPostalCode({
  postalCode
}: GetAddressByPostalCodeParams) {
  const { data } = await axios.get<GetAddressByPostalCodeResponse>(
    `https://viacep.com.br/ws/${postalCode}/json/`
  );

  return { data };
}
