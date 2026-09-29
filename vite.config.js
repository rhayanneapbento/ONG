import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
    base: "/ONG/",
    appType: "mpa",

    build: {
        outDir: "dist",
        emptyOutDir: true,
        minify: true,

        rollupOptions: {
            input: {
                index: resolve(__dirname, "html/index.html"),
                cadastro: resolve(__dirname, "html/cadastro.html"),
                projetos: resolve(__dirname, "html/projetos.html")
            }
        }
    }
});