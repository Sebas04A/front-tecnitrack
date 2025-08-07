import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {
      "/api": "https://localhost:7092", // Redirect /api calls to the API server
    },
  },
});
