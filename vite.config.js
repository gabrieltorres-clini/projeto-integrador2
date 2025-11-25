import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/clinica/", // coloque aqui o nome do seu repositório
  plugins: [react()],
});
