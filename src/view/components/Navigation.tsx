import { Link, useLocation } from "react-router";

import { cn } from "@/app/lib/utils";

import { Button } from "./ui/button";

export function Navigation() {
  const { pathname } = useLocation();

  return (
    <nav>
      <ul className="space-y-1.5">
        <li className={cn(pathname === "/" && "pointer-events-none")}>
          <Link to="/">
            <Button variant="outline" className="bg-primary-foreground w-full">
              Início
            </Button>
          </Link>
        </li>

        <li className={cn(pathname === "/clients" && "pointer-events-none")}>
          <Link to="/clients">
            <Button variant="outline" className="bg-primary-foreground w-full">
              Clientes
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
