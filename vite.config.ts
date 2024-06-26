import react from "@vitejs/plugin-react-swc";
import { join, resolve } from "path";
import { UserConfig, defineConfig, loadEnv } from "vite";

import "tailwindcss";
import "tailwindcss/nesting";
import "autoprefixer";
import "postcss-import";
import "postcss-simple-vars";


export default defineConfig((mode) => {
  const env = loadEnv(mode.mode, process.cwd(), "");

  const INPUT_DIR = "./fortune/react";
  const OUTPUT_DIR = "./static/react_dist";

  const res: UserConfig = {
    plugins: [react()],
    resolve: {
      alias: {
        "@": resolve(INPUT_DIR),
      },
    },
    root: resolve(INPUT_DIR),
    base: "/static/",
    css: {
    },
    server: {
      host: env.DJANGO_VITE_DEV_SERVER_HOST,
      port: parseInt(env.DJANGO_VITE_DEV_SERVER_PORT),
    },

    build: {
      emptyOutDir: true,
      outDir: resolve(OUTPUT_DIR),
      manifest: "manifest.json",
      rollupOptions: {
        input: {
          home: join(INPUT_DIR, "/app.tsx"),
          css: join(INPUT_DIR, "/main.css.js"),
        },
      },
    },
  };
  return res;
});
