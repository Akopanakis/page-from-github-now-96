import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import path from "path";

export default defineConfig({
  plugins: [{ ...mdx({}), enforce: "pre" }, react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          "react-vendor": ["react", "react-dom"],
          "ui-vendor": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-avatar",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-label",
            "@radix-ui/react-popover",
            "@radix-ui/react-progress",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-slider",
            "@radix-ui/react-switch",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
            "@radix-ui/react-tooltip",
          ],
          "chart-vendor": ["recharts"],
          "icons-vendor": ["lucide-react"],
          "form-vendor": ["react-hook-form", "@hookform/resolvers", "zod"],
          "utils-vendor": [
            "clsx",
            "tailwind-merge",
            "class-variance-authority",
            "date-fns",
          ],
          // Application chunks
          "analysis-components": [
            "./src/components/FinancialRatios.tsx",
            "./src/components/EconomicTrends.tsx",
            "./src/components/ExecutiveDashboard.tsx",
            "./src/components/AdvancedAnalysisTab.tsx",
            "./src/components/AnalysisTab.tsx",
          ],
          "dashboard-components": [
            "./src/components/AdvancedDashboard.tsx",
            "./src/components/CompactResultsPanel.tsx",
            "./src/components/Sidebar.tsx",
          ],
          "premium-components": [
            "./src/components/ScenarioAnalysis.tsx",
            "./src/components/RevenueForecast.tsx",
            "./src/components/FinancialModels.tsx",
            "./src/components/InventoryTrackingSystem.tsx",
            "./src/components/MarketIntelligenceSystem.tsx",
          ],
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? path.basename(
                chunkInfo.facadeModuleId,
                path.extname(chunkInfo.facadeModuleId),
              )
            : "chunk";
          return `js/${facadeModuleId}-[hash].js`;
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true,
  },
  preview: {
    port: 4173,
    strictPort: true,
    host: true,
  },
});
