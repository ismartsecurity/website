// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Skip Nitro's server packaging — we ship static HTML to GitHub Pages.
  nitro: false,
  tanstackStart: {
    // Pre-render every route to static HTML at build time so the site can be
    // hosted on GitHub Pages (no server needed). Uses the default server entry —
    // Lovable's src/server.ts SSR error wrapper is only relevant for server hosting.
    prerender: { enabled: true, crawlLinks: true },
  },
});
