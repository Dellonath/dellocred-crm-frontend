import { SearchClientForm } from "./components/SearchClientForm";

export function Clients() {
  return (
    <main className="mx-auto mt-24 w-5xl space-y-8">
      <h2 className="text-center text-4xl">Gerenciar clientes</h2>

      <div className="bg-primary-foreground w-full rounded-xl px-4 py-5">
        <SearchClientForm />
      </div>
    </main>
  );
}
