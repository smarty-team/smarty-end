import path from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteMockServe } from "vite-plugin-mock";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      comps: path.resolve(__dirname, "src/components"),
      styles: path.resolve(__dirname, "src/styles"),
      plugins: path.resolve(__dirname, "src/plugins"),
      views: path.resolve(__dirname, "src/views"),
      layouts: path.resolve(__dirname, "src/layouts"),
      utils: path.resolve(__dirname, "src/utils"),
      apis: path.resolve(__dirname, "src/apis"),
      dirs: path.resolve(__dirname, "src/directives"),
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    viteMockServe({}),
    vueI18n({
      include: path.resolve(__dirname, "./src/locales/**"),
    }),
  ],
});
