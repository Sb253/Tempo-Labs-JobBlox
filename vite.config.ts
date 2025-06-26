import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base:
    process.env.NODE_ENV === "development"
      ? "/"
      : process.env.VITE_BASE_PATH || "/",
  optimizeDeps: {
    entries: ["src/main.tsx", "src/tempobook/**/*"],
  },
  plugins: [react(), tempo()],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // @ts-ignore
    allowedHosts: true,
    historyApiFallback: true,
    // Critical: Enable history API fallback for SPA routing
    historyApiFallback: {
      index: "/index.html",
      rewrites: [
        // Handle tenant-specific routes
        { from: /^\/[a-zA-Z0-9-_]+\/.*$/, to: "/index.html" },
        // Handle admin routes
        { from: /^\/admin\/.*$/, to: "/index.html" },
        // Handle auth routes
        { from: /^\/login\/.*$/, to: "/index.html" },
        // Handle monitoring routes
        { from: /^\/monitoring\/.*$/, to: "/index.html" },
        // Handle tempo storyboard routes
        { from: /^\/tempobook\/.*$/, to: "/index.html" },
        // Handle all other SPA routes
        { from: /^\/(?!api).*$/, to: "/index.html" },
      ],
    },
  },
  build: {
    // Ensure proper fallback in production
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  preview: {
    // Enable history API fallback for preview mode
    historyApiFallback: {
      index: "/index.html",
    },
  },
});
