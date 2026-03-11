import process from "process";
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 60_001,
    fs: { strict: false },
  },
  worker: { format: "es" },
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  // base: "/fastrack/",;
  base: mode === "development" ? "/" : "/fastrack/",
}));
