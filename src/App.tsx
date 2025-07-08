import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";

import { queryClient } from "./app/lib/tanstackQuery";
import { router } from "./router";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}
