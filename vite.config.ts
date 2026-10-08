import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const siteBase = process.env.GITHUB_PAGES === "true"
  ? "/shopin30-web/"
  : process.env.STATIC_PREVIEW === "true"
    ? "./"
    : "/";

export default defineConfig({
  base: siteBase,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // Autoriser l'aperçu Arena ainsi qu'un tunnel public temporaire.
  preview: {
    host: "0.0.0.0",
    allowedHosts: [".e2b.app", ".loca.lt"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: [".e2b.app", ".loca.lt"],
  },
});
