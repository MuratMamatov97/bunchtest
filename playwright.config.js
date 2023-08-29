import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
    testDir: './src/tests',
    // Glob patterns or regular expressions that match test files.
    testMatch: '*src/tests/*.spec.ts',
    timeout: 10000,
});

