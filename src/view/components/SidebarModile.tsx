import { Menu } from "lucide-react";

import dellocredIcon from "@/assets/dellocred.logo-transparent-white.png";

import { Navigation } from "./Navigation";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

export function SidebarMobile() {
  return (
    <Sheet>
      <SheetTrigger className="absolute top-8 left-6 xl:hidden">
        <Menu className="size-6" />
      </SheetTrigger>

      <SheetContent side="left" className="bg-primary-foreground px-8 pt-12">
        <SheetTitle className="sr-only">menu</SheetTitle>

        <img src={dellocredIcon} alt="" className="mx-auto w-full" />

        <Navigation />
      </SheetContent>
    </Sheet>
  );
}
