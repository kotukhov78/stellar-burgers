import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
<<<<<<< HEAD
=======
    // baseUrl: 'http://localhost:4000',
    // viewportWidth: 1280,
    // viewportHeight: 720,
    // supportFile: 'cypress/support/e2e.ts',
    // specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
>>>>>>> a807642ffccbe526afba53afb689bad69bb15b6e
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});
