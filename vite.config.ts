import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, type UserConfig } from "vite";
import type { InlineConfig } from "vitest/node";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000
  },
  test: {
    globals: true,
    setupFiles: ["./test/setup.ts"],
    environment: "happy-dom"
  }
} as UserConfig & {
  test: InlineConfig;
});
