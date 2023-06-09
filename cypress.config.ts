import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // or use deployed app url: https://podcaster-codetest.netlify.app/
    baseUrl: 'http://localhost:3000',
    defaultCommandTimeout: 30000,
    requestTimeout: 50000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
