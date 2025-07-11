import { createBrowserRouter } from "react-router";

import { NotFound } from "@/view/pages/404";
import { Error } from "@/view/pages/Error";

import { DashboardLayout } from "../view/layouts/Dashboard";
import { Clients } from "../view/pages/Clients";
import { Home } from "../view/pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/clientes",
        element: <Clients />
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);
