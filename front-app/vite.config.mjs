// vite.config.js
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from "vite";
import tailwindcss from '@tailwindcss/vite'

import { classicEmberSupport, ember, extensions } from "@embroider/vite";
import { babel } from "@rollup/plugin-babel";
import { loadTranslations } from '@ember-intl/vite';

export default defineConfig({
  // Add this config
  test: {
    include: ["tests/**/*-test.{gjs,gts}"],
    maxConcurrency: 1,
    browser: {
      provider: playwright(),
      enabled: true,
      headless: false,
      // at least one instance is required
      instances: [
        { browser: "chromium" },
        // { browser: 'firefox' },
        // { browser: 'edge' },
        // { browser: 'safari' },
      ],
    },
  },
  // Existing config:
  plugins: [
    tailwindcss(),
    classicEmberSupport(),
    ember(),
    babel({
      babelHelpers: "runtime",
      extensions,
    }),
    loadTranslations()
  ],
});
