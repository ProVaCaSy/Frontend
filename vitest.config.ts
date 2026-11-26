// Wird nur von Vitest geladen. Vitest vorher installieren: npm install -D vitest jsdom @vue/test-utils
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      include: ['tests/**/*.spec.ts'],
    },
  }),
)
