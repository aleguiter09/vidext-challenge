import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
    environment: "jsdom",
    setupFiles: "src/tests/setup.ts",
    dir: "src/tests",
    globals: true,
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier,commitlint,next,postcss}.config.*",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
});
