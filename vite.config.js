import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/projeto-integrador2/", // coloque aqui o nome do seu repositório
  plugins: [react()],
});
