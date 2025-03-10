import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    globals: true,
    environment: 'nuxt',
    include: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
    setupFiles: ['./test/setup.ts'],
  },
})
