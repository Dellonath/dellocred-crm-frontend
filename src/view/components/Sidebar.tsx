import dellocredIcon from "@/assets/dellocred.logo-transparent-white.png";

import { Navigation } from "./Navigation";

export function Sidebar() {
  return (
    <aside className="bg-primary-foreground sticky top-0 hidden h-dvh w-full max-w-64 min-w-48 space-y-8 px-4 py-8 xl:block">
      <img src={dellocredIcon} alt="" className="mx-auto w-full" />

      <Navigation />
    </aside>
  );
}
