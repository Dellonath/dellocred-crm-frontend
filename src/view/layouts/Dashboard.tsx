import { Outlet } from "react-router";

import { Sidebar } from "../components/Sidebar";

export function DashboardLayout() {
  return (
    <div className="flex gap-1">
      <Sidebar />

      <Outlet />
    </div>
  );
}
