import { createBrowserRouter } from "react-router";

import { DashboardLayout } from "../view/layouts/Dashboard";
import { Home } from "../view/pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/clientes",
        element: <Home />
      }
    ]
  }
]);
