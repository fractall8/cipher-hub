import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    // Suites that need a DOM opt in per file with:
    //   // @vitest-environment jsdom
    environment: 'node',
  },
});
