import { Outlet } from "react-router";

import { Sidebar } from "../components/Sidebar";
import { SidebarMobile } from "../components/SidebarModile";

export function DashboardLayout() {
  return (
    <div className="flex gap-1">
      <Sidebar />
      <SidebarMobile />

      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
