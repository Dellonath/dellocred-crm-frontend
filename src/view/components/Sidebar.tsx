import { Link, useLocation } from "react-router";

import { cn } from "@/app/lib/utils";
import dellocredIcon from "@/assets/dellocred.logo-transparent-white.png";

import { Button } from "./ui/button";

export function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="bg-primary-foreground sticky top-0 h-dvh w-full max-w-64 min-w-48 space-y-8 px-4 py-8">
      <img src={dellocredIcon} alt="" className="mx-auto w-full" />

      <nav>
        <ul className="space-y-1.5">
          <li className={cn(pathname === "/" && "pointer-events-none")}>
            <Link to="/">
              <Button
                variant="outline"
                className="bg-primary-foreground w-full"
              >
                Início
              </Button>
            </Link>
          </li>

          <li className={cn(pathname === "/clients" && "pointer-events-none")}>
            <Link to="/clients">
              <Button
                variant="outline"
                className="bg-primary-foreground w-full"
              >
                Clientes
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
