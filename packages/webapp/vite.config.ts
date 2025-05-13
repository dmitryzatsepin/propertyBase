import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@my-org/shared": path.resolve(__dirname, "../shared/src"),
      "@my-org/shared/types": path.resolve(__dirname, "../shared/types"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001", // Your backend server URL
        changeOrigin: true,
      },
    },
  },
});
