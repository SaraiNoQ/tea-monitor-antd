import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "localhost",
    port: 8888,
    open: true,
    https: false,
    proxy: {
      "/api": {
        // target: "http://localhost:80",
        target: "https://springboot-cxiq-2052569-1312702110.ap-shanghai.run.tcloudbase.com",
        changeOrigin: true,
        // @ts-ignore
        pathRewrite: {
          "^/api": "/api",
        },
      },
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          "primary-color": "#1890ff",
          "font-size-base": "14px",
        },
        additionalData: `
      @import "~/styles/variables.less";
    `,
        javascriptEnabled: true,
      },
    },
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
