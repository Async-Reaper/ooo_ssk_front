import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";
import svgr from "vite-plugin-svgr";

export default ({ mode }: any) => {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    plugins: [react(), svgr()],
    define: {
      "process.env": env,
    },
    resolve: {
      alias: [
        {
          find: "@",
          replacement: fileURLToPath(new URL("./src", import.meta.url)),
        },
        {
          find: "@app",
          replacement: fileURLToPath(new URL("./src/app", import.meta.url)),
        },
        {
          find: "@entities",
          replacement: fileURLToPath(new URL("./src/entities", import.meta.url)),
        },
        {
          find: "@features",
          replacement: fileURLToPath(new URL("./src/features", import.meta.url)),
        },
        {
          find: "@pages",
          replacement: fileURLToPath(new URL("./src/pages", import.meta.url)),
        },
        {
          find: "@shared",
          replacement: fileURLToPath(new URL("./src/shared", import.meta.url)),
        },
        {
          find: "@widgets",
          replacement: fileURLToPath(new URL("./src/widgets", import.meta.url)),
        },
        {
          find: "@styles",
          replacement: fileURLToPath(new URL("./src/app/styles", import.meta.url)),
        },
      ],
    },
  });
};
