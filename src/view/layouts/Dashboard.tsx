import { Outlet } from "react-router";

export function DashboardLayout() {
  return (
    <div className="flex gap-1">
      <div>Sidebar</div>

      <Outlet />
    </div>
  );
}
