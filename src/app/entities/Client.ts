export interface Client {
  id: string;
  cpf: string;
  name: string;
  email: string;
  phone: string;
  gender: "F" | "M";
  address: string;
  status: "Active" | "Inactive";
}
