import { defineConfig } from 'cypress';
import codeCoverage from '@cypress/code-coverage/task';

export default defineConfig({
  e2e: {
    specPattern: './cypress/**/*.cy.{ts,tsx}',
    setupNodeEvents: (on, config) => {
      codeCoverage(on, config);

      return config;
    },
  },
  component: {
    specPattern: './cypress/**/*.cy.{ts,tsx}',
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
  video: false,
});
