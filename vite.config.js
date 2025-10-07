import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import process from "process";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // load .env sesuai mode (development/production)
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    build: {
      outDir: "../public_html", // lokasi folder untuk hasil build
    },
    // define variable global sesuai .env
    define: {
      DELCOM_BASEURL: JSON.stringify(env.VITE_DELCOM_BASEURL || ""),
    },
    // konfigurasi path alias
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  };
});
