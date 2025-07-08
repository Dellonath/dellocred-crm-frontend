import { Link } from "react-router";

import dellocredIcon from "@/assets/dellocred-transparent.png";

import { Button } from "./ui/button";

export function Sidebar() {
  return (
    <aside className="bg-primary-foreground sticky top-0 h-dvh w-full max-w-64 min-w-48 space-y-8 px-4 py-8">
      <img src={dellocredIcon} alt="" className="mx-auto w-full" />

      <nav>
        <ul className="space-y-1.5">
          <li>
            <Link to="/">
              <Button
                variant="outline"
                className="bg-primary-foreground w-full"
              >
                Início
              </Button>
            </Link>
          </li>

          <li>
            <Link to="/clientes">
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
