import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.js"),
      name: "Vue3Otp",
      fileName: "vue3-otp",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [vue()],
});
