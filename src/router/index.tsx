import { createBrowserRouter } from "react-router";

import { Home } from "../view/pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }
]);
