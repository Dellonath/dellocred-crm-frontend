import dellocredIcon from "@/assets/dellocred-icon.png";

export function Home() {
  return (
    <main className="flex h-dvh w-full items-center justify-center">
      <div className="w-3xl space-y-8">
        <img
          src={dellocredIcon}
          alt="Dellocred Logo"
          className="mx-auto w-72"
        />

        <div className="space-y-2">
          <h2 className="text-center text-4xl font-bold">
            Bem vindo ao CRM Dellocred
          </h2>

          <p className="text-center text-xl">
            Gerencie seus clientes e operações financeiras com eficiência e
            modernidade.
          </p>
        </div>
      </div>
    </main>
  );
}
